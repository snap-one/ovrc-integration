import { describe, test, expect } from "bun:test";
import { inlineAliasDefinitions } from "../steps/inline-alias-definitions.ts";
import { buildSchemaModel } from "../steps/build-schema-model.ts";
import { parseSrc, printCode, spec } from "./test-utils.ts";
import type { SchemaModel } from "../steps/build-schema-model.ts";
import type { CommonArgs } from "../steps/common.ts";

// inlineAliasDefinitions consumes a SchemaModel, so build one from source the
// same way the chain does before exercising the step.
const modelFrom = (source: string): SchemaModel & CommonArgs =>
  buildSchemaModel({ recastAst: parseSrc(source), spec });

describe("inlineAliasDefinitions", () => {
  test("replaces an alias body with its real schema definition", () => {
    // Arrange
    const model =
      modelFrom(`export type components = { schemas: { Foo: { a: string } } };
export type Foo = components['schemas']['Foo'];`);

    // Act
    const { recastAst } = inlineAliasDefinitions(model);

    // Assert
    expect(printCode(recastAst)).toContain("type Foo = { a: string }");
  });

  test("rewrites nested schema-key references to the alias name", () => {
    // Arrange
    const model =
      modelFrom(`export type components = { schemas: { Foo: { bar: components['schemas']['Bar'] }; Bar: { b: number } } };
export type Foo = components['schemas']['Foo'];
export type Bar = components['schemas']['Bar'];`);

    // Act
    const code = printCode(inlineAliasDefinitions(model).recastAst);

    // Assert
    expect(code).toContain("type Foo = { bar: Bar }");
    expect(code).toContain("type Bar = { b: number }");
  });

  test("carries the schema's leading description comment onto the export", () => {
    // Arrange
    const model = modelFrom(`export type components = {
  schemas: {
    /** The Foo schema. */
    Foo: { a: string };
  };
};
export type Foo = components['schemas']['Foo'];`);

    // Act
    const code = printCode(inlineAliasDefinitions(model).recastAst);

    // Assert
    expect(code).toContain("The Foo schema.");
  });

  test("leaves aliases whose schema key has no definition unchanged", () => {
    // Arrange — references components['schemas']['Foo'] but no components export.
    const model = modelFrom(`export type Foo = components['schemas']['Foo'];`);

    // Act
    const code = printCode(inlineAliasDefinitions(model).recastAst);

    // Assert
    expect(code).toContain("components['schemas']['Foo']");
  });

  test("returns the recastAst and passes the spec through", () => {
    // Arrange
    const model =
      modelFrom(`export type components = { schemas: { Foo: { a: string } } };
export type Foo = components['schemas']['Foo'];`);

    // Act
    const result = inlineAliasDefinitions(model);

    // Assert
    expect(result.recastAst).toBe(model.ast);
    expect(result.spec).toBe(spec);
  });
});
