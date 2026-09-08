import Handlebars from "handlebars";
import { rpcTemplate } from "../cli.ts";
import type { RpcMethod } from "./extract-rpc-methods.ts";

// upper case first (ucf)
Handlebars.registerHelper("ucf", function (str: string) {
  if (typeof str !== "string" || !str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// Render the extracted RPC methods through the Handlebars template named by
// `--serve-rpc-tmpl` and append the result to stdout, after the source the
// write step already streamed there. The template receives `{ rpcMethods }`;
// use triple-stache (`{{{ }}}`) for type text to avoid HTML escaping.
export async function appendRpcMethodsTemplate<
  T extends { rpcMethods: RpcMethod[] },
>(input: T): Promise<T> {
  if (!rpcTemplate)
    throw new Error(
      "Missing required --serve-rpc-tmpl <path-to-template.hbs> flag",
    );

  const templateSource = await Bun.file(rpcTemplate).text();
  const render = Handlebars.compile(templateSource);
  const output = render(
    { rpcMethods: input.rpcMethods },
    {
      allowProtoPropertiesByDefault: true,
    },
  );

  await Bun.write(Bun.stdout, output);
  return input;
}
