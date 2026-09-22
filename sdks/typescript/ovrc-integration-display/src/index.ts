/**
 * @description An active context of the device.
 *     For example, with picture-in-picture mode, there would be a minimum of 2 active contexts.
 *     I.e. a representation of currently used input(s), output(s), app(s), etc... on the device.
 */
export type ActiveContext = {
  /**
   * @description Indicates whether the device is capable of reporting the currently active input.
   *     When true, the input field will be populated with the active input–if there is an active input;
   *     when false, the input field should always be null and will be ignored.
   */
  canReportInput?: boolean;
  /**
   * @description Indicates whether the device is capable of reporting the currently active application/source.
   *     When true, the source field will be populated with the active application/source–if there is an active application;
   *     when false, the source field should always be null and will be ignored.
   */
  canReportSource?: boolean;
  /** @description The unique identifier for this context. */
  id?: string;
  /** @description The physical input that is currently active on the device. This may be null if there is no active input, or if the device does not report this information. */
  input?: Input | null;
  /**
   * @description The output(s) that are currently active on the device.
   *     This may be null or empty if there are no active outputs, or if the device does not report this information.
   *
   *     This would typically be a subset of outputs returned from getOutputs.
   */
  outputs?: Output[] | null;
  /**
   * @description The application/source that is currently active on the device.
   *     This does not include physical inputs, which are represented separately by the input field.
   *     If there is no active application/source, or the device does not report this information, this field may be null.
   */
  source?: AppSource | null;
};
export type ActiveContexts = {
  /**
   * @description A list of currently active display contexts.
   *     For many displays, this list will only ever contain a single item.
   */
  contexts?: ActiveContext[] | null;
};
export type AppSource = {
  canActivate?: boolean;
  canonicalId?: string | null;
  canTerminate?: boolean;
  friendlyName?: string;
  id?: string;
};
export type AppSources = {
  available?: AppSource[] | null;
  canTerminate?: boolean;
};
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
/** @description Stop an app source, such as Netflix. */
export type DispatchAppSourcesTerminate = RPCRequestBase & {
  /** @enum {string} */
  method: "dispatchAppSourcesTerminate";
  params: DispatchAppSourcesTerminateParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "dispatchAppSourcesTerminate";
};
export type DispatchAppSourcesTerminateArgs = {
  contextId: string;
  sourceId: string;
};
export type DispatchAppSourcesTerminateParams = {
  args: DispatchAppSourcesTerminateArgs;
  includeFields?: (
    | "id"
    | "source"
    | "canReportSource"
    | "input"
    | "canReportInput"
    | "outputs"
  )[];
};
export type DispatchAppSourcesTerminateResponse = RPCMethodResult & {
  result?: DispatchAppSourcesTerminateResult;
};
export type DispatchAppSourcesTerminateResult = ActiveContext;
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
  includeFields?: ("version" | "status")[];
};
export type DispatchFirmwareUpdateResponse = RPCMethodResult & {
  result?: DispatchFirmwareUpdateResult;
};
export type DispatchFirmwareUpdateResult = Firmware;
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
export type GetActiveContexts = RPCRequestBase & {
  /** @enum {string} */
  method: "getActiveContexts";
  params: GetActiveContextsParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getActiveContexts";
};
export type GetActiveContextsArgs = Record<string, unknown>;
export type GetActiveContextsParams = {
  args: GetActiveContextsArgs;
  includeFields?: "contexts"[];
};
export type GetActiveContextsResponse = RPCMethodResult & {
  result?: GetActiveContextsResult;
};
export type GetActiveContextsResult = ActiveContexts | null;
export type GetAppSources = RPCRequestBase & {
  /** @enum {string} */
  method: "getAppSources";
  params: GetAppSourcesParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getAppSources";
};
export type GetAppSourcesArgs = Record<string, unknown>;
export type GetAppSourcesParams = {
  args: GetAppSourcesArgs;
  includeFields?: ("canTerminate" | "available")[];
};
export type GetAppSourcesResponse = RPCMethodResult & {
  result?: GetAppSourcesResult;
};
export type GetAppSourcesResult = AppSources | null;
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
/** @description Firmware metadata reported by the device. */
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
export type GetInputs = RPCRequestBase & {
  /** @enum {string} */
  method: "getInputs";
  params: GetInputsParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getInputs";
};
export type GetInputsArgs = Record<string, unknown>;
export type GetInputsParams = {
  args: GetInputsArgs;
  includeFields?: ("available" | "cecMode" | "arcMode")[];
};
export type GetInputsResponse = RPCMethodResult & {
  result?: GetInputsResult;
};
export type GetInputsResult = Inputs | null;
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
/**
 * @description A list of outputs the display supports.
 *     See the outputs field within the ActiveContext type,
 *     which is communicates which of these outputs are
 *     currently in use.
 */
