---
title: Manifest
weight: 1
---

At its core, every OvrC Integration boils down to just two files:

- `integration.{ext}`[^1]
- `manifest.json`

The `manifest.json` file provides OvrC with information necessary
to properly run and expose an integration to users.
The full manifest.json JSON Schema definition can be found [here](https://github.com/snap-one/ovrc-integration/blob/main/schemas/json/manifest.schema.json).

Some of the fields and data the `manifest.json` file exposes include:

{{< manifest-fields >}}

## Manifest Fields

The following dives deeper into _some_ of the fields defined
in a `manifest.json` file.

### identification

The identification field contains data used to identify devices
with which the integration is compatible. See [matching](./matching.md) for
more details regarding identification and discovery.

One of the fields within the identification object is `discovery`.

The `discovery` field serves as a declarative mechanism
for matching an integration to a device, based on data
received from the device using common protocols.

Some examples of such protocols include: UPnP, SDDP, PJLink, etc...
The integration manifest must specify one or more discovery protocols.

The list of currently supported protocols/fields include:
{{< discovery-protocol-list >}}

## Manifest Testing

Tools for creating and testing a `manifest.json` file can be found within
the [OvrC Integration Developer Mode](./developer-mode.md).

[^1]: currently supported extensions are: `js`.
