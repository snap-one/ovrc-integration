import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import Handlebars from "handlebars";
import { findHighestPackageVersion } from "./packages";

type TemplateArgs = {
  category: string;
  projectName: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

type CreateOptions = {
  category: string;
  projectName: string;
  dir: string;
};

export async function create({ category, dir, projectName }: CreateOptions) {
  const templateDir = join(import.meta.dirname, "template");
  async function listFiles(dir: string): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
          return listFiles(path);
        }
        return [path];
      }),
    );
    return files.flat();
  }

  const [
    ovrcIntegrationVersion,
    categoryPackageVersion,
    typescriptPackageVersion,
  ] = await Promise.all([
    findHighestPackageVersion("@snap-one/ovrc-integration"),
    findHighestPackageVersion(`@snap-one/ovrc-integration-${category}`),
    findHighestPackageVersion("typescript", "^6"),
  ]);

  const templateArgs: TemplateArgs = {
    projectName,
    category,
    dependencies: {
      [categoryPackageVersion.package]: categoryPackageVersion.version,
    },
    devDependencies: {
      [ovrcIntegrationVersion.package]: ovrcIntegrationVersion.version,
      [typescriptPackageVersion.package]: typescriptPackageVersion.version,
    },
  };

  // Parse each template file with Handlebars, render it with `templateArgs`, and
  // write the result into the current directory at the same relative path it had
  // within the template directory.
  for (const file of await listFiles(templateDir)) {
    const source = await readFile(file, "utf8");
    const template = Handlebars.compile(source);
    const rendered = template(templateArgs);

    const destination = join(process.cwd(), dir, relative(templateDir, file));
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, rendered);
  }
}
