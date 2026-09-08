import { parse, print, visit } from "recast";
import tsParser from "recast/parsers/typescript";
import { b, matchSchemaKey, n } from "../ast.ts";
import type { File, TSType } from "../ast.ts";
import type { SchemaModel } from "./build-schema-model.ts";
import type { CommonArgs } from "./common.ts";

// Independent copy of a definition so aliases that share a schema key (e.g.
// several `*Result` aliases all pointing at `Authentication`) don't share nodes.
const cloneType = (node: TSType): TSType => {
  const file = parse(`type __CLONE__ = ${print(node).code};`, {
    parser: tsParser,
  }) as File;
  const stmt = file.program.body[0];
  if (!stmt || !n.TSTypeAliasDeclaration.check(stmt))
    throw new Error("failed to clone type");
  return stmt.typeAnnotation;
};

// Replace each alias body with its real definition, rewriting any nested
// `components['schemas']['X']` references to the top-level alias name `X`.
export function inlineAliasDefinitions({
  spec,
  ...model
}: SchemaModel & CommonArgs) {
  const { ast, defByKey, keyToAlias, aliasNodes } = model;

  const aliasRef = (key: string) =>
    b.tsTypeReference(b.identifier(keyToAlias.get(key) ?? key));

  // Returns the (possibly replaced) root, since a root that is itself a ref
  // can't be swapped in place via path.replace.
  const rewriteRefs = (root: TSType): TSType => {
    const rootKey = matchSchemaKey(root);
    if (rootKey != null) return aliasRef(rootKey);
    visit(root, {
      visitTSIndexedAccessType(path) {
        const key = matchSchemaKey(path.node);
        if (key != null) {
          path.replace(aliasRef(key));
          return false;
        }
        this.traverse(path);
      },
    });
    return root;
  };

  for (const { node, decl, key } of aliasNodes) {
    const entry = defByKey.get(key);
    if (!entry) continue;
    decl.typeAnnotation = rewriteRefs(cloneType(entry.def));
    // Carry over the schema's leading description comment, attaching it to the
    // outer export node so recast keeps the `export` keyword.
    const leading = (entry.member.comments ?? []).filter((c) => c.leading);
    if (leading.length) node.comments = leading;
  }

  return { recastAst: ast, spec };
}
