// Generates the Cursor and Copilot rules from the core-rules block in AGENTS.md.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { root } from "./lib/project.mjs";

const read = (file) => {
  try {
    return readFileSync(path.join(root, file), "utf8").replaceAll("\r\n", "\n");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
};

const core = read("AGENTS.md").match(/<!-- core-rules:start -->\n([\s\S]*?)<!-- core-rules:end -->/)?.[1].trim();
if (!core) {
  console.error("AGENTS.md is missing its core-rules markers.");
  process.exit(1);
}

const banner = "<!-- Generated from AGENTS.md by `npm run rules:sync`. Do not edit; change AGENTS.md instead. -->";
const targets = {
  ".cursor/rules/build-right.mdc": `---
description: build-right website rules for every change
alwaysApply: true
---

${banner}

Read AGENTS.md before changing anything. Client facts are in docs/client-brief.md, frontend rules in
docs/agents/frontend.md, procedures in docs/agents/recipes/, and tool setup in docs/agents/tools.md.

${core}
`,
  ".github/copilot-instructions.md": `# build-right repository rules

${banner}

Read [AGENTS.md](../AGENTS.md) and the procedures in [docs/agents](../docs/agents/README.md).

${core}

When reviewing a pull request, look first for invented client claims, exposed secrets, unvalidated form input,
accessibility regressions and unnecessary client components.
`,
};

const stale = Object.keys(targets).filter((file) => read(file) !== targets[file]);

if (process.argv.includes("--check")) {
  if (stale.length) {
    console.error(`Out of date: ${stale.join(", ")}. Run npm run rules:sync and commit the result.`);
    process.exitCode = 1;
  }
} else {
  for (const file of stale) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), targets[file]);
    console.log(`updated ${file}`);
  }
}
