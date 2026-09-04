interface SymbolConstructor {
  readonly asyncDispose: unique symbol;
}

declare module "stream" {
  import { EventEmitter } from "events";

  type StreamCallback = (error?: Error | null) => void;
  type StreamEventMap = { [event: string]: any[]; [event: symbol]: any[] };
  type ReadableEventMap = StreamEventMap & {
    close: [];
    data: [chunk: any];
    end: [];
    error: [error: Error];
    pause: [];
    readable: [];
    resume: [];
  };
  type WritableEventMap = StreamEventMap & {
    close: [];
    drain: [];
    error: [error: Error];
    finish: [];
    pipe: [source: Readable];
    unpipe: [source: Readable];
  };

  export interface StreamOptions {
    autoDestroy?: boolean;
    emitClose?: boolean;
    highWaterMark?: number;
    objectMode?: boolean;
    signal?: AbortSignal;
  }

  export interface ReadableOptions extends StreamOptions {
    defaultEncoding?: BufferEncoding;
    destroy?: (
      this: Readable,
      error: Error | null,
      callback: StreamCallback,
    ) => void;
    encoding?: BufferEncoding;
    read?: (this: Readable, size: number) => void;
  }

  export interface WritableOptions extends StreamOptions {
    decodeStrings?: boolean;
    defaultEncoding?: BufferEncoding;
    final?: (this: Writable, callback: StreamCallback) => void;
    write?: (
      this: Writable,
      chunk: any,
      encoding: BufferEncoding,
      callback: StreamCallback,
    ) => void;
    writev?: (
      this: Writable,
      chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
      callback: StreamCallback,
    ) => void;
  }

  export interface DuplexOptions extends ReadableOptions, WritableOptions {
    allowHalfOpen?: boolean;
    readable?: boolean;
    readableHighWaterMark?: number;
    readableObjectMode?: boolean;
    writable?: boolean;
    writableHighWaterMark?: number;
    writableObjectMode?: boolean;
  }

  export type TransformCallback = (
    error?: Error | null,
    data?: any,
  ) => void;

  export interface TransformOptions extends DuplexOptions {
    flush?: (this: Transform, callback: TransformCallback) => void;
    transform?: (
      this: Transform,
      chunk: any,
      encoding: BufferEncoding,
      callback: TransformCallback,
    ) => void;
  }

  export interface PipeOptions {
    end?: boolean;
  }

  export interface FinishedOptions {
    cleanup?: boolean;
    close?: boolean;
    error?: boolean;
    readable?: boolean;
    signal?: AbortSignal;
    writable?: boolean;
  }

  export interface PipelineOptions {
    end?: boolean;
    signal?: AbortSignal;
  }

  export type StreamLike =
    | Readable
    | Writable
    | Duplex
    | Transform
    | PassThrough
    | ReadableStream
    | WritableStream;

  export type PipelinePart =
    | StreamLike
    | Iterable<unknown>
    | AsyncIterable<unknown>
    | ((...args: any[]) => any);

  class ReadableState {
    readonly objectMode: boolean;
    readonly highWaterMark: number;
    readonly length: number;
    readonly ended: boolean;
    readonly endEmitted: boolean;
    readonly reading: boolean;
    readonly needReadable: boolean;
    readonly emittedReadable: boolean;
    readonly readableListening: boolean;
    readonly resumeScheduled: boolean;
    readonly destroyed: boolean;
    readonly defaultEncoding: BufferEncoding;
    readonly encoding: BufferEncoding | null;
    readonly decoder: unknown;
    readonly flowing: boolean | null;
    readonly pipes: unknown[];
    readonly pipesCount: number;
    readonly sync: boolean;
    readonly readingMore: boolean;
    readonly closed: boolean;
    readonly errorEmitted: boolean;
    readonly emitClose: boolean;
    readonly autoDestroy: boolean;
    readonly dataEmitted: boolean;
    readonly paused: boolean;
    readonly multiAwaitDrain: boolean;
    readonly constructed: boolean;
    readonly buffer: unknown;
  }

  class WritableState {
    readonly objectMode: boolean;
    readonly highWaterMark: number;
    readonly length: number;
    readonly ended: boolean;
    readonly ending: boolean;
    readonly finished: boolean;
    readonly destroyed: boolean;
    readonly decodeStrings: boolean;
    readonly defaultEncoding: BufferEncoding;
    readonly writing: boolean;
    readonly corked: number;
    readonly needDrain: boolean;
    readonly bufferedRequestCount: number;
    readonly closed: boolean;
    readonly errored: Error | null;
    getBuffer(): unknown[];
  }

