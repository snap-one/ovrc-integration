#!/usr/bin/env bun
//MISE description="Run all typescript tests"

import { $ } from "bun";
import { dirname, join, resolve } from "node:path";

const typescript = resolve(import.meta.dir, "../../typescript");

// A directory one level down holding a package.json is a package. node_modules
// never matches, because installed packages sit two levels down.
const packages = [...new Bun.Glob("*/package.json").scanSync(typescript)]
  .map(dirname)
  .sort();

for (const name of packages) {
  console.log(`::group::${name}`);
  await $`bun install`.cwd(join(typescript, name));
  await $`bun test --pass-with-no-tests`.cwd(join(typescript, name));
  console.log("::endgroup::");
}
