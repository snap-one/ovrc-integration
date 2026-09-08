import { exportInner, matchSchemaKey, n } from "../ast.ts";
import type {
  File,
  Node,
  TSPropertySignature,
  TSType,
  TSTypeAlias,
} from "../ast.ts";
import type { CommonArgs } from "./common.ts";

export interface SchemaDefinition {
  def: TSType;
  member: TSPropertySignature;
}

export interface AliasNode {
  node: Node;
  decl: TSTypeAlias;
  key: string;
}

// The maps every later step needs, carried alongside the AST.
export interface SchemaModel {
  ast: File;
  defByKey: Map<string, SchemaDefinition>;
  keyToAlias: Map<string, string>;
  aliasNodes: AliasNode[];
}

// Read each schema definition out of `components.schemas` into `defByKey`.
const collectSchemas = (
  componentsType: TSType,
  defByKey: Map<string, SchemaDefinition>,
): void => {
  if (!n.TSTypeLiteral.check(componentsType)) return;
  const schemas = componentsType.members.find(
    (m) =>
      n.TSPropertySignature.check(m) &&
      n.Identifier.check(m.key) &&
      m.key.name === "schemas",
  );
  if (
    !schemas ||
    !n.TSPropertySignature.check(schemas) ||
    !schemas.typeAnnotation
  )
    return;
  const schemaLit = schemas.typeAnnotation.typeAnnotation;
  if (!n.TSTypeLiteral.check(schemaLit)) return;
  for (const member of schemaLit.members) {
    if (!n.TSPropertySignature.check(member) || !n.Identifier.check(member.key))
      continue;
    const ann = member.typeAnnotation;
    if (!ann || !n.TSTypeAnnotation.check(ann)) continue;
    const def = ann.typeAnnotation;
    if (n.TSTypeAnnotation.check(def)) continue;
    defByKey.set(member.key.name, { def, member });
  }
};

// Build, in one pass, the maps relating schema keys, their definitions, and the
// generated root aliases (whose names are normalized away from the schema keys).
export function buildSchemaModel({
  recastAst: ast,
  ...rest
}: { recastAst: File } & CommonArgs): SchemaModel & CommonArgs {
  const defByKey = new Map<string, SchemaDefinition>();
  const keyToAlias = new Map<string, string>();
  const aliasNodes: AliasNode[] = [];

  for (const node of ast.program.body) {
    const decl = exportInner(node);
    if (
      !decl ||
      !n.TSTypeAliasDeclaration.check(decl) ||
      !n.Identifier.check(decl.id)
    )
      continue;

    if (decl.id.name === "components") {
      collectSchemas(decl.typeAnnotation, defByKey);
      continue;
    }

    const key = matchSchemaKey(decl.typeAnnotation);
    if (key != null) {
      keyToAlias.set(key, decl.id.name);
      aliasNodes.push({ node, decl, key });
    }
  }

  return { ast, defByKey, keyToAlias, aliasNodes, ...rest };
}
