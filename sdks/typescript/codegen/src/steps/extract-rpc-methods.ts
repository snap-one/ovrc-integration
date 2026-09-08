import { print } from "recast";
import { exportInner, literalString, n } from "../ast.ts";
import type { File, TSType, CommentKind } from "../ast.ts";
import type { CommonArgs } from "./common.ts";

class SourceComments {
  readonly comments: SourceComment[];
  constructor(comments: CommentKind[]) {
    this.comments = comments.map((c) => new SourceComment(c));
    this.comments.sort((a, b) => {
      if (
        (a.kind.leading && b.kind.leading) ||
        (a.kind.trailing && b.kind.trailing)
      ) {
        return 0;
      }

      if (a.kind.leading && b.kind.trailing) {
        return 1;
      }

      return -1;
    });
  }

  get toString() {
    return this.comments.map((c) => c.toString).join("\n");
  }
}

class SourceComment {
  readonly kind: CommentKind;
  constructor(kind: CommentKind) {
    this.kind = kind;
  }

  get toString() {
    let open = "",
      close = "";
    switch (this.kind.type) {
      case "Block":
      case "CommentBlock":
        open = "/**\n";
        close = "\n*/";
        break;
      case "Line":
      case "CommentLine":
        break;
    }

    let value = this.kind.value;
    if (value.startsWith("* @description")) {
      value = "*" + value.slice("* @description".length);
    }
    return open + value + close;
  }
}

export type FieldDescriptor = {
  type: string;
  comments: SourceComments;
};

// One entry per member of the `RPCMethod` discriminated union.
export interface RpcMethod {
  // The discriminant value at `.method` (e.g. "getAuthentication").
  method: Omit<FieldDescriptor, "type"> & { name: string };
  // The type at `.params.args`, printed as TypeScript source.
  argType: string;
  paramType: string;
  resultType: string;
  // Present only when `{Method}Result` resolves to a (possibly `| null`) object.
  // Maps each `.params.includeFields` value to that field's type on the result.
  fields?: Record<string, FieldDescriptor>;
}

// Lookup of every top-level `export type Name = Def`, plus the leading comments
// for each. openapi-typescript attaches a type's doc comment to the surrounding
// `export` node rather than the alias declaration or any reference to it, so the
// comments are collected here keyed by name and looked up when describing a method.
const collectTypeAliases = (
  ast: File,
): { types: Map<string, TSType>; comments: Map<string, CommentKind[]> } => {
  const types = new Map<string, TSType>();
  const comments = new Map<string, CommentKind[]>();
  for (const node of ast.program.body) {
    const decl = exportInner(node);
    if (
      decl &&
      n.TSTypeAliasDeclaration.check(decl) &&
      n.Identifier.check(decl.id)
    ) {
      types.set(decl.id.name, decl.typeAnnotation);
      comments.set(decl.id.name, node.comments ?? decl.comments ?? []);
    }
  }
  return { types, comments };
};

// Follow alias references (and parentheses) until reaching a concrete type.
const resolveAlias = (types: Map<string, TSType>, type: TSType): TSType => {
  const seen = new Set<string>();
  let cur: TSType = type;
  while (true) {
    if (n.TSParenthesizedType.check(cur)) {
      cur = cur.typeAnnotation;
      continue;
    }
    if (n.TSTypeReference.check(cur) && n.Identifier.check(cur.typeName)) {
      const name = cur.typeName.name;
      const next = types.get(name);
      if (!next || seen.has(name)) break;
      seen.add(name);
      cur = next;
      continue;
    }
    break;
  }
  return cur;
};

// The type of property `prop` on an object/intersection type, else null.
const getProperty = (
  types: Map<string, TSType>,
  type: TSType,
  prop: string,
): { fieldType: TSType; fieldComments: CommentKind[] } | null => {
  const resolved = resolveAlias(types, type);
  if (n.TSTypeLiteral.check(resolved)) {
    for (const m of resolved.members) {
      if (
        !n.TSPropertySignature.check(m) ||
        !n.Identifier.check(m.key) ||
        m.key.name !== prop
      )
        continue;

      const ann = m.typeAnnotation;
      if (!ann || !n.TSTypeAnnotation.check(ann)) continue;
      const fieldType = ann.typeAnnotation;
      if (n.TSTypeAnnotation.check(fieldType)) continue;
      return { fieldComments: m.comments || [], fieldType };
    }
    return null;
  }
  if (n.TSIntersectionType.check(resolved)) {
    for (const sub of resolved.types) {
      const found = getProperty(types, sub, prop);
      if (found) return found;
    }
  }
  return null;
};

