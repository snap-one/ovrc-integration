declare module "events" {
  type EventMap<T> = Record<keyof T, unknown[]> | DefaultEventMap;
  type DefaultEventMap = [never];
  type Args<K, T> = T extends DefaultEventMap
    ? unknown[]
    : K extends keyof T
      ? T[K]
      : never;
  type Key<K, T> = T extends DefaultEventMap ? string | symbol : K | keyof T;
  type Listener<K, T> = T extends DefaultEventMap
    ? (...args: never[]) => void
    : K extends keyof T
      ? T[K] extends unknown[]
        ? (...args: T[K]) => void
        : never
      : never;

  export class EventEmitter<T extends EventMap<T> = DefaultEventMap> {
    static EventEmitter: typeof EventEmitter;

    constructor();
    addListener<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    on<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    once<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    removeListener<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    off<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    emit<K>(eventName: Key<K, T>, ...args: Args<K, T>): boolean;
    prependListener<K>(eventName: Key<K, T>, listener: Listener<K, T>): this;
    prependOnceListener<K>(
      eventName: Key<K, T>,
      listener: Listener<K, T>,
    ): this;
    eventNames(): (string | symbol)[];
    listenerCount<K>(eventName: Key<K, T>): number;
    removeAllListeners<K>(eventName?: Key<K, T>): this;
  }

  export default EventEmitter;

  global {
    interface EventInit {
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
    }

    interface CustomEventInit<T = unknown> {
      detail?: T;
    }

    interface AddEventListenerOptions {
      once?: boolean;
    }

    interface EventListener {
      (event: Event | CustomEvent<unknown>): void;
    }

    class Event {
      constructor(type: string, options?: EventInit);
      readonly type: string;
      readonly bubbles: boolean;
      readonly cancelable: boolean;
      readonly composed: boolean;
    }

    class CustomEvent<T = unknown> {
      constructor(type: string, options?: CustomEventInit<T>);
      readonly type: string;
      readonly detail: T | null;
    }

    class EventTarget {
      constructor();
      addEventListener(
        type: string,
        listener: EventListener,
        options?: AddEventListenerOptions,
      ): this;
      dispatchEvent(event: Event | CustomEvent<unknown>): boolean;
      removeEventListener(type: string, listener: EventListener): this;
    }
  }
}

declare module "ovrc:events" {
  export * from "events";
  export { default } from "events";
}
