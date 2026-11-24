---
name: build-right-engineering
description: How to make any change in the build-right website, including where code goes, reuse, safe changes and verification. Use for every feature, fix, refactor, content edit or config change in this repository, even if the user doesn't mention patterns.
---

# build-right engineering

AGENTS.md says what. This says how.

## The loop for any change

1. Understand the request and its risk tier.
2. Reuse first: search before creating.
3. Design from the outside in: URL, content, sections, components, then any server logic.
4. Change safely.
5. Follow the style in AGENTS.md section 6.
6. Test what changed.
7. Verify with commands.
8. Use the `reviewer` agent.
9. Report findings you did not fix.

## Checks by area

| Changed | Run |
|---|---|
| internal docs | `npm run check -- --fast` |
| logic, types, scripts | `npm run check` |
| pages, components, styles, content, config, dependencies | `npm run check -- --full` and a browser check |
| forms, server code | full gate, failure-path test, deep review |
| core rules | `npm run rules:sync`, then `npm run check` |
| guardrails | add a test case, then `npm run check` |

## References, opened only when needed

- Where a file goes: [folder-map](references/folder-map.md)
- Changing something shared: [safe-changes](references/safe-changes.md)
- Before writing a helper: [reuse-and-performance](references/reuse-and-performance.md)
- How to test: [testing](references/testing.md)
- Something behaves oddly: [pitfalls](references/pitfalls.md)

## Token use

Search, then read ranges. Keep command output short. Don't re-read files you just edited.

## Self-check

Only requested changes, nothing invented, no duplication or suppression, the gate passes, findings reported.
