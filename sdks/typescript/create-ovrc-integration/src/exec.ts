import { spawn } from "child_process";

export function run(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["inherit", "pipe", "inherit"],
      shell: true,
    });
    child.on("error", reject);

    let output = "";
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
      output += chunk;
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(
          new Error(`${command} ${args.join(" ")} exited with code ${code}`),
        );
      }
    });
  });
}
