// The "is it done?" command. --fast: rules and lint. Default: adds types and tests. --full: adds build.
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { bin, node, run } from "./lib/project.mjs";

const fast = process.argv.includes("--fast");
const full = process.argv.includes("--full");

const steps = [
  ["rules", () => node("scripts/sync-rules.mjs", "--check")],
  ["lint", () => node(bin.eslint)],
];
if (!fast) {
  steps.push(
    ["route types", () => node(bin.next, "typegen")],
    ["typecheck", () => node(bin.tsc, "--noEmit")],
    ["tests", () => run(process.execPath, ["--test", "scripts/agent-setup.test.mjs"])],
  );
}
if (full) steps.push(["build", () => node(bin.next, "build")]);

for (const [name, step] of steps) {
  const result = step();
  if (!result.ok) {
    const log = path.join(mkdtempSync(path.join(tmpdir(), "build-right-check-")), "failure.log");
    writeFileSync(log, result.output);
    console.error(`FAIL ${name}\n${result.output.split("\n").slice(-30).join("\n")}\nFull log: ${log}`);
    process.exit(1);
  }
  console.log(`PASS ${name}`);
}
if (!full) console.log(`not run: ${fast ? "typecheck, tests, " : ""}build`);
