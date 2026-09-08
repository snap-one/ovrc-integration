export {};

declare global {
  interface BlobOptions {
    endings?: "transparent" | "native";
    type?: string;
  }

  class Blob {
    constructor(
      parts?: Array<ArrayBuffer | ArrayBufferView | string | Blob | File>,
      options?: BlobOptions,
    );
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    bytes(): Promise<Uint8Array>;
    slice(start?: number, end?: number, type?: string): Blob;
    stream(): ReadableStream<Uint8Array>;
    text(): Promise<string>;
  }

  interface FileOptions extends BlobOptions {
    lastModified?: number;
  }

  class File {
    constructor(
      parts: Array<ArrayBuffer | ArrayBufferView | string | Blob | File>,
      fileName: string,
      options?: FileOptions,
    );
    readonly lastModified: number;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    bytes(): Promise<Uint8Array>;
    slice(start?: number, end?: number, type?: string): Blob;
    text(): Promise<string>;
  }

  type BufferEncoding =
    | "hex"
    | "base64"
    | "utf-8"
    | "utf8"
    | "unicode-1-1-utf8"
    | "ucs2"
    | "ucs-2"
    | "utf-16le"
    | "utf16le"
    | "utf-16"
    | "utf16"
    | "utf-16be"
    | "utf16be"
    | "windows-1252"
    | "ansi_x3.4-1968"
    | "ascii"
    | "cp1252"
    | "cp819"
    | "csisolatin1"
    | "ibm819"
    | "iso-8859-1"
    | "iso-ir-100"
    | "iso8859-1"
    | "iso88591"
    | "iso_8859-1"
    | "iso_8859-1:1987"
    | "l1"
    | "latin1"
    | "us-ascii"
    | "x-cp1252";

  interface Buffer extends Uint8Array {
    write(string: string, encoding?: BufferEncoding): number;
    write(string: string, offset: number, encoding?: BufferEncoding): number;
    write(
      string: string,
      offset: number,
      length: number,
      encoding?: BufferEncoding,
    ): number;
    toString(encoding?: BufferEncoding, start?: number, end?: number): string;
    copy(
      target: Uint8Array,
      targetStart?: number,
      sourceStart?: number,
      sourceEnd?: number,
    ): number;
    subarray(start?: number, end?: number): Buffer;
    writeBigInt64BE(value: bigint, offset?: number): number;
    writeBigUint64BE(value: bigint, offset?: number): number;
    writeBigInt64LE(value: bigint, offset?: number): number;
    writeBigUint64LE(value: bigint, offset?: number): number;
    readBigUInt64BE(offset?: number): bigint;
    readBigUint64BE(offset?: number): bigint;
    readBigUInt64LE(offset?: number): bigint;
    readBigUint64LE(offset?: number): bigint;
    readBigInt64BE(offset?: number): bigint;
    readBigInt64LE(offset?: number): bigint;
    readUInt8(offset?: number): number;
    readUint8(offset?: number): number;
    readUInt16LE(offset?: number): number;
    readUint16LE(offset?: number): number;
    readUInt16BE(offset?: number): number;
    readUint16BE(offset?: number): number;
    readUInt32LE(offset?: number): number;
    readUint32LE(offset?: number): number;
    readInt8(offset?: number): number;
    readInt16LE(offset?: number): number;
    readInt16BE(offset?: number): number;
    readInt32LE(offset?: number): number;
    readInt32BE(offset?: number): number;
    readFloatLE(offset?: number): number;
    readFloatBE(offset?: number): number;
    readDoubleLE(offset?: number): number;
    readDoubleBE(offset?: number): number;
    writeUInt8(value: number, offset?: number): number;
    writeUint8(value: number, offset?: number): number;
    writeUInt16LE(value: number, offset?: number): number;
    writeUint16LE(value: number, offset?: number): number;
    writeUInt16BE(value: number, offset?: number): number;
    writeUint16BE(value: number, offset?: number): number;
    writeUInt32LE(value: number, offset?: number): number;
    writeUint32LE(value: number, offset?: number): number;
    writeUInt32BE(value: number, offset?: number): number;
    writeUint32BE(value: number, offset?: number): number;
    writeInt8(value: number, offset?: number): number;
    writeInt16LE(value: number, offset?: number): number;
    writeInt16BE(value: number, offset?: number): number;
    writeInt32LE(value: number, offset?: number): number;
    writeInt32BE(value: number, offset?: number): number;
    writeFloatLE(value: number, offset?: number): number;
    writeFloatBE(value: number, offset?: number): number;
    writeDoubleLE(value: number, offset?: number): number;
    writeDoubleBE(value: number, offset?: number): number;
  }

  var Buffer: {
    prototype: Buffer;
    byteLength(
      string:
        | string
        | Buffer
        | ArrayBufferView
        | ArrayBuffer
        | SharedArrayBuffer,
      encoding?: BufferEncoding,
    ): number;
    concat(list: readonly Uint8Array[], totalLength?: number): Buffer;
    from(
      arrayBuffer:
        | ArrayBuffer
        | SharedArrayBuffer
        | { valueOf(): ArrayBuffer | SharedArrayBuffer },
      byteOffset?: number,
      length?: number,
    ): Buffer;
    from(data: Uint8Array | readonly number[]): Buffer;
    from(
      data:
        | Uint8Array
        | readonly number[]
        | string
        | { valueOf(): Uint8Array | readonly number[] | string },
    ): Buffer;
    from(
      str:
        | string
        | { valueOf(): string }
        | { [Symbol.toPrimitive](hint: "string"): string },
      encoding?: BufferEncoding,
    ): Buffer;
    isBuffer(obj: unknown): obj is Buffer;
    isEncoding(encoding: string): encoding is BufferEncoding;
    alloc(
      size: number,
      fill?: string | Uint8Array | number,
      encoding?: BufferEncoding,
    ): Buffer;
    allocUnsafe(size: number): Buffer;
    allocUnsafeSlow(size: number): Buffer;
  };

  function atob(data: string): string;
  function btoa(data: string): string;
}
