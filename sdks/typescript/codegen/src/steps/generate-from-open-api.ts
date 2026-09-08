import openapiTS, { astToString, type OpenAPI3 } from "openapi-typescript";

// Parse the OpenAPI document and emit TypeScript source.
export async function generateTypesFromOpenApi(rawOpenApi: string) {
  const openApi = JSON.parse(rawOpenApi) as OpenAPI3;
  const results = await openapiTS(openApi, {
    alphabetize: true,
    emptyObjectsUnknown: true,
    exportType: true,
    rootTypes: true,
    rootTypesNoSchemaPrefix: true,
    rootTypesKeepCasing: true,
  });
  const source = astToString(results);
  return { source, spec: openApi };
}
