/**
 * @module ovrc:rpc
 */
declare module "ovrc:rpc" {
  /**
   * Arguments passed to an RPC method handler.
   */
  export type MethodArgs = {
    includeFields: string[];
    args: unknown;
  };

  /**
   * A map of method names to their handler functions.
   */
  export type RpcHandler = {
    [key: string]: RpcMethodHandlerFunc;
  };

  /**
   * A function that handles an RPC method invocation.
   *
   * @param args - The method arguments
   * @returns A promise resolving to the method result
   */
  export type RpcMethodHandlerFunc = (args: MethodArgs) => Promise<unknown>;

  /**
   * A custom error class for RPC errors.
   *
   * Throw this from a handler to control the error code and message
   * returned in the JSON-RPC response.
   */
  export class RpcError extends Error {
    /** The JSON-RPC error code */
    code: number;

    /**
     * @param message - The error message
     * @param code - The JSON-RPC error code
     */
    constructor(message: string, code: number);
  }

  /**
   * Serves incoming RPC requests by dispatching each method call
   * to the corresponding handler function.
   *
   * Methods not found in the handler will return a -32601 error.
   * Handler functions that throw an {@link RpcError} will have their
   * code and message forwarded to the client. All other errors
   * return a -32603 internal error.
   *
   * @param handler - An object mapping method names to handler functions
   * @throws {Error} If handler is not a non-array object
   */
  export function serveRpc(handler: RpcHandler): Promise<void>;
}
