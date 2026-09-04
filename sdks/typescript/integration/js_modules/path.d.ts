declare module "path" {
  interface ParsedPath {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  }

  interface FormatInputPathObject {
    root?: string;
    dir?: string;
    base?: string;
    ext?: string;
    name?: string;
  }

  export function basename(path: string, suffix?: string): string;
  export function dirname(path: string): string;
  export function extname(path: string): string;
  export function format(pathObject: FormatInputPathObject): string;
  export function parse(path: string): ParsedPath;
  export function join(...paths: string[]): string;
  export function resolve(...paths: string[]): string;
  export function relative(from: string, to: string): string;
  export function normalize(path: string): string;
  export function isAbsolute(path: string): boolean;
  export const delimiter: string;
  export const sep: string;

  const defaultExport: {
    basename: typeof basename;
    dirname: typeof dirname;
    extname: typeof extname;
    format: typeof format;
    parse: typeof parse;
    join: typeof join;
    resolve: typeof resolve;
    relative: typeof relative;
    normalize: typeof normalize;
    isAbsolute: typeof isAbsolute;
    delimiter: typeof delimiter;
    sep: typeof sep;
  };
  export default defaultExport;
}

declare module "ovrc:path" {
  export * from "path";
  export { default } from "path";
}
