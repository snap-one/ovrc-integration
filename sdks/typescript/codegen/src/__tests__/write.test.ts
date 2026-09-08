import { describe, test, expect } from "bun:test";
import { parseSrc } from "./test-utils.ts";
import { writeRecastAstAsSource } from "../steps/write.ts";

describe("writeRecastAstAsSource", () => {
  test("returns its input unchanged so later steps can chain", async () => {
    // Arrange
    const input = { recastAst: parseSrc("type A = number;"), extra: "carried" };

    // Act
    const result = await writeRecastAstAsSource(input);

    // Assert
    expect(result).toBe(input);
    expect(result.extra).toBe("carried");
  });
});
