import { readFileSync } from "node:fs";

const subject = readFileSync(process.argv[2], "utf8").split(/\r?\n/)[0];
const conventional = /^(feat|fix|content|style|refactor|perf|test|docs|chore|ci|build)(\([\w-]+\))?!?: \S/;

if (!conventional.test(subject) && !/^(Merge |Revert )/.test(subject)) {
  console.error('Commit subject must look like "feat: add services page". See AGENTS.md section 8.');
  process.exitCode = 1;
}
