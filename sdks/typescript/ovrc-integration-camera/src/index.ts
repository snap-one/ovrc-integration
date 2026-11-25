/**
 * @description Represents a standalone authentication method or "form". This object serves as a mechanism to logically group fields required for authentication.
 *     For example: a device may require an access token to communicate over the LAN. The integration may also support communicating via a cloud api, requiring a clientId and clientSecret.
 *     In this case, the integration would return two Authentication objects, one for the LAN method and one for the cloud method, each with their respective fields and types.
 */
export type Authentication = {
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
  /**
   * @description The credential type that best describes the kind
   *     of value stored in value.
   */
  credentialType?: AuthenticationFieldCredentialType;
  /** @description The unique identifier for this authentication field. */
  key?: string;
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
export type AuthenticationFieldCredentialType = {
  /**
   * @description - "OTHER":
   *
   *     - "USERNAME":
   *
   *     - "CLIENTID":
   *
   *     - "CLIENTSECRET":
   *
   *     - "PASSWORD":
   *
   *     - "ACCESSTOKEN":
   *
   *     - "APIKEY":
   * @enum {string}
   */
  type?:
    | "OTHER"
    | "USERNAME"
    | "CLIENTID"
    | "CLIENTSECRET"
    | "PASSWORD"
    | "ACCESSTOKEN"
    | "APIKEY";
};
/** @description Input type for setting the value of a single authentication field. */
export type AuthenticationFieldInput = {
  /** @description The unique identifier of the authentication field to set. */
  key: string;
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
  includeFields?: ("id" | "label" | "valid" | "fields")[];
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
  includeFields?: ("version" | "status")[];
};
export type DispatchFirmwareUpdateResponse = RPCMethodResult & {
  result?: DispatchFirmwareUpdateResult;
};
export type DispatchFirmwareUpdateResult = Firmware;
/**
 * @description Dispatch a device reboot. The integration should NOT wait until the reboot has completed.
 *     The resulting boolean reflects whether the reboot was dispatched.
 */
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
  status?: FirmwareStatus;
  version?: FirmwareVersion | null;
};
export type FirmwareStatus = {
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
export type FirmwareVersion = {
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
};
/** @description An object describing an available firmware version for the device. */
export type FirmwareVersionDetails = {
  /** @description A url pointing to documentation for this firmware version. This is used for display purposes in the UI when listing available firmware versions, and can be used by the user to learn more about this firmware version before deciding to update. */
  documentationUrl?: string | null;
  /** @description A user-friendly name for this firmware version. This is used for display purposes in the UI when listing available firmware versions. */
  friendlyName?: string;
  /** @description A unique identifier for this firmware version. This is used when dispatching a firmware update to specify which version to update to. */
  id?: string;
  /**
   * Format: date-time
   * @description The date this firmware version was released.
   */
  releaseDate?: string | null;
  /** @description A description of the changes included in this firmware version. This is used for display purposes in the UI when listing available firmware versions. */
  releaseNotes?: string | null;
  /** @description The size of the firmware file in bytes. */
  size?: number | null;
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
  includeFields?: "methods"[];
};
export type GetAuthenticationResponse = RPCMethodResult & {
  result?: GetAuthenticationResult;
};
export type GetAuthenticationResult = IntegrationAuthentication | null;
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
  includeFields?: ("version" | "status")[];
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
export type GetSddp = RPCRequestBase & {
  /** @enum {string} */
  method: "getSddp";
  params: GetSddpParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getSddp";
};
export type GetSddpArgs = Record<string, unknown>;
export type GetSddpParams = {
  args: GetSddpArgs;
  includeFields?: ("enabled" | "canSetEnabled")[];
};
export type GetSddpResponse = RPCMethodResult & {
  result?: GetSddpResult;
};
export type GetSddpResult = SDDP | null;
export type GetSnmp = RPCRequestBase & {
  /** @enum {string} */
  method: "getSnmp";
  params: GetSnmpParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getSnmp";
};
export type GetSnmpArgs = Record<string, unknown>;
export type GetSnmpCredentials = RPCRequestBase & {
  /** @enum {string} */
  method: "getSnmpCredentials";
  params: GetSnmpCredentialsParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getSnmpCredentials";
};
export type GetSnmpCredentialsArgs = Record<string, unknown>;
export type GetSnmpCredentialsParams = {
  args: GetSnmpCredentialsArgs;
  includeFields?: (
    | "v2ReadCommunity"
    | "v2WriteCommunity"
    | "v3ReadUser"
    | "v3WriteUser"
  )[];
};
export type GetSnmpCredentialsResponse = RPCMethodResult & {
  result?: GetSnmpCredentialsResult;
};
export type GetSnmpCredentialsResult = SNMPCredentials | null;
export type GetSnmpParams = {
  args: GetSnmpArgs;
  includeFields?: (
    | "enabled"
    | "canSetEnabled"
    | "canSetCredentials"
    | "v2"
    | "v3"
  )[];
};
export type GetSnmpResponse = RPCMethodResult & {
  result?: GetSnmpResult;
};
export type GetSnmpResult = SNMP | null;
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
  includeFields?: (
    | "contactInformation"
    | "hostname"
    | "model"
    | "brand"
    | "serialNumber"
    | "dateTime"
  )[];
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
  /** @description The id of the physical source on the camera. */
  id?: string;
  /** @description The clockwise rotation currently applied to the image, in degrees. */
  rotation?: number | null;
  /**
   * @description The rotation mode currently applied to the image.
   *     - "FIXED": The image is rotated by a fixed angle.
   *
   *     - "AUTO": The camera chooses the rotation automatically.
   * @enum {string|null}
   */
  rotationMode?: "FIXED" | "AUTO" | null;
};
/** @description The container for all authentication items. */
export type IntegrationAuthentication = {
  /**
   * @description A list of authentication methods required or
   *     available for a user to use.
   */
  methods?: Authentication[] | null;
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
   *     - "DHCP": Address, netmask, gateway, and DNS are obtained via DHCP.
   *
   *     - "DHCP_STATIC_DNS": DHCP address, netmask, and gateway, with static DNS.
   *
   *     - "STATIC": Address, netmask, gateway, and DNS are statically configured.
   *
   *     - "STATIC_DHCP_DNS": Static address, netmask, and gateway, with DNS obtained via DHCP.
   * @enum {string|null}
   */
  addressType?:
    | "DHCP"
    | "DHCP_STATIC_DNS"
    | "STATIC"
    | "STATIC_DHCP_DNS"
    | null;
  /**
   * @description A list of supported address types for this network interface,
   *     which can be changed if canSet is true.
   */
  addressTypes?:
    | ("DHCP" | "DHCP_STATIC_DNS" | "STATIC" | "STATIC_DHCP_DNS")[]
    | null;
  /**
   * @description Whether this interface's IPv4 configuration can be changed right now, given the
   *     device's current state. Independent of enabled and canEnable on the interface.
   */
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
  key?: string;
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
   * @description The adapter type of this interface.
   *     If the value of this field is "UNKNOWN",
   *     but wifi is non-null, "WIRELESS" will be inferred as the type.
   *
   *     A null value is equivalent to "UNKNOWN".
   *     - "UNKNOWN":
   *
   *     - "WIRED":
   *
   *     - "WIRELESS":
   * @enum {string|null}
   */
  adapterType?: "UNKNOWN" | "WIRED" | "WIRELESS" | null;
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
   *     - "DHCP": Address, netmask, gateway, and DNS are obtained via DHCP.
   *
   *     - "DHCP_STATIC_DNS": DHCP address, netmask, and gateway, with static DNS.
   *
   *     - "STATIC": Address, netmask, gateway, and DNS are statically configured.
   *
   *     - "STATIC_DHCP_DNS": Static address, netmask, and gateway, with DNS obtained via DHCP.
   * @enum {string}
   */
  addressType: "DHCP" | "DHCP_STATIC_DNS" | "STATIC" | "STATIC_DHCP_DNS";
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
  /** @description A unique stable identifier for this profile. */
  id?: string;
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
export type RPCMethod =
  | DispatchAuthenticationPrompt
  | DispatchFirmwareUpdate
  | DispatchPowerReboot
  | GetAuthentication
  | GetFirmware
  | GetImageSettings
  | GetMetadata
  | GetNetwork
  | GetPower
  | GetProfiles
  | GetSddp
  | GetSnmp
  | GetSnmpCredentials
  | GetSystem
  | SetAuthentication
  | SetNetworkConfig
  | SetSDDPEnabled
  | SetSNMPCredentials
  | SetSNMPEnabled;
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
export type RPCSuccessResponse =
  | DispatchAuthenticationPromptResponse
  | DispatchFirmwareUpdateResponse
  | DispatchPowerRebootResponse
  | GetAuthenticationResponse
  | GetFirmwareResponse
  | GetImageSettingsResponse
  | GetMetadataResponse
  | GetNetworkResponse
  | GetPowerResponse
  | GetProfilesResponse
  | GetSddpResponse
  | GetSnmpResponse
  | GetSnmpCredentialsResponse
  | GetSystemResponse
  | SetAuthenticationResponse
  | SetNetworkConfigResponse
  | SetSDDPEnabledResponse
  | SetSNMPCredentialsResponse
  | SetSNMPEnabledResponse;
export type SDDP = {
  /**
   * @description Whether SDDP can be enabled or disabled right now.
   *     Null indicates the integration does not support enabling or disabling SDDP.
   */
  canSetEnabled?: boolean | null;
  enabled?: boolean;
};
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
  includeFields?: ("id" | "label" | "valid" | "fields")[];
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
export type SetSDDPEnabled = RPCRequestBase & {
  /** @enum {string} */
  method: "setSDDPEnabled";
  params: SetSDDPEnabledParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSDDPEnabled";
};
export type SetSDDPEnabledArgs = {
  enabled: boolean;
};
export type SetSDDPEnabledParams = {
  args: SetSDDPEnabledArgs;
  includeFields?: ("enabled" | "canSetEnabled")[];
};
export type SetSDDPEnabledResponse = RPCMethodResult & {
  result?: SetSDDPEnabledResult;
};
export type SetSDDPEnabledResult = SDDP;
export type SetSNMPCredentials = RPCRequestBase & {
  /** @enum {string} */
  method: "setSNMPCredentials";
  params: SetSNMPCredentialsParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSNMPCredentials";
};
export type SetSNMPCredentialsArgs = {
  input: SNMPCredentialsInput;
};
export type SetSNMPCredentialsParams = {
  args: SetSNMPCredentialsArgs;
  includeFields?: (
    | "enabled"
    | "canSetEnabled"
    | "canSetCredentials"
    | "v2"
    | "v3"
  )[];
};
export type SetSNMPCredentialsResponse = RPCMethodResult & {
  result?: SetSNMPCredentialsResult;
};
export type SetSNMPCredentialsResult = SNMP;
export type SetSNMPEnabled = RPCRequestBase & {
  /** @enum {string} */
  method: "setSNMPEnabled";
  params: SetSNMPEnabledParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSNMPEnabled";
};
export type SetSNMPEnabledArgs = {
  input: SNMPEnabledInput;
};
export type SetSNMPEnabledParams = {
  args: SetSNMPEnabledArgs;
  includeFields?: (
    | "enabled"
    | "canSetEnabled"
    | "canSetCredentials"
    | "v2"
    | "v3"
  )[];
};
export type SetSNMPEnabledResponse = RPCMethodResult & {
  result?: SetSNMPEnabledResult;
};
export type SetSNMPEnabledResult = SNMP;
/** @description The device's SNMP agent configuration. */
export type SNMP = {
  /**
   * @description Whether communities and v3 users can be changed right now.
   *     Null indicates the integration does not support setting SNMP credentials.
   */
  canSetCredentials?: boolean | null;
  /**
   * @description Whether SNMP can be enabled or disabled right now.
   *     Null indicates the integration does not support enabling or disabling SNMP.
   */
  canSetEnabled?: boolean | null;
  /**
   * @description Whether the SNMP agent is enabled.
   *     Null if the device has no global toggle; see v2.enabled and v3.enabled.
   */
  enabled?: boolean | null;
  /** @description SNMPv1/v2c settings. Null if the device does not support v1/v2c. */
  v2?: SNMPv2 | null;
  /** @description SNMPv3 settings. Null if the device does not support v3. */
  v3?: SNMPv3 | null;
};
/** @description A secret value, such as a community string or passphrase. */
export type SNMPCredential = {
  credentialType?: AuthenticationFieldCredentialType;
  /** @description Null if the device does not expose the value. */
  value?: string | null;
};
export type SNMPCredentialInput = {
  /** @description Null keeps the current value. */
  value?: string | null;
};
/** @description SNMP secrets. Served live from the device, never cached. */
export type SNMPCredentials = {
  /** @description Null if read-only v1/v2c access is not configured. */
  v2ReadCommunity?: SNMPCredential | null;
  /** @description Null if read-write v1/v2c access is not configured. */
  v2WriteCommunity?: SNMPCredential | null;
  /** @description Null if the v3 read-only user is not configured. */
  v3ReadUser?: SNMPv3UserCredentials | null;
  /** @description Null if the v3 read-write user is not configured. */
  v3WriteUser?: SNMPv3UserCredentials | null;
};
export type SNMPCredentialsInput = {
  /** @description Null leaves the v1/v2c communities unchanged. */
  v2?: SNMPv2CredentialsInput | null;
  /** @description Null leaves the v3 users unchanged. */
  v3?: SNMPv3UsersInput | null;
};
/** @description Null fields are left unchanged. */
export type SNMPEnabledInput = {
  enabled?: boolean | null;
  v2Enabled?: boolean | null;
  v3Enabled?: boolean | null;
};
export type SNMPv2 = {
  enabled?: boolean;
  /** @description Whether a read-only community is configured. */
  readAccess?: boolean;
  /** @description Whether a read-write community is configured. */
  writeAccess?: boolean;
};
/** @description Replaces the v1/v2c communities. */
export type SNMPv2CredentialsInput = {
  /** @description Null removes read-only access. */
  readCommunity?: SNMPCredentialInput | null;
  /** @description Null removes read-write access. */
  writeCommunity?: SNMPCredentialInput | null;
};
export type SNMPv3 = {
  /** @description The authentication protocols this device supports. */
  authProtocols?:
    | ("MD5" | "SHA" | "SHA224" | "SHA256" | "SHA384" | "SHA512")[]
    | null;
  enabled?: boolean;
  /** @description The privacy protocols this device supports. */
  privProtocols?:
    | ("DES" | "TRIPLE_DES" | "AES128" | "AES192" | "AES256")[]
    | null;
  /** @description The user granted read-only access. Null if not configured. */
  readUser?: SNMPv3User | null;
  /** @description The user granted read-write access. Null if not configured. */
  writeUser?: SNMPv3User | null;
};
export type SNMPv3User = {
  /**
   * @description Null indicates no authentication.
   *     - "MD5":
   *
   *     - "SHA":
   *
   *     - "SHA224":
   *
   *     - "SHA256":
   *
   *     - "SHA384":
   *
   *     - "SHA512":
   * @enum {string|null}
   */
  authProtocol?:
    | "MD5"
    | "SHA"
    | "SHA224"
    | "SHA256"
    | "SHA384"
    | "SHA512"
    | null;
  /**
   * @description Null indicates no encryption. Requires authProtocol.
   *     - "DES":
   *
   *     - "TRIPLE_DES":
   *
   *     - "AES128":
   *
   *     - "AES192":
   *
   *     - "AES256":
   * @enum {string|null}
   */
  privProtocol?: "DES" | "TRIPLE_DES" | "AES128" | "AES192" | "AES256" | null;
  username?: string;
};
export type SNMPv3UserCredentials = {
  authPassphrase?: SNMPCredential | null;
  privPassphrase?: SNMPCredential | null;
};
export type SNMPv3UserInput = {
  /**
   * @description Null keeps the current value.
   *     Required when authProtocol changes or the user is new.
   */
  authPassphrase?: string | null;
  /**
   * @description Null disables authentication.
   *     - "MD5":
   *
   *     - "SHA":
   *
   *     - "SHA224":
   *
   *     - "SHA256":
   *
   *     - "SHA384":
   *
   *     - "SHA512":
   * @enum {string|null}
   */
  authProtocol?:
    | "MD5"
    | "SHA"
    | "SHA224"
    | "SHA256"
    | "SHA384"
    | "SHA512"
    | null;
  /**
   * @description Null keeps the current value.
   *     Required when privProtocol changes or the user is new.
   */
  privPassphrase?: string | null;
  /**
   * @description Null disables encryption. Requires authProtocol.
   *     - "DES":
   *
   *     - "TRIPLE_DES":
   *
   *     - "AES128":
   *
   *     - "AES192":
   *
   *     - "AES256":
   * @enum {string|null}
   */
  privProtocol?: "DES" | "TRIPLE_DES" | "AES128" | "AES192" | "AES256" | null;
  username: string;
};
/** @description Replaces the v3 users. */
export type SNMPv3UsersInput = {
  /** @description Null removes the read-only user. */
  readUser?: SNMPv3UserInput | null;
  /** @description Null removes the read-write user. */
  writeUser?: SNMPv3UserInput | null;
};
/** @description System metadata reported by the camera. */
export type System = {
  /** @description Brand reported by the camera. */
  brand?: string | null;
  /** @description The name, email or both of who to contact about the device. */
  contactInformation?: string | null;
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
   * A short description of the authentication method. For example: "Local Network Authentication", "Cloud Authentication", etc...
   * This will be displayed to the user.
   */
  label?:
    | ((args: DispatchAuthenticationPromptArgs) => Promise<string>)
    | string;
  /**
   * Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
   * There is no way to report the validity of an individual field within the authentication method itself.
   */
  valid?:
    | ((args: DispatchAuthenticationPromptArgs) => Promise<boolean>)
    | boolean;
  /**
   * A list of authentication fields required for this authentication method. Each field has a type that indicates how the value should be obtained or set.
   */
  fields?:
    | ((
        args: DispatchAuthenticationPromptArgs,
      ) => Promise<AuthenticationField[] | null>)
    | AuthenticationField[]
    | null;
};

export type methodDispatchAuthenticationPrompt = (
  params: DispatchAuthenticationPromptParams,
) => Promise<methodDispatchAuthenticationPromptResult>;
export type methodDispatchFirmwareUpdateResult = {
  version?:
    | ((args: DispatchFirmwareUpdateArgs) => Promise<FirmwareVersion | null>)
    | FirmwareVersion
    | null;

  status?:
    | ((args: DispatchFirmwareUpdateArgs) => Promise<FirmwareStatus>)
    | FirmwareStatus;
};

export type methodDispatchFirmwareUpdate = (
  params: DispatchFirmwareUpdateParams,
) => Promise<methodDispatchFirmwareUpdateResult>;
export type methodDispatchPowerRebootResult = DispatchPowerRebootResult;

export type methodDispatchPowerReboot = (
  params: DispatchPowerRebootParams,
) => Promise<methodDispatchPowerRebootResult>;
export type methodGetAuthenticationResult = {
  /**
   * A list of authentication methods required or
   * available for a user to use.
   */
  methods?:
    | ((args: GetAuthenticationArgs) => Promise<Authentication[] | null>)
    | Authentication[]
    | null;
};

export type methodGetAuthentication = (
  params: GetAuthenticationParams,
) => Promise<methodGetAuthenticationResult>;
export type methodGetFirmwareResult = {
  version?:
    | ((args: GetFirmwareArgs) => Promise<FirmwareVersion | null>)
    | FirmwareVersion
    | null;

  status?:
    | ((args: GetFirmwareArgs) => Promise<FirmwareStatus>)
    | FirmwareStatus;
};

export type methodGetFirmware = (
  params: GetFirmwareParams,
) => Promise<methodGetFirmwareResult>;
export type methodGetImageSettingsResult = {
  /**
   * A list of physical sources on the camera.
   */
  sources?:
    | ((args: GetImageSettingsArgs) => Promise<ImageSettingsSource[] | null>)
    | ImageSettingsSource[]
    | null;
};

export type methodGetImageSettings = (
  params: GetImageSettingsParams,
) => Promise<methodGetImageSettingsResult>;
export type methodGetMetadataResult = {
  /**
   * Format: uri
   */
  userManualURL?:
    | ((args: GetMetadataArgs) => Promise<string | null>)
    | string
    | null;
  /**
   * Format: uri
   */
  knowledgeBaseURL?:
    | ((args: GetMetadataArgs) => Promise<string | null>)
    | string
    | null;

  dataAcquisition?:
    | ((args: GetMetadataArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
};

export type methodGetMetadata = (
  params: GetMetadataParams,
) => Promise<methodGetMetadataResult>;
export type methodGetNetworkResult = {
  /**
   * A list of available network interfaces on the device, such as Wi-Fi adapters and Ethernet ports.
   */
  interfaces?:
    | ((args: GetNetworkArgs) => Promise<NetworkInterface[] | null>)
    | NetworkInterface[]
    | null;
};

export type methodGetNetwork = (
  params: GetNetworkParams,
) => Promise<methodGetNetworkResult>;
export type methodGetPowerResult = {
  /**
   * Indicates whether the camera supports a reboot action.
   */
  canReboot?:
    | ((args: GetPowerArgs) => Promise<boolean | null>)
    | boolean
    | null;
};

export type methodGetPower = (
  params: GetPowerParams,
) => Promise<methodGetPowerResult>;
export type methodGetProfilesResult = {
  /**
   * A list of configured streaming profiles on the camera.
   */
  available?:
    | ((args: GetProfilesArgs) => Promise<Profile[] | null>)
    | Profile[]
    | null;
};

export type methodGetProfiles = (
  params: GetProfilesParams,
) => Promise<methodGetProfilesResult>;
export type methodGetSddpResult = {
  enabled?: ((args: GetSddpArgs) => Promise<boolean>) | boolean;
  /**
   * Whether SDDP can be enabled or disabled right now.
   * Null indicates the integration does not support enabling or disabling SDDP.
   */
  canSetEnabled?:
    | ((args: GetSddpArgs) => Promise<boolean | null>)
    | boolean
    | null;
};

export type methodGetSddp = (
  params: GetSddpParams,
) => Promise<methodGetSddpResult>;
export type methodGetSnmpResult = {
  /**
   * Whether the SNMP agent is enabled.
   * Null if the device has no global toggle; see v2.enabled and v3.enabled.
   */
  enabled?: ((args: GetSnmpArgs) => Promise<boolean | null>) | boolean | null;
  /**
   * Whether SNMP can be enabled or disabled right now.
   * Null indicates the integration does not support enabling or disabling SNMP.
   */
  canSetEnabled?:
    | ((args: GetSnmpArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * Whether communities and v3 users can be changed right now.
   * Null indicates the integration does not support setting SNMP credentials.
   */
  canSetCredentials?:
    | ((args: GetSnmpArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * SNMPv1/v2c settings. Null if the device does not support v1/v2c.
   */
  v2?: ((args: GetSnmpArgs) => Promise<SNMPv2 | null>) | SNMPv2 | null;
  /**
   * SNMPv3 settings. Null if the device does not support v3.
   */
  v3?: ((args: GetSnmpArgs) => Promise<SNMPv3 | null>) | SNMPv3 | null;
};

export type methodGetSnmp = (
  params: GetSnmpParams,
) => Promise<methodGetSnmpResult>;
export type methodGetSnmpCredentialsResult = {
  /**
   * Null if read-only v1/v2c access is not configured.
   */
  v2ReadCommunity?:
    | ((args: GetSnmpCredentialsArgs) => Promise<SNMPCredential | null>)
    | SNMPCredential
    | null;
  /**
   * Null if read-write v1/v2c access is not configured.
   */
  v2WriteCommunity?:
    | ((args: GetSnmpCredentialsArgs) => Promise<SNMPCredential | null>)
    | SNMPCredential
    | null;
  /**
   * Null if the v3 read-only user is not configured.
   */
  v3ReadUser?:
    | ((args: GetSnmpCredentialsArgs) => Promise<SNMPv3UserCredentials | null>)
    | SNMPv3UserCredentials
    | null;
  /**
   * Null if the v3 read-write user is not configured.
   */
  v3WriteUser?:
    | ((args: GetSnmpCredentialsArgs) => Promise<SNMPv3UserCredentials | null>)
    | SNMPv3UserCredentials
    | null;
};

export type methodGetSnmpCredentials = (
  params: GetSnmpCredentialsParams,
) => Promise<methodGetSnmpCredentialsResult>;
export type methodGetSystemResult = {
  /**
   * The name, email or both of who to contact about the device.
   */
  contactInformation?:
    | ((args: GetSystemArgs) => Promise<string | null>)
    | string
    | null;
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
  serialNumber?:
    | ((args: GetSystemArgs) => Promise<string | null>)
    | string
    | null;
  /**
   * Date/time metadata reported by the camera.
   */
  dateTime?:
    | ((args: GetSystemArgs) => Promise<SystemDateTime | null>)
    | SystemDateTime
    | null;
};

export type methodGetSystem = (
  params: GetSystemParams,
) => Promise<methodGetSystemResult>;
export type methodSetAuthenticationResult = {
  /**
   * The unique identifier for this authentication method. This is used when setting authentication values.
   */
  id?: ((args: SetAuthenticationArgs) => Promise<string>) | string;
  /**
   * A short description of the authentication method. For example: "Local Network Authentication", "Cloud Authentication", etc...
   * This will be displayed to the user.
   */
  label?: ((args: SetAuthenticationArgs) => Promise<string>) | string;
  /**
   * Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
   * There is no way to report the validity of an individual field within the authentication method itself.
   */
  valid?: ((args: SetAuthenticationArgs) => Promise<boolean>) | boolean;
  /**
   * A list of authentication fields required for this authentication method. Each field has a type that indicates how the value should be obtained or set.
   */
  fields?:
    | ((args: SetAuthenticationArgs) => Promise<AuthenticationField[] | null>)
    | AuthenticationField[]
    | null;
};

export type methodSetAuthentication = (
  params: SetAuthenticationParams,
) => Promise<methodSetAuthenticationResult>;
export type methodSetNetworkConfigResult = {
  /**
   * A list of available network interfaces on the device, such as Wi-Fi adapters and Ethernet ports.
   */
  interfaces?:
    | ((args: SetNetworkConfigArgs) => Promise<NetworkInterface[] | null>)
    | NetworkInterface[]
    | null;
};

export type methodSetNetworkConfig = (
  params: SetNetworkConfigParams,
) => Promise<methodSetNetworkConfigResult>;
export type methodSetSDDPEnabledResult = {
  enabled?: ((args: SetSDDPEnabledArgs) => Promise<boolean>) | boolean;
  /**
   * Whether SDDP can be enabled or disabled right now.
   * Null indicates the integration does not support enabling or disabling SDDP.
   */
  canSetEnabled?:
    | ((args: SetSDDPEnabledArgs) => Promise<boolean | null>)
    | boolean
    | null;
};

export type methodSetSDDPEnabled = (
  params: SetSDDPEnabledParams,
) => Promise<methodSetSDDPEnabledResult>;
export type methodSetSNMPCredentialsResult = {
  /**
   * Whether the SNMP agent is enabled.
   * Null if the device has no global toggle; see v2.enabled and v3.enabled.
   */
  enabled?:
    | ((args: SetSNMPCredentialsArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * Whether SNMP can be enabled or disabled right now.
   * Null indicates the integration does not support enabling or disabling SNMP.
   */
  canSetEnabled?:
    | ((args: SetSNMPCredentialsArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * Whether communities and v3 users can be changed right now.
   * Null indicates the integration does not support setting SNMP credentials.
   */
  canSetCredentials?:
    | ((args: SetSNMPCredentialsArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * SNMPv1/v2c settings. Null if the device does not support v1/v2c.
   */
  v2?:
    | ((args: SetSNMPCredentialsArgs) => Promise<SNMPv2 | null>)
    | SNMPv2
    | null;
  /**
   * SNMPv3 settings. Null if the device does not support v3.
   */
  v3?:
    | ((args: SetSNMPCredentialsArgs) => Promise<SNMPv3 | null>)
    | SNMPv3
    | null;
};

export type methodSetSNMPCredentials = (
  params: SetSNMPCredentialsParams,
) => Promise<methodSetSNMPCredentialsResult>;
export type methodSetSNMPEnabledResult = {
  /**
   * Whether the SNMP agent is enabled.
   * Null if the device has no global toggle; see v2.enabled and v3.enabled.
   */
  enabled?:
    | ((args: SetSNMPEnabledArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * Whether SNMP can be enabled or disabled right now.
   * Null indicates the integration does not support enabling or disabling SNMP.
   */
  canSetEnabled?:
    | ((args: SetSNMPEnabledArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * Whether communities and v3 users can be changed right now.
   * Null indicates the integration does not support setting SNMP credentials.
   */
  canSetCredentials?:
    | ((args: SetSNMPEnabledArgs) => Promise<boolean | null>)
    | boolean
    | null;
  /**
   * SNMPv1/v2c settings. Null if the device does not support v1/v2c.
   */
  v2?: ((args: SetSNMPEnabledArgs) => Promise<SNMPv2 | null>) | SNMPv2 | null;
  /**
   * SNMPv3 settings. Null if the device does not support v3.
   */
  v3?: ((args: SetSNMPEnabledArgs) => Promise<SNMPv3 | null>) | SNMPv3 | null;
};

export type methodSetSNMPEnabled = (
  params: SetSNMPEnabledParams,
) => Promise<methodSetSNMPEnabledResult>;

export type Handler = {
  dispatchAuthenticationPrompt?: methodDispatchAuthenticationPrompt;

  dispatchFirmwareUpdate?: methodDispatchFirmwareUpdate;
  /**
   * Dispatch a device reboot. The integration should NOT wait until the reboot has completed.
   * The resulting boolean reflects whether the reboot was dispatched.
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

  getSddp?: methodGetSddp;

  getSnmp?: methodGetSnmp;

  getSnmpCredentials?: methodGetSnmpCredentials;
  /**
   * System-level metadata reported by the camera.
   */
  getSystem?: methodGetSystem;

  setAuthentication?: methodSetAuthentication;

  setNetworkConfig?: methodSetNetworkConfig;

  setSDDPEnabled?: methodSetSDDPEnabled;

  setSNMPCredentials?: methodSetSNMPCredentials;

  setSNMPEnabled?: methodSetSNMPEnabled;
};

//@ts-ignore
import { serveRpc as ovrcServeRpc } from "ovrc:rpc";

export async function serveRpc(handler: Handler) {
  await ovrcServeRpc(handler);
}
