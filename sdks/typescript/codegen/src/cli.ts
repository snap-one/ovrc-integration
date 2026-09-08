import { parseArgs } from "node:util";

// CLI flags, parsed once and shared across steps. The generated source is
// always written to stdout; redirect it to a file to capture it.
const { values } = parseArgs({
  options: {
    "serve-rpc-tmpl": {
      type: "string",
      short: "t",
    },
  },
  allowPositionals: true,
  strict: true,
});

// The Handlebars template rendered against the extracted RPC methods.
export const rpcTemplate =
  typeof values["serve-rpc-tmpl"] === "string"
    ? values["serve-rpc-tmpl"]
    : undefined;
