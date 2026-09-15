---
title: Commonly Asked Questions
---

Listed here are a few commonly asked questions relating to integration development using Typescript.
If your question is not answered here, please open a new issue at <https://github.com/snap-one/ovrc-integration>.

{{% questionanswer `Why can't I use package "X"?` %}}
We are actively improving the JavaScript runtime in which JavaScript integrations are executed.
The runtime does not support, nor will it ever support, the entire Node.js standard library–or any other
popular JavaScript runtime standard library for that matter.

Many commonly used packages make assumptions related to the environment in which they are run.
Searching for alternative packages that are better designed is a good first step.
In some scenarios, options are few. Depending on the failures being observed, it may be possible
to address them by using [esbuild's alias feature](https://esbuild.github.io/api/#alias),
creating stub packages to address missing functionality.
{{% /questionanswer %}}
