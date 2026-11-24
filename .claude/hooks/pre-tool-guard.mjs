// PreToolUse: protects files and blocks commands that destroy work, skip checks or deploy.
// A safety net, not a sandbox: scripts and unusual shell expansions can get past it.
import { readFileSync } from "node:fs";
import path from "node:path";

const PREFIX = "Blocked by .claude/hooks/pre-tool-guard.mjs:";

function checkFileEdit(file) {
  // Windows ignores case and trailing dots or spaces in file names.
  const normal = file.replaceAll("\\", "/").toLowerCase().replace(/[. ]+$/, "");
  const name = path.posix.basename(normal);

  if (name.startsWith(".env") && name !== ".env.example")
    return "environment files hold secrets. Document the variable in .env.example and ask the user to set the value.";
  if (/\.(pem|key)$/.test(name)) return "private key files must be managed by the user.";
  if (["package-lock.json", "pnpm-lock.yaml", "yarn.lock"].includes(name))
    return "lockfiles are generated. Use npm install <package> after the user approves the dependency.";
  if (name === "next-env.d.ts") return "Next.js generates this file. Run npm run typecheck.";
  if (/(^|\/)(\.next|node_modules)\//.test(normal)) return "this is build output or installed code. Edit the source.";
  if (/(^|\/)(\.cursor\/rules\/build-right\.mdc|\.github\/copilot-instructions\.md)$/.test(normal))
    return "this file is generated. Edit the core rules in AGENTS.md and run npm run rules:sync.";
  return null;
}

// Heredoc bodies are data (for example a commit message), unless a shell executes them.
function dropHeredocBodies(command) {
  const kept = [];
  let end = null;
  for (const line of command.split(/\r?\n/)) {
    if (end) {
      if (line.trim() === end) end = null;
      continue;
    }
    kept.push(line);
    const match = line.match(/(?<!<)<<-?\s*["']?([A-Za-z_]\w*)["']?/);
    if (match && !/\b(bash|sh|zsh|pwsh|powershell)\b/.test(line.slice(0, match.index))) end = match[1];
  }
  return kept.join("\n");
}

// Split into commands and words, respecting quotes and the escape character of each shell.
function parse(command, escape) {
  const commands = [];
  let words = [];
  let word = "";
  let started = false;
  let quote = null;

  const endWord = () => {
    if (started) words.push(word);
    word = "";
    started = false;
  };
  const endCommand = () => {
    endWord();
    if (words.length) commands.push(words);
    words = [];
  };

  for (let i = 0; i < command.length; i++) {
    const char = command[i];
    if (char === escape && quote !== "'" && i + 1 < command.length) {
      const next = command[++i];
      if (next === "\r" && command[i + 1] === "\n") i++;
      else if (next !== "\n") {
        word += next;
        started = true;
      }
    } else if (quote) {
      if (char === quote) quote = null;
      else word += char;
    } else if (char === '"' || char === "'") {
      quote = char;
      started = true;
    } else if (";|&\n\r(){}`".includes(char)) endCommand();
    else if (/\s/.test(char)) endWord();
    else {
      word += char;
      started = true;
    }
  }
  endCommand();
  return commands;
}

function checkGit(args) {
  let i = 0;
  while (args[i]?.startsWith("-")) {
    const option = args[i];
    const takesValue = ["-C", "-c", "--git-dir", "--work-tree", "--namespace"].includes(option);
    if (/core\.hookspath/i.test(takesValue ? args[i + 1] : option)) return "git hooks must not be bypassed.";
    i += takesValue ? 2 : 1;
  }

  const subcommand = args[i];
  const rest = args.slice(i + 1);
  const options = [];
  const positional = [];
  for (let j = 0; j < rest.length; j++) {
    const arg = rest[j];
    if (arg === "--") {
      positional.push(...rest.slice(j + 1));
      break;
    }
    if (!arg.startsWith("-")) {
      positional.push(arg);
      continue;
    }
    options.push(arg);
    // The value of a message option is text, even if it looks like a flag.
    if (subcommand === "commit" && /^(--message|--file|-[^-mFCct]*[mFCct])$/.test(arg)) j++;
  }
  const short = (pattern) => options.some((option) => /^-[^-]/.test(option) && pattern.test(option));
  const long = (prefix) => options.some((option) => option.startsWith(prefix));

  if (["commit", "push", "merge", "rebase", "cherry-pick", "am", "pull"].includes(subcommand) && long("--no-veri"))
    return "do not skip git hooks. Fix the failing check.";
  if (subcommand === "commit" && short(/^-[^mFCctuS]*n/)) return "git commit -n skips hooks. Fix the failing check.";
  if (subcommand === "push" && (long("--forc") || long("--mirror") || short(/^-[^o]*f/) || positional.some((arg) => arg.startsWith("+"))))
    return "forced pushes rewrite shared history. Push a new commit instead.";
  if (subcommand === "reset" && long("--har")) return "this destroys uncommitted work. Ask the user.";
  if (subcommand === "clean" && (long("--forc") || short(/f/))) return "this deletes untracked work. Ask the user.";
  if (subcommand === "config") {
    const key = positional.findIndex((arg) => /^core\.hookspath$/i.test(arg));
    const reads = options.some((option) => ["--get", "--get-all", "--show-origin"].includes(option)) || positional[0] === "get";
    if (key !== -1 && !reads) return "only the user changes core.hooksPath (npm run hooks:install).";
  }
  return null;
}

function checkCommand(command, escape, depth = 0) {
  for (const original of parse(dropHeredocBodies(command), escape)) {
    const words = [...original];
    while (words.length && (/^\w+=/.test(words[0]) || ["env", "command", "exec", "sudo", "time", "nohup"].includes(words[0]))) {
      if (/^GIT_CONFIG/.test(words[0]) && /hookspath/i.test(original.join(" "))) return "git hooks must not be bypassed.";
      words.shift();
    }
    if (!words.length) continue;

    let name = words[0].split(/[\\/]/).pop().toLowerCase().replace(/\.(exe|cmd|ps1)$/, "");
    let args = words.slice(1);

    if (["bash", "sh", "zsh", "pwsh", "powershell"].includes(name) && depth < 3) {
      const flag = args.findIndex((arg) => /^-(\w*c|command)$/i.test(arg));
      if (flag !== -1) {
        const reason = checkCommand(args.slice(flag + 1).join(" "), name.endsWith("sh") && name !== "pwsh" ? "\\" : "`", depth + 1);
        if (reason) return reason;
      }
    }
    if (["npx", "pnpx", "bunx"].includes(name)) {
      const start = args.findIndex((arg) => !arg.startsWith("-"));
      if (start === -1) continue;
      name = args[start].replace(/(?<=.)@.*$/, "");
      args = args.slice(start + 1);
    }

    if (name === "git") {
      const reason = checkGit(args);
      if (reason) return reason;
    }
    if (name === "vercel" || (name === "netlify" && args[0] === "deploy"))
      return "deployments are done by the user.";
    if (name === "npm" && (args[0] === "publish" || (/^run(-script)?$/.test(args[0]) && args[1]?.startsWith("deploy"))))
      return "publishing and deployments are done by the user.";
  }
  return null;
}

let reason;
try {
  const { tool_name: tool, tool_input: input = {} } = JSON.parse(readFileSync(0, "utf8"));
  if (tool === "Bash" || tool === "PowerShell") reason = checkCommand(input.command ?? "", tool === "Bash" ? "\\" : "`");
  else reason = checkFileEdit(input.file_path ?? input.notebook_path ?? "");
} catch (error) {
  reason = `could not inspect the tool call (${error.message}).`;
}

if (reason) {
  console.error(`${PREFIX} ${reason}`);
  process.exitCode = 2;
}
