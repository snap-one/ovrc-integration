/**
 * Console declaration helpers.
 */
declare namespace OvrConsole {
  /**
   * Methods shared by the global console object and `Console` instances.
   */
  interface OutputMethods {
    /**
     * Writes the remaining arguments to stderr when `condition` is false.
     *
     * When `condition` is true, this method does not write output.
     */
    assert(condition: boolean, ...args: unknown[]): void;

    /**
     * Writes a terminal clear sequence to stdout.
     */
    clear(): void;

    /**
     * Formats and writes debugging output to stdout.
     */
    debug(...args: unknown[]): void;

    /**
     * Formats and writes error output to stderr.
     */
    error(...args: unknown[]): void;

    /**
     * Formats and writes informational output to stdout.
     */
    info(...args: unknown[]): void;

    /**
     * Formats and writes ordinary output to stdout.
     */
    log(...args: unknown[]): void;

    /**
     * Formats and writes trace output to stdout.
     */
    trace(...args: unknown[]): void;

    /**
     * Formats and writes warning output to stderr.
     */
    warn(...args: unknown[]): void;
  }

  /**
   * Counter and timer methods available on the global console object.
   */
  interface StatefulMethods {
    /**
     * Increments the counter for `label` and writes the current count to stdout.
     *
     * When `label` is omitted, the counter label is `"default"`.
     */
    count(label?: unknown): void;

    /**
     * Clears the counter for `label`.
     *
     * When `label` is omitted, the counter label is `"default"`.
     */
    countReset(label?: unknown): void;

    /**
     * Starts a timer for `label` when one is not already active.
     *
     * When `label` is omitted, the timer label is `"default"`.
     */
    time(label?: unknown): void;

    /**
     * Writes the elapsed time for `label` to stdout, followed by any additional
     * formatted arguments.
     *
     * When `label` is omitted, the timer label is `"default"`.
     */
    timeLog(label?: unknown, ...args: unknown[]): void;

    /**
     * Stops the timer for `label` and writes the elapsed time to stdout.
     *
     * When `label` is omitted, the timer label is `"default"`.
     */
    timeEnd(label?: unknown): void;
  }
}

/**
 * Console module exports.
 */
declare module "console" {
  global {
    interface Console
      extends OvrConsole.OutputMethods, OvrConsole.StatefulMethods {}

    /**
     * Global console object.
     *
     * Ordinary output is written to stdout. Warnings, errors, and failed
     * assertions are written to stderr. Labels passed to counter and timer
     * methods are converted to strings.
     */
    var console: Console;
  }

  /**
   * Console object constructor.
   *
   * Instances write ordinary output to stdout. Warnings, errors, and failed
   * assertions are written to stderr.
   */
  export class Console {
    /**
     * Creates a console instance.
     */
    constructor();
  }

  export interface Console extends OvrConsole.OutputMethods {}

  /**
   * Default console module export.
   *
   * The default object exposes the `Console` constructor.
   */
  const defaultExport: {
    /**
     * Constructor for console instances.
     */
    Console: typeof Console;
  };
  export default defaultExport;
}

/**
 * Console module exports available through the `ovrc:console` specifier.
 */
declare module "ovrc:console" {
  export * from "console";
  export { default } from "console";
}
