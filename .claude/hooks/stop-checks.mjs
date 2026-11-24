// Stop: fast checks on changed files. Typecheck, tests and build belong to check and verify.
import { existsSync } from "node:fs";
import path from "node:path";
import { eslint, hasEslint, isLintable, node, readHookInput, root, run } from "../../scripts/lib/project.mjs";

function changedFiles() {
  const list = (...args) => run("git", args);
  let diff = list("diff", "--name-only", "--relative", "-z", "HEAD");
  if (!diff.ok) diff = list("diff", "--name-only", "--relative", "-z", "--cached");
  const untracked = list("ls-files", "--others", "--exclude-standard", "-z");
  const names = [diff, untracked].flatMap((result) => (result.ok ? result.stdout.split("\0") : []));
  return [...new Set(names)].filter((file) => file && existsSync(path.join(root, file)));
}

// stop_hook_active means this hook already sent Claude back once.
if (!readHookInput().stop_hook_active) {
  const changed = changedFiles();
  const lintable = changed.filter(isLintable);
  const failures = [];

  if (lintable.length && hasEslint()) {
    const lint = eslint("--quiet", "--", ...lintable);
    if (!lint.ok) failures.push(lint.output.split("\n").slice(0, 24).join("\n"));
  }
  if (changed.length) {
    const rules = node("scripts/sync-rules.mjs", "--check");
    if (!rules.ok) failures.push(rules.output);
  }
  if (failures.length) {
    console.error(`Fix these before finishing (AGENTS.md section 8):\n${failures.join("\n\n")}`);
    process.exitCode = 2;
  }
}
