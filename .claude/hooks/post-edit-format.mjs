// PostToolUse: apply ESLint's safe fixes to the edited file and report what remains.
import { existsSync } from "node:fs";
import path from "node:path";
import { eslint, hasEslint, isLintable, readHookInput, root } from "../../scripts/lib/project.mjs";

const file = readHookInput().tool_input?.file_path;

if (file && isLintable(file) && hasEslint()) {
  const relative = path.relative(root, path.resolve(root, file));
  const outside = relative.startsWith("..") || path.isAbsolute(relative);
  const ignored = /(^|[\\/])(node_modules|\.next)[\\/]/.test(relative);

  if (!outside && !ignored && existsSync(path.join(root, relative))) {
    const result = eslint("--fix", "--quiet", "--", relative);
    if (!result.ok) {
      console.error(`ESLint errors in ${relative}. Fix them now:\n${result.output.split("\n").slice(0, 14).join("\n")}`);
      process.exitCode = 2;
    }
  }
}
