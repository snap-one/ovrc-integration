#!/usr/bin/env bun
//MISE description="Generate typescript category-specific types, and core integration types"

import { $ } from "bun";
import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

// Resolved from this file rather than the working directory, so the task runs
// the same under `mise run` and under a plain `bun ts-generate.ts`.
const typescript = resolve(import.meta.dir, "../../typescript");
const schemas = resolve(typescript, "../../schemas/openapi");
const codegen = join(typescript, "codegen");
const core = join(typescript, "ovrc-integration");

// Category specific type generation
await $`bun install`.cwd(codegen);

// ovrc-integration-camera -> "camera", which names its openapi schema.
const categories = readdirSync(typescript, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() && entry.name.startsWith("ovrc-integration-"),
  )
  .map((entry) => entry.name.slice("ovrc-integration-".length));

for (const category of categories) {
  const pkg = join(typescript, `ovrc-integration-${category}`);
  const index = join(pkg, "src/index.ts");

  await $`bun install`.cwd(pkg);

  const schema = Bun.file(join(schemas, `${category}.json`));
  const generated =
    await $`bun index.ts -t templates/rpc-method.hbs < ${schema}`
      .cwd(codegen)
      .text();

  await Bun.write(index, generated); // creates src/ if it is missing
  await $`bunx prettier@3.8.5 --write ${index}`;
}

// integration runtime types
const declarations = [...new Bun.Glob("**/*.d.ts").scanSync(core)]
  .filter((file) => !file.includes("node_modules/") && file !== "index.d.ts")
  .sort();

await Bun.write(
  join(core, "index.d.ts"),
  [
    "// Auto-generated index file",
    ...declarations.map((file) => `/// <reference path="${file}" />`),
    "",
  ].join("\n"),
);

await $`bun install`.cwd(core);

// Generate bin/modules.mjs, the esbuild --external list used by the ovrc-build bin.
await $`bun run scripts/generate-modules.ts`.cwd(core);

// Re-add the TypeDoc @module tags stripped by the copy above, so generated docs
// name pages after the ambient module ("ovrc:core") not the file path.
await $`bun run scripts/add-module-tags.ts`.cwd(core);
