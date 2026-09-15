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

  export class TextEncoderStream {
    constructor();
    readonly encoding: "utf-8";
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<string>;
  }

  export class TextDecoderStream {
    constructor(encoding?: string, options?: TextDecoderOptions);
    readonly encoding: string;
    readonly fatal: boolean;
    readonly ignoreBOM: boolean;
    readonly readable: ReadableStream<string>;
    readonly writable: WritableStream<QuickJS.ArrayBufferView | ArrayBuffer>;
  }

  export type StyleTextFormat =
    | "reset"
    | "bold"
    | "dim"
    | "italic"
    | "underline"
    | "blink"
    | "inverse"
    | "hidden"
    | "strikethrough"
    | "doubleunderline"
    | "framed"
    | "overlined"
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray"
    | "redBright"
    | "greenBright"
    | "yellowBright"
    | "blueBright"
    | "magentaBright"
    | "cyanBright"
    | "whiteBright"
    | "bgBlack"
    | "bgRed"
    | "bgGreen"
    | "bgYellow"
    | "bgBlue"
    | "bgMagenta"
    | "bgCyan"
    | "bgWhite"
    | "bgGray"
    | "bgRedBright"
    | "bgGreenBright"
    | "bgYellowBright"
    | "bgBlueBright"
    | "bgMagentaBright"
    | "bgCyanBright"
    | "bgWhiteBright";

  export interface InspectOptions {
    colors?: boolean;
  }

  export function format(format?: unknown, ...param: unknown[]): string;
  export function inherits(
    constructor: Function,
    superConstructor: Function,
  ): void;

  export function styleText(
    format: StyleTextFormat | readonly StyleTextFormat[],
    text: string,
    options?: InspectOptions,
  ): string;

  interface Inspect {
    (value: unknown, options?: InspectOptions): string;
    readonly custom: unique symbol;
  }

  export const inspect: Inspect;

  const defaultExport: {
    TextDecoder: typeof TextDecoder;
    TextDecoderStream: typeof TextDecoderStream;
    TextEncoder: typeof TextEncoder;
    TextEncoderStream: typeof TextEncoderStream;
    format: typeof format;
    inherits: typeof inherits;
    inspect: typeof inspect;
    styleText: typeof styleText;
  };
  export default defaultExport;

  import {
    TextDecoder as _TextDecoder,
    TextDecoderStream as _TextDecoderStream,
    TextEncoder as _TextEncoder,
    TextEncoderStream as _TextEncoderStream,
  } from "util";

  global {
    var TextDecoder: typeof _TextDecoder;
    var TextDecoderStream: typeof _TextDecoderStream;
    var TextEncoder: typeof _TextEncoder;
    var TextEncoderStream: typeof _TextEncoderStream;
  }
}

declare module "ovrc:util" {
  export * from "util";
  export { default } from "util";
}
