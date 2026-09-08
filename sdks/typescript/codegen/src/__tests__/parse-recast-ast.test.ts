import { describe, test, expect } from "bun:test";
import { print } from "recast";
import { parseRecastAst } from "../steps/parse-recast-ast.ts";
import { spec } from "./test-utils.ts";

describe("parseRecastAst", () => {
  test("returns a recast File AST for the given source", () => {
    // Arrange
    const source = "export type Foo = string;";

    // Act
    const { recastAst } = parseRecastAst({ source, spec });

    // Assert
    expect(recastAst.type).toBe("File");
    expect(recastAst.program.body).toHaveLength(1);
  });

  test("round-trips the source unchanged through print", () => {
    // Arrange
    const source = "export type Foo = {\n  a: string\n};";

    // Act
    const { recastAst } = parseRecastAst({ source, spec });

    // Assert
    expect(print(recastAst).code).toBe(source);
  });

  test("passes the rest of the args through alongside the AST", () => {
    // Arrange
    const source = "type A = number;";

    // Act
    const result = parseRecastAst({ source, spec });

    // Assert
    expect(result.spec).toBe(spec);
  });

  describe("body node counts", () => {
    const cases = [
      { name: "empty source", source: "", expected: 0 },
      { name: "a single statement", source: "type A = number;", expected: 1 },
      {
        name: "multiple statements",
        source: "type A = number;\ntype B = string;",
        expected: 2,
      },
    ];

    for (const { name, source, expected } of cases) {
      test(`parses ${name}`, () => {
        // Arrange / Act
        const { recastAst } = parseRecastAst({ source, spec });

        // Assert
        expect(recastAst.program.body).toHaveLength(expected);
      });
    }
  });
});
