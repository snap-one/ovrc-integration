export {};

declare global {
  type URLSearchParamsInit =
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams;

  class URLSearchParams implements Iterable<[string, string]> {
    constructor(init?: URLSearchParamsInit);
    readonly size: number;
    append(name: string, value: string): void;
    delete(name: string, value?: string): void;
    entries(): IterableIterator<[string, string]>;
    forEach(callbackfn: (value: string, key: string) => void): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string, value?: string): boolean;
    keys(): IterableIterator<string>;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
  }

  type URLConstructor = typeof URL;
  type URLSearchParamsConstructor = typeof URLSearchParams;

  class URL {
    constructor(url: string | URL, base?: string);
    static canParse(url: string, base?: string): boolean;
    static parse(url: string, base?: string): URL | null;
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
    toJSON(): string;
    toString(): string;
  }
}
