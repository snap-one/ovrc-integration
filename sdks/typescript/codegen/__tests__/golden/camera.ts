/**
 * @description Represents a standalone authentication method or "form". This object serves as a mechanism to logically group fields required for authentication.
 *     For example: a device may require an access token to communicate over the LAN. The integration may also support communicating via a cloud api, requiring a clientId and clientSecret.
 *     In this case, the integration would return two Authentication objects, one for the LAN method and one for the cloud method, each with their respective fields and types.
 */
export type Authentication = {
    /**
     * Format: uri
     * @description A url to documentation describing how to set/configure this authentication method.
     *     This is intended to be displayed to the user as guidance for how to obtain the necessary credentials or complete the necessary steps to successfully authenticate.
     */
    documentationURL?: string | null;
    /** @description A list of authentication fields required for this authentication method. Each field has a type that indicates how the value should be obtained or set. */
    fields?: AuthenticationField[] | null;
    /** @description The unique identifier for this authentication method. This is used when setting authentication values. */
    id?: string;
    /**
     * @description A short description of the authentication method. For example: "Local Network Authentication", "Cloud Authentication", etc...
     *     This will be displayed to the user.
     */
    label?: string;
    /**
     * @description Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
     *     There is no way to report the validity of an individual field within the authentication method itself.
     */
    valid?: boolean;
};
/** @description Represents a single field within an authentication method. */
export type AuthenticationField = {
    /** @description The unique identifier for this authentication field. */
    id?: string;
    /** @description A short, user-facing label describing this field. For example: "Password", "Access Token", etc... */
    label?: string;
    /**
     * @description The type of this authentication field, indicating how the value should be obtained or set.
     *     Pay close attention any specific requirements or constraints for the type being used.
     *     - "STRING": An authentication field of type string. For example: a password, pin, preshared-key, access token, etc...
     *
     *     - "PROMPT": Prompt triggers an out-of-band authentication flow. For example: displaying a prompt on the device requesting permissions,
     *     or having a user scan a QR code. There is a 30 second timeout for a prompt to resolve.
     *
     *     If an authentication method's fields list contains a field of type `PROMPT`, it must be the only field present in the list.
     * @enum {string}
     */
    type?: "STRING" | "PROMPT";
    /**
     * @description The current value of this authentication field. This typically only applies for the STRING types, but
     *     may be populated for other authentication types as well.
     */
    value?: string | null;
};
/** @description Input type for setting the value of a single authentication field. */
export type AuthenticationFieldInput = {
    /** @description The unique identifier of the authentication field to set. */
    id: string;
    /** @description The value to set for this authentication field. */
    value: string;
};
/**
 * @description Input type for setting authentication values on an authentication method.
 *     This is only applicable for authentication methods composed of STRING fields.
 */
export type AuthenticationInput = {
    /** @description The list of field values to set for this authentication method. */
    fields: AuthenticationFieldInput[];
    /** @description The unique identifier of the authentication method to set values for. */
    id: string;
};
export type DispatchAuthenticationPrompt = RPCRequestBase & {
    /** @enum {string} */
    method: "dispatchAuthenticationPrompt";
    params: DispatchAuthenticationPromptParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "dispatchAuthenticationPrompt";
};
export type DispatchAuthenticationPromptArgs = {
    authenticationId: string;
};
export type DispatchAuthenticationPromptParams = {
    args: DispatchAuthenticationPromptArgs;
    includeFields?: ("id" | "label" | "valid" | "documentationURL" | "fields")[];
};
export type DispatchAuthenticationPromptResponse = RPCMethodResult & {
    result?: DispatchAuthenticationPromptResult;
};
export type DispatchAuthenticationPromptResult = Authentication;
export type DispatchFirmwareUpdate = RPCRequestBase & {
    /** @enum {string} */
    method: "dispatchFirmwareUpdate";
    params: DispatchFirmwareUpdateParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "dispatchFirmwareUpdate";
};
export type DispatchFirmwareUpdateArgs = {
    versionId: string;
};
export type DispatchFirmwareUpdateParams = {
    args: DispatchFirmwareUpdateArgs;
    includeFields?: never[];
};
export type DispatchFirmwareUpdateResponse = RPCMethodResult & {
    result?: DispatchFirmwareUpdateResult;
};
/**
 * @description - "UNSUPPORTED": Indicates that the integration does not support monitoring firmware update status, or that it cannot determine the current status of a firmware update operation.
 *     This DOES NOT indicate that the integration does not support firmware updates at all. See the `updateCandidates` field on the firmware type for that information.
 *
 *     - "READY": Communicates that the device is ready to begin a firmware update, and supports monitoring the status of the update once it has begun.
 *     This does not indicate that a firmware update is available. See the `updateCandidates` field on the firmware type for that information.
 *
 *     - "COMPLETE": Indicates that the firmware update has completed successfully.
 *
 *     - "INPROGRESS": Indicates that a firmware update is currently in progress.
 *
 *     - "FAILED": Indicates that the firmware update has failed.
 * @enum {string}
 */
