import { expect, test } from "bun:test";
import { modulesWithExports } from "./generate-modules.ts";

test("keeps exporting modules, drops globals-only ones", () => {
  const source = `
    declare module "buffer" {
      export const Buffer: unknown;
      const d: unknown;
      export default d;
    }
    declare module "ovrc:buffer" {
      export * from "buffer";
    }
    declare module "globals-only" {
      global {
        var thing: unknown;
      }
    }
    declare namespace Wrapper {
      declare module "nested" {
        export const a: unknown;
      }
    }
  `;
  expect(modulesWithExports(source).sort()).toEqual(["buffer", "nested", "ovrc:buffer"]);
});
