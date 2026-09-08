---
title: Quick Start
---

## Prerequisites

- Install the OvrC CLI. Installation instructions and binaries can be found at: <https://github.com/snap-one/ovrc-integration>.
- Install [Node.js](https://nodejs.org/)
- An [OvrC account](https://app.ovrc.com), with a location containing a "Discovered" device.

## Scaffold a new integration

Providing necessary inputs to the user prompts,
run the following command:

```sh
npm create @ovrc/integration@latest
```

Upon successful creation, a new directory
will be created containing the newly created
integration. Navigate to that directory and run:

```sh
npm install
```

Finally, to ensure everything is functional,
run:

```sh
npm run build
```

Congrats, you've created your first integration!

## Serve the integration

As you develop and iterate on your integration,
you will need to run it to test it out in OvrC.
Additionally, OvrC provides useful tools to facilitate
quickly testing an integration against a device.

These tools are available when OvrC is launched in
"Integration Developer Mode".

To launch OvrC in Integration Developer Mode:

1. Build your integration (`npm run build`)
2. Start the OvrC development server by running:

   ```sh
   # note: ./dist is the default build directory
   # for a JavaScript integration. If yours is different,
   # update the command below accordingly.
   ovrc integration serve ./dist
   ```

When you run the above, three things happen:

1. A local integration development server is started.
2. The CLI will attempt to launch a browser[^browser-note],
   opening the local development UI.
   > [!NOTE]
   > If the browser does not automatically launch, simply copy and paste the URL printed to stdout in your favorite browser.
3. The developer UI will attempt to launch OvrC in Integration Developer Mode.
   > [!NOTE]
   > If OvrC does not automatically launch, you can launch it from the local development UI.

Within OvrC, navigate to a discovered device.
You will see a banner stating that the device's integration
needs to be authenticated.
Follow that banner to the authentication section of the device's configuration page.

You will see two authentication form fields.
In your integration's source code,
open the `src/index.ts` file.

Make some changes to the text, save them, then run `npm run build`.
You do not need to restart the OvrC CLI when you make changes to the integration.
Finally, back in the OvrC UI, refresh the page.
Your changes will be reflected in the UI.

Congrats! That's a functional OvrC Integration!

[^browser-note]: Only Chromium based browsers are currently supported.
