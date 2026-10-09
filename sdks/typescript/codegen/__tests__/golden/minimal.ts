/** @description Fetch a widget by id. */
export type GetWidget = RPCRequestBase & {
    /** @enum {string} */
    method: "getWidget";
    params: GetWidgetParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getWidget";
};
export type GetWidgetArgs = {
    id: string;
};
export type GetWidgetParams = {
    args: GetWidgetArgs;
    includeFields?: ("name" | "size")[];
};
export type GetWidgetResult = Widget | null;
/** @description Ping the device. */
export type Ping = RPCRequestBase & {
    /** @enum {string} */
    method: "ping";
    params: PingParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "ping";
};
export type PingArgs = {
    message: string;
};
export type PingParams = {
    args: PingArgs;
};
export type PingResult = string;
export type RPCMethod = GetWidget | Ping;
export type RPCRequestBase = {
    id: string;
    /** @enum {string} */
    jsonrpc: "2.0";
};
/** @description A widget exposed by the device. */
export type Widget = {
    /** @description The widget's display name. */
    name: string;
    /** @description The widget's size. */
    size: number;
};
export type methodGetWidgetResult = {
  /**
 * The widget's display name.
 */
  name?: ((args: GetWidgetArgs) => Promise<string>) | string;
  /**
 * The widget's size.
 */
  size?: ((args: GetWidgetArgs) => Promise<number>) | number;
}

export type methodGetWidget = (params: GetWidgetParams) => Promise<methodGetWidgetResult>;
export type methodPingResult = PingResult

export type methodPing = (params: PingParams) => Promise<methodPingResult>;

export type Handler = {
  /**
 * Fetch a widget by id.
 */
  getWidget?: methodGetWidget;
  /**
 * Ping the device.
 */
  ping?: methodPing;
}


//@ts-ignore
import { serveRpc as ovrcServeRpc } from "ovrc:rpc";

export async function serveRpc(handler: Handler) {
  await ovrcServeRpc(handler);
}
