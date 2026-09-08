import { Chain } from "./src/chain.ts";
import { buildSchemaModel } from "./src/steps/build-schema-model.ts";
import { generateTypesFromOpenApi } from "./src/steps/generate-from-open-api.ts";
import { inlineAliasDefinitions } from "./src/steps/inline-alias-definitions.ts";
import { parseRecastAst } from "./src/steps/parse-recast-ast.ts";
import { writeRecastAstAsSource } from "./src/steps/write.ts";
import { dropOmittedOpenApiExports } from "./src/steps/drop-omitted-open-api-exports.ts";
import { extractRpcMethods } from "./src/steps/extract-rpc-methods.ts";
import { appendRpcMethodsTemplate } from "./src/steps/append-rpc-methods-template.ts";

// Read the OpenAPI document from stdin. `Bun.stdin.text()` reads the piped
// input reliably across platforms; the Node-compat `process.stdin` stream
// returns empty for piped input on Linux under newer Bun versions.
const rawOpenApi = await Bun.stdin.text();

await Chain.new(generateTypesFromOpenApi)
  .pipe(parseRecastAst)
  .pipe(buildSchemaModel)
  .pipe(inlineAliasDefinitions)
  .pipe(dropOmittedOpenApiExports)
  .pipe(extractRpcMethods)
  .pipe(writeRecastAstAsSource)
  .pipe(appendRpcMethodsTemplate)
  .run(rawOpenApi);