  export class Stream extends EventEmitter<StreamEventMap> {
    static Readable: typeof Readable;
    static Writable: typeof Writable;
    static Duplex: typeof Duplex;
    static Transform: typeof Transform;
    static PassThrough: typeof PassThrough;
    static finished: typeof finished;
    static pipeline: typeof pipeline;
    static Stream: typeof Stream;
    static super_: typeof EventEmitter;

    constructor();
    pipe<T>(destination: T, options?: PipeOptions): T;
  }

  export class Readable extends EventEmitter<ReadableEventMap> {
    static ReadableState: {
      new (...args: any[]): ReadableState;
      prototype: ReadableState;
    };
    static _fromList: (length: number, state: ReadableState) => any;
    static from<T>(
      iterable: Iterable<T> | AsyncIterable<T> | string | Buffer,
      options?: ReadableOptions,
    ): Readable;
    static fromWeb(
      readable: ReadableStream<unknown>,
      options?: ReadableOptions,
    ): Readable;
    static toWeb(readable: Readable): ReadableStream<unknown>;
    static wrap(stream: unknown, options?: ReadableOptions): Readable;

    constructor(options?: ReadableOptions);

    readonly _readableState: ReadableState;
    readable: boolean;
    readonly readableAborted: boolean;
    readonly readableDidRead: boolean;
    readonly readableEncoding: BufferEncoding | null;
    readonly readableEnded: boolean;
    readableFlowing: boolean | null;
    readonly readableHighWaterMark: number;
    readonly readableLength: number;
    readonly readableObjectMode: boolean;
    readonly readableBuffer: unknown;
    readonly closed: boolean;
    destroyed: boolean;
    readonly errored: Error | null;

    _destroy(error: Error | null, callback: StreamCallback): void;
    _read(size: number): void;
    _undestroy(): void;
    read(size?: number): any;
    setEncoding(encoding: BufferEncoding): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    unpipe(destination?: Writable): this;
    unshift(chunk: any, encoding?: BufferEncoding): void;
    push(chunk: any, encoding?: BufferEncoding): boolean;
    wrap(stream: unknown): this;
    pipe<T>(destination: T, options?: PipeOptions): T;
    compose(
      stream: unknown,
      options?: { signal?: AbortSignal },
    ): Duplex;
    iterator(options?: { destroyOnReturn?: boolean }): AsyncIterableIterator<any>;
    [Symbol.asyncIterator](): AsyncIterableIterator<any>;
    [Symbol.asyncDispose](): Promise<void>;
    map(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => any,
      options?: { concurrency?: number; highWaterMark?: number; signal?: AbortSignal },
    ): Readable;
    filter(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => boolean | Promise<boolean>,
      options?: { concurrency?: number; highWaterMark?: number; signal?: AbortSignal },
    ): Readable;
    flatMap(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => any,
      options?: { concurrency?: number; highWaterMark?: number; signal?: AbortSignal },
    ): Readable;
    forEach(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => void | Promise<void>,
      options?: { concurrency?: number; signal?: AbortSignal },
    ): Promise<void>;
    some(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => boolean | Promise<boolean>,
      options?: { concurrency?: number; signal?: AbortSignal },
    ): Promise<boolean>;
    find(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => boolean | Promise<boolean>,
      options?: { concurrency?: number; signal?: AbortSignal },
    ): Promise<any>;
    every(
      fn: (chunk: any, options?: { signal?: AbortSignal }) => boolean | Promise<boolean>,
      options?: { concurrency?: number; signal?: AbortSignal },
    ): Promise<boolean>;
    reduce<T>(
      fn: (previous: any, chunk: any, options?: { signal?: AbortSignal }) => T,
      initial?: T,
      options?: { signal?: AbortSignal },
    ): Promise<T>;
    drop(
      limit: number,
      options?: { signal?: AbortSignal },
    ): Readable;
    take(
      limit: number,
      options?: { signal?: AbortSignal },
    ): Readable;
    asIndexedPairs(options?: { signal?: AbortSignal }): Readable;
    toArray(options?: { signal?: AbortSignal }): Promise<any[]>;
    destroy(error?: Error): this;
  }

  export class Writable extends EventEmitter<WritableEventMap> {
    static WritableState: {
      new (...args: any[]): WritableState;
      prototype: WritableState;
    };
    static fromWeb(
      writable: WritableStream<unknown>,
      options?: WritableOptions,
    ): Writable;
    static toWeb(writable: Writable): WritableStream<unknown>;

    constructor(options?: WritableOptions);

