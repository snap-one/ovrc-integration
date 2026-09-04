export {};

declare global {
  class AbortController {
    constructor();
    readonly signal: AbortSignal;
    abort(reason?: unknown): void;
  }

  class AbortSignal {
    constructor();
    readonly aborted: boolean;
    reason: unknown;
    onabort: ((this: AbortSignal, event: Event) => unknown) | null;
    throwIfAborted(): void;
    addEventListener(
      type: "abort",
      listener: (this: AbortSignal, event: Event) => unknown,
      options?: AddEventListenerOptions,
    ): void;
    removeEventListener(
      type: "abort",
      listener: (this: AbortSignal, event: Event) => unknown,
    ): void;
    dispatchEvent(event: Event): boolean;
    static abort(reason?: unknown): AbortSignal;
    static any(signals: AbortSignal[]): AbortSignal;
    static timeout(milliseconds: number): AbortSignal;
  }
}
