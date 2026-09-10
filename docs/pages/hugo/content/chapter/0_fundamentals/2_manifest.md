---
title: Manifest
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

[^1]: currently supported extensions are: `js`.
