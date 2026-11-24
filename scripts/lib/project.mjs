// Helpers shared by the gate scripts and the Claude hooks.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("../../", import.meta.url));

export function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const output = [result.stdout, result.stderr, result.error?.message].filter(Boolean).join("\n");
  return { ok: result.status === 0, stdout: result.stdout ?? "", output: output.trim() };
}

export const node = (script, ...args) => run(process.execPath, [path.join(root, script), ...args]);

export const bin = {
  eslint: "node_modules/eslint/bin/eslint.js",
  next: "node_modules/next/dist/bin/next",
  tsc: "node_modules/typescript/bin/tsc",
};

export const hasEslint = () => existsSync(path.join(root, bin.eslint));
export const isLintable = (file) => /\.(tsx?|mts|cts|jsx?|mjs|cjs)$/i.test(file);
export const eslint = (...args) => node(bin.eslint, "--no-warn-ignored", ...args);
export const readHookInput = () => JSON.parse(readFileSync(0, "utf8"));
