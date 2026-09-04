declare module "buffer" {
  export const Buffer: typeof globalThis.Buffer;
  export const atob: typeof globalThis.atob;
  export const btoa: typeof globalThis.btoa;
  export const constants: {
    readonly MAX_LENGTH: number;
    readonly MAX_STRING_LENGTH: number;
  };

  const buffer: {
    readonly Buffer: typeof globalThis.Buffer;
    readonly atob: typeof globalThis.atob;
    readonly btoa: typeof globalThis.btoa;
    readonly constants: typeof constants;
  };
  export default buffer;
}

declare module "ovrc:buffer" {
  export * from "buffer";
  export { default } from "buffer";
}
