export {};

declare global {
  // ===== Queuing strategies =====

  interface QueuingStrategy<T = unknown> {
    highWaterMark?: number;
    size?: (chunk: T) => number;
  }

  interface QueuingStrategyInit {
    highWaterMark: number;
  }

  class ByteLengthQueuingStrategy implements QueuingStrategy<ArrayBufferView> {
    constructor(init: QueuingStrategyInit);
    readonly highWaterMark: number;
    readonly size: (chunk: ArrayBufferView) => number;
  }

  class CountQueuingStrategy implements QueuingStrategy {
    constructor(init: QueuingStrategyInit);
    readonly highWaterMark: number;
    readonly size: (chunk: unknown) => number;
  }

  // ===== Readable side =====

  type ReadableStreamReadResult<T> =
    | { done: false; value: T }
    | { done: true; value?: undefined };

  interface UnderlyingSource<R = unknown> {
    start?: (
      controller: ReadableStreamDefaultController<R>,
    ) => void | PromiseLike<void>;
    pull?: (
      controller: ReadableStreamDefaultController<R>,
    ) => void | PromiseLike<void>;
    cancel?: (reason?: unknown) => void | PromiseLike<void>;
    type?: undefined;
  }

  interface UnderlyingByteSource {
    start?: (
      controller: ReadableByteStreamController,
    ) => void | PromiseLike<void>;
    pull?: (
      controller: ReadableByteStreamController,
    ) => void | PromiseLike<void>;
    cancel?: (reason?: unknown) => void | PromiseLike<void>;
    type: "bytes";
    autoAllocateChunkSize?: number;
  }

  class ReadableStreamDefaultController<R = unknown> {
    private constructor();
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk?: R): void;
    error(e?: unknown): void;
  }

  class ReadableByteStreamController {
    private constructor();
    readonly byobRequest: ReadableStreamBYOBRequest | null;
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk: ArrayBufferView): void;
    error(e?: unknown): void;
  }

  class ReadableStreamBYOBRequest {
    private constructor();
    readonly view: ArrayBufferView | null;
    respond(bytesWritten: number): void;
    respondWithNewView(view: ArrayBufferView): void;
  }

  class ReadableStreamDefaultReader<R = unknown> {
    constructor(stream: ReadableStream<R>);
    readonly closed: Promise<void>;
    cancel(reason?: unknown): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
  }

  class ReadableStreamBYOBReader {
    constructor(stream: ReadableStream<Uint8Array>);
    readonly closed: Promise<void>;
    cancel(reason?: unknown): Promise<void>;
    read<T extends ArrayBufferView>(
      view: T,
      options?: { min?: number },
    ): Promise<ReadableStreamReadResult<T>>;
    releaseLock(): void;
  }

  type ReadableStreamReader<R = unknown> =
    | ReadableStreamDefaultReader<R>
    | ReadableStreamBYOBReader;

  interface ReadableStreamGetReaderOptions {
    mode?: "byob";
  }

  interface ReadableWritablePair<R = unknown, W = unknown> {
    readable: ReadableStream<R>;
    writable: WritableStream<W>;
  }

  interface StreamPipeOptions {
    preventClose?: boolean;
    preventAbort?: boolean;
    preventCancel?: boolean;
    signal?: AbortSignal;
  }

  interface ReadableStream<R = unknown> {
    readonly locked: boolean;
    cancel(reason?: unknown): Promise<void>;
    getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
    getReader(): ReadableStreamDefaultReader<R>;
    pipeThrough<T>(
      transform: ReadableWritablePair<T, R>,
      options?: StreamPipeOptions,
    ): ReadableStream<T>;
    pipeTo(
      destination: WritableStream<R>,
      options?: StreamPipeOptions,
    ): Promise<void>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
    values(options?: { preventCancel?: boolean }): AsyncIterableIterator<R>;
    [Symbol.asyncIterator](): AsyncIterableIterator<R>;
  }

  var ReadableStream: {
    prototype: ReadableStream;
    new (
      underlyingSource: UnderlyingByteSource,
      strategy?: QueuingStrategy<Uint8Array>,
    ): ReadableStream<Uint8Array>;
    new <R = unknown>(
      underlyingSource?: UnderlyingSource<R>,
      strategy?: QueuingStrategy<R>,
    ): ReadableStream<R>;
    from<T>(
      iterable: AsyncIterable<T> | Iterable<T | PromiseLike<T>>,
    ): ReadableStream<T>;
  };

  // ===== Writable side =====

  interface UnderlyingSink<W = unknown> {
    start?: (
      controller: WritableStreamDefaultController,
    ) => void | PromiseLike<void>;
    write?: (
      chunk: W,
      controller: WritableStreamDefaultController,
    ) => void | PromiseLike<void>;
    close?: () => void | PromiseLike<void>;
    abort?: (reason?: unknown) => void | PromiseLike<void>;
    type?: undefined;
  }

  class WritableStreamDefaultController {
    private constructor();
    readonly signal: AbortSignal;
    error(e?: unknown): void;
  }

  class WritableStreamDefaultWriter<W = unknown> {
    constructor(stream: WritableStream<W>);
    readonly closed: Promise<void>;
    readonly desiredSize: number | null;
    readonly ready: Promise<void>;
    abort(reason?: unknown): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk?: W): Promise<void>;
  }

  class WritableStream<W = unknown> {
    constructor(
      underlyingSink?: UnderlyingSink<W>,
      strategy?: QueuingStrategy<W>,
    );
    readonly locked: boolean;
    abort(reason?: unknown): Promise<void>;
    close(): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
  }

  // ===== Transform =====

  interface Transformer<I = unknown, O = unknown> {
    start?: (
      controller: TransformStreamDefaultController<O>,
    ) => void | PromiseLike<void>;
    transform?: (
      chunk: I,
      controller: TransformStreamDefaultController<O>,
    ) => void | PromiseLike<void>;
    flush?: (
      controller: TransformStreamDefaultController<O>,
    ) => void | PromiseLike<void>;
    readableType?: undefined;
    writableType?: undefined;
  }

  class TransformStreamDefaultController<O = unknown> {
    private constructor();
    readonly desiredSize: number | null;
    enqueue(chunk?: O): void;
    error(reason?: unknown): void;
    terminate(): void;
  }

  class TransformStream<I = unknown, O = unknown> {
    constructor(
      transformer?: Transformer<I, O>,
      writableStrategy?: QueuingStrategy<I>,
      readableStrategy?: QueuingStrategy<O>,
    );
    readonly readable: ReadableStream<O>;
    readonly writable: WritableStream<I>;
  }
}
