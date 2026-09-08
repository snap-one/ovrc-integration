import { describe, test, expect } from "bun:test";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, basename, extname } from "node:path";

const TESTS_DIR = import.meta.dir,
  CODEGEN_DIR = join(TESTS_DIR, ".."),
  INDEX = join(CODEGEN_DIR, "index.ts"),
  TEMPLATE = join(CODEGEN_DIR, "templates", "rpc-method.hbs"),
  CASES_DIR = join(TESTS_DIR, "cases"),
  GOLDEN_DIR = join(TESTS_DIR, "golden");

const UPDATE =
  process.env.UPDATE_GOLDEN === "1" || process.env.UPDATE_GOLDEN === "true";

// Run codegen end-to-end against `schemaPath`, feeding the schema on stdin.
// Codegen writes the generated source to stdout, which we capture here.
// Returns the spawn's stdout/stderr and exit code.
const runCodegen = async (schemaPath: string) => {
  const fileBytes = await Bun.file(schemaPath).bytes();
  const proc = Bun.spawn(["bun", INDEX, "--serve-rpc-tmpl", TEMPLATE], {
    cwd: CODEGEN_DIR,
    stdin: new Blob([fileBytes]),
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { stdout, stderr, exitCode };
};

const cases = readdirSync(CASES_DIR).filter((file) => file.endsWith(".json"));

describe("codegen golden", () => {
  if (UPDATE) mkdirSync(GOLDEN_DIR, { recursive: true });

  for (const file of cases) {
    const name = basename(file, extname(file));

    test(
      name,
      async () => {
        // Arrange
        const schemaPath = join(CASES_DIR, file);
        const goldenPath = join(GOLDEN_DIR, `${name}.ts`);

        // Act
        const { stdout, stderr, exitCode } = await runCodegen(schemaPath);

        // Assert
        expect(stderr).toBe("");
        expect(exitCode).toBe(0);

        if (UPDATE) {
          // Capture codegen's stdout as the new golden; nothing to compare.
          await Bun.write(goldenPath, stdout);
          return;
        }

        expect(existsSync(goldenPath)).toBe(true);
        const golden = await Bun.file(goldenPath).text();
        expect(stdout).toBe(golden);
      },
      30_000,
    );
  }
});
