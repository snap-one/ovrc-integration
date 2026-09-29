# {{projectName}}

An OvrC Integration, written in TypeScript.
Integration documentation can be found at <https://snap-one.github.io/ovrc-integration>.

## Development

### Build and run with OvrC CLI

1. Install the OvrC CLI, found at <https://github.com/snap-one/ovrc-integration>.
2. Install docker version 2.22.0 or later.
3. Run `ovrc integration serve` within the project root.

### Build with npm, run with OvrC CLI

1. Install Node.js.
2. Install the OvrC CLI, found at <https://github.com/snap-one/ovrc-integration>.
3. Run `npm run build`.
4. Run `ovrc integration serve ./dist`.

## RPC Handlers

Implement RPC methods by passing a handler object to `serveRpc`. Each method's
handler type (e.g. `methodGetSystem`) is exported by the integration package.

### Trust the type system for arguments

Once released, arguments passed to the integration are validated against
a JSON schema before a JSON-RPC method is invoked.
Accordingly, the type system can be relied upon to accurately
reflect what data may be passed to the integration.

### Lazy result fields

When a method returns an object, each top-level field can be either a value or
an async function. A top-level field's function is only invoked
when its field is listed in the request's `params.includeFields` array.
Unrequested fields are never computed. Each function receives the method's `args`.

```ts
const getSystem: methodGetSystem = async () => ({
  brand: "Acme", // plain values are always fine
  hostname: async () => fetchHostname(), // only runs if "hostname" is requested
  serialNumber: async () => fetchSerialNumber(),
});
```
