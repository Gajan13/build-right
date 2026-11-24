# Tools

| Tool | Gets the rules from | Enforced locally | Ask-first setting |
|---|---|---|---|
| Claude Code | `CLAUDE.md` imports `AGENTS.md` | permissions, hooks | in project settings |
| Cursor | generated `.cursor/rules/build-right.mdc` | git hooks | keep terminal approval on |
| Copilot | generated `.github/copilot-instructions.md` | git hooks | keep command approval on |
| Codex | `AGENTS.md` | git hooks | keep command approval on |

After editing the core rules run `npm run rules:sync` and commit all three files together.

## Limits

- The guard reads tool calls. It cannot see inside a script and does not stop shell redirection into a file.
- Read denies cover the usual env names. Add a rule if you introduce another, such as `.env.staging`.
- Git hooks are inactive until `npm run hooks:install`. CI is inactive until the repository is on GitHub.
- Keep personal Claude overrides in `.claude/settings.local.json` and personal MCP servers out of the repo.