export type DispatchFirmwareUpdateResult = "UNSUPPORTED" | "READY" | "COMPLETE" | "INPROGRESS" | "FAILED";
/** @description Dispatches a reboot action to the camera. */
export type DispatchPowerReboot = RPCRequestBase & {
    /** @enum {string} */
    method: "dispatchPowerReboot";
    params: DispatchPowerRebootParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "dispatchPowerReboot";
};
export type DispatchPowerRebootArgs = Record<string, unknown>;
export type DispatchPowerRebootParams = {
    args: DispatchPowerRebootArgs;
    includeFields?: never[];
};
export type DispatchPowerRebootResponse = RPCMethodResult & {
    result?: DispatchPowerRebootResult;
};
export type DispatchPowerRebootResult = boolean;
export type Firmware = {
    /** @description The current firmware version details for the device. */
    current?: FirmwareVersionDetails | null;
    /**
     * @description A list of firmware versions available for update.
     *     A non-empty list indicates that a firmware update is available and that this integration supports dispatching firmware updates.
     *
     *     A null value indicates that the integration does not support firmware updates, or that it cannot determine if there are any updates available.
     *     An empty list indicates that there are no firmware updates currently available for this device, but that the integration does support firmware updates.
     */
    updateCandidates?: FirmwareVersionDetails[] | null;
    /**
     * @description The current status of any ongoing firmware update operation.
     *     - "UNSUPPORTED": Indicates that the integration does not support monitoring firmware update status, or that it cannot determine the current status of a firmware update operation.
     *     This DOES NOT indicate that the integration does not support firmware updates at all. See the `updateCandidates` field on the firmware type for that information.
     *
     *     - "READY": Communicates that the device is ready to begin a firmware update, and supports monitoring the status of the update once it has begun.
     *     This does not indicate that a firmware update is available. See the `updateCandidates` field on the firmware type for that information.
     *
     *     - "COMPLETE": Indicates that the firmware update has completed successfully.
     *
     *     - "INPROGRESS": Indicates that a firmware update is currently in progress.
     *
     *     - "FAILED": Indicates that the firmware update has failed.
     * @enum {string}
     */
    updateStatus?: "UNSUPPORTED" | "READY" | "COMPLETE" | "INPROGRESS" | "FAILED";
};
/** @description An object describing an available firmware version for the device. */
export type FirmwareVersionDetails = {
    /** @description A url pointing to documentation for this firmware version. This is used for display purposes in the UI when listing available firmware versions, and can be used by the user to learn more about this firmware version before deciding to update. */
    documentationUrl?: string | null;
    /** @description A user-friendly name for this firmware version. This is used for display purposes in the UI when listing available firmware versions. */
    friendlyName?: string;
    /** @description A unique identifier for this firmware version. This is used when dispatching a firmware update to specify which version to update to. */
    id?: string;
    /** @description A description of the changes included in this firmware version. This is used for display purposes in the UI when listing available firmware versions. */
    releaseNotes?: string | null;
};
/** @description Authentication methods supported by the integration. */
export type GetAuthentication = RPCRequestBase & {
    /** @enum {string} */
    method: "getAuthentication";
    params: GetAuthenticationParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getAuthentication";
};
export type GetAuthenticationArgs = Record<string, unknown>;
export type GetAuthenticationParams = {
    args: GetAuthenticationArgs;
    includeFields?: ("id" | "label" | "valid" | "documentationURL" | "fields")[];
};
export type GetAuthenticationResponse = RPCMethodResult & {
    result?: GetAuthenticationResult;
};
export type GetAuthenticationResult = Authentication[] | null;
/** @description Firmware metadata reported by the camera. */
export type GetFirmware = RPCRequestBase & {
    /** @enum {string} */
    method: "getFirmware";
    params: GetFirmwareParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getFirmware";
};
export type GetFirmwareArgs = Record<string, unknown>;
export type GetFirmwareParams = {
    args: GetFirmwareArgs;
    includeFields?: ("current" | "updateCandidates" | "updateStatus")[];
};
export type GetFirmwareResponse = RPCMethodResult & {
    result?: GetFirmwareResult;
};
export type GetFirmwareResult = Firmware | null;
/** @description Lens/source image settings exposed by the camera. */
export type GetImageSettings = RPCRequestBase & {
    /** @enum {string} */
    method: "getImageSettings";
    params: GetImageSettingsParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getImageSettings";
};
export type GetImageSettingsArgs = Record<string, unknown>;
export type GetImageSettingsParams = {
    args: GetImageSettingsArgs;
    includeFields?: "sources"[];
};
export type GetImageSettingsResponse = RPCMethodResult & {
    result?: GetImageSettingsResult;
};
export type GetImageSettingsResult = ImageSettings | null;
/** @description Integration metadata reported by the camera. */
export type GetMetadata = RPCRequestBase & {
    /** @enum {string} */
    method: "getMetadata";
    params: GetMetadataParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getMetadata";
};
export type GetMetadataArgs = Record<string, unknown>;
export type GetMetadataParams = {
    args: GetMetadataArgs;
    includeFields?: ("userManualURL" | "knowledgeBaseURL" | "dataAcquisition")[];
};
export type GetMetadataResponse = RPCMethodResult & {
    result?: GetMetadataResult;
};
export type GetMetadataResult = Metadata | null;
/** @description Network information reported by the camera. */
export type GetNetwork = RPCRequestBase & {
    /** @enum {string} */
    method: "getNetwork";
    params: GetNetworkParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getNetwork";
};
export type GetNetworkArgs = Record<string, unknown>;
export type GetNetworkParams = {
    args: GetNetworkArgs;
    includeFields?: "interfaces"[];
};
export type GetNetworkResponse = RPCMethodResult & {
    result?: GetNetworkResult;
};
export type GetNetworkResult = Network | null;
/** @description Power capabilities and state reported by the camera. */
export type GetPower = RPCRequestBase & {
    /** @enum {string} */
    method: "getPower";
    params: GetPowerParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getPower";
};
export type GetPowerArgs = Record<string, unknown>;
export type GetPowerParams = {
    args: GetPowerArgs;
    includeFields?: "canReboot"[];
};
export type GetPowerResponse = RPCMethodResult & {
    result?: GetPowerResult;
};
export type GetPowerResult = Power | null;
/** @description Video streaming profiles exposed by the camera. */
export type GetProfiles = RPCRequestBase & {
    /** @enum {string} */
    method: "getProfiles";
    params: GetProfilesParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getProfiles";
};
export type GetProfilesArgs = Record<string, unknown>;
export type GetProfilesParams = {
    args: GetProfilesArgs;
    includeFields?: "available"[];
};
export type GetProfilesResponse = RPCMethodResult & {
    result?: GetProfilesResult;
};
export type GetProfilesResult = Profiles | null;
/** @description System-level metadata reported by the camera. */
export type GetSystem = RPCRequestBase & {
    /** @enum {string} */
    method: "getSystem";
    params: GetSystemParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "getSystem";
};
export type GetSystemArgs = Record<string, unknown>;
export type GetSystemParams = {
    args: GetSystemArgs;
    includeFields?: ("hostname" | "model" | "brand" | "serialNumber" | "dateTime")[];
};
export type GetSystemResponse = RPCMethodResult & {
    result?: GetSystemResult;
};
export type GetSystemResult = System | null;
/** @description Image settings exposed by the camera across physical sources/lenses. */
export type ImageSettings = {
    /** @description A list of physical sources on the camera. */
    sources?: ImageSettingsSource[] | null;
};
/** @description Represents a single physical source (or lens) on the camera. */
export type ImageSettingsSource = {
    /**
     * @description The currently configured day/night mode for this lens.
     *     - "DAY": Day mode.
     *
     *     - "NIGHT": Night mode.
     *
     *     - "AUTO": Automatically switch between day and night mode based on the current lighting conditions.
     * @enum {string|null}
     */
    configuredDayNightMode?: "DAY" | "NIGHT" | "AUTO" | null;
    /**
     * @description The current day/night mode for this lens. This value may be different
     *     than the configuredDayNightMode if the configuredDayNightMode is set
     *     to AUTO and the camera has automatically switched modes based on lighting
     *     conditions. Must not be set to AUTO, as AUTO is only a valid value for
     *     configuredDayNightMode.
     *     - "DAY": Day mode.
     *
     *     - "NIGHT": Night mode.
     *
     *     - "AUTO": Automatically switch between day and night mode based on the current lighting conditions.
     * @enum {string|null}
     */
    currentDayNightMode?: "DAY" | "NIGHT" | "AUTO" | null;
    /**
     * @description The current rotation of the lens, in degrees.
     *     This value is only valid if it also exists in the rotationPresets field.
     */
    rotation?: number | null;
    /**
     * @description A set of preset rotation values that can be applied to the camera.
     *     The unit of this value is degrees.
     */
    rotationPresets?: number[] | null;
    /** @description The id of the physical source on the camera. */
    sourceId?: string;
};
/** @description The IPv4 configuration for a network interface, including the assigned address, netmask, gateway, and dns servers. */
export type IPv4Config = {
    /**
     * Format: ipv4
     * @description The IPv4 address assigned to the device.
     *     This may be null if the device does not expose this information.
     */
    address?: string | null;
    /**
     * @description A list of dns servers assigned to the device.
     *     The list must return at most 3 servers.
     */
    dnsServers?: string[] | null;
    /**
     * Format: ipv4
     * @description The IPv4 gateway assigned to the device.
     */
    gateway?: string | null;
    /**
     * Format: ipv4
     * @description The IPv4 netmask assigned to the device.
     */
    netmask?: string | null;
};
/** @description IPv4 network settings for a network interface, including the effective configuration, static configuration, and supported address types. */
export type IPv4Settings = {
    /**
     * @description The currently active address type for this network interface.
     *     - "DHCP":
     *
     *     - "DHCP_STATIC_DNS":
     *
     *     - "STATIC":
     * @enum {string|null}
     */
    addressType?: "DHCP" | "DHCP_STATIC_DNS" | "STATIC" | null;
    /**
     * @description A list of supported address types for this network interface,
     *     which can be changed if canSet is true.
     */
    addressTypes?: ("DHCP" | "DHCP_STATIC_DNS" | "STATIC")[] | null;
    /** @description If true, the integration must support setting the IPv4 configuration on this interface. If false, the effective configuration is read-only and cannot be modified by the integration. */
    canSet?: boolean;
    /**
     * @description The number of dns servers the network interface supports.
     *     This value may be at most 3.
     */
    dnsServerCount?: number;
    /** @description The configuration currently in effect on this network interface. */
    effective?: IPv4Config | null;
    /** @description Where applicable, the static IPv4 configuration for this network interface. */
    static?: IPv4Config | null;
};
/** @description The configuration for a given static network interface. */
export type IPv4StaticConfigInput = {
    /**
     * Format: ipv4
     * @description IPv4 address configuration for this network interface.
     */
    address?: string | null;
    /** @description DNS server configuration. */
    dnsServers?: string[] | null;
    /**
     * Format: ipv4
     * @description Gateway configuration, where applicable.
     */
    gateway?: string | null;
    /**
     * Format: ipv4
     * @description Netmask configuration, where applicable.
     */
    netmask?: string | null;
};
export type KeyValuePair = {
    canonicalId?: string | null;
    friendlyName?: string;
    id?: string;
};
export type Metadata = {
    dataAcquisition?: KeyValuePair[] | null;
    /** Format: uri */
    knowledgeBaseURL?: string | null;
    /** Format: uri */
    userManualURL?: string | null;
};
/** @description The device's network information. */
export type Network = {
    /** @description A list of available network interfaces on the device, such as Wi-Fi adapters and Ethernet ports. */
    interfaces?: NetworkInterface[] | null;
};
/** @description Updates to apply to the device's network configuration. */
export type NetworkConfigInput = {
    /** @description The interfaces to update, with their configuration. */
    interfaces: NetworkInterfaceConfigInput[];
};
/** @description A network interface on the device, such as a Wi-Fi adapter or Ethernet port. */
export type NetworkInterface = {
    /**
     * @description Whether this network interface can be enabled via the integration.
     *     Null indicates the integration does not support changing the enabled status of
     *     any network interfaces. False indicates the network interface cannot be enabled,
     *     but the integration does support changing the enabled status of network interfaces
     *     where canEnable is true.
     */
    canEnable?: boolean | null;
    /** @description Whether this network interface is currently enabled. */
    enabled?: boolean;
    /** @description A user-friendly name for this network interface, such as "Wi-Fi", "Ethernet", "eth0", etc... */
    friendlyName?: string;
    /** @description A unique identifier for this network interface. This is used when setting network configuration, if supported. */
    id?: string;
    /** @description The IPv4 settings for this network interface. */
    ipv4?: IPv4Settings | null;
    /** @description The network interface's mac address. */
    macAddress?: string | null;
    /**
     * @description Details about the Wi-Fi connection for this network interface.
     *     If this value is null, it is assumed that the network interface is a wired connection.
     */
    wifi?: WifiInfo | null;
};
/** @description Used when updating the network interface configuration for a device. */
export type NetworkInterfaceConfigInput = {
    /**
     * @description Whether to enable or disable this network interface.
     *     This value is only relevant when the network interface canEnable field is non-null.
     *     A null value in this field should be treated as "no change" to the enabled status of the network interface.
     */
    enabled?: boolean | null;
    /** @description The unique identifier of the network interface to update the configuration for. */
    id: string;
    /** @description The configuration for the network interface's IPv4 settings. If null, the IPv4 configuration should not be changed. */
    ipv4?: NetworkIPv4ConfigInput | null;
};
export type NetworkIPv4ConfigInput = {
    /**
     * @description The address type to use for the network interface.
     *     - "DHCP":
     *
     *     - "DHCP_STATIC_DNS":
     *
     *     - "STATIC":
     * @enum {string}
     */
    addressType: "DHCP" | "DHCP_STATIC_DNS" | "STATIC";
    /** @description Static IPv4 configuration, if applicable. */
    static?: IPv4StaticConfigInput | null;
};
/** @description Power capabilities reported by the camera. */
export type Power = {
    /** @description Indicates whether the camera supports a reboot action. */
    canReboot?: boolean | null;
};
/** @description A single configured streaming profile. */
export type Profile = {
    /**
     * @description A user-facing name for this streaming profile, used to identify
     *     the profile in source-selection interfaces. Must not be empty.
     */
    friendlyName?: string;
    /** @description Configured encoding settings for the video stream. */
    video?: VideoEncoding | null;
};
/** @description Streaming profile configuration exposed by the camera. */
export type Profiles = {
    /** @description A list of configured streaming profiles on the camera. */
    available?: Profile[] | null;
};
/** @description Represents a video resolution in pixels. */
export type Resolution = {
    /**
     * @description Number of pixels across the y-axis of the video image, prior to taking rotation into account.
     *     For example, a 1080p video rotated to 90 degrees would have a height of 1080.
     *     A 1080p video rotated to 0 degrees would have a height of 1080.
     */
    height?: number;
    /**
     * @description Number of pixels across the x-axis of the video image, prior to taking rotation into account.
     *     For example, a 1080p video rotated to 90 degrees would have a width of 1920.
     *     A 1080p video rotated to 0 degrees would have a width of 1920.
     */
    width?: number;
};
export type RPCError = {
    /** @description JSON-RPC 2.0 error code. Codes in the range -32768 to -32000 are reserved for pre-defined errors. */
    code: number;
    /** @description Optional additional error information */
    data?: unknown;
    message: string;
};
export type RPCErrorResponse = {
    error: RPCError;
    id: string;
    /** @enum {string} */
    jsonrpc: "2.0";
};
export type RPCMethod = DispatchAuthenticationPrompt | DispatchFirmwareUpdate | DispatchPowerReboot | GetAuthentication | GetFirmware | GetImageSettings | GetMetadata | GetNetwork | GetPower | GetProfiles | GetSystem | SetAuthentication | SetNetworkConfig;
export type RPCMethodResult = {
    id: string;
    /** @enum {string} */
    jsonrpc: "2.0";
    /** @description The method result. Type is defined by the specific method. */
    result: unknown;
};
export type RPCMethods = RPCMethod[];
export type RPCRequestBase = {
    id: string;
    /** @enum {string} */
    jsonrpc: "2.0";
};
export type RPCSuccessResponse = DispatchAuthenticationPromptResponse | DispatchFirmwareUpdateResponse | DispatchPowerRebootResponse | GetAuthenticationResponse | GetFirmwareResponse | GetImageSettingsResponse | GetMetadataResponse | GetNetworkResponse | GetPowerResponse | GetProfilesResponse | GetSystemResponse | SetAuthenticationResponse | SetNetworkConfigResponse;
export type SetAuthentication = RPCRequestBase & {
    /** @enum {string} */
    method: "setAuthentication";
    params: SetAuthenticationParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "setAuthentication";
};
export type SetAuthenticationArgs = {
    auth: AuthenticationInput;
};
export type SetAuthenticationParams = {
    args: SetAuthenticationArgs;
    includeFields?: ("id" | "label" | "valid" | "documentationURL" | "fields")[];
};
export type SetAuthenticationResponse = RPCMethodResult & {
    result?: SetAuthenticationResult;
};
export type SetAuthenticationResult = Authentication;
export type SetNetworkConfig = RPCRequestBase & {
    /** @enum {string} */
    method: "setNetworkConfig";
    params: SetNetworkConfigParams;
} & {
    /**
     * @description discriminator enum property added by openapi-typescript
     * @enum {string}
     */
    method: "setNetworkConfig";
};
export type SetNetworkConfigArgs = {
    config: NetworkConfigInput;
};
export type SetNetworkConfigParams = {
    args: SetNetworkConfigArgs;
    includeFields?: "interfaces"[];
};
export type SetNetworkConfigResponse = RPCMethodResult & {
    result?: SetNetworkConfigResult;
};
export type SetNetworkConfigResult = Network;
/** @description System metadata reported by the camera. */
export type System = {
    /** @description Brand reported by the camera. */
    brand?: string | null;
    /** @description Date/time metadata reported by the camera. */
    dateTime?: SystemDateTime | null;
    /** @description Hostname reported directly by the camera. */
    hostname?: string | null;
    /** @description Model reported by the camera. */
    model?: string | null;
    /** @description Serial number reported by the camera. */
    serialNumber?: string | null;
};
/** @description Date/time metadata reported by the camera. */
export type SystemDateTime = {
    /**
     * @description Reports whether daylight saving time (DST) is enabled on the camera.
     *     If false, the camera-reported date/time will not apply daylight saving adjustments.
     */
    daylightSavingsEnabled?: boolean | null;
    /**
     * Format: date-time
     * @description An RFC 3339 compliant date-time reflecting the camera's local time and timezone.
     */
    localDateTime?: string | null;
    /**
     * @description Reports how the camera obtains the current date/time.
     *     - "MANUAL": Date/time is manually configured.
     *
     *     - "NTP": Date/time is synchronized via NTP.
     * @enum {string|null}
     */
    source?: "MANUAL" | "NTP" | null;
};
/** @description Video encoding settings for a streaming profile. */
export type VideoEncoding = {
    /**
     * @description A user-friendly representation of the current video encoding codec.
     *     Examples might include: {id:"h265", friendlyName:"H.265"}, {id:"mpeg4", friendlyName:"MPEG4"}, etc.
     */
    codec?: KeyValuePair | null;
    /**
     * @description The ceiling bitrate the camera is currently
     *     configured to use in Kbps.
     */
    maxBitrate?: number | null;
    /** @description The maximum frame rate the camera is currently configured to use in frames per second. */
    maxFrameRate?: number | null;
    /** @description Configured video resolution. */
    resolution?: Resolution | null;
};
export type WifiInfo = {
    /** @description The SSID of the currently connected Wi-Fi network, if applicable. */
    ssid?: string | null;
};
export type methodDispatchAuthenticationPromptResult = {
  /**
* The unique identifier for this authentication method. This is used when setting authentication values. 
*/
  id?: ((args: DispatchAuthenticationPromptArgs) => Promise<string>) | string;
  /**
*
     * @description A short description of the authentication method. For example: "Local Network Authentication", "Cloud Authentication", etc...
     *     This will be displayed to the user.
     
*/
  label?: ((args: DispatchAuthenticationPromptArgs) => Promise<string>) | string;
  /**
*
     * @description Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
     *     There is no way to report the validity of an individual field within the authentication method itself.
     
*/
  valid?: ((args: DispatchAuthenticationPromptArgs) => Promise<boolean>) | boolean;
  /**
*
     * Format: uri
     * @description A url to documentation describing how to set/configure this authentication method.
     *     This is intended to be displayed to the user as guidance for how to obtain the necessary credentials or complete the necessary steps to successfully authenticate.
     
*/
  documentationURL?: ((args: DispatchAuthenticationPromptArgs) => Promise<string | null>) | string | null;
  /**
* A list of authentication fields required for this authentication method. Each field has a type that indicates how the value should be obtained or set. 
*/
  fields?: ((args: DispatchAuthenticationPromptArgs) => Promise<AuthenticationField[] | null>) | AuthenticationField[] | null;
}