export type GetOutputs = RPCRequestBase & {
  /** @enum {string} */
  method: "getOutputs";
  params: GetOutputsParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getOutputs";
};
export type GetOutputsArgs = Record<string, unknown>;
export type GetOutputsParams = {
  args: GetOutputsArgs;
  includeFields?: ("available" | "allAudio")[];
};
export type GetOutputsResponse = RPCMethodResult & {
  result?: GetOutputsResult;
};
export type GetOutputsResult = Outputs | null;
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
  includeFields?: ("canReboot" | "state" | "powerSavingMode" | "wakeOnLAN")[];
};
export type GetPowerResponse = RPCMethodResult & {
  result?: GetPowerResult;
};
export type GetPowerResult = Power | null;
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
    | "friendlyName"
    | "label"
    | "language"
    | "country"
    | "model"
    | "brand"
    | "serialNumber"
  )[];
};
export type GetSystemResponse = RPCMethodResult & {
  result?: GetSystemResult;
};
export type GetSystemResult = System | null;
export type GetVideo = RPCRequestBase & {
  /** @enum {string} */
  method: "getVideo";
  params: GetVideoParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "getVideo";
};
export type GetVideoArgs = Record<string, unknown>;
export type GetVideoParams = {
  args: GetVideoArgs;
  includeFields?: (
    | "screenMute"
    | "aspectRatio"
    | "pictureMode"
    | "brightness"
    | "contrast"
    | "sharpness"
  )[];
};
export type GetVideoResponse = RPCMethodResult & {
  result?: GetVideoResult;
};
export type GetVideoResult = Video | null;
export type GlobalLabel = {
  canSet?: boolean;
  label?: string;
};
/** @description Input represents a physical input on the device, such as an HDMI port, a tuner, etc... */
export type Input = {
  /**
   * @description The active ARC mode for this input.
   *     This field is only populated if the display supports reporting the current ARC mode on a per-input basis.
   *     See the inputs object's arcMode field for more information.
   */
  arcMode?: KeyValuePair | null;
  /**
   * @description A list of ARC modes supported by this input.
   *     This field is only populated if the display supports reporting ARC modes on a per-input basis.
   *     See the inputs object's arcModes field for more information.
   */
  arcModes?: KeyValuePair[] | null;
  /**
   * @description Communicates whether this input can be selected as the active input.
   *     This value reflects the current state of the input, not the overall capability of the device or integration.
   *     For example, an HDMI input with no cable connected may have canActivate = false, even though the device supports activating that input.
   */
  canActivate?: boolean;
  /**
   * @description The active CEC mode for this input.
   *     This field is only populated if the display supports reporting the current CEC mode on a per-input basis.
   *     See the inputs object's cecMode field for more information.
   */
  cecMode?: KeyValuePair | null;
  /**
   * @description A list of CEC modes supported by this input.
   *     This field is only populated if the display supports reporting CEC modes on a per-input basis.
   *     See the inputs object's cecModes field for more information.
   */
  cecModes?: KeyValuePair[] | null;
  /**
   * @description Communicates whether a physical connection is detected on this input.
   *     If this value is not supported, it may be null or UNKNOWN.
   *     - "TRUE":
   *
   *     - "FALSE":
   *
   *     - "UNKNOWN":
   * @enum {string|null}
   */
  connectionPresent?: "TRUE" | "FALSE" | "UNKNOWN" | null;
  /**
   * @description The active connectionType for this input. Even if connectionTypes is empty
   *     or not supported, this field must be populated. For example a plain HDMI input
   *     may have the type "hdmi" and a canonicalId of "CONN:HDMI".
   */
  connectionType?: KeyValuePair;
  /**
   * @description A list of connection types that this input supports. For example: "COMPONENT vs or COMPOSITE" or "HDMI with Optical Audio".
   *     In many cases, this field is not applicable. In which case it may be null or empty.
   *     A non-empty list implies that the integration supports setting the input's connection type.
   */
  connectionTypes?: KeyValuePair[] | null;
  /**
   * @description A user-friendly name for this input.
   *     This value provides a consistent identifier for the input, regardless of the device's internal naming.
   *     For example: "HDMI1".
   */
  friendlyName?: string;
  /** @description The unique identifier for this input. This is used when setting the active input. */
  id?: string;
  /**
   * @description The input's label, as stored on the device itself. E.g. "Playstation", "Blu-ray", "Cable Box", etc...
   *     This is typically user-configurable on the device, and may be null if the device does not have a label for this input.
   */
  label?: Label | null;
  /**
   * @description Communicates whether an active signal can be detected on this input.
   *     If this value is not supported, it may be null or UNKNOWN.
   *     - "TRUE":
   *
   *     - "FALSE":
   *
   *     - "UNKNOWN":
   * @enum {string|null}
   */
  signalPresent?: "TRUE" | "FALSE" | "UNKNOWN" | null;
};
/** @description An object representing all physical inputs on the device, as well as any global input settings that may apply to all or some of the inputs. */
export type Inputs = {
  /** @description Global information about the displays' available and configured ARC modes. */
  arcMode?: InputsARCMode | null;
  /**
   * @description A list of physical inputs on the device.
   *     This may be null or empty if the device does not have any physical inputs,
   *     or if it does not support reporting them.
   */
  available?: Input[] | null;
  /** @description Global information about the display's available and configured CEC modes. */
  cecMode?: InputsCECMode | null;
};
export type InputsARCMode = {
  /**
   * @description If the display does not support reporting the current ARC mode on a per-input basis, this field may be populated with the active ARC mode.
   *     See the arcModes field for more information.
   */
  active?: KeyValuePair | null;
  /**
   * @description If the display does not support reporting ARC modes on a per-input basis, this field may be populated with the list of ARC modes the display supports.
   *     Typical modes might include "ARC", "eARC", or "Disabled".
   *
   *     If the display does support reporting ARC modes on a per-input basis, this field should be null,
   *     and the modes should be listed on the individual input(s) instead.
   */
  available?: KeyValuePair[] | null;
};
export type InputsCECMode = {
  /**
   * @description If the display does not support reporting the current CEC mode on a per-input basis, this field may be populated with the active CEC mode.
   *     See the cecModes field for more information.
   */
  active?: KeyValuePair | null;
  /**
   * @description If the display does not support reporting CEC modes on a per-input basis, this field may be populated with the list of CEC modes the display supports.
   *     In many cases, this may be as simple "Enabled" or "Disabled".
   *
   *     If the display does support reporting CEC modes on a per-input basis, this field should be null,
   *     and the modes should be listed on the individual input(s) instead.
   */
  available?: KeyValuePair[] | null;
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
  key?: string;
};
export type Label = {
  canSet?: boolean;
  label?: string;
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
/**
 * @description An output represents a single audio channel which can be configured on the display.
 *     An integration may return multiple outputs (such as when the display supports configuring multiple output channels),
 *     but OvrC currently only uses the first output provided, if any.
 */
export type Output = {
  /**
   * @description The current state of audio on this output.
   *     This may be null if the audio output channel does not report audio,
   *     in which case the allAudio field on the outputs object should be used–if possible.
   */
  audio?: OutputAudio | null;
  /**
   * @description The active connectionType for this output. Even if connectionTypes is empty
   *     or not supported, this field must be populated.
   *     For example a TV output may have the type "Digital Optical" and a canonicalId of "CONN:OPTICAL",
   *     or "Internal Speaker" and a canonicalId of "CONN:INTERNAL".
   */
  connectionType?: KeyValuePair;
  /**
   * @description A list of connection types that this output supports.
   *     For example: "Digital Optical", "Digital Coax", "RCA", "eARC", "Aux Port".
   *     A non-null value implies that the integration supports setting the output's connection type.
   */
  connectionTypes?: KeyValuePair[] | null;
  /** @description Details regarding the current output channel's destination. */
  destination?: OutputDestination;
  /** @description A user-friendly name for this output. */
  friendlyName?: string;
  /** @description A unique identifier for this output. This is used when setting the active output. */
  id?: string;
};
/** @description Reports the audio status for an individual output, or the display as a whole (in the case of the outputs.allAudio field). */
export type OutputAudio = {
  /** @description The current audio format being streamed over this output. For example: "Dolby Atmos", "DTS:X", "PCM Stereo", etc... */
  format?: KeyValuePair | null;
  /**
   * @description Whether the audio is currently muted.
   *     This value should be null if the mute status cannot be known.
   */
  muted?: boolean | null;
  /**
   * @description The current volume level of the output or display.
   *     This value should be null if the volume level cannot be known.
   */
  volume?: Volume | null;
};
export type OutputDestination = {
  /**
   * @description The active destination for this output channel. Even if available is empty
   *     or not supported, this field must be populated.
   *     For example a TV output may have the destination "Digital Optical" and a canonicalId of "CONN:OPTICAL",
   *     or "Internal Speaker" and a canonicalId of "CONN:INTERNAL".
   */
  active?: KeyValuePair;
  /**
   * @description The current state of audio on this output destination.
   *     This may be null if the destiniation does not report audio,
   *     in which case the allAudio field on the outputs object should be used–if possible.
   */
  audio?: OutputAudio | null;
  /**
   * @description A list of output destiniations that the associated output channel can select from.
   *     For example: "Digital Optical", "Digital Coax", "RCA", "eARC - HDMI1", "Bluetooth: Bob's Headphones".
   */
  available?: KeyValuePair[] | null;
  /**
   * @description A boolean reflecting whether the current output destination's
   *     "active" destination can be changed to one of the options provided in "available".
   *
   *     A null value communicates selection is not enabled at the integration level,
   *     a false value communicates the device or output channel does not currently support the action,
   *     and a true value communicates selection is supported via the setOutputDestinationActive rpc method.
   */
  canSelectActive?: boolean | null;
};
export type Outputs = {
  /**
   * @description The current state of audio for the display as a whole.
   *     This should only be provided if the audio cannot be reported on a per-output basis.
   */
  allAudio?: OutputAudio | null;
  /**
   * @description A list of outputs the display has available.
   *     This may be null or empty if the available outputs cannot be retrieved from the device.
   */
  available?: Output[] | null;
};
export type Power = {
  /**
   * @description If non-null, denotes the integration supports the dispatchPowerReboot rpc method.
   *     A false value denotes the integration supports the dispatchPowerReboot rpc method,
   *     but the device cannot currently be rebooted.
   *     A true value denotes the integration supports the dispatchPowerReboot rpc method,
   *     and the device can be rebooted.
   */
  canReboot?: boolean | null;
  powerSavingMode?: PowerPowerSavingMode | null;
  state?: PowerPowerState | null;
  wakeOnLAN?: WakeOnLAN | null;
};
export type PowerPowerSavingMode = {
  active?: KeyValuePair | null;
  available?: KeyValuePair[] | null;
};
export type PowerPowerState = {
  /**
   * @description If non-null, denotes the integration supports
   *     the setPowerPowerState method.
   *     - "ON":
   *
   *     - "STANDBY":
   *
   *     - "OFF":
   * @enum {string|null}
   */
  allowedPowerState?: "ON" | "STANDBY" | "OFF" | null;
  /**
   * @description - "ON":
   *
   *     - "STANDBY":
   *
   *     - "UNKNOWN":
   * @enum {string|null}
   */
  current?: "ON" | "STANDBY" | "UNKNOWN" | null;
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
  | DispatchAppSourcesTerminate
  | DispatchAuthenticationPrompt
  | DispatchFirmwareUpdate
  | DispatchPowerReboot
  | GetActiveContexts
  | GetAppSources
  | GetAuthentication
  | GetFirmware
  | GetInputs
  | GetMetadata
  | GetNetwork
  | GetOutputs
  | GetPower
  | GetSystem
  | GetVideo
  | SetAppSourcesActive
  | SetAuthentication
  | SetInputARCMode
  | SetInputCECMode
  | SetInputConnectionType
  | SetInputLabel
  | SetInputsARCMode
  | SetInputsActive
  | SetInputsCECMode
  | SetNetworkConfig
  | SetOutputConnectionType
  | SetOutputDestinationActive
  | SetPowerPowerSavingMode
  | SetPowerState
  | SetPowerWakeOnLan
  | SetSystemCountry
  | SetSystemLabel
  | SetSystemLanguage
  | SetVideoAspectRatio
  | SetVideoPictureMode;
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
  | DispatchAppSourcesTerminateResponse
  | DispatchAuthenticationPromptResponse
  | DispatchFirmwareUpdateResponse
  | DispatchPowerRebootResponse
  | GetActiveContextsResponse
  | GetAppSourcesResponse
  | GetAuthenticationResponse
  | GetFirmwareResponse
  | GetInputsResponse
  | GetMetadataResponse
  | GetNetworkResponse
  | GetOutputsResponse
  | GetPowerResponse
  | GetSystemResponse
  | GetVideoResponse
  | SetAppSourcesActiveResponse
  | SetAuthenticationResponse
  | SetInputARCModeResponse
  | SetInputCECModeResponse
  | SetInputConnectionTypeResponse
  | SetInputLabelResponse
  | SetInputsARCModeResponse
  | SetInputsActiveResponse
  | SetInputsCECModeResponse
  | SetNetworkConfigResponse
  | SetOutputConnectionTypeResponse
  | SetOutputDestinationActiveResponse
  | SetPowerPowerSavingModeResponse
  | SetPowerStateResponse
  | SetPowerWakeOnLanResponse
  | SetSystemCountryResponse
  | SetSystemLabelResponse
  | SetSystemLanguageResponse
  | SetVideoAspectRatioResponse
  | SetVideoPictureModeResponse;
export type ScreenMute = {
  muted?: boolean;
};
/** @description Switch to an app source, such as Netflix. */
export type SetAppSourcesActive = RPCRequestBase & {
  /** @enum {string} */
  method: "setAppSourcesActive";
  params: SetAppSourcesActiveParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setAppSourcesActive";
};
export type SetAppSourcesActiveArgs = {
  contextId: string;
  sourceId: string;
};
export type SetAppSourcesActiveParams = {
  args: SetAppSourcesActiveArgs;
  includeFields?: (
    | "id"
    | "source"
    | "canReportSource"
    | "input"
    | "canReportInput"
    | "outputs"
  )[];
};
export type SetAppSourcesActiveResponse = RPCMethodResult & {
  result?: SetAppSourcesActiveResult;
};
export type SetAppSourcesActiveResult = ActiveContext;
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
/** @description Set the ARC mode for a specific input. */
export type SetInputARCMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputARCMode";
  params: SetInputARCModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputARCMode";
};
export type SetInputARCModeArgs = {
  inputId: string;
  modeId: string;
};
export type SetInputARCModeParams = {
  args: SetInputARCModeArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "label"
    | "canActivate"
    | "connectionTypes"
    | "connectionType"
    | "cecModes"
    | "cecMode"
    | "arcModes"
    | "arcMode"
    | "signalPresent"
    | "connectionPresent"
  )[];
};
export type SetInputARCModeResponse = RPCMethodResult & {
  result?: SetInputARCModeResult;
};
export type SetInputARCModeResult = Input;
/** @description Enable or disable CEC control for a specific input. */
export type SetInputCECMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputCECMode";
  params: SetInputCECModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputCECMode";
};
export type SetInputCECModeArgs = {
  inputId: string;
  modeId: string;
};
export type SetInputCECModeParams = {
  args: SetInputCECModeArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "label"
    | "canActivate"
    | "connectionTypes"
    | "connectionType"
    | "cecModes"
    | "cecMode"
    | "arcModes"
    | "arcMode"
    | "signalPresent"
    | "connectionPresent"
  )[];
};
export type SetInputCECModeResponse = RPCMethodResult & {
  result?: SetInputCECModeResult;
};
export type SetInputCECModeResult = Input;
/** @description Set the input port type, such as HDMI or DisplayPort. */
export type SetInputConnectionType = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputConnectionType";
  params: SetInputConnectionTypeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputConnectionType";
};
export type SetInputConnectionTypeArgs = {
  inputId: string;
  typeId: string;
};
export type SetInputConnectionTypeParams = {
  args: SetInputConnectionTypeArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "label"
    | "canActivate"
    | "connectionTypes"
    | "connectionType"
    | "cecModes"
    | "cecMode"
    | "arcModes"
    | "arcMode"
    | "signalPresent"
    | "connectionPresent"
  )[];
};
export type SetInputConnectionTypeResponse = RPCMethodResult & {
  result?: SetInputConnectionTypeResult;
};
export type SetInputConnectionTypeResult = Input;
/** @description Name an input, such as Apple TV or HDMI 1. */
export type SetInputLabel = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputLabel";
  params: SetInputLabelParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputLabel";
};
export type SetInputLabelArgs = {
  inputId: string;
  label: string;
};
export type SetInputLabelParams = {
  args: SetInputLabelArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "label"
    | "canActivate"
    | "connectionTypes"
    | "connectionType"
    | "cecModes"
    | "cecMode"
    | "arcModes"
    | "arcMode"
    | "signalPresent"
    | "connectionPresent"
  )[];
};
export type SetInputLabelResponse = RPCMethodResult & {
  result?: SetInputLabelResult;
};
export type SetInputLabelResult = Input;
/** @description Switch to a specific input, such as HDMI 1 or HDMI 2. */
export type SetInputsActive = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputsActive";
  params: SetInputsActiveParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputsActive";
};
export type SetInputsActiveArgs = {
  contextId: string;
  inputId: string;
};
export type SetInputsActiveParams = {
  args: SetInputsActiveArgs;
  includeFields?: (
    | "id"
    | "source"
    | "canReportSource"
    | "input"
    | "canReportInput"
    | "outputs"
  )[];
};
export type SetInputsActiveResponse = RPCMethodResult & {
  result?: SetInputsActiveResult;
};
export type SetInputsActiveResult = ActiveContext;
/**
 * @description Selects the target ARC mode for the display.
 *     This action only applies to integrations
 *     that expose arcModes only at the global level–not per input.
 *
 *     The per input method is setInputARCMode.
 */
