---
title: Typescript & Javascript
---

## Runtime

JavaScript integrations are executed in a custom, sandboxed, JavaScript runtime.
As a consequence, some globals, modules, and behaviors a JavaScript
developer is used to may not be supported within the integration runtime.

To assist in integration development, modules and globals exposed
by our runtime are published in a package.

Typically, one does not need to manually add the runtime package(s) to their integration project.
Relevant packages are automatically added to a project
when `@snap-one/create-ovrc-integration`[^1] is used to scaffold a new integration.

{{< typescript-packages kind="runtime" >}}

[^1]:
    The `@snap-one/create-ovrc-integration` package is used when `npm init @snap-one/create-ovrc-integration` is executed.
    See [npm-init docs](https://docs.npmjs.com/cli/v12/commands/npm-init) for details on how this works.

## Packages

To improve the OvrC Integration developer experience, we provide JavaScript packages,
specific to the device category the integration is targeting.

Typically, these packages do not need to explicitly added to a project.
The relevant packages are automatically added to a project
when `@snap-one/create-ovrc-integration`[^1] is used to scaffold a new integration.
These packages may be installed via any JavaScript package manager.

{{< typescript-packages kind="category" >}}
