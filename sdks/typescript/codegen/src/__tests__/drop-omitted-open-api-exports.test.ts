import { describe, test, expect } from "bun:test";
import { dropOmittedOpenApiExports } from "../steps/drop-omitted-open-api-exports.ts";
import { aliasName } from "../ast.ts";
import type { File } from "../ast.ts";
import { parseSrc, spec } from "./test-utils.ts";

// The exported names present on the resulting program body.
const names = (ast: File): string[] =>
  ast.program.body
    .map((node) => aliasName(node))
    .filter((name): name is string => name != null);

describe("dropOmittedOpenApiExports", () => {
  describe("removes each omitted root export", () => {
    const omitted = ["components", "paths", "webhooks", "operations", "$defs"];

    for (const name of omitted) {
      test(`drops "${name}"`, () => {
        // Arrange
        const source = `export type ${name} = { x: string };
export type Keep = string;`;
        const input = { recastAst: parseSrc(source), spec };

        // Act
        const { recastAst } = dropOmittedOpenApiExports(input);

        // Assert
        expect(names(recastAst)).toEqual(["Keep"]);
      });
    }
  });

  test("keeps exports that are not in the omit list", () => {
    // Arrange
    const source = `export type Foo = string;
export type Bar = number;`;
    const input = { recastAst: parseSrc(source), spec };

    // Act
    const { recastAst } = dropOmittedOpenApiExports(input);

    // Assert
    expect(names(recastAst).sort()).toEqual(["Bar", "Foo"]);
  });

  test("removes only the omitted exports from a mixed program", () => {
    // Arrange
    const source = `export type components = { x: string };
export type paths = { y: string };
export type Authentication = { token: string };`;
    const input = { recastAst: parseSrc(source), spec };

    // Act
    const { recastAst } = dropOmittedOpenApiExports(input);

    // Assert
    expect(names(recastAst)).toEqual(["Authentication"]);
  });

  test("passes the spec through and returns the recastAst", () => {
    // Arrange
    const recastAst = parseSrc(`export type Keep = string;`);

    // Act
    const result = dropOmittedOpenApiExports({ recastAst, spec });

    // Assert
    expect(result.recastAst).toBe(recastAst);
    expect(result.spec).toBe(spec);
  });
});
