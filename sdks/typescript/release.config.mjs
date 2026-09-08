// Shared by every package in this directory. Passed on the command line
// (`semantic-release -e semantic-release-monorepo -e ../release.config.mjs`)
// because semantic-release stops its config search at the package directory.
//
// semantic-release-monorepo supplies the other half: it scopes commit analysis
// to the package directory and namespaces the git tag, so a package is only
// released - and only bumped - when its own source changed.
import { readFileSync } from "node:fs";

// Loaded with the cwd set to the package being released.
const { name } = JSON.parse(readFileSync("package.json", "utf8"));

// @snap-one/foo -> @snap-one/ts-foo, matching the prefix the ts-release task
// uses for rc tags.
const tagName = name.includes("/") ? name.replace("/", "/ts-") : `ts-${name}`;

const preset = {
  preset: "conventionalcommits",
  presetConfig: {
    issuePrefixes: ["COMMERCIAL-"],
    issueUrlFormat: "https://jira.snapone.com/browse/{{prefix}}{{id}}",
  },
};

export default {
  branches: ["main"],
  // Overrides semantic-release-monorepo's `<name>-v<version>`. The ts- segment
  // namespaces these against the other release lines that tag this repo, and
  // the rc tags the ts-release task writes use the same shape.
  tagFormat: `${tagName}-v\${version}`,
  plugins: [
    ["@semantic-release/commit-analyzer", preset],
    ["@semantic-release/release-notes-generator", preset],
    // Writes the new version into package.json, then publishes. The `npm
    // publish` it runs fires each package's prepack script, which builds.
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: ["package.json"],
        message:
          "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
