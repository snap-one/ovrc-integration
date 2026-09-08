import { parse, print } from "recast";
import tsParser from "recast/parsers/typescript";
import type { OpenAPI3 } from "openapi-typescript";
import type { File } from "../ast.ts";

// Shared arrange/assert helpers for the step tests. This file is intentionally
// not named `*.test.ts` so the bun runner does not treat it as a test suite.

// Parse TypeScript source into the recast AST the steps consume as input.
export const parseSrc = (src: string): File =>
  parse(src, { parser: tsParser }) as File;

// Reprint a recast AST back to source for black-box assertions on output.
export const printCode = (ast: File): string => print(ast).code;

// A sentinel `spec` used to assert the CommonArgs payload passes through a step.
export const spec = { openapi: "3.0.0" } as unknown as OpenAPI3;