export type SetInputsARCMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputsARCMode";
  params: SetInputsARCModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputsARCMode";
};
export type SetInputsARCModeArgs = {
  modeId: string;
};
export type SetInputsARCModeParams = {
  args: SetInputsARCModeArgs;
  includeFields?: ("available" | "active")[];
};
export type SetInputsARCModeResponse = RPCMethodResult & {
  result?: SetInputsARCModeResult;
};
export type SetInputsARCModeResult = InputsARCMode;
/**
 * @description Selects the target CEC mode for the display.
 *     This action only applies to integrations
 *     that expose cecModes only at the global level–not per input.
 *
 *     The per input method is setInputCECMode.
 */
export type SetInputsCECMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setInputsCECMode";
  params: SetInputsCECModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setInputsCECMode";
};
export type SetInputsCECModeArgs = {
  modeId: string;
};
export type SetInputsCECModeParams = {
  args: SetInputsCECModeArgs;
  includeFields?: ("available" | "active")[];
};
export type SetInputsCECModeResponse = RPCMethodResult & {
  result?: SetInputsCECModeResult;
};
export type SetInputsCECModeResult = InputsCECMode;
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
/** @description Output port type, such as HDMI or optical audio. */
export type SetOutputConnectionType = RPCRequestBase & {
  /** @enum {string} */
  method: "setOutputConnectionType";
  params: SetOutputConnectionTypeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setOutputConnectionType";
};
export type SetOutputConnectionTypeArgs = {
  outputId: string;
  typeId: string;
};
export type SetOutputConnectionTypeParams = {
  args: SetOutputConnectionTypeArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "connectionTypes"
    | "connectionType"
    | "destination"
    | "audio"
  )[];
};
export type SetOutputConnectionTypeResponse = RPCMethodResult & {
  result?: SetOutputConnectionTypeResult;
};
export type SetOutputConnectionTypeResult = Output;
/** @description Output port type, such as HDMI or optical audio. */
export type SetOutputDestinationActive = RPCRequestBase & {
  /** @enum {string} */
  method: "setOutputDestinationActive";
  params: SetOutputDestinationActiveParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setOutputDestinationActive";
};
export type SetOutputDestinationActiveArgs = {
  destinationId: string;
  outputId: string;
};
export type SetOutputDestinationActiveParams = {
  args: SetOutputDestinationActiveArgs;
  includeFields?: (
    | "id"
    | "friendlyName"
    | "connectionTypes"
    | "connectionType"
    | "destination"
    | "audio"
  )[];
};
export type SetOutputDestinationActiveResponse = RPCMethodResult & {
  result?: SetOutputDestinationActiveResult;
};
export type SetOutputDestinationActiveResult = Output;
/** @description Power-saving mode for the display, such as sleep. */
export type SetPowerPowerSavingMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setPowerPowerSavingMode";
  params: SetPowerPowerSavingModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setPowerPowerSavingMode";
};
export type SetPowerPowerSavingModeArgs = {
  modeId: string;
};
export type SetPowerPowerSavingModeParams = {
  args: SetPowerPowerSavingModeArgs;
  includeFields?: ("available" | "active")[];
};
export type SetPowerPowerSavingModeResponse = RPCMethodResult & {
  result?: SetPowerPowerSavingModeResult;
};
export type SetPowerPowerSavingModeResult = PowerPowerSavingMode;
/** @description Turn the display on, off, or wake it up. */
export type SetPowerState = RPCRequestBase & {
  /** @enum {string} */
  method: "setPowerState";
  params: SetPowerStateParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setPowerState";
};
export type SetPowerStateArgs = {
  /**
   * @description - "ON":
   *
   *     - "STANDBY":
   *
   *     - "OFF":
   * @enum {string}
   */
  state: "ON" | "STANDBY" | "OFF";
};
export type SetPowerStateParams = {
  args: SetPowerStateArgs;
  includeFields?: ("current" | "allowedPowerState")[];
};
export type SetPowerStateResponse = RPCMethodResult & {
  result?: SetPowerStateResult;
};
export type SetPowerStateResult = PowerPowerState;
export type SetPowerWakeOnLan = RPCRequestBase & {
  /** @enum {string} */
  method: "setPowerWakeOnLan";
  params: SetPowerWakeOnLanParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setPowerWakeOnLan";
};
export type SetPowerWakeOnLanArgs = {
  /**
   * @description - "ENABLED":
   *
   *     - "DISABLED":
   * @enum {string}
   */
  mode: "ENABLED" | "DISABLED";
};
export type SetPowerWakeOnLanParams = {
  args: SetPowerWakeOnLanArgs;
  includeFields?: ("mode" | "canSet")[];
};
export type SetPowerWakeOnLanResponse = RPCMethodResult & {
  result?: SetPowerWakeOnLanResult;
};
export type SetPowerWakeOnLanResult = WakeOnLAN;
/**
 * @description Sets the system country, providing a countryId
 *     from the list of available languages returned by
 *     getSystem.
 */
