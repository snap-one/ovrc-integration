declare module "string_decoder" {
  export class StringDecoder {
    constructor(encoding?: BufferEncoding);
    readonly encoding: BufferEncoding;
    write(buffer: ArrayBufferView): string;
    end(buffer?: ArrayBufferView): string;
  }

  const defaultExport: {
    readonly StringDecoder: typeof StringDecoder;
  };
  export default defaultExport;
}

declare module "ovrc:string_decoder" {
  export * from "string_decoder";
  export { default } from "string_decoder";
}
