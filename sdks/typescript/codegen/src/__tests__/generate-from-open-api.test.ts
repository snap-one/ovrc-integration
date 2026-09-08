import { describe, test, expect } from "bun:test";
import { generateTypesFromOpenApi } from "../steps/generate-from-open-api.ts";

const OPEN_API = {
  openapi: "3.0.0",
  info: { title: "Test", version: "1" },
  paths: {},
  components: {
    schemas: {
      Foo: { type: "object", properties: { a: { type: "string" } } },
    },
  },
};

describe("generateTypesFromOpenApi", () => {
  test("returns generated TypeScript source for the schema", async () => {
    // Arrange / Act
    const { source } = await generateTypesFromOpenApi(JSON.stringify(OPEN_API));

    // Assert
    expect(typeof source).toBe("string");
    expect(source).toContain("Foo");
  });

  test("returns the parsed spec alongside the source", async () => {
    // Arrange / Act
    const { spec } = await generateTypesFromOpenApi(JSON.stringify(OPEN_API));

    // Assert
    expect(spec).toEqual(OPEN_API);
  });

  test("rejects when the input is not valid JSON", async () => {
    // Act / Assert
    await expect(generateTypesFromOpenApi("not json")).rejects.toThrow();
  });
});
