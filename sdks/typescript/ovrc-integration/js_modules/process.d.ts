declare module "process" {
  global {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }

    interface ProcessHrtime {
      (time?: [number, number]): [number, number];
      bigint(): bigint;
    }

    interface Process {
      env: ProcessEnv;
      cwd(): string;
      argv0: string;
      pid: number;
      argv: string[];
      platform: string;
      arch: string;
      hrtime: ProcessHrtime;
      version: string;
      versions: Record<string, string | undefined>;
      exitCode: number | string | null | undefined;
      exit(code?: number | string | null): never;
      kill(...args: unknown[]): never;
      nextTick<Args extends unknown[]>(
        callback: (...args: Args) => void,
        ...args: Args
      ): void;
    }

    var process: Process;
  }

  interface ProcessModuleShape {
    readonly env: Process["env"];
    readonly cwd: Process["cwd"];
    readonly argv0: Process["argv0"];
    readonly pid: Process["pid"];
    readonly argv: Process["argv"];
    readonly platform: Process["platform"];
    readonly arch: Process["arch"];
    readonly hrtime: Process["hrtime"];
    readonly version: Process["version"];
    readonly versions: Process["versions"];
    readonly exitCode: Process["exitCode"];
    readonly exit: Process["exit"];
    readonly kill: Process["kill"];
    readonly nextTick: Process["nextTick"];
  }

  export const env: Process["env"];
  export const cwd: Process["cwd"];
  export const argv0: Process["argv0"];
  export const pid: Process["pid"];
  export const argv: Process["argv"];
  export const platform: Process["platform"];
  export const arch: Process["arch"];
  export const hrtime: Process["hrtime"];
  export const version: Process["version"];
  export const versions: Process["versions"];
  export const exitCode: Process["exitCode"];
  export const exit: Process["exit"];
  export const kill: Process["kill"];
  export const nextTick: Process["nextTick"];

  const processModule: ProcessModuleShape;
  export default processModule;
}

declare module "ovrc:process" {
  export * from "process";
  export { default } from "process";
}
