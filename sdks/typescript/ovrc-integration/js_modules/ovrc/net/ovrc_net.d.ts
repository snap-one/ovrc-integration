/**
 * @module ovrc:net
 */
declare module "ovrc:net" {
  import type { Buffer } from "buffer";
  import type { Agent } from "https";

  export interface SocketConstructorOptions {
    allowHalfOpen?: boolean;
  }

  export interface DeviceSocketConnectOptions {
    port: number;
  }

  export interface DeviceConnectionOptions extends DeviceSocketConnectOptions {
    allowHalfOpen?: boolean;
  }

  export type SocketReadyState =
    | "opening"
    | "open"
    | "readOnly"
    | "writeOnly"
    | "closed";

  export class Socket {
    constructor(options?: SocketConstructorOptions);

    readonly connecting: boolean;
    readonly pending: boolean;
    readonly readyState: SocketReadyState;
    readonly localAddress?: string;
    readonly localFamily?: string;
    readonly localPort?: number;
    readonly remoteAddress?: string;
    readonly remoteFamily?: string;
    readonly remotePort?: number;

    connect(port: number, connectionListener?: () => void): this;
    connect(
      options: DeviceSocketConnectOptions,
      connectionListener?: () => void,
    ): this;

    write(
      value: string | ArrayBuffer | ArrayBufferView,
      callback?: (error?: Error) => void,
    ): void;
    end(callback?: () => void): void;
    destroy(error?: Error): this;
    read(size?: number): Buffer | null;

    addListener(event: "close", listener: (hadError: boolean) => void): this;
    addListener(event: "connect", listener: () => void): this;
    addListener(event: "data", listener: (data: Buffer) => void): this;
    addListener(event: "drain", listener: () => void): this;
    addListener(event: "end", listener: () => void): this;
    addListener(event: "error", listener: (error: Error) => void): this;
    addListener<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;
    on(event: "close", listener: (hadError: boolean) => void): this;
    on(event: "connect", listener: () => void): this;
    on(event: "data", listener: (data: Buffer) => void): this;
    on(event: "drain", listener: () => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "error", listener: (error: Error) => void): this;
    on<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;
    once(event: "close", listener: (hadError: boolean) => void): this;
    once(event: "connect", listener: () => void): this;
    once(event: "data", listener: (data: Buffer) => void): this;
    once(event: "drain", listener: () => void): this;
    once(event: "end", listener: () => void): this;
    once(event: "error", listener: (error: Error) => void): this;
    once<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;

    emit(event: "close", hadError: boolean): boolean;
    emit(event: "connect"): boolean;
    emit(event: "data", data: Buffer): boolean;
    emit(event: "drain"): boolean;
    emit(event: "end"): boolean;
    emit(event: "error", error: Error): boolean;
    emit<Args extends unknown[]>(
      event: string | symbol,
      ...args: Args
    ): boolean;

    prependListener(
      event: "close",
      listener: (hadError: boolean) => void,
    ): this;
    prependListener(event: "connect", listener: () => void): this;
    prependListener(event: "data", listener: (data: Buffer) => void): this;
    prependListener(event: "drain", listener: () => void): this;
    prependListener(event: "end", listener: () => void): this;
    prependListener(event: "error", listener: (error: Error) => void): this;
    prependListener<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;

    prependOnceListener(
      event: "close",
      listener: (hadError: boolean) => void,
    ): this;
    prependOnceListener(event: "connect", listener: () => void): this;
    prependOnceListener(
      event: "data",
      listener: (data: Buffer) => void,
    ): this;
    prependOnceListener(event: "drain", listener: () => void): this;
    prependOnceListener(event: "end", listener: () => void): this;
    prependOnceListener(
      event: "error",
      listener: (error: Error) => void,
    ): this;
    prependOnceListener<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;

    off(event: "close", listener: (hadError: boolean) => void): this;
    off(event: "connect", listener: () => void): this;
    off(event: "data", listener: (data: Buffer) => void): this;
    off(event: "drain", listener: () => void): this;
    off(event: "end", listener: () => void): this;
    off(event: "error", listener: (error: Error) => void): this;
    off<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;

    removeListener(event: "close", listener: (hadError: boolean) => void): this;
    removeListener(event: "connect", listener: () => void): this;
    removeListener(event: "data", listener: (data: Buffer) => void): this;
    removeListener(event: "drain", listener: () => void): this;
    removeListener(event: "end", listener: () => void): this;
    removeListener(event: "error", listener: (error: Error) => void): this;
    removeListener<Args extends unknown[]>(
      event: string | symbol,
      listener: (...args: Args) => void,
    ): this;

    removeAllListeners(event?: string | symbol): this;
    eventNames(): (string | symbol)[];
    listenerCount(event: string | symbol): number;
  }

  export function deviceConnect(
    port: number,
    connectionListener?: () => void,
  ): Socket;
  export function deviceConnect(
    options: DeviceConnectionOptions,
    connectionListener?: () => void,
  ): Socket;

  export const deviceCreateConnection: typeof deviceConnect;

  export type DeviceFetchInput = string | URL | Request;

  export interface DeviceFetchInit extends RequestInit {
    agent?: Agent;
  }

  export function deviceFetch(
    input: DeviceFetchInput,
    init?: DeviceFetchInit,
  ): Promise<Response>;
}