export type methodDispatchAuthenticationPrompt = (params: DispatchAuthenticationPromptParams) => Promise<methodDispatchAuthenticationPromptResult>;
export type methodDispatchFirmwareUpdateResult = DispatchFirmwareUpdateResult

export type methodDispatchFirmwareUpdate = (params: DispatchFirmwareUpdateParams) => Promise<methodDispatchFirmwareUpdateResult>;
export type methodDispatchPowerRebootResult = DispatchPowerRebootResult

export type methodDispatchPowerReboot = (params: DispatchPowerRebootParams) => Promise<methodDispatchPowerRebootResult>;
export type methodGetAuthenticationResult = GetAuthenticationResult

export type methodGetAuthentication = (params: GetAuthenticationParams) => Promise<methodGetAuthenticationResult>;
export type methodGetFirmwareResult = {
  /**
* The current firmware version details for the device. 
*/
  current?: ((args: GetFirmwareArgs) => Promise<FirmwareVersionDetails | null>) | FirmwareVersionDetails | null;
  /**
*
     * @description A list of firmware versions available for update.
     *     A non-empty list indicates that a firmware update is available and that this integration supports dispatching firmware updates.
     *
     *     A null value indicates that the integration does not support firmware updates, or that it cannot determine if there are any updates available.
     *     An empty list indicates that there are no firmware updates currently available for this device, but that the integration does support firmware updates.
     
*/
  updateCandidates?: ((args: GetFirmwareArgs) => Promise<FirmwareVersionDetails[] | null>) | FirmwareVersionDetails[] | null;
  /**
*
     * @description The current status of any ongoing firmware update operation.
     *     - "UNSUPPORTED": Indicates that the integration does not support monitoring firmware update status, or that it cannot determine the current status of a firmware update operation.
     *     This DOES NOT indicate that the integration does not support firmware updates at all. See the `updateCandidates` field on the firmware type for that information.
     *
     *     - "READY": Communicates that the device is ready to begin a firmware update, and supports monitoring the status of the update once it has begun.
     *     This does not indicate that a firmware update is available. See the `updateCandidates` field on the firmware type for that information.
     *
     *     - "COMPLETE": Indicates that the firmware update has completed successfully.
     *
     *     - "INPROGRESS": Indicates that a firmware update is currently in progress.
     *
     *     - "FAILED": Indicates that the firmware update has failed.
     * @enum {string}
     
*/
  updateStatus?: ((args: GetFirmwareArgs) => Promise<"UNSUPPORTED" | "READY" | "COMPLETE" | "INPROGRESS" | "FAILED">) | "UNSUPPORTED" | "READY" | "COMPLETE" | "INPROGRESS" | "FAILED";
}

