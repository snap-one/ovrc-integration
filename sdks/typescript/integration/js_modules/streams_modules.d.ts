declare module "stream/web" {
  export const ByteLengthQueuingStrategy: {
    prototype: ByteLengthQueuingStrategy;
    new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
  };
  export const CountQueuingStrategy: {
    prototype: CountQueuingStrategy;
    new (init: QueuingStrategyInit): CountQueuingStrategy;
  };
  export const ReadableByteStreamController: {
    prototype: ReadableByteStreamController;
  };
  export const ReadableStream: {
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
  export const ReadableStreamBYOBReader: {
    prototype: ReadableStreamBYOBReader;
    new (stream: ReadableStream<Uint8Array>): ReadableStreamBYOBReader;
  };
  export const ReadableStreamBYOBRequest: {
    prototype: ReadableStreamBYOBRequest;
  };
  export const ReadableStreamDefaultController: {
    prototype: ReadableStreamDefaultController;
  };
  export const ReadableStreamDefaultReader: {
    prototype: ReadableStreamDefaultReader;
    new <R = unknown>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
  };
  export const TransformStream: {
    prototype: TransformStream;
    new <I = unknown, O = unknown>(
      transformer?: Transformer<I, O>,
      writableStrategy?: QueuingStrategy<I>,
      readableStrategy?: QueuingStrategy<O>,
    ): TransformStream<I, O>;
  };
  export const TransformStreamDefaultController: {
    prototype: TransformStreamDefaultController;
  };
  export const WritableStream: {
    prototype: WritableStream;
    new <W = unknown>(
      underlyingSink?: UnderlyingSink<W>,
      strategy?: QueuingStrategy<W>,
    ): WritableStream<W>;
  };
  export const WritableStreamDefaultController: {
    prototype: WritableStreamDefaultController;
  };
  export const WritableStreamDefaultWriter: {
    prototype: WritableStreamDefaultWriter;
    new <W = unknown>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
  };

  const defaultExport: {
    ByteLengthQueuingStrategy: typeof ByteLengthQueuingStrategy;
    CountQueuingStrategy: typeof CountQueuingStrategy;
    ReadableByteStreamController: typeof ReadableByteStreamController;
    ReadableStream: typeof ReadableStream;
    ReadableStreamBYOBReader: typeof ReadableStreamBYOBReader;
    ReadableStreamBYOBRequest: typeof ReadableStreamBYOBRequest;
    ReadableStreamDefaultController: typeof ReadableStreamDefaultController;
    ReadableStreamDefaultReader: typeof ReadableStreamDefaultReader;
    TransformStream: typeof TransformStream;
    TransformStreamDefaultController: typeof TransformStreamDefaultController;
    WritableStream: typeof WritableStream;
    WritableStreamDefaultController: typeof WritableStreamDefaultController;
    WritableStreamDefaultWriter: typeof WritableStreamDefaultWriter;
  };
  export default defaultExport;
}

declare module "ovrc:stream/web" {
  export * from "stream/web";
  export { default } from "stream/web";
}
