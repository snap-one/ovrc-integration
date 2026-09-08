import { types } from "recast";

// Shared recast/ast-types helpers and the node types used across the steps.
const { namedTypes: n, builders: b } = types;

export { b, n };

export type Node = types.namedTypes.Node;
export type CommentKind = NonNullable<Node["comments"]>[0];
export type File = types.namedTypes.File;
export type TSType = types.namedTypes.TSTypeAliasDeclaration["typeAnnotation"];
export type TSTypeAlias = types.namedTypes.TSTypeAliasDeclaration;
export type TSPropertySignature = types.namedTypes.TSPropertySignature;

// Unwrap an `export <decl>` to its inner declaration.
export const exportInner = (node: Node): Node | null =>
  n.ExportNamedDeclaration.check(node) ? node.declaration : node;

// The string value of a string-literal type, else null.
export const literalString = (node: Node): string | null =>
  n.TSLiteralType.check(node) && n.StringLiteral.check(node.literal)
    ? node.literal.value
    : null;

// The exported name of a `type X = ...` declaration (unwrapping any `export`).
export const aliasName = (node: Node): string | null => {
  const decl = exportInner(node);
  return decl &&
    n.TSTypeAliasDeclaration.check(decl) &&
    n.Identifier.check(decl.id)
    ? decl.id.name
    : null;
};

// Match `components['schemas']['<key>']` and return "<key>", else null.
export const matchSchemaKey = (node: Node | null): string | null => {
  if (!node || !n.TSIndexedAccessType.check(node)) return null;
  const key = literalString(node.indexType);
  if (key == null) return null;
  const obj = node.objectType;
  if (!n.TSIndexedAccessType.check(obj)) return null;
  if (literalString(obj.indexType) !== "schemas") return null;
  const base = obj.objectType;
  return n.TSTypeReference.check(base) &&
    n.Identifier.check(base.typeName) &&
    base.typeName.name === "components"
    ? key
    : null;
};