export type methodGetFirmware = (params: GetFirmwareParams) => Promise<methodGetFirmwareResult>;
export type methodGetImageSettingsResult = {
  /**
* A list of physical sources on the camera. 
*/
  sources?: ((args: GetImageSettingsArgs) => Promise<ImageSettingsSource[] | null>) | ImageSettingsSource[] | null;
}

export type methodGetImageSettings = (params: GetImageSettingsParams) => Promise<methodGetImageSettingsResult>;
export type methodGetMetadataResult = {
  /**
* Format: uri 
*/
  userManualURL?: ((args: GetMetadataArgs) => Promise<string | null>) | string | null;
  /**
* Format: uri 
*/
  knowledgeBaseURL?: ((args: GetMetadataArgs) => Promise<string | null>) | string | null;
  
  dataAcquisition?: ((args: GetMetadataArgs) => Promise<KeyValuePair[] | null>) | KeyValuePair[] | null;
}

export type methodGetMetadata = (params: GetMetadataParams) => Promise<methodGetMetadataResult>;
export type methodGetNetworkResult = {
  /**
* A list of available network interfaces on the device, such as Wi-Fi adapters and Ethernet ports. 
*/
  interfaces?: ((args: GetNetworkArgs) => Promise<NetworkInterface[] | null>) | NetworkInterface[] | null;
}

