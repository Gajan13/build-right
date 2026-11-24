// Whole-repository gate, used by pre-push and CI. The rules check runs first.
process.argv.push("--full");
await import("./check.mjs");
