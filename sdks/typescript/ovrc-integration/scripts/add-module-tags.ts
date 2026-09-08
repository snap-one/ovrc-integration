// Adds a TypeDoc `@module` tag to the copied .d.ts files. Run by
// mise/tasks/package-js after the .d.ts files are copied in, since that task
// wipes and re-copies them from the Rust crate on every run.
//
// Why this is needed: typedoc.json uses entryPointStrategy "expand", so each
// file becomes a module named after its path -- js_modules/ovrc/core/ovrc_core.d.ts
// renders as "ovrc/core/ovrc_core". A file-level `@module ovrc:core` renames that
// wrapper and collapses it into the single ambient module it declares, so one
// correctly-named page is emitted instead of a path-named wrapper plus a child.
import { Glob } from "bun";
import { modulesWithExports } from "./generate-modules.ts";

const root = new URL("..", import.meta.url).pathname;

// TypeDoc only honours `@module` in the *first* comment in the file, so the tag
// goes above all code. That makes the edit a prepend; recast is used to read the
// module name (via modulesWithExports) but has nothing to reprint.
export function addModuleTag(source: string): string | null {
  if (/^\s*\/\*\*[\s\S]*?@module\b/.test(source)) return null; // already tagged
  const modules = modulesWithExports(source);
  // 0 modules: augments globals only, and the path-derived name is already clean.
  // 2+: no single honest name for the wrapper, so leave it path-derived.
  if (modules.length !== 1) return null;
  return `/**\n * @module ${modules[0]}\n */\n${source}`;
}

if (import.meta.main) {
  const skipped: string[] = [];
  let tagged = 0;
  for (const file of new Glob("js_modules/**/*.d.ts").scanSync(root)) {
    const path = root + file;
    const next = addModuleTag(await Bun.file(path).text());
    if (!next) {
      skipped.push(file);
      continue;
    }
    await Bun.write(path, next);
    tagged++;
  }
  console.log(
    `add-module-tags: tagged ${tagged}, left path-named ${skipped.length}`,
  );
}
