import SemVer from "semver";
import { run } from "./exec";

export async function findHighestPackageVersion(
  pkg: string,
  versionConstraint: string = "",
): Promise<{ package: string; version: string }> {
  const packageQuery =
    versionConstraint.length === 0 ? pkg : `${pkg}@${versionConstraint}`;

  let output = await run("npm", [
    "--silent",
    "view",
    "--json",
    packageQuery,
    "version",
  ]);

  if (output.length === 0) {
    throw new Error(`failed to find latest version of package ${packageQuery}`);
  }

  const version = JSON.parse(output) as string | string[];

  return typeof version === "string"
    ? { version, package: pkg }
    : { version: version.sort(SemVer.compare)[0] ?? "", package: pkg };
}
