#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import validatePackageName from "validate-npm-package-name";

import { resolve } from "node:path";
import packageJson from "../package.json";
import { existsSync } from "node:fs";
import { create } from "./create";

const deviceCategories = {
  Cameras: "camera",
  Displays: "display",
};

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .option(
    "-d, --dir <DIRECTORY>",
    "The directory in which to place generated files.",
  )
  .option(
    "-c, --category <CATEGORY>",
    "The device category this integration will target.",
    (value) => {
      const allowedValues = Object.values(deviceCategories);
      if (!allowedValues.includes(value)) {
        console.error(
          `invalid --category "${value}": allowed values are: \n${allowedValues.join("\n")}`,
        );
        process.exit(1);
      }
    },
  )
  .parse(process.argv);

const opts = program.opts<{ dir?: string; category?: string }>();

async function validateDir(dir: string) {
  const valid = validatePackageName(dir);
  if (!valid.validForNewPackages) {
    console.error(
      `\nInvalid package name "${dir}". Reasons: ${JSON.stringify([...(valid.errors ?? []), ...(valid.warnings ?? [])])}`,
    );
    process.exit(1);
  }

  const fullPath = resolve(dir);
  if (existsSync(fullPath)) {
    console.error(
      `\nCannot create project folder at path ${fullPath}, because it may clobber existing files.`,
    );
    process.exit(1);
  }
}

if (!opts.dir) {
  const result = await prompts({
    type: "text",
    name: "dir",
    message: "What is your integration named?",
    initial: "my-integration",
    validate: async (dir) => {
      await validateDir(dir);
      return true;
    },
  });

  if (!result.dir) process.exit(1);
  opts.dir = result.dir as string;
} else {
  await validateDir(opts.dir);
}

if (!opts.category) {
  const result = await prompts({
    type: "select",
    name: "category",
    message: "Which device category will your integration fall under?",
    choices: Object.entries(deviceCategories).map(([name, id]) => ({
      title: name,
      value: id,
    })),
  });

  if (!result.category) process.exit(1);
  opts.category = result.category as string;
}

await create({
  projectName: opts.dir,
  dir: opts.dir,
  category: opts.category,
});
