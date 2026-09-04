declare module "assert" {
  interface Assert {
    (value: unknown, message?: string | Error): asserts value;
    readonly ok: Assert;
  }

  export const ok: Assert;
  export default ok;
}

declare module "ovrc:assert" {
  export * from "assert";
  export { default } from "assert";
}