// The string-literal members of an `(... | ...)[]` (the includeFields shape).
const includeFieldValues = (
  types: Map<string, TSType>,
  type: TSType,
): string[] => {
  let element = resolveAlias(types, type);
  if (n.TSArrayType.check(element))
    element = resolveAlias(types, element.elementType);
  const members = n.TSUnionType.check(element) ? element.types : [element];
  const values: string[] = [];
  for (const member of members) {
    const value = literalString(resolveAlias(types, member));
    if (value != null) values.push(value);
  }
  return values;
};

// `{methodName}Result` resolved to a bare object, unwrapping a single `| null`.
// Arrays, primitives, and literal unions are not objects and yield null.
const resolveResultObject = (
  types: Map<string, TSType>,
  methodName: string,
): TSType | null => {
  const result = types.get(`${methodName}Result`);
  if (!result) return null;
  let resolved = resolveAlias(types, result);
  if (n.TSUnionType.check(resolved)) {
    const nonNull = resolved.types.filter((m) => !n.TSNullKeyword.check(m));
    const only = nonNull[0];
    if (nonNull.length !== 1 || !only) return null;
    resolved = resolveAlias(types, only);
  }
  return n.TSTypeLiteral.check(resolved) ? resolved : null;
};

// The includeFields-to-type map for a method whose result is an object, else
// null when the result isn't an object (array, primitive, literal union, ...).
const extractFields = (
  types: Map<string, TSType>,
  methodName: string,
  params: TSType | null,
) => {
  const resultObject = resolveResultObject(types, methodName);
  if (!resultObject) return null;

  const includeFields = params && getProperty(types, params, "includeFields");
  const fieldNames = includeFields
    ? includeFieldValues(types, includeFields.fieldType)
    : [];

  const fields: Record<string, FieldDescriptor> = {};
  for (const field of fieldNames) {
    const fieldType = getProperty(types, resultObject, field);
    if (fieldType) {
      fields[field] = {
        type: print(fieldType.fieldType).code,
        comments: new SourceComments(fieldType.fieldComments ?? []),
      };
    }
  }

  return fields;
};

// Describe one member of the `RPCMethod` union: its discriminant, its argument
// type, and (for object results) its fields. Throws if the member doesn't have
// the expected method shape.
const describeMethod = (
  types: Map<string, TSType>,
  comments: Map<string, CommentKind[]>,
  member: TSType,
): RpcMethod => {
  if (!n.TSTypeReference.check(member) || !n.Identifier.check(member.typeName))
    throw new Error(
      `RPCMethod union member is not a named type reference: ${print(member).code}`,
    );

  const name = member.typeName.name;
  const def = types.get(name);
  if (!def)
    throw new Error(`No type alias found for RPCMethod member "${name}"`);

  const methodType = getProperty(types, def, "method");
  const method = methodType && literalString(methodType.fieldType);
  if (method == null)
    throw new Error(
      `Could not find a string-literal "method" discriminant on "${name}"`,
    );

  const params = getProperty(types, def, "params");
  const argsType = params && getProperty(types, params.fieldType, "args");

  const entry: RpcMethod = {
    method: {
      name: method,
      comments: new SourceComments(
        comments.get(name) ?? member?.comments ?? [],
      ),
    },
    argType: argsType ? print(argsType.fieldType).code : "unknown",
    paramType: `${name}Params`,
    resultType: `${name}Result`,
  };
  const fields = extractFields(types, name, params!.fieldType);
  if (fields) entry.fields = fields;
  return entry;
};

// Walk the `RPCMethod` union and describe each method it contains.
export function extractRpcMethods({
  recastAst: ast,
  ...rest
}: { recastAst: File } & CommonArgs): {
  recastAst: File;
  rpcMethods: RpcMethod[];
} & CommonArgs {
  const { types, comments } = collectTypeAliases(ast);
  const union = types.get("RPCMethod");
  const members = union && n.TSUnionType.check(union) ? union.types : [];

  const rpcMethods = members.map((member) =>
    describeMethod(types, comments, member),
  );

  return { recastAst: ast, rpcMethods, ...rest };
}
