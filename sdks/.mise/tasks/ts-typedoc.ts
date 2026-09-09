#!/usr/bin/env bun
//MISE description="Render the typedoc of every typescript package that has one into the docs site"

import { $ } from "bun";
import { dirname, join, resolve } from "node:path";

const typescript = resolve(import.meta.dir, "../../typescript");
const outRoot = resolve(
  typescript,
  "../../docs/pages/hugo/static/sdks/typescript",
);

const packages = [...new Bun.Glob("*/package.json").scanSync(typescript)]
  .map(dirname)
  .sort();

for (const name of packages) {
  const dir = join(typescript, name);
  const manifest = await Bun.file(join(dir, "package.json")).json();

  // Opting in is having the script. codegen and create-ovrc-integration ship no
  // public API, so neither declares one.
  if (!manifest.scripts?.typedoc) continue;

  console.log(`::group::${name}`);
  await $`bun install`.cwd(dir);

  // @snap-one/ovrc-integration-camera -> ovrc-integration-camera
  const published = manifest.name.replace(/^@[^/]+\//, "");
  const out = join(outRoot, published, manifest.version);

  // --disableSources is what keeps this reproducible: typedoc's source links
  // embed the current commit sha, so leaving them on rewrites every page on
  // every commit and the generate-then-check-dirty CI step never passes.
  //
  // typedoc clears --out itself (cleanOutputDir), so a rerun of a version
  // replaces that version's pages rather than layering on top of them.
  await $`bun run typedoc -- --disableSources --out ${out}`.cwd(dir);
  console.log("::endgroup::");
}
