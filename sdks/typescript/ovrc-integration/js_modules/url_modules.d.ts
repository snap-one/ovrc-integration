declare module "url" {
  export interface URLFormatOptions {
    auth?: boolean;
    fragment?: boolean;
    search?: boolean;
    unicode?: boolean;
  }

  export interface URLToHttpOptions {
    protocol: string;
    hostname: string;
    pathname: string;
    path: string;
    href: string;
    auth?: string;
    hash?: string;
    port?: string;
    search?: string;
  }

  export const URL: URLConstructor;
  export const URLSearchParams: URLSearchParamsConstructor;
  export function urlToHttpOptions(url: URL): URLToHttpOptions;
  export function domainToUnicode(domain: string): string;
  export function domainToASCII(domain: string): string;
  export function fileURLToPath(url: string | URL): string;
  export function pathToFileURL(path: string, options?: unknown): URL;
  export function format(url: URL, options?: URLFormatOptions): string;

  const defaultExport: {
    URL: typeof URL;
    URLSearchParams: typeof URLSearchParams;
    urlToHttpOptions: typeof urlToHttpOptions;
    domainToUnicode: typeof domainToUnicode;
    domainToASCII: typeof domainToASCII;
    fileURLToPath: typeof fileURLToPath;
    pathToFileURL: typeof pathToFileURL;
    format: typeof format;
  };
  export default defaultExport;
}

declare module "ovrc:url" {
  export * from "url";
  export { default } from "url";
}