export type methodGetNetwork = (params: GetNetworkParams) => Promise<methodGetNetworkResult>;
export type methodGetPowerResult = {
  /**
* Indicates whether the camera supports a reboot action. 
*/
  canReboot?: ((args: GetPowerArgs) => Promise<boolean | null>) | boolean | null;
}

export type methodGetPower = (params: GetPowerParams) => Promise<methodGetPowerResult>;
export type methodGetProfilesResult = {
  /**
* A list of configured streaming profiles on the camera. 
*/
  available?: ((args: GetProfilesArgs) => Promise<Profile[] | null>) | Profile[] | null;
}

export type methodGetProfiles = (params: GetProfilesParams) => Promise<methodGetProfilesResult>;
export type methodGetSystemResult = {
  /**
* Hostname reported directly by the camera. 
*/
  hostname?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;
  /**
* Model reported by the camera. 
*/
  model?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;
  /**
* Brand reported by the camera. 
*/
  brand?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;
  /**
* Serial number reported by the camera. 
*/
  serialNumber?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;
  /**
* Date/time metadata reported by the camera. 
*/
  dateTime?: ((args: GetSystemArgs) => Promise<SystemDateTime | null>) | SystemDateTime | null;
}

export type methodGetSystem = (params: GetSystemParams) => Promise<methodGetSystemResult>;
export type methodSetAuthenticationResult = {
  /**
* The unique identifier for this authentication method. This is used when setting authentication values. 
*/
  id?: ((args: SetAuthenticationArgs) => Promise<string>) | string;
  /**
*
     * @description A short description of the authentication method. For example: "Local Network Authentication", "Cloud Authentication", etc...
     *     This will be displayed to the user.
     
*/
  label?: ((args: SetAuthenticationArgs) => Promise<string>) | string;
  /**
*
     * @description Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
     *     There is no way to report the validity of an individual field within the authentication method itself.
     
*/
  valid?: ((args: SetAuthenticationArgs) => Promise<boolean>) | boolean;
  /**
*
     * Format: uri
     * @description A url to documentation describing how to set/configure this authentication method.
     *     This is intended to be displayed to the user as guidance for how to obtain the necessary credentials or complete the necessary steps to successfully authenticate.
     
*/
  documentationURL?: ((args: SetAuthenticationArgs) => Promise<string | null>) | string | null;
  /**
* A list of authentication fields required for this authentication method. Each field has a type that indicates how the value should be obtained or set. 
*/
  fields?: ((args: SetAuthenticationArgs) => Promise<AuthenticationField[] | null>) | AuthenticationField[] | null;
}

