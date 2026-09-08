import { describe, test, expect } from "bun:test";
import { buildSchemaModel } from "../steps/build-schema-model.ts";
import { parseSrc, spec } from "./test-utils.ts";

const TWO_SCHEMAS = `export type components = {
  schemas: {
    Foo: { a: string };
    Bar: { b: number };
  };
};
export type Foo = components['schemas']['Foo'];
export type Bar = components['schemas']['Bar'];`;

describe("buildSchemaModel", () => {
  test("collects each schema definition keyed by its schema name", () => {
    // Arrange
    const input = { recastAst: parseSrc(TWO_SCHEMAS), spec };

    // Act
    const model = buildSchemaModel(input);

    // Assert
    expect([...model.defByKey.keys()].sort()).toEqual(["Bar", "Foo"]);
  });

  test("maps each schema key to its generated root alias name", () => {
    // Arrange
    const input = { recastAst: parseSrc(TWO_SCHEMAS), spec };

    // Act
    const model = buildSchemaModel(input);

    // Assert
    expect(model.keyToAlias.get("Foo")).toBe("Foo");
    expect(model.keyToAlias.get("Bar")).toBe("Bar");
  });

  test("normalizes alias names that differ from the schema key", () => {
    // Arrange
    const source = `export type components = { schemas: { Foo: { a: string } } };
export type MyFoo = components['schemas']['Foo'];`;
    const input = { recastAst: parseSrc(source), spec };

    // Act
    const model = buildSchemaModel(input);

    // Assert
    expect(model.keyToAlias.get("Foo")).toBe("MyFoo");
  });

  test("records one aliasNode per matching root alias", () => {
    // Arrange
    const input = { recastAst: parseSrc(TWO_SCHEMAS), spec };

    // Act
    const model = buildSchemaModel(input);

    // Assert
    expect(model.aliasNodes).toHaveLength(2);
    expect(model.aliasNodes.map((a) => a.key).sort()).toEqual(["Bar", "Foo"]);
  });

  test("passes the ast and spec through on the result", () => {
    // Arrange
    const recastAst = parseSrc(TWO_SCHEMAS);

    // Act
    const model = buildSchemaModel({ recastAst, spec });

    // Assert
    expect(model.ast).toBe(recastAst);
    expect(model.spec).toBe(spec);
  });

  describe("when there is nothing to collect", () => {
    test("leaves defByKey empty when there is no components export", () => {
      // Arrange
      const source = `export type Foo = components['schemas']['Foo'];`;
      const input = { recastAst: parseSrc(source), spec };

      // Act
      const model = buildSchemaModel(input);

      // Assert
      expect(model.defByKey.size).toBe(0);
      expect(model.keyToAlias.get("Foo")).toBe("Foo");
    });

    test("ignores root aliases that are not schema-key references", () => {
      // Arrange
      const source = `export type Plain = string;`;
      const input = { recastAst: parseSrc(source), spec };

      // Act
      const model = buildSchemaModel(input);

      // Assert
      expect(model.keyToAlias.size).toBe(0);
      expect(model.aliasNodes).toHaveLength(0);
    });

    test("returns empty maps for an empty program", () => {
      // Arrange
      const input = { recastAst: parseSrc(""), spec };

      // Act
      const model = buildSchemaModel(input);

      // Assert
      expect(model.defByKey.size).toBe(0);
      expect(model.keyToAlias.size).toBe(0);
      expect(model.aliasNodes).toHaveLength(0);
    });
  });
});