    readonly _writableState: WritableState;
    readonly writable: boolean;
    readonly writableAborted: boolean;
    readonly writableCorked: number;
    readonly writableEnded: boolean;
    readonly writableFinished: boolean;
    readonly writableHighWaterMark: number;
    readonly writableLength: number;
    readonly writableNeedDrain: boolean;
    readonly writableObjectMode: boolean;
    readonly closed: boolean;
    destroyed: boolean;
    readonly errored: Error | null;

    _destroy(error: Error | null, callback: StreamCallback): void;
    _final(callback: StreamCallback): void;
    _undestroy(): void;
    _write(chunk: any, encoding: BufferEncoding, callback: StreamCallback): void;
    _writev(
      chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
      callback: StreamCallback,
    ): void;
    write(chunk: any, callback?: StreamCallback): boolean;
    write(
      chunk: any,
      encoding: BufferEncoding,
      callback?: StreamCallback,
    ): boolean;
    setDefaultEncoding(encoding: BufferEncoding): this;
    end(callback?: StreamCallback): this;
    end(chunk: any, callback?: StreamCallback): this;
    end(chunk: any, encoding: BufferEncoding, callback?: StreamCallback): this;
    cork(): void;
    uncork(): void;
    pipe(destination: unknown): never;
    destroy(error?: Error): this;
  }

  export interface Duplex extends Readable {}

  export class Duplex {
    static from(source: unknown): Duplex;
    static fromWeb(
      pair: ReadableWritablePair,
      options?: DuplexOptions,
    ): Duplex;
    static toWeb(duplex: Duplex): ReadableWritablePair;

    constructor(options?: DuplexOptions);

    allowHalfOpen: boolean;
    writable: boolean;
    destroyed: boolean;
    readonly writableAborted: boolean;
    readonly writableCorked: number;
    readonly writableEnded: boolean;
    readonly writableFinished: boolean;
    readonly writableHighWaterMark: number;
    readonly writableLength: number;
    readonly writableNeedDrain: boolean;
    readonly writableObjectMode: boolean;
    readonly _writableState: WritableState;

    _destroy(error: Error | null, callback: StreamCallback): void;
    _final(callback: StreamCallback): void;
    _undestroy(): void;
    _write(chunk: any, encoding: BufferEncoding, callback: StreamCallback): void;
    _writev(
      chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
      callback: StreamCallback,
    ): void;
    write(chunk: any, callback?: StreamCallback): boolean;
    write(
      chunk: any,
      encoding: BufferEncoding,
      callback?: StreamCallback,
    ): boolean;
    setDefaultEncoding(encoding: BufferEncoding): this;
    end(callback?: StreamCallback): this;
    end(chunk: any, callback?: StreamCallback): this;
    end(chunk: any, encoding: BufferEncoding, callback?: StreamCallback): this;
    cork(): void;
    uncork(): void;
    destroy(error?: Error): this;
  }

  export class Transform extends Duplex {
    constructor(options?: TransformOptions);
    _final(callback: TransformCallback): void;
    _read(size: number): void;
    _transform(
      chunk: any,
      encoding: BufferEncoding,
      callback: TransformCallback,
    ): void;
    _write(chunk: any, encoding: BufferEncoding, callback: StreamCallback): void;
  }

  export class PassThrough extends Transform {
    constructor(options?: TransformOptions);
    _transform(
      chunk: any,
      encoding: BufferEncoding,
      callback: TransformCallback,
    ): void;
  }

  export function finished(
    stream: StreamLike,
    options?: FinishedOptions,
  ): Promise<void>;

  export function pipeline<T extends PipelinePart>(
    source: PipelinePart,
    destination: T,
    callback: StreamCallback,
  ): T;
  export function pipeline<T extends PipelinePart>(
    source: PipelinePart,
    destination: T,
    options: PipelineOptions,
    callback: StreamCallback,
  ): T;
  export function pipeline(
    ...streams: [...PipelinePart[], StreamCallback]
  ): PipelinePart;
  export function pipeline(
    ...streams: [...PipelinePart[], PipelineOptions, StreamCallback]
  ): PipelinePart;

  const defaultExport: typeof Stream;
  export default defaultExport;
}

declare module "stream/promises" {
  import type {
    FinishedOptions,
    PipelineOptions,
    StreamLike,
    PipelinePart,
  } from "stream";

  export function finished(
    stream: StreamLike,
    options?: FinishedOptions,
  ): Promise<void>;
  export function pipeline(...streams: PipelinePart[]): Promise<void>;
  export function pipeline(
    ...streams: [...PipelinePart[], PipelineOptions]
  ): Promise<void>;
}

declare module "ovrc:stream" {
  export * from "stream";
  export { default } from "stream";
}

declare module "ovrc:stream/promises" {
  export * from "stream/promises";
}
