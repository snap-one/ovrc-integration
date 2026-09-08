declare module "https" {
  export type AgentCA =
    | string
    | string[]
    | ArrayBuffer
    | ArrayBuffer[]
    | Uint8Array
    | Uint8Array[]
    | DataView
    | DataView[];

  export interface AgentOptions {
    ca?: AgentCA;
    rejectUnauthorized?: boolean;
  }

  export class Agent {
    constructor(options?: AgentOptions);
  }
}

declare module "ovrc:https" {
  export * from "https";
}
