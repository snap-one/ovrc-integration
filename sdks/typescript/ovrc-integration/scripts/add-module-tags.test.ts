import { expect, test } from "bun:test";
import { addModuleTag } from "./add-module-tags.ts";

test("tags a file declaring one exporting ambient module", () => {
  const out = addModuleTag(`declare module "ovrc:core" {\n  export function a(): void;\n}\n`);
  expect(out).toStartWith("/**\n * @module ovrc:core\n */\n");
});

test("leaves a file that already has a @module tag", () => {
  const source = `/**\n * @module ovrc:core\n */\ndeclare module "ovrc:core" {\n  export function a(): void;\n}\n`;
  expect(addModuleTag(source)).toBeNull();
});

test("leaves a file declaring two ambient modules: no single honest name", () => {
  const source = `declare module "url" {\n  export function a(): void;\n}\ndeclare module "ovrc:url" {\n  export function b(): void;\n}\n`;
  expect(addModuleTag(source)).toBeNull();
});

test("leaves a globals-only file: path-derived name is already clean", () => {
  expect(addModuleTag(`export {};\ndeclare global {\n  class URL {}\n}\n`)).toBeNull();
});
