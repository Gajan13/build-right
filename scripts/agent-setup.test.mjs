import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const guard = fileURLToPath(new URL("../.claude/hooks/pre-tool-guard.mjs", import.meta.url));
const exitCode = (tool_name, tool_input) =>
  spawnSync(process.execPath, [guard], { input: JSON.stringify({ tool_name, tool_input }) }).status;

const blocked = [
  "git commit --no-verify -m x", "git commit --no-verif -m x", "git commit -n -m x", "git commit -anm x",
  "git push --no-verify", "git merge --no-verify topic", "git push -f", "git push -uf origin main",
  "git push --force-with-lease", "git push origin +main", "git push --mirror", "npm test && git push -f",
  "git -C site push --force", "FOO=1 git push -f", "echo $(git push -f)", "git push \\\n --force",
  "bash -lc 'git push --force'", 'pwsh -Command "git push --force"', "bash <<EOF\ngit push -f\nEOF",
  "git reset --hard HEAD~1", "git clean -fd", "git clean -xdf", "git config core.hooksPath /dev/null",
  "git -c core.hooksPath=/dev/null commit -m x", "vercel --prod", "npx --yes vercel@latest",
  "npm publish", "npm run deploy",
];
const allowed = [
  "git status", "git commit -m 'docs: explain --no-verify'", "git commit -m --no-verify", "git commit -m notes",
  "git commit -mnew", "git commit -am wip", "git push -u origin feature-f", "git push -n", "git clean -n",
  "git reset --soft HEAD~1", "git log -n 3", "git config --get core.hooksPath", 'echo "git push --force"',
  "git commit -F - <<'EOF'\nfix: guard\n\ngit push -f is now blocked\nEOF", "npm run check", "npm run dev",
];

for (const command of blocked)
  test(`blocks: ${command}`, () => assert.equal(exitCode("Bash", { command }), 2));
for (const command of allowed)
  test(`allows: ${command}`, () => assert.equal(exitCode("Bash", { command }), 0));

test("PowerShell backtick continuation is parsed", () =>
  assert.equal(exitCode("PowerShell", { command: "git push `\r\n --force" }), 2));
test("PowerShell Windows paths are parsed", () =>
  assert.equal(exitCode("PowerShell", { command: "& 'C:\\Program Files\\Git\\cmd\\git.exe' push -f" }), 2));

for (const file_path of [".env", "C:\\site\\.env.local", ".ENV", ".env.", "package-lock.json", "next-env.d.ts", "key.pem",
  "node_modules/next/index.js", ".next/types/routes.d.ts", ".cursor/rules/build-right.mdc", ".github/copilot-instructions.md"])
  test(`protects: ${file_path}`, () => assert.equal(exitCode("Write", { file_path }), 2));
for (const file_path of [".env.example", "app/page.tsx", "AGENTS.md", "package.json"])
  test(`editable: ${file_path}`, () => assert.equal(exitCode("Edit", { file_path }), 0));
