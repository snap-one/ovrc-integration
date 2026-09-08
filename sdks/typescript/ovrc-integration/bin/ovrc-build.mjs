#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import modules from "./modules.mjs";

const args = [
  ...process.argv.slice(2),
  ...modules.map((m) => `--external:${m}`),
];
const esbuild = createRequire(import.meta.url).resolve("esbuild/bin/esbuild");
process.exit(spawnSync(esbuild, args, { stdio: "inherit" }).status ?? 1);
