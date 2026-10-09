---
title: Automated Testing
weight: 3
---

`ovrc integration test` launches a local JSON-RPC test server that executes
requests directly against an integration. It is intended to be driven by
automated tests, typically alongside a mock server standing in for the device.

```sh
ovrc integration test ./dist --device-ip 127.0.0.1
```

If no integration directory is given, the integration is built and watched,
the same as with `ovrc integration serve`. On startup, the server prints the
address it is listening on:

```text
test server is listening at http://127.0.0.1:PORT
```

## Differences From Developer Mode

Unlike [Developer Mode](./developer-mode.md), the test server:

- requires the `--device-ip` flag. All device connections made by the
  integration are directed at this address.
- does not validate requests or responses against the JSON schema.
- does not route any traffic through the OvrC interop API.
- keeps integration storage in a local file (see `--storage`).

## Flags

| Flag          | Default         | Description                                                            |
| ------------- | --------------- | ---------------------------------------------------------------------- |
| `--device-ip` | _required_      | IPv4 address used for all device connections. Typically a mock server. |
| `--port`      | `0`             | TCP port to listen on. `0` selects a random port.                      |
| `--storage`   | `test-store.db` | File path used for the local integration store.                        |

Run `ovrc integration test --help` to view the full list of available flags.

## Sending Requests

Requests are sent as `POST /` with a `Content-Type: application/json` header.
The body may be a single JSON-RPC request object or an array of them.
The response is **always** an array of JSON-RPC results, one per request.

```sh
curl -X POST http://127.0.0.1:PORT \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"ping","params":{"args":{"hello":"world"}}}'
```

```json
[{ "jsonrpc": "2.0", "id": 1, "result": { "pong": { "hello": "world" } } }]
```

Errors thrown by an integration method are returned as JSON-RPC errors within
the response array, with a `200` status. Other failures are returned as plain
text with a non-`200` status:

| Status | Cause                                                                                 |
| ------ | ------------------------------------------------------------------------------------- |
| `400`  | The `Content-Type` is not `application/json`, or the body is not a JSON object/array. |
| `500`  | The integration failed to execute, including exceeding the `--timeout`.               |

## Environment Variables

Every environment variable in the test server's process prefixed with `TEST_`
is passed to the integration.

Individual requests can add environment variables using headers prefixed with
`X-Env-`. Header names are converted to environment variable names by:

1. replacing the `X-Env-` prefix with `TEST_`.
2. replacing each `-` with `_`.
3. converting the name to upper case.

If a header is repeated, its first value is used. A header takes precedence
over a process environment variable of the same name.

For example, `X-Env-Mock-Mode: slow` is exposed to the integration as
`TEST_MOCK_MODE=slow`.

## Tracing and Storage

Every request runs under a trace ID, which is exposed to the integration as
`TEST_TRACE_ID`. The trace ID is also used as the request's device ID, so
integration storage is scoped to the trace.

By default, a unique trace ID is generated for each request, meaning every
request starts with empty storage. To let a series of requests observe each
other's changes to storage, send the same `X-Env-Trace-ID` header with each:

```sh
curl -X POST http://127.0.0.1:PORT \
  -H 'Content-Type: application/json' \
  -H 'X-Env-Trace-ID: run-1' \
  -d '{"jsonrpc":"2.0","id":1,"method":"..."}'
```

> [!TIP]
> Use a distinct trace ID per test case. Tests can then run in parallel
> against a single test server without their storage interfering.
