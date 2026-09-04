declare namespace QuickJS {
  type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | BigInt64Array
    | BigUint64Array;

  type ArrayBufferView = TypedArray | DataView;
}

declare module "util" {
  export interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
  }

  export interface TextDecodeOptions {
    stream?: boolean;
  }

  export class TextDecoder {
    constructor(encoding?: string, options?: TextDecoderOptions);
    readonly encoding: string;
    readonly fatal: boolean;
    readonly ignoreBOM: boolean;
    decode(
      input?: QuickJS.ArrayBufferView | ArrayBuffer | null,
      options?: TextDecodeOptions,
    ): string;
  }

  export interface EncodeIntoResult {
    read: number;
    written: number;
  }

  export class TextEncoder {
    constructor();
    readonly encoding: "utf-8";
    encode(input?: string): Uint8Array;
    encodeInto(src: string, dest: Uint8Array): EncodeIntoResult;
  }

  export function format(format?: unknown, ...param: unknown[]): string;
  export function inherits(
    constructor: Function,
    superConstructor: Function,
  ): void;

  const defaultExport: {
    TextDecoder: typeof TextDecoder;
    TextEncoder: typeof TextEncoder;
    format: typeof format;
    inherits: typeof inherits;
  };
  export default defaultExport;

  import {
    TextDecoder as _TextDecoder,
    TextEncoder as _TextEncoder,
  } from "util";

  global {
    var TextDecoder: typeof _TextDecoder;
    var TextEncoder: typeof _TextEncoder;
  }
}

declare module "ovrc:util" {
  export * from "util";
  export { default } from "util";
}