export type SetSystemCountry = RPCRequestBase & {
  /** @enum {string} */
  method: "setSystemCountry";
  params: SetSystemCountryParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSystemCountry";
};
export type SetSystemCountryArgs = {
  countryId: string;
};
export type SetSystemCountryParams = {
  args: SetSystemCountryArgs;
  includeFields?: ("available" | "active")[];
};
export type SetSystemCountryResponse = RPCMethodResult & {
  result?: SetSystemCountryResult;
};
export type SetSystemCountryResult = SystemCountry;
/** @description Sets the system label, when applicable (i.e. if getSystem denotes the integration supports setting the system label) */
export type SetSystemLabel = RPCRequestBase & {
  /** @enum {string} */
  method: "setSystemLabel";
  params: SetSystemLabelParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSystemLabel";
};
export type SetSystemLabelArgs = {
  label: string;
};
export type SetSystemLabelParams = {
  args: SetSystemLabelArgs;
  includeFields?: ("label" | "canSet")[];
};
export type SetSystemLabelResponse = RPCMethodResult & {
  result?: SetSystemLabelResult;
};
export type SetSystemLabelResult = GlobalLabel;
/**
 * @description Sets the system language, providing a languageId
 *     from the list of available languages returned by
 *     getSystem.
 */
export type SetSystemLanguage = RPCRequestBase & {
  /** @enum {string} */
  method: "setSystemLanguage";
  params: SetSystemLanguageParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setSystemLanguage";
};
export type SetSystemLanguageArgs = {
  languageId: string;
};
export type SetSystemLanguageParams = {
  args: SetSystemLanguageArgs;
  includeFields?: ("available" | "active")[];
};
export type SetSystemLanguageResponse = RPCMethodResult & {
  result?: SetSystemLanguageResult;
};
export type SetSystemLanguageResult = SystemLanguage;
export type SetVideoAspectRatio = RPCRequestBase & {
  /** @enum {string} */
  method: "setVideoAspectRatio";
  params: SetVideoAspectRatioParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setVideoAspectRatio";
};
export type SetVideoAspectRatioArgs = {
  aspectRatioId: string;
};
export type SetVideoAspectRatioParams = {
  args: SetVideoAspectRatioArgs;
  includeFields?: ("available" | "active")[];
};
export type SetVideoAspectRatioResponse = RPCMethodResult & {
  result?: SetVideoAspectRatioResult;
};
export type SetVideoAspectRatioResult = VideoAspectRatio;
export type SetVideoPictureMode = RPCRequestBase & {
  /** @enum {string} */
  method: "setVideoPictureMode";
  params: SetVideoPictureModeParams;
} & {
  /**
   * @description discriminator enum property added by openapi-typescript
   * @enum {string}
   */
  method: "setVideoPictureMode";
};
export type SetVideoPictureModeArgs = {
  modeId: string;
};
export type SetVideoPictureModeParams = {
  args: SetVideoPictureModeArgs;
  includeFields?: ("available" | "active")[];
};
export type SetVideoPictureModeResponse = RPCMethodResult & {
  result?: SetVideoPictureModeResult;
};
export type SetVideoPictureModeResult = VideoPictureMode;
export type System = {
  brand?: string | null;
  country?: SystemCountry | null;
  friendlyName?: string | null;
  label?: GlobalLabel | null;
  language?: SystemLanguage | null;
  model?: string | null;
  serialNumber?: string | null;
};
export type SystemCountry = {
  active?: KeyValuePair | null;
  available?: KeyValuePair[] | null;
};
export type SystemLanguage = {
  active?: KeyValuePair | null;
  available?: KeyValuePair[] | null;
};
export type Video = {
  aspectRatio?: VideoAspectRatio | null;
  brightness?: VideoLevel | null;
  contrast?: VideoLevel | null;
  pictureMode?: VideoPictureMode | null;
  screenMute?: ScreenMute | null;
  sharpness?: VideoLevel | null;
};
export type VideoAspectRatio = {
  active?: KeyValuePair | null;
  available?: KeyValuePair[] | null;
};
export type VideoLevel = {
  max?: number;
  min?: number;
  step?: number;
  value?: number;
};
export type VideoPictureMode = {
  active?: KeyValuePair | null;
  available?: KeyValuePair[] | null;
};
/** @description Represents the volume level of an external output, such as the TV speakers, an ARC-connected soundbar, or a headphone jack. */
export type Volume = {
  /** @description The current volume level, represented as an integer between min and max (inclusive). */
  level?: number;
  /** @description The maximum volume level supported by this output. This may be null if the display does not report a maximum volume level. */
  max?: number | null;
  /** @description The minimum volume level supported by this output. This may be null if the display does not report a minimum volume level. */
  min?: number | null;
  /**
   * @description An integer representing the step size for volume changes. For example, a step of 5 means that the volume
   *     is changed in increments of 5 (e.g. 0, 5, 10, 15, etc...). This may be null if the display does not report a volume step size.
   */
  step?: number | null;
};
export type WakeOnLAN = {
  canSet?: boolean;
  /**
   * @description - "ENABLED":
   *
   *     - "DISABLED":
   * @enum {string}
   */
  mode?: "ENABLED" | "DISABLED";
};
export type WifiInfo = {
  /** @description The SSID of the currently connected Wi-Fi network, if applicable. */
  ssid?: string | null;
};
export type methodDispatchAppSourcesTerminateResult = {
  /**
   * The unique identifier for this context.
   */
  id?: ((args: DispatchAppSourcesTerminateArgs) => Promise<string>) | string;
  /**
*
     * @description The application/source that is currently active on the device.
     *     This does not include physical inputs, which are represented separately by the input field.
     *     If there is no active application/source, or the device does not report this information, this field may be null.
     
*/
  source?:
    | ((args: DispatchAppSourcesTerminateArgs) => Promise<AppSource | null>)
    | AppSource
    | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active application/source.
     *     When true, the source field will be populated with the active application/source–if there is an active application;
     *     when false, the source field should always be null and will be ignored.
     
*/
  canReportSource?:
    | ((args: DispatchAppSourcesTerminateArgs) => Promise<boolean>)
    | boolean;
  /**
   * The physical input that is currently active on the device. This may be null if there is no active input, or if the device does not report this information.
   */
  input?:
    | ((args: DispatchAppSourcesTerminateArgs) => Promise<Input | null>)
    | Input
    | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active input.
     *     When true, the input field will be populated with the active input–if there is an active input;
     *     when false, the input field should always be null and will be ignored.
     
*/
  canReportInput?:
    | ((args: DispatchAppSourcesTerminateArgs) => Promise<boolean>)
    | boolean;
  /**
*
     * @description The output(s) that are currently active on the device.
     *     This may be null or empty if there are no active outputs, or if the device does not report this information.
     *
     *     This would typically be a subset of outputs returned from getOutputs.
     
*/
  outputs?:
    | ((args: DispatchAppSourcesTerminateArgs) => Promise<Output[] | null>)
    | Output[]
    | null;
};

