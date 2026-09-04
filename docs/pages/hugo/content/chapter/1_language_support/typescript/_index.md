+++
title = "Typescript & Javascript"
+++

# Typescript & Javascript

## Quickstart

TODO

## Packages

To improve the OvrC integration developer experience, we provide Javascript packages.
These packages encapsulate both type-safety and expose useful functionality.

There are two kinds of packages:

1. "High level" packages, tailored to specific integration categories.
1. "Low level" packages, used either directly or indirectly for every integration.

In most cases, developers will prefer to use category-specific packages.
Typically, these packages do not need to explicitly added to a project.
The relevant packages are automatically added to a project
when `create-ovrc-integration` is used to [scaffold a new integration](#quickstart)
These packages may be installed with any package manager.
The examples demonstrate using `npm` for simplicity.

### Category Specific Packages ("high level")

{{< packages kind="high" >}}

### Generally applicable packages ("low level")

{{< packages kind="low" >}}
