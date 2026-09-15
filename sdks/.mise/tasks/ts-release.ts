#!/usr/bin/env bun
//MISE description="Publish the typescript packages whose source changed: semantic-release versions from main, rc prereleases from anywhere else"

import { $ } from "bun";
import { basename, dirname, join, relative, resolve } from "node:path";

const typescript = resolve(import.meta.dir, "../../typescript");

type Manifest = { name: string; version: string; private?: boolean | string };
type Target = { channel: "release" | "rc"; registry: string };

// Cut real releases from main, rc prereleases from anywhere else. Publish both
// under `latest`: an `rc` dist-tag would leave GitHub Packages with no `latest`
// at all, and `npm install <pkg>` nothing to resolve.
export function releaseTarget(branch: string): Target {
  if (branch === "main") {
    return { channel: "release", registry: "https://registry.npmjs.org" };
  }
  return { channel: "rc", registry: "https://npm.pkg.github.com" };
}

async function currentBranch(): Promise<string> {
  return (
    Bun.env.GITHUB_REF_NAME ??
    (await $`git rev-parse --abbrev-ref HEAD`.text()).trim()
  );
}

// Diff against BASE_SHA when this push supplies a usable one. Fall back to the
// previous commit for manual runs and new branches.
async function changeBase(sha: string | undefined): Promise<string> {
  if (!sha) return "HEAD~1";

  const { exitCode } = await $`git cat-file -e ${sha}^{commit}`
    .quiet()
    .nothrow();
  if (exitCode !== 0) return "HEAD~1";

  return sha;
}

const isUnchanged = async (
  root: string,
  name: string,
  base: string,
): Promise<boolean> =>
  (
    await $`git diff --quiet ${base} HEAD -- ${name}`
      .cwd(root)
      .quiet()
      .nothrow()
  ).exitCode === 0;

const manifestOf = (dir: string): Promise<Manifest> =>
  Bun.file(join(dir, "package.json")).json();

export const isPrivate = (manifest: Manifest): boolean =>
  manifest.private === true || manifest.private === "true";

// Treat a directory one level down holding a package.json as a package.
// node_modules never matches: installed packages sit two levels down.
const packageNames = (root: string): string[] =>
  [...new Bun.Glob("*/package.json").scanSync(root)].map(dirname).sort();

// Scan the repo for whatever PACKAGES names, written from the repo root as the
// workflow input documents. Intersect the hits with the packages, which drops
// the files and node_modules a pattern like sdks/typescript/* also matches.
async function scanPackageNames(
  root: string,
  filter: string,
): Promise<string[]> {
  const repoRoot = resolve(root, "../..");
  const packages = new Set(packageNames(root));
  const hits = new Bun.Glob(filter).scan({ cwd: repoRoot, onlyFiles: false });

  const names = new Set<string>();
  for await (const hit of hits) {
    const name = relative(root, resolve(repoRoot, hit));
    if (packages.has(name)) names.add(name);
  }
  return [...names].sort();
}

type Selection = {
  root: string;
  filter: string | undefined;
  channel: Target["channel"];
  base: string;
};

async function selectPackages(selection: Selection): Promise<string[]> {
  const { root, filter } = selection;
  const names = filter
    ? await scanPackageNames(root, filter)
    : packageNames(root);
  if (filter && !names.length) {
    console.log(`::warning::${filter} matched no packages`);
  }

  const selected: string[] = [];
  for (const name of names) {
    const reason = await skipReason(name, selection);
    if (reason) {
      console.log(`::notice::${name} ${reason}`);
      continue;
    }
    selected.push(join(root, name));
  }
  return selected;
}

// Report why a package is skipped, or nothing when it should be released.
async function skipReason(
  name: string,
  { root, filter, channel, base }: Selection,
): Promise<string | undefined> {
  if (isPrivate(await manifestOf(join(root, name)))) {
    return "is ignored because it is private";
  }
  // Skip change detection when PACKAGES names something. Naming a package asks
  // to release it whether or not this push touched it.
  if (filter || channel !== "rc") return undefined;
  if (await isUnchanged(root, name, base)) return `is unchanged since ${base}`;

  return undefined;
}

async function releasePackage(
  dir: string,
  { channel, registry }: Target,
): Promise<void> {
  console.log(`::group::${basename(dir)}`);
  await $`bun install`.cwd(dir);
  const publish =
    channel === "rc" ? publishReleaseCandidate : runSemanticRelease;
  await publish(dir, registry);
  console.log("::endgroup::");
}

async function publishReleaseCandidate(
  dir: string,
  registry: string,
): Promise<void> {
  const { name, version } = await manifestOf(dir);
  const prefix = tagPrefix(name);
  const rc = await nextRcVersion(prefix, version);

  // Never commit this bump back. The rc tag below is the version's only record.
  await $`npm --no-git-tag-version version ${rc}`.cwd(dir).quiet();

  // Tag and push before publishing. A failed publish then burns an rc number
  // instead of colliding with a version already on the registry.
  console.log(`Publishing ${rc}`);
  await $`git tag ${prefix}-v${rc}`;
  await $`git push origin ${prefix}-v${rc}`;
  await publishToRegistry(dir, registry);
}

