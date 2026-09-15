declare module "timers" {
  global {
    function setTimeout(callback: () => void, milliseconds?: number): number;
    function clearTimeout(timeout?: number): void;
    function setInterval(callback: () => void, milliseconds?: number): number;
    function clearInterval(interval?: number): void;
    function setImmediate(callback: () => void): number;
    function queueMicrotask(callback: () => void): void;
  }

  export import setTimeout = globalThis.setTimeout;
  export import clearTimeout = globalThis.clearTimeout;
  export import setInterval = globalThis.setInterval;
  export import clearInterval = globalThis.clearInterval;
  export import setImmediate = globalThis.setImmediate;
  export import queueMicrotask = globalThis.queueMicrotask;

  const defaultExport: {
    setTimeout: typeof setTimeout;
    clearTimeout: typeof clearTimeout;
    setInterval: typeof setInterval;
    clearInterval: typeof clearInterval;
    setImmediate: typeof setImmediate;
    queueMicrotask: typeof queueMicrotask;
  };
  export default defaultExport;
}

declare module "ovrc:timers" {
  export * from "timers";
  export { default } from "timers";
}
