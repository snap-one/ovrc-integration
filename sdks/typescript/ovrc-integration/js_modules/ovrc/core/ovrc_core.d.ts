/**
 * @module ovrc:core
 */
declare module "ovrc:core" {
  export type RpcMethod = {
    method: string;
    params: {
      args: unknown;
      includeFields: string[];
    };
    jsonrpc: "2.0";
    id: string;
  };

  export type RpcMethodError = {
    code: number;
    message: string;
    data?: unknown;
  };

  export type RpcMethodResponse = {
    id: string;
    jsonrpc: "2.0";
  } & ({ error: RpcMethodError } | { result: unknown });

  export type Device = {
    /**
     * The IPv4 address of the device, on its LAN.
     */
    ipv4: string;
  };

  /**
   * Retrieves the RPC methods from the current request body.
   *
   * This function can only be invoked once per request context.
   * Subsequent calls will throw an error.
   *
   * @returns The parsed JSON request methods
   * @throws {Error} If the request context is not found or if called multiple times
   */
  export function getRequestMethods(): RpcMethod[];

  /**
   * Loads the device associated with the current
   * integration execution context.
   */
  export function getDevice(): Device;

  /**
   * Writes the result of a method execution back to the client.
   *
   * The provided object will be serialized to JSON and sent as the response.
   *
   * @param obj - The result object to write back to the client
   * @throws {Error} If the result writer is not found or if serialization fails
   */
  export function writeMethodResult(obj: RpcMethodResponse): void;
}