// Namespace every typescript tag under @scope/ts-, releases and rc's alike.
// @snap-one/foo -> @snap-one/ts-foo.
export const tagPrefix = (packageName: string): string =>
  packageName.replace(/^(@[^/]+\/)?/, "$1ts-");

// x.y.z -> x.y.(z+1), ignoring any prerelease suffix.
export function nextPatch(version: string): string {
  const [major = "0", minor = "0", patch = "0"] = version
    .split("-")[0]!
    .split(".");
  return `${major}.${minor}.${Number(patch) + 1}`;
}

// Read released versions from tags, not the registry, so this works before the
// first publish. Keep main's tags in the clone: a shallow checkout would build
// rc's on an already-released base, hence fetch-depth: 0 in the workflow.
async function releasedVersions(prefix: string): Promise<string[]> {
  return (await gitTags(`${prefix}-v*`))
    .map((tag) => tag.slice(`${prefix}-v`.length))
    .filter((version) => /^\d+\.\d+\.\d+$/.test(version)) // plain x.y.z only, dropping the rc tags
    .sort(Bun.semver.order);
}

// Treat a base main has already released as spent. Move to the patch above it,
// which has no rc tags yet and so restarts the counter at zero.
export function rcBaseVersion(
  manifestVersion: string,
  released: string | undefined,
): string {
  const fromManifest = nextPatch(manifestVersion);
  if (!released) return fromManifest;
  if (Bun.semver.order(released, fromManifest) < 0) return fromManifest;

  return nextPatch(released);
}

async function nextRcVersion(
  prefix: string,
  manifestVersion: string,
): Promise<string> {
  const released = (await releasedVersions(prefix)).at(-1);
  const rcBase = rcBaseVersion(manifestVersion, released);
  return `${rcBase}-rc.${await nextRcCounter(prefix, rcBase)}`;
}

// Count 0, 1, 2... per base by reading the rc tags, not the run number.
async function nextRcCounter(prefix: string, rcBase: string): Promise<number> {
  const used = (await gitTags(`${prefix}-v${rcBase}-rc.*`)).map((tag) =>
    Number(tag.replace(/.*-rc\./, "")),
  );
  if (!used.length) return 0;

  return Math.max(...used) + 1;
}

const gitTags = async (pattern: string): Promise<string[]> =>
  (await $`git tag -l ${pattern}`.text()).split("\n").filter(Boolean);

// Point at the registry here and nowhere else. Re-read `private` off disk so a
// private package cannot slip through a wrong skip, and fail loudly rather than
// skip quietly. semantic-release never reaches here; it runs the same check.
async function publishToRegistry(dir: string, registry: string): Promise<void> {
  const manifest = await manifestOf(dir);
  if (isPrivate(manifest)) {
    console.error(
      `::error::refusing to publish ${manifest.name}: package.json sets private`,
    );
    process.exit(1);
  }
  // Keep NPM_CONFIG_TAG even though `latest` is the default. npm tests how the
  // tag was set, not what it is, and refuses a prerelease on the unset default.
  await $`npm publish` // prepack builds
    .cwd(dir)
    .env({
      ...Bun.env,
      NPM_CONFIG_REGISTRY: registry,
      NPM_CONFIG_TAG: "latest",
      NPM_CONFIG_ACCESS: "public",
    });
}

// Let semantic-release-monorepo scope commit analysis here, making a package
// with no changes a no-op. Spell NPM_CONFIG_* uppercase: @semantic-release/npm
// reads those exact names. Request provenance on public repos only; it is
// npmjs-only and needs public access plus the job's id-token:write.
async function runSemanticRelease(
  dir: string,
  registry: string,
): Promise<void> {
  const args = [
    "-e",
    "semantic-release-monorepo",
    "-e",
    "../release.config.mjs",
  ];
  if (Bun.env.DRY_RUN) args.push("--dry-run");

  await $`${resolve(dir, "../node_modules/.bin/semantic-release")} ${args}`
    .cwd(dir)
    .env({
      ...Bun.env,
      NPM_CONFIG_REGISTRY: registry,
      NPM_CONFIG_ACCESS: "public",
      NPM_CONFIG_PROVENANCE: String(Bun.env.REPO_VISIBILITY === "public"),
    });
}

// Install before anything picks a registry. GitHub Packages does not proxy
// npmjs, so an install pointed there fails outright.
await $`bun install`.cwd(typescript);

const target = releaseTarget(await currentBranch());
const filter = Bun.env.PACKAGES?.trim();
const base = await changeBase(Bun.env.BASE_SHA);

console.log(`Publishing ${target.channel} builds to ${target.registry}`);
if (filter) console.log(`Releasing only packages matching: ${filter}`);

for (const dir of await selectPackages({
  root: typescript,
  filter,
  channel: target.channel,
  base,
})) {
  await releasePackage(dir, target);
}
