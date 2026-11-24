// Usage: npm run pr:check -- <body-file>
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: npm run pr:check -- <body-file>");
  process.exit(1);
}

const body = readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
const sections = new Map(
  body.split(/^## /m).slice(1).map((section) => {
    const [title, ...lines] = section.split(/\r?\n/);
    return [title.trim(), lines.join("\n").trim()];
  }),
);

const problems = ["Issue", "Summary", "Risk", "Verification", "Client content", "Findings"]
  .filter((title) => !sections.get(title))
  .map((title) => `"${title}" is missing or empty`);
if (!/\b(close[sd]?|fix(es|ed)?|resolve[sd]?) #\d+/i.test(sections.get("Issue") ?? ""))
  problems.push('"Issue" needs a link such as "Closes #12"');
if (!/\btier [123]\b/i.test(sections.get("Risk") ?? "")) problems.push('"Risk" needs Tier 1, 2 or 3');

if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
}
