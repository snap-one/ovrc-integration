# OvrC Integrations

This repository contains types, documentation, and tools for developing OvrC Integration.

Developer documentation can be found at <https://snap-one.github.io/ovrc-integration>.

## CLI

A necessary tool for developing an integration is the `ovrc` CLI.
The CLI is only supported on Linux (including WSL) and Darwin OS currently.

The executable can be installed from the releases in this repository.

Once installed, move the executable somewhere within your `$PATH`.
Run `ovrc --help` to verify it's functional.

### MacOS

On MacOS, you will likely need to trust the executable. You can do this in your System Settings,
or by running `sudo xattr -rd com.apple.quarantine {path_to_executable}`.

### Enable Completions (optional)

To enable shell completions for the `ovrc` CLI,
follow the instructions found [here](https://cobra.dev/docs/how-to-guides/shell-completion/#shell-specific-configuration),
replacing "your-cli" with "ovrc", and following
the relevant instructions for your shell.
