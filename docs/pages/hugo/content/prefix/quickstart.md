---
title: Quick Start
weight: 1
---

## Prerequisites

- Install the OvrC CLI. Installation instructions and binaries can be found at: <https://github.com/snap-one/ovrc-integration>.
- Install [Node.js](https://nodejs.org/)
- Install [Docker](https://docs.docker.com/engine/install/)
- Have access to an [OvrC account](https://app.ovrc.com), with a location containing a "Discovered" device accessible over your LAN.

## Scaffold a new integration

Providing necessary inputs to the user prompts,
run the following command:

```sh
npm init @snap-one/ovrc-integration@latest
```

Upon successful initialization, a new directory
will be created containing the new integration.

As you develop and iterate on your integration,
you will need to run it to test it out in OvrC.
Additionally, OvrC provides useful tools to facilitate
quickly testing an integration against a device.

These tools are available when OvrC is launched in
"Integration Developer Mode".

To launch OvrC in Integration Developer Mode:

Navigate to the root of your integration's directory and run:

```bash
ovrc integration serve
```

When you run the above, three things happen:

1. A local integration development server is started.
2. The CLI will attempt to launch a browser[^browser-note],
   opening the local development UI.
   > [!NOTE]
   > If the browser does not automatically launch, simply copy and paste the URL printed to stdout in your favorite browser.
3. The developer UI will attempt to launch OvrC in [Integration Developer Mode](../chapter/fundamentals/developer-mode.md).
   > [!NOTE]
   > If OvrC does not automatically launch, you can launch it from the local development UI.

Within OvrC, navigate to a discovered device.
You will see a banner stating that the device's integration
needs to be authenticated.
Follow that banner to the authentication section of the device's configuration page.

You will see two authentication form fields.
In your integration's source code,
open the `src/index.ts` file.

Make some changes to the text, save them.
You should see your integration being rebuilt in
the console output from the `ovrc integration serve` command.

Back in the OvrC UI, refresh the page.
Your changes will be reflected in the UI.

Congrats! That's a functional OvrC Integration!

[^browser-note]: Only Chromium based browsers are currently supported.
