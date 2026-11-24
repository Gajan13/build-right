@AGENTS.md

# Claude-only notes

- Open Claude Code in this folder, not its parent, or the settings, hooks and launch config will not load.
- For any code change load `build-right-engineering`. For pages, components, styles and forms also load
  `build-right-frontend`.
- Workflows: `add-page`, `add-form`, `create-issue`, `create-pr`.
- With a GitHub remote, offer `create-issue` when a feature or fix has no issue. Without one, just do the work.
- Before reporting a change as done, use the `reviewer` agent. Say "deep review" for tier 1.
- Hooks: the guard blocks protected edits and dangerous commands, ESLint runs after each edit, and changed
  files are checked once when you finish. If a hook blocks you, follow its message; don't work around it.
- Work in this checkout; don't create worktrees unless asked.
- On Windows use the syntax of the shell tool you chose and quote paths that contain spaces.