export type methodDispatchAppSourcesTerminate = (
  params: DispatchAppSourcesTerminateParams,
) => Promise<methodDispatchAppSourcesTerminateResult>;
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
  label?:
    | ((args: DispatchAuthenticationPromptArgs) => Promise<string>)
    | string;
  /**
*
     * @description Reports the state of this authentication method. If false, one or more of the fields are missing or invalid.
     *     There is no way to report the validity of an individual field within the authentication method itself.
     
*/
  valid?:
    | ((args: DispatchAuthenticationPromptArgs) => Promise<boolean>)
    | boolean;
  /**
*
     * Format: uri
     * @description A url to documentation describing how to set/configure this authentication method.
     *     This is intended to be displayed to the user as guidance for how to obtain the necessary credentials or complete the necessary steps to successfully authenticate.
     
*/
  documentationURL?:
    | ((args: DispatchAuthenticationPromptArgs) => Promise<string | null>)
    | string
    | null;
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
export type methodGetActiveContextsResult = {
  /**
*
     * @description A list of currently active display contexts.
     *     For many displays, this list will only ever contain a single item.
     
*/
  contexts?:
    | ((args: GetActiveContextsArgs) => Promise<ActiveContext[] | null>)
    | ActiveContext[]
    | null;
};

export type methodGetActiveContexts = (
  params: GetActiveContextsParams,
) => Promise<methodGetActiveContextsResult>;
export type methodGetAppSourcesResult = {
  canTerminate?: ((args: GetAppSourcesArgs) => Promise<boolean>) | boolean;

  available?:
    | ((args: GetAppSourcesArgs) => Promise<AppSource[] | null>)
    | AppSource[]
    | null;
};

export type methodGetAppSources = (
  params: GetAppSourcesParams,
) => Promise<methodGetAppSourcesResult>;
export type methodGetAuthenticationResult = {
  /**
*
     * @description A list of authentication methods required or
     *     available for a user to use.
     
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
export type methodGetInputsResult = {
  /**
*
     * @description A list of physical inputs on the device.
     *     This may be null or empty if the device does not have any physical inputs,
     *     or if it does not support reporting them.
     
*/
  available?:
    | ((args: GetInputsArgs) => Promise<Input[] | null>)
    | Input[]
    | null;
  /**
   * Global information about the display's available and configured CEC modes.
   */
  cecMode?:
    | ((args: GetInputsArgs) => Promise<InputsCECMode | null>)
    | InputsCECMode
    | null;
  /**
   * Global information about the displays' available and configured ARC modes.
   */
  arcMode?:
    | ((args: GetInputsArgs) => Promise<InputsARCMode | null>)
    | InputsARCMode
    | null;
};

export type methodGetInputs = (
  params: GetInputsParams,
) => Promise<methodGetInputsResult>;
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
export type methodGetOutputsResult = {
  /**
*
     * @description A list of outputs the display has available.
     *     This may be null or empty if the available outputs cannot be retrieved from the device.
     
*/
  available?:
    | ((args: GetOutputsArgs) => Promise<Output[] | null>)
    | Output[]
    | null;
  /**
*
     * @description The current state of audio for the display as a whole.
     *     This should only be provided if the audio cannot be reported on a per-output basis.
     
*/
  allAudio?:
    | ((args: GetOutputsArgs) => Promise<OutputAudio | null>)
    | OutputAudio
    | null;
};

export type methodGetOutputs = (
  params: GetOutputsParams,
) => Promise<methodGetOutputsResult>;
export type methodGetPowerResult = {
  /**
*
     * @description If non-null, denotes the integration supports the dispatchPowerReboot rpc method.
     *     A false value denotes the integration supports the dispatchPowerReboot rpc method,
     *     but the device cannot currently be rebooted.
     *     A true value denotes the integration supports the dispatchPowerReboot rpc method,
     *     and the device can be rebooted.
     
*/
  canReboot?:
    | ((args: GetPowerArgs) => Promise<boolean | null>)
    | boolean
    | null;

  state?:
    | ((args: GetPowerArgs) => Promise<PowerPowerState | null>)
    | PowerPowerState
    | null;

  powerSavingMode?:
    | ((args: GetPowerArgs) => Promise<PowerPowerSavingMode | null>)
    | PowerPowerSavingMode
    | null;

  wakeOnLAN?:
    | ((args: GetPowerArgs) => Promise<WakeOnLAN | null>)
    | WakeOnLAN
    | null;
};

export type methodGetPower = (
  params: GetPowerParams,
) => Promise<methodGetPowerResult>;
export type methodGetSystemResult = {
  friendlyName?:
    | ((args: GetSystemArgs) => Promise<string | null>)
    | string
    | null;

  label?:
    | ((args: GetSystemArgs) => Promise<GlobalLabel | null>)
    | GlobalLabel
    | null;

  language?:
    | ((args: GetSystemArgs) => Promise<SystemLanguage | null>)
    | SystemLanguage
    | null;

  country?:
    | ((args: GetSystemArgs) => Promise<SystemCountry | null>)
    | SystemCountry
    | null;

  model?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;

  brand?: ((args: GetSystemArgs) => Promise<string | null>) | string | null;

  serialNumber?:
    | ((args: GetSystemArgs) => Promise<string | null>)
    | string
    | null;
};

export type methodGetSystem = (
  params: GetSystemParams,
) => Promise<methodGetSystemResult>;
export type methodGetVideoResult = {
  screenMute?:
    | ((args: GetVideoArgs) => Promise<ScreenMute | null>)
    | ScreenMute
    | null;

  aspectRatio?:
    | ((args: GetVideoArgs) => Promise<VideoAspectRatio | null>)
    | VideoAspectRatio
    | null;

  pictureMode?:
    | ((args: GetVideoArgs) => Promise<VideoPictureMode | null>)
    | VideoPictureMode
    | null;

  brightness?:
    | ((args: GetVideoArgs) => Promise<VideoLevel | null>)
    | VideoLevel
    | null;

  contrast?:
    | ((args: GetVideoArgs) => Promise<VideoLevel | null>)
    | VideoLevel
    | null;

  sharpness?:
    | ((args: GetVideoArgs) => Promise<VideoLevel | null>)
    | VideoLevel
    | null;
};

export type methodGetVideo = (
  params: GetVideoParams,
) => Promise<methodGetVideoResult>;
export type methodSetAppSourcesActiveResult = {
  /**
   * The unique identifier for this context.
   */
  id?: ((args: SetAppSourcesActiveArgs) => Promise<string>) | string;
  /**
*
     * @description The application/source that is currently active on the device.
     *     This does not include physical inputs, which are represented separately by the input field.
     *     If there is no active application/source, or the device does not report this information, this field may be null.
     
*/
  source?:
    | ((args: SetAppSourcesActiveArgs) => Promise<AppSource | null>)
    | AppSource
    | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active application/source.
     *     When true, the source field will be populated with the active application/source–if there is an active application;
     *     when false, the source field should always be null and will be ignored.
     
*/
  canReportSource?:
    | ((args: SetAppSourcesActiveArgs) => Promise<boolean>)
    | boolean;
  /**
   * The physical input that is currently active on the device. This may be null if there is no active input, or if the device does not report this information.
   */
  input?:
    | ((args: SetAppSourcesActiveArgs) => Promise<Input | null>)
    | Input
    | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active input.
     *     When true, the input field will be populated with the active input–if there is an active input;
     *     when false, the input field should always be null and will be ignored.
     
*/
  canReportInput?:
    | ((args: SetAppSourcesActiveArgs) => Promise<boolean>)
    | boolean;
  /**
*
     * @description The output(s) that are currently active on the device.
     *     This may be null or empty if there are no active outputs, or if the device does not report this information.
     *
     *     This would typically be a subset of outputs returned from getOutputs.
     
*/
  outputs?:
    | ((args: SetAppSourcesActiveArgs) => Promise<Output[] | null>)
    | Output[]
    | null;
};

