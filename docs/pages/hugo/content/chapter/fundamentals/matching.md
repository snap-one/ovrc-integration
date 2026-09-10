---
title: Integration Matching
weight: 0
---

Once an integration has been authored and published, OvrC needs a way
to know when the integration should be suggested or automatically served
for a given device.

This is determined by reconciling discovery data received from a device against
the [discovery matchers](./manifest.md#identification) specified in the integration's `manifest.json` file.
