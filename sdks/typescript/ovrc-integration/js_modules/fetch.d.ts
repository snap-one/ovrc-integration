import type { Agent } from "https";

export {};

declare global {
  type HeadersInit = Headers | Record<string, string> | string[][];

  type BodyInit =
    | ReadableStream<Uint8Array>
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | FormData
    | URLSearchParams
    | string
    | null;

  class Headers implements Iterable<[string, string]> {
    constructor(init?: HeadersInit);
    append(name: string, value: string): void;
    delete(name: string): void;
    entries(): IterableIterator<[string, string]>;
    forEach(callbackfn: (value: string, key: string) => void): void;
    get(name: string): string | null;
    getSetCookie(): string[];
    has(name: string): boolean;
    keys(): IterableIterator<string>;
    set(name: string, value: string): void;
    values(): IterableIterator<string>;
    [Symbol.iterator](): Iterator<[string, string]>;
  }

  type FormDataEntryValue = string | File;

  class FormData implements Iterable<[string, FormDataEntryValue]> {
    constructor();
    append(name: string, value: string | Blob | File): void;
    delete(name: string): void;
    entries(): IterableIterator<[string, FormDataEntryValue]>;
    forEach(callbackfn: (value: FormDataEntryValue, key: string) => void): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    keys(): IterableIterator<string>;
    set(name: string, value: string | Blob | File): void;
    values(): IterableIterator<FormDataEntryValue>;
    [Symbol.iterator](): Iterator<[string, FormDataEntryValue]>;
  }

  type RequestCache =
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
  type RequestCredentials = "include" | "omit" | "same-origin";
  type RequestDestination =
    | ""
    | "audio"
    | "audioworklet"
    | "document"
    | "embed"
    | "font"
    | "frame"
    | "iframe"
    | "image"
    | "manifest"
    | "object"
    | "paintworklet"
    | "report"
    | "script"
    | "sharedworker"
    | "style"
    | "track"
    | "video"
    | "worker"
    | "xslt";
  type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
  type RequestRedirect = "error" | "follow" | "manual";
  type RequestPriority = "auto" | "high" | "low";
  type ReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

  interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
    signal?: AbortSignal | null;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    integrity?: string;
    keepalive?: boolean;
    priority?: RequestPriority;
    window?: null;
    duplex?: "half";
    agent?: Agent;
  }

  class Request {
    constructor(input: string | URL | Request, init?: RequestInit);
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    readonly cache: RequestCache;
    readonly credentials: RequestCredentials;
    readonly destination: RequestDestination;
    readonly duplex: "half";
    readonly headers: Headers;
    readonly integrity: string;
    readonly isHistoryNavigation: boolean;
    readonly isReloadNavigation: boolean;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: RequestMode;
    readonly redirect: RequestRedirect;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    /** `undefined` unless an `AbortSignal` was supplied via `RequestInit`. */
    readonly signal: AbortSignal | undefined;
    readonly url: string;
    /** `undefined` unless an `Agent` was supplied via `RequestInit`. */
    readonly agent: Agent | undefined;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    bytes(): Promise<Uint8Array>;
    clone(): Request;
    formData(): Promise<FormData>;
    json(): Promise<unknown>;
    text(): Promise<string>;
  }

  type ResponseType = "basic" | "default" | "error";

  interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
    url?: string;
    signal?: AbortSignal | null;
  }

  class Response {
    constructor(body?: BodyInit, init?: ResponseInit);
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    bytes(): Promise<Uint8Array>;
    clone(): Response;
    formData(): Promise<FormData>;
    json(): Promise<unknown>;
    text(): Promise<string>;
    static error(): Response;
    static json(data: unknown, init?: ResponseInit): Response;
    static redirect(url: string | URL, status?: number): Response;
  }
}
