import { aliasName } from "../ast.ts";
import type { File } from "../ast.ts";
import type { CommonArgs } from "./common.ts";

// Root exports that exist only to support the inlined aliases and are no longer
// referenced once inlining is done.
const OMIT = new Set([
  "components",
  "paths",
  "webhooks",
  "operations",
  "$defs",
]);

// Drop the source `components` export and the unused root exports.
export function dropOmittedOpenApiExports({
  recastAst: ast,
  ...rest
}: { recastAst: File } & CommonArgs) {
  ast.program.body = ast.program.body.filter((node) => {
    const name = aliasName(node);
    return name == null || !OMIT.has(name);
  });
  return { recastAst: ast, ...rest };
}