export type methodSetAuthentication = (params: SetAuthenticationParams) => Promise<methodSetAuthenticationResult>;
export type methodSetNetworkConfigResult = {
  /**
* A list of available network interfaces on the device, such as Wi-Fi adapters and Ethernet ports. 
*/
  interfaces?: ((args: SetNetworkConfigArgs) => Promise<NetworkInterface[] | null>) | NetworkInterface[] | null;
}

export type methodSetNetworkConfig = (params: SetNetworkConfigParams) => Promise<methodSetNetworkConfigResult>;

export type Handler = {
  
  dispatchAuthenticationPrompt?: methodDispatchAuthenticationPrompt;
  
  dispatchFirmwareUpdate?: methodDispatchFirmwareUpdate;
  /**
* Dispatches a reboot action to the camera. 
*/
  dispatchPowerReboot?: methodDispatchPowerReboot;
  /**
* Authentication methods supported by the integration. 
*/
  getAuthentication?: methodGetAuthentication;
  /**
* Firmware metadata reported by the camera. 
*/
  getFirmware?: methodGetFirmware;
  /**
* Lens/source image settings exposed by the camera. 
*/
  getImageSettings?: methodGetImageSettings;
  /**
* Integration metadata reported by the camera. 
*/
  getMetadata?: methodGetMetadata;
  /**
* Network information reported by the camera. 
*/
  getNetwork?: methodGetNetwork;
  /**
* Power capabilities and state reported by the camera. 
*/
  getPower?: methodGetPower;
  /**
* Video streaming profiles exposed by the camera. 
*/
  getProfiles?: methodGetProfiles;
  /**
* System-level metadata reported by the camera. 
*/
  getSystem?: methodGetSystem;
  
  setAuthentication?: methodSetAuthentication;
  
  setNetworkConfig?: methodSetNetworkConfig;
}


//@ts-ignore
import { serveRpc as ovrcServeRpc } from "ovrc:rpc";

export async function serveRpc(handler: Handler) {
  await ovrcServeRpc(handler);
}
