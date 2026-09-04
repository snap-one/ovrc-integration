import {
  describe,
  test,
  expect,
  mock,
  spyOn,
  beforeEach,
  afterEach,
} from "bun:test";
import type { RpcMethod } from "../steps/extract-rpc-methods.ts";

// appendRpcMethodsTemplate reads `rpcTemplate` from ../cli.ts and loads the
// template itself via Bun.file().text(); both are mocked so nothing touches the
// filesystem. The render is written to stdout (no mock needed — its exact
// content is covered end-to-end by the golden tests).
const TEMPLATE_PATH = "sentinel-template.hbs";
const TEMPLATE = "{{#each rpcMethods}}{{method.name}}:{{argType}}\n{{/each}}";

// bun snapshots a mocked module's exports on first read, so a single static mock
// can't cover both the configured and missing-template branches in one file.
// Each scenario instead re-mocks ../cli.ts and re-imports the step under a
// unique query string, forcing a fresh link that picks up the mocked value.
let loadCount = 0;
const loadStep = async (
  rpcTemplate: string | undefined,
): Promise<
  typeof import("../steps/append-rpc-methods-template.ts").appendRpcMethodsTemplate
> => {
  mock.module("../cli.ts", () => ({ rpcTemplate }));
  loadCount += 1;
  const mod = await import(
    `../steps/append-rpc-methods-template.ts?scenario=${loadCount}`
  );
  return mod.appendRpcMethodsTemplate;
};

// The template only reads method.name and argType, so a partial RpcMethod is
// sufficient for these black-box render assertions.
const method = (name: string, argType: string): RpcMethod =>
  ({ method: { name }, argType }) as unknown as RpcMethod;

describe("appendRpcMethodsTemplate", () => {
  let appendRpcMethodsTemplate: Awaited<ReturnType<typeof loadStep>>;
  let file: ReturnType<typeof spyOn>;

  beforeEach(async () => {
    appendRpcMethodsTemplate = await loadStep(TEMPLATE_PATH);
    // Serve the template contents without reading from disk.
    file = spyOn(Bun, "file").mockReturnValue({
      text: async () => TEMPLATE,
    } as ReturnType<typeof Bun.file>);
  });

  afterEach(() => {
    file.mockRestore();
  });

  test("reads the template from the configured path", async () => {
    // Arrange
    const input = { rpcMethods: [method("getFoo", "FooArgs")] };

    // Act
    await appendRpcMethodsTemplate(input);

    // Assert
    expect(file).toHaveBeenCalledWith(TEMPLATE_PATH);
  });

  test("returns its input unchanged so later steps can chain", async () => {
    // Arrange
    const input = { rpcMethods: [method("getFoo", "FooArgs")] };

    // Act
    const result = await appendRpcMethodsTemplate(input);

    // Assert
    expect(result).toBe(input);
  });
});

describe("appendRpcMethodsTemplate without a template flag", () => {
  let appendRpcMethodsTemplate: Awaited<ReturnType<typeof loadStep>>;

  beforeEach(async () => {
    // The mocked cli reports no configured template to exercise the guard.
    appendRpcMethodsTemplate = await loadStep(undefined);
  });

  test("throws explaining the required --serve-rpc-tmpl flag", async () => {
    // Arrange
    const input = { rpcMethods: [] };

    // Act / Assert
    await expect(appendRpcMethodsTemplate(input)).rejects.toThrow(
      /serve-rpc-tmpl/,
    );
  });
});
