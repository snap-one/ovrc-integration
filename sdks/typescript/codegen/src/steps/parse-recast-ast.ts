import { parse } from "recast";
import tsParser from "recast/parsers/typescript";
import type { File } from "../ast.ts";
import type { CommonArgs } from "./common.ts";

// Parse the generated source into a recast AST.
export function parseRecastAst({
  source,
  ...rest
}: { source: string } & CommonArgs) {
  return { recastAst: parse(source, { parser: tsParser }) as File, ...rest };
}
