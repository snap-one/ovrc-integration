import { print } from "recast";
import type { File } from "../ast.ts";

// Reprint the AST back to TypeScript source, writing it to stdout. Passes its
// input through so later steps can keep operating on the context.
export async function writeRecastAstAsSource<T extends { recastAst: File }>(
  input: T,
): Promise<T> {
  const { code } = print(input.recastAst);
  await Bun.write(Bun.stdout, code);
  return input;
}
