import { describe, test, expect } from "bun:test";
import { extractRpcMethods } from "../steps/extract-rpc-methods.ts";
import { parseSrc, spec } from "./test-utils.ts";
import type { RpcMethod } from "../steps/extract-rpc-methods.ts";

// A union with two members: an object-result method with includeFields, and an
// array-result method without.
const UNION = `export type GetFooParams = { args: { id: string }; includeFields: ("name" | "age")[] };
export type GetFoo = { method: "getFoo"; params: GetFooParams };
export type GetFooResult = { name: string; age: number } | null;
export type ListParams = { args: { q: string } };
export type List = { method: "list"; params: ListParams };
export type ListResult = string[];
export type RPCMethod = GetFoo | List;`;

const extract = (source: string): RpcMethod[] =>
  extractRpcMethods({ recastAst: parseSrc(source), spec }).rpcMethods;

const byName = (methods: RpcMethod[]): Record<string, RpcMethod> =>
  Object.fromEntries(methods.map((m) => [m.method.name, m]));

describe("extractRpcMethods", () => {
  test("returns one entry per member of the RPCMethod union", () => {
    // Arrange / Act
    const methods = extract(UNION);

    // Assert
    expect(methods).toHaveLength(2);
    expect(methods.map((m) => m.method.name).sort()).toEqual([
      "getFoo",
      "list",
    ]);
  });

  describe("describes each method's types", () => {
    const cases = [
      {
        name: "getFoo",
        argType: "{ id: string }",
        paramType: "GetFooParams",
        resultType: "GetFooResult",
      },
      {
        name: "list",
        argType: "{ q: string }",
        paramType: "ListParams",
        resultType: "ListResult",
      },
    ];

    for (const { name, argType, paramType, resultType } of cases) {
      test(`describes ${name}`, () => {
        // Arrange / Act
        const method = byName(extract(UNION))[name]!;

        // Assert
        expect(method.argType).toBe(argType);
        expect(method.paramType).toBe(paramType);
        expect(method.resultType).toBe(resultType);
      });
    }
  });

  test("maps includeFields to their types for an object result", () => {
    // Arrange / Act
    const getFoo = byName(extract(UNION)).getFoo!;

    // Assert
    expect(getFoo.fields).toBeDefined();
    expect(getFoo.fields!.name!.type).toBe("string");
    expect(getFoo.fields!.age!.type).toBe("number");
  });

  test("omits fields when the result is not an object", () => {
    // Arrange / Act — List's result is string[].
    const list = byName(extract(UNION)).list!;

    // Assert
    expect(list.fields).toBeUndefined();
  });

  test("defaults argType to 'unknown' when params has no args", () => {
    // Arrange
    const source = `export type AParams = { other: string };
export type A = { method: "a"; params: AParams };
export type BParams = { other: string };
export type B = { method: "b"; params: BParams };
export type RPCMethod = A | B;`;

    // Act
    const a = byName(extract(source)).a!;

    // Assert
    expect(a.argType).toBe("unknown");
  });

  test("returns an empty array when there is no RPCMethod union", () => {
    // Arrange / Act
    const methods = extract(`export type Foo = string;`);

    // Assert
    expect(methods).toEqual([]);
  });

  test("passes the recastAst and spec through", () => {
    // Arrange
    const recastAst = parseSrc(UNION);

    // Act
    const result = extractRpcMethods({ recastAst, spec });

    // Assert
    expect(result.recastAst).toBe(recastAst);
    expect(result.spec).toBe(spec);
  });

  describe("throws on malformed union members", () => {
    test("when a member has no string-literal method discriminant", () => {
      // Arrange
      const source = `export type Bad = { params: { args: {} } };
export type Other = { method: "other"; params: { args: {} } };
export type RPCMethod = Bad | Other;`;

      // Act / Assert
      expect(() =>
        extractRpcMethods({ recastAst: parseSrc(source), spec }),
      ).toThrow(/discriminant/);
    });

    test("when a member references an unknown type alias", () => {
      // Arrange
      const source = `export type Other = { method: "other"; params: { args: {} } };
export type RPCMethod = Missing | Other;`;

      // Act / Assert
      expect(() =>
        extractRpcMethods({ recastAst: parseSrc(source), spec }),
      ).toThrow(/No type alias found/);
    });
  });
});