export type methodSetAppSourcesActive = (
  params: SetAppSourcesActiveParams,
) => Promise<methodSetAppSourcesActiveResult>;
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
  documentationURL?:
    | ((args: SetAuthenticationArgs) => Promise<string | null>)
    | string
    | null;
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
export type methodSetInputARCModeResult = {
  /**
   * The unique identifier for this input. This is used when setting the active input.
   */
  id?: ((args: SetInputARCModeArgs) => Promise<string>) | string;
  /**
*
     * @description A user-friendly name for this input.
     *     This value provides a consistent identifier for the input, regardless of the device's internal naming.
     *     For example: "HDMI1".
     
*/
  friendlyName?: ((args: SetInputARCModeArgs) => Promise<string>) | string;
  /**
*
     * @description The input's label, as stored on the device itself. E.g. "Playstation", "Blu-ray", "Cable Box", etc...
     *     This is typically user-configurable on the device, and may be null if the device does not have a label for this input.
     
*/
  label?: ((args: SetInputARCModeArgs) => Promise<Label | null>) | Label | null;
  /**
*
     * @description Communicates whether this input can be selected as the active input.
     *     This value reflects the current state of the input, not the overall capability of the device or integration.
     *     For example, an HDMI input with no cable connected may have canActivate = false, even though the device supports activating that input.
     
*/
  canActivate?: ((args: SetInputARCModeArgs) => Promise<boolean>) | boolean;
  /**
*
     * @description A list of connection types that this input supports. For example: "COMPONENT vs or COMPOSITE" or "HDMI with Optical Audio".
     *     In many cases, this field is not applicable. In which case it may be null or empty.
     *     A non-empty list implies that the integration supports setting the input's connection type.
     
*/
  connectionTypes?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this input. Even if connectionTypes is empty
     *     or not supported, this field must be populated. For example a plain HDMI input
     *     may have the type "hdmi" and a canonicalId of "CONN:HDMI".
     
*/
  connectionType?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
*
     * @description A list of CEC modes supported by this input.
     *     This field is only populated if the display supports reporting CEC modes on a per-input basis.
     *     See the inputs object's cecModes field for more information.
     
*/
  cecModes?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active CEC mode for this input.
     *     This field is only populated if the display supports reporting the current CEC mode on a per-input basis.
     *     See the inputs object's cecMode field for more information.
     
*/
  cecMode?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description A list of ARC modes supported by this input.
     *     This field is only populated if the display supports reporting ARC modes on a per-input basis.
     *     See the inputs object's arcModes field for more information.
     
*/
  arcModes?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active ARC mode for this input.
     *     This field is only populated if the display supports reporting the current ARC mode on a per-input basis.
     *     See the inputs object's arcMode field for more information.
     
*/
  arcMode?:
    | ((args: SetInputARCModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description Communicates whether an active signal can be detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  signalPresent?:
    | ((
        args: SetInputARCModeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
  /**
*
     * @description Communicates whether a physical connection is detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  connectionPresent?:
    | ((
        args: SetInputARCModeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
};

export type methodSetInputARCMode = (
  params: SetInputARCModeParams,
) => Promise<methodSetInputARCModeResult>;
export type methodSetInputCECModeResult = {
  /**
   * The unique identifier for this input. This is used when setting the active input.
   */
  id?: ((args: SetInputCECModeArgs) => Promise<string>) | string;
  /**
*
     * @description A user-friendly name for this input.
     *     This value provides a consistent identifier for the input, regardless of the device's internal naming.
     *     For example: "HDMI1".
     
*/
  friendlyName?: ((args: SetInputCECModeArgs) => Promise<string>) | string;
  /**
*
     * @description The input's label, as stored on the device itself. E.g. "Playstation", "Blu-ray", "Cable Box", etc...
     *     This is typically user-configurable on the device, and may be null if the device does not have a label for this input.
     
*/
  label?: ((args: SetInputCECModeArgs) => Promise<Label | null>) | Label | null;
  /**
*
     * @description Communicates whether this input can be selected as the active input.
     *     This value reflects the current state of the input, not the overall capability of the device or integration.
     *     For example, an HDMI input with no cable connected may have canActivate = false, even though the device supports activating that input.
     
*/
  canActivate?: ((args: SetInputCECModeArgs) => Promise<boolean>) | boolean;
  /**
*
     * @description A list of connection types that this input supports. For example: "COMPONENT vs or COMPOSITE" or "HDMI with Optical Audio".
     *     In many cases, this field is not applicable. In which case it may be null or empty.
     *     A non-empty list implies that the integration supports setting the input's connection type.
     
*/
  connectionTypes?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this input. Even if connectionTypes is empty
     *     or not supported, this field must be populated. For example a plain HDMI input
     *     may have the type "hdmi" and a canonicalId of "CONN:HDMI".
     
*/
  connectionType?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
*
     * @description A list of CEC modes supported by this input.
     *     This field is only populated if the display supports reporting CEC modes on a per-input basis.
     *     See the inputs object's cecModes field for more information.
     
*/
  cecModes?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active CEC mode for this input.
     *     This field is only populated if the display supports reporting the current CEC mode on a per-input basis.
     *     See the inputs object's cecMode field for more information.
     
*/
  cecMode?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description A list of ARC modes supported by this input.
     *     This field is only populated if the display supports reporting ARC modes on a per-input basis.
     *     See the inputs object's arcModes field for more information.
     
*/
  arcModes?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active ARC mode for this input.
     *     This field is only populated if the display supports reporting the current ARC mode on a per-input basis.
     *     See the inputs object's arcMode field for more information.
     
*/
  arcMode?:
    | ((args: SetInputCECModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description Communicates whether an active signal can be detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  signalPresent?:
    | ((
        args: SetInputCECModeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
  /**
*
     * @description Communicates whether a physical connection is detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  connectionPresent?:
    | ((
        args: SetInputCECModeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
};

export type methodSetInputCECMode = (
  params: SetInputCECModeParams,
) => Promise<methodSetInputCECModeResult>;
export type methodSetInputConnectionTypeResult = {
  /**
   * The unique identifier for this input. This is used when setting the active input.
   */
  id?: ((args: SetInputConnectionTypeArgs) => Promise<string>) | string;
  /**
*
     * @description A user-friendly name for this input.
     *     This value provides a consistent identifier for the input, regardless of the device's internal naming.
     *     For example: "HDMI1".
     
*/
  friendlyName?:
    | ((args: SetInputConnectionTypeArgs) => Promise<string>)
    | string;
  /**
*
     * @description The input's label, as stored on the device itself. E.g. "Playstation", "Blu-ray", "Cable Box", etc...
     *     This is typically user-configurable on the device, and may be null if the device does not have a label for this input.
     
*/
  label?:
    | ((args: SetInputConnectionTypeArgs) => Promise<Label | null>)
    | Label
    | null;
  /**
*
     * @description Communicates whether this input can be selected as the active input.
     *     This value reflects the current state of the input, not the overall capability of the device or integration.
     *     For example, an HDMI input with no cable connected may have canActivate = false, even though the device supports activating that input.
     
*/
  canActivate?:
    | ((args: SetInputConnectionTypeArgs) => Promise<boolean>)
    | boolean;
  /**
*
     * @description A list of connection types that this input supports. For example: "COMPONENT vs or COMPOSITE" or "HDMI with Optical Audio".
     *     In many cases, this field is not applicable. In which case it may be null or empty.
     *     A non-empty list implies that the integration supports setting the input's connection type.
     
*/
  connectionTypes?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this input. Even if connectionTypes is empty
     *     or not supported, this field must be populated. For example a plain HDMI input
     *     may have the type "hdmi" and a canonicalId of "CONN:HDMI".
     
*/
  connectionType?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
*
     * @description A list of CEC modes supported by this input.
     *     This field is only populated if the display supports reporting CEC modes on a per-input basis.
     *     See the inputs object's cecModes field for more information.
     
*/
  cecModes?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active CEC mode for this input.
     *     This field is only populated if the display supports reporting the current CEC mode on a per-input basis.
     *     See the inputs object's cecMode field for more information.
     
*/
  cecMode?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description A list of ARC modes supported by this input.
     *     This field is only populated if the display supports reporting ARC modes on a per-input basis.
     *     See the inputs object's arcModes field for more information.
     
*/
  arcModes?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active ARC mode for this input.
     *     This field is only populated if the display supports reporting the current ARC mode on a per-input basis.
     *     See the inputs object's arcMode field for more information.
     
*/
  arcMode?:
    | ((args: SetInputConnectionTypeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description Communicates whether an active signal can be detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  signalPresent?:
    | ((
        args: SetInputConnectionTypeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
  /**
*
     * @description Communicates whether a physical connection is detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  connectionPresent?:
    | ((
        args: SetInputConnectionTypeArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
};

export type methodSetInputConnectionType = (
  params: SetInputConnectionTypeParams,
) => Promise<methodSetInputConnectionTypeResult>;
export type methodSetInputLabelResult = {
  /**
   * The unique identifier for this input. This is used when setting the active input.
   */
  id?: ((args: SetInputLabelArgs) => Promise<string>) | string;
  /**
*
     * @description A user-friendly name for this input.
     *     This value provides a consistent identifier for the input, regardless of the device's internal naming.
     *     For example: "HDMI1".
     
*/
  friendlyName?: ((args: SetInputLabelArgs) => Promise<string>) | string;
  /**
*
     * @description The input's label, as stored on the device itself. E.g. "Playstation", "Blu-ray", "Cable Box", etc...
     *     This is typically user-configurable on the device, and may be null if the device does not have a label for this input.
     
*/
  label?: ((args: SetInputLabelArgs) => Promise<Label | null>) | Label | null;
  /**
*
     * @description Communicates whether this input can be selected as the active input.
     *     This value reflects the current state of the input, not the overall capability of the device or integration.
     *     For example, an HDMI input with no cable connected may have canActivate = false, even though the device supports activating that input.
     
*/
  canActivate?: ((args: SetInputLabelArgs) => Promise<boolean>) | boolean;
  /**
*
     * @description A list of connection types that this input supports. For example: "COMPONENT vs or COMPOSITE" or "HDMI with Optical Audio".
     *     In many cases, this field is not applicable. In which case it may be null or empty.
     *     A non-empty list implies that the integration supports setting the input's connection type.
     
*/
  connectionTypes?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this input. Even if connectionTypes is empty
     *     or not supported, this field must be populated. For example a plain HDMI input
     *     may have the type "hdmi" and a canonicalId of "CONN:HDMI".
     
*/
  connectionType?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
*
     * @description A list of CEC modes supported by this input.
     *     This field is only populated if the display supports reporting CEC modes on a per-input basis.
     *     See the inputs object's cecModes field for more information.
     
*/
  cecModes?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active CEC mode for this input.
     *     This field is only populated if the display supports reporting the current CEC mode on a per-input basis.
     *     See the inputs object's cecMode field for more information.
     
*/
  cecMode?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description A list of ARC modes supported by this input.
     *     This field is only populated if the display supports reporting ARC modes on a per-input basis.
     *     See the inputs object's arcModes field for more information.
     
*/
  arcModes?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active ARC mode for this input.
     *     This field is only populated if the display supports reporting the current ARC mode on a per-input basis.
     *     See the inputs object's arcMode field for more information.
     
*/
  arcMode?:
    | ((args: SetInputLabelArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
  /**
*
     * @description Communicates whether an active signal can be detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  signalPresent?:
    | ((
        args: SetInputLabelArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
  /**
*
     * @description Communicates whether a physical connection is detected on this input.
     *     If this value is not supported, it may be null or UNKNOWN.
     *     - "TRUE":
     *
     *     - "FALSE":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  connectionPresent?:
    | ((
        args: SetInputLabelArgs,
      ) => Promise<"TRUE" | "FALSE" | "UNKNOWN" | null>)
    | "TRUE"
    | "FALSE"
    | "UNKNOWN"
    | null;
};

export type methodSetInputLabel = (
  params: SetInputLabelParams,
) => Promise<methodSetInputLabelResult>;
export type methodSetInputsARCModeResult = {
  /**
*
     * @description If the display does not support reporting ARC modes on a per-input basis, this field may be populated with the list of ARC modes the display supports.
     *     Typical modes might include "ARC", "eARC", or "Disabled".
     *
     *     If the display does support reporting ARC modes on a per-input basis, this field should be null,
     *     and the modes should be listed on the individual input(s) instead.
     
*/
  available?:
    | ((args: SetInputsARCModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description If the display does not support reporting the current ARC mode on a per-input basis, this field may be populated with the active ARC mode.
     *     See the arcModes field for more information.
     
*/
  active?:
    | ((args: SetInputsARCModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetInputsARCMode = (
  params: SetInputsARCModeParams,
) => Promise<methodSetInputsARCModeResult>;
export type methodSetInputsActiveResult = {
  /**
   * The unique identifier for this context.
   */
  id?: ((args: SetInputsActiveArgs) => Promise<string>) | string;
  /**
*
     * @description The application/source that is currently active on the device.
     *     This does not include physical inputs, which are represented separately by the input field.
     *     If there is no active application/source, or the device does not report this information, this field may be null.
     
*/
  source?:
    | ((args: SetInputsActiveArgs) => Promise<AppSource | null>)
    | AppSource
    | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active application/source.
     *     When true, the source field will be populated with the active application/source–if there is an active application;
     *     when false, the source field should always be null and will be ignored.
     
*/
  canReportSource?: ((args: SetInputsActiveArgs) => Promise<boolean>) | boolean;
  /**
   * The physical input that is currently active on the device. This may be null if there is no active input, or if the device does not report this information.
   */
  input?: ((args: SetInputsActiveArgs) => Promise<Input | null>) | Input | null;
  /**
*
     * @description Indicates whether the device is capable of reporting the currently active input.
     *     When true, the input field will be populated with the active input–if there is an active input;
     *     when false, the input field should always be null and will be ignored.
     
*/
  canReportInput?: ((args: SetInputsActiveArgs) => Promise<boolean>) | boolean;
  /**
*
     * @description The output(s) that are currently active on the device.
     *     This may be null or empty if there are no active outputs, or if the device does not report this information.
     *
     *     This would typically be a subset of outputs returned from getOutputs.
     
*/
  outputs?:
    | ((args: SetInputsActiveArgs) => Promise<Output[] | null>)
    | Output[]
    | null;
};

export type methodSetInputsActive = (
  params: SetInputsActiveParams,
) => Promise<methodSetInputsActiveResult>;
export type methodSetInputsCECModeResult = {
  /**
*
     * @description If the display does not support reporting CEC modes on a per-input basis, this field may be populated with the list of CEC modes the display supports.
     *     In many cases, this may be as simple "Enabled" or "Disabled".
     *
     *     If the display does support reporting CEC modes on a per-input basis, this field should be null,
     *     and the modes should be listed on the individual input(s) instead.
     
*/
  available?:
    | ((args: SetInputsCECModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description If the display does not support reporting the current CEC mode on a per-input basis, this field may be populated with the active CEC mode.
     *     See the cecModes field for more information.
     
*/
  active?:
    | ((args: SetInputsCECModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetInputsCECMode = (
  params: SetInputsCECModeParams,
) => Promise<methodSetInputsCECModeResult>;
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
export type methodSetOutputConnectionTypeResult = {
  /**
   * A unique identifier for this output. This is used when setting the active output.
   */
  id?: ((args: SetOutputConnectionTypeArgs) => Promise<string>) | string;
  /**
   * A user-friendly name for this output.
   */
  friendlyName?:
    | ((args: SetOutputConnectionTypeArgs) => Promise<string>)
    | string;
  /**
*
     * @description A list of connection types that this output supports.
     *     For example: "Digital Optical", "Digital Coax", "RCA", "eARC", "Aux Port".
     *     A non-null value implies that the integration supports setting the output's connection type.
     
*/
  connectionTypes?:
    | ((args: SetOutputConnectionTypeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this output. Even if connectionTypes is empty
     *     or not supported, this field must be populated.
     *     For example a TV output may have the type "Digital Optical" and a canonicalId of "CONN:OPTICAL",
     *     or "Internal Speaker" and a canonicalId of "CONN:INTERNAL".
     
*/
  connectionType?:
    | ((args: SetOutputConnectionTypeArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
   * Details regarding the current output channel's destination.
   */
  destination?:
    | ((args: SetOutputConnectionTypeArgs) => Promise<OutputDestination>)
    | OutputDestination;
  /**
*
     * @description The current state of audio on this output.
     *     This may be null if the audio output channel does not report audio,
     *     in which case the allAudio field on the outputs object should be used–if possible.
     
*/
  audio?:
    | ((args: SetOutputConnectionTypeArgs) => Promise<OutputAudio | null>)
    | OutputAudio
    | null;
};

export type methodSetOutputConnectionType = (
  params: SetOutputConnectionTypeParams,
) => Promise<methodSetOutputConnectionTypeResult>;
export type methodSetOutputDestinationActiveResult = {
  /**
   * A unique identifier for this output. This is used when setting the active output.
   */
  id?: ((args: SetOutputDestinationActiveArgs) => Promise<string>) | string;
  /**
   * A user-friendly name for this output.
   */
  friendlyName?:
    | ((args: SetOutputDestinationActiveArgs) => Promise<string>)
    | string;
  /**
*
     * @description A list of connection types that this output supports.
     *     For example: "Digital Optical", "Digital Coax", "RCA", "eARC", "Aux Port".
     *     A non-null value implies that the integration supports setting the output's connection type.
     
*/
  connectionTypes?:
    | ((args: SetOutputDestinationActiveArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;
  /**
*
     * @description The active connectionType for this output. Even if connectionTypes is empty
     *     or not supported, this field must be populated.
     *     For example a TV output may have the type "Digital Optical" and a canonicalId of "CONN:OPTICAL",
     *     or "Internal Speaker" and a canonicalId of "CONN:INTERNAL".
     
*/
  connectionType?:
    | ((args: SetOutputDestinationActiveArgs) => Promise<KeyValuePair>)
    | KeyValuePair;
  /**
   * Details regarding the current output channel's destination.
   */
  destination?:
    | ((args: SetOutputDestinationActiveArgs) => Promise<OutputDestination>)
    | OutputDestination;
  /**
*
     * @description The current state of audio on this output.
     *     This may be null if the audio output channel does not report audio,
     *     in which case the allAudio field on the outputs object should be used–if possible.
     
*/
  audio?:
    | ((args: SetOutputDestinationActiveArgs) => Promise<OutputAudio | null>)
    | OutputAudio
    | null;
};

export type methodSetOutputDestinationActive = (
  params: SetOutputDestinationActiveParams,
) => Promise<methodSetOutputDestinationActiveResult>;
export type methodSetPowerPowerSavingModeResult = {
  available?:
    | ((args: SetPowerPowerSavingModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;

  active?:
    | ((args: SetPowerPowerSavingModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetPowerPowerSavingMode = (
  params: SetPowerPowerSavingModeParams,
) => Promise<methodSetPowerPowerSavingModeResult>;
export type methodSetPowerStateResult = {
  /**
*
     * @description - "ON":
     *
     *     - "STANDBY":
     *
     *     - "UNKNOWN":
     * @enum {string|null}
     
*/
  current?:
    | ((
        args: SetPowerStateArgs,
      ) => Promise<"ON" | "STANDBY" | "UNKNOWN" | null>)
    | "ON"
    | "STANDBY"
    | "UNKNOWN"
    | null;
  /**
*
     * @description If non-null, denotes the integration supports
     *     the setPowerPowerState method.
     *     - "ON":
     *
     *     - "STANDBY":
     *
     *     - "OFF":
     * @enum {string|null}
     
*/
  allowedPowerState?:
    | ((args: SetPowerStateArgs) => Promise<"ON" | "STANDBY" | "OFF" | null>)
    | "ON"
    | "STANDBY"
    | "OFF"
    | null;
};

export type methodSetPowerState = (
  params: SetPowerStateParams,
) => Promise<methodSetPowerStateResult>;
export type methodSetPowerWakeOnLanResult = {
  /**
*
     * @description - "ENABLED":
     *
     *     - "DISABLED":
     * @enum {string}
     
*/
  mode?:
    | ((args: SetPowerWakeOnLanArgs) => Promise<"ENABLED" | "DISABLED">)
    | "ENABLED"
    | "DISABLED";

  canSet?: ((args: SetPowerWakeOnLanArgs) => Promise<boolean>) | boolean;
};

export type methodSetPowerWakeOnLan = (
  params: SetPowerWakeOnLanParams,
) => Promise<methodSetPowerWakeOnLanResult>;
export type methodSetSystemCountryResult = {
  available?:
    | ((args: SetSystemCountryArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;

  active?:
    | ((args: SetSystemCountryArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetSystemCountry = (
  params: SetSystemCountryParams,
) => Promise<methodSetSystemCountryResult>;
export type methodSetSystemLabelResult = {
  label?: ((args: SetSystemLabelArgs) => Promise<string>) | string;

  canSet?: ((args: SetSystemLabelArgs) => Promise<boolean>) | boolean;
};

export type methodSetSystemLabel = (
  params: SetSystemLabelParams,
) => Promise<methodSetSystemLabelResult>;
export type methodSetSystemLanguageResult = {
  available?:
    | ((args: SetSystemLanguageArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;

  active?:
    | ((args: SetSystemLanguageArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetSystemLanguage = (
  params: SetSystemLanguageParams,
) => Promise<methodSetSystemLanguageResult>;
export type methodSetVideoAspectRatioResult = {
  available?:
    | ((args: SetVideoAspectRatioArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;

  active?:
    | ((args: SetVideoAspectRatioArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetVideoAspectRatio = (
  params: SetVideoAspectRatioParams,
) => Promise<methodSetVideoAspectRatioResult>;
export type methodSetVideoPictureModeResult = {
  available?:
    | ((args: SetVideoPictureModeArgs) => Promise<KeyValuePair[] | null>)
    | KeyValuePair[]
    | null;

  active?:
    | ((args: SetVideoPictureModeArgs) => Promise<KeyValuePair | null>)
    | KeyValuePair
    | null;
};

export type methodSetVideoPictureMode = (
  params: SetVideoPictureModeParams,
) => Promise<methodSetVideoPictureModeResult>;

export type Handler = {
  /**
   * Stop an app source, such as Netflix.
   */
  dispatchAppSourcesTerminate?: methodDispatchAppSourcesTerminate;

  dispatchAuthenticationPrompt?: methodDispatchAuthenticationPrompt;

  dispatchFirmwareUpdate?: methodDispatchFirmwareUpdate;

  dispatchPowerReboot?: methodDispatchPowerReboot;

  getActiveContexts?: methodGetActiveContexts;

  getAppSources?: methodGetAppSources;
  /**
   * Authentication methods supported by the integration.
   */
  getAuthentication?: methodGetAuthentication;
  /**
   * Firmware metadata reported by the device.
   */
  getFirmware?: methodGetFirmware;

  getInputs?: methodGetInputs;

  getMetadata?: methodGetMetadata;

  getNetwork?: methodGetNetwork;
  /**
*
         * @description A list of outputs the display supports.
         *     See the outputs field within the ActiveContext type,
         *     which is communicates which of these outputs are
         *     currently in use.
         
*/
  getOutputs?: methodGetOutputs;

  getPower?: methodGetPower;

  getSystem?: methodGetSystem;

  getVideo?: methodGetVideo;
  /**
   * Switch to an app source, such as Netflix.
   */
  setAppSourcesActive?: methodSetAppSourcesActive;

  setAuthentication?: methodSetAuthentication;
  /**
   * Set the ARC mode for a specific input.
   */
  setInputARCMode?: methodSetInputARCMode;
  /**
   * Enable or disable CEC control for a specific input.
   */
  setInputCECMode?: methodSetInputCECMode;
  /**
   * Set the input port type, such as HDMI or DisplayPort.
   */
  setInputConnectionType?: methodSetInputConnectionType;
  /**
   * Name an input, such as Apple TV or HDMI 1.
   */
  setInputLabel?: methodSetInputLabel;
  /**
*
         * @description Selects the target ARC mode for the display.
         *     This action only applies to integrations
         *     that expose arcModes only at the global level–not per input.
         *
         *     The per input method is setInputARCMode.
         
*/
  setInputsARCMode?: methodSetInputsARCMode;
  /**
   * Switch to a specific input, such as HDMI 1 or HDMI 2.
   */
  setInputsActive?: methodSetInputsActive;
  /**
*
         * @description Selects the target CEC mode for the display.
         *     This action only applies to integrations
         *     that expose cecModes only at the global level–not per input.
         *
         *     The per input method is setInputCECMode.
         
*/
  setInputsCECMode?: methodSetInputsCECMode;

  setNetworkConfig?: methodSetNetworkConfig;
  /**
   * Output port type, such as HDMI or optical audio.
   */
  setOutputConnectionType?: methodSetOutputConnectionType;
  /**
   * Output port type, such as HDMI or optical audio.
   */
  setOutputDestinationActive?: methodSetOutputDestinationActive;
  /**
   * Power-saving mode for the display, such as sleep.
   */
  setPowerPowerSavingMode?: methodSetPowerPowerSavingMode;
  /**
   * Turn the display on, off, or wake it up.
   */
  setPowerState?: methodSetPowerState;

  setPowerWakeOnLan?: methodSetPowerWakeOnLan;
  /**
*
         * @description Sets the system country, providing a countryId
         *     from the list of available languages returned by
         *     getSystem.
         
*/
  setSystemCountry?: methodSetSystemCountry;
  /**
   * Sets the system label, when applicable (i.e. if getSystem denotes the integration supports setting the system label)
   */
  setSystemLabel?: methodSetSystemLabel;
  /**
*
         * @description Sets the system language, providing a languageId
         *     from the list of available languages returned by
         *     getSystem.
         
*/
  setSystemLanguage?: methodSetSystemLanguage;

  setVideoAspectRatio?: methodSetVideoAspectRatio;

  setVideoPictureMode?: methodSetVideoPictureMode;
};

//@ts-ignore
import { serveRpc as ovrcServeRpc } from "ovrc:rpc";

export async function serveRpc(handler: Handler) {
  await ovrcServeRpc(handler);
}
