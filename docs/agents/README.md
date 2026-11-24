# Agent setup

Adapted from an internal agent configuration guide (3 November 2026) for a single Next.js website.

## I want to...

| Task | Read | Claude skill |
|---|---|---|
| Change any code | [AGENTS.md](../../AGENTS.md) | `build-right-engineering` |
| Build or style UI | [frontend.md](frontend.md) | `build-right-frontend` |
| Add a page | [recipe](recipes/add-page.md) | `add-page` |
| Add a form | [recipe](recipes/add-form.md) | `add-form` |
| Add a component | [recipe](recipes/add-ui-component.md) | |
| Add a package or variable | [recipe](recipes/add-dependency-or-env.md) | |
| Open an issue | [recipe](recipes/create-issue.md) | `create-issue` |
| Open a PR | [recipe](recipes/create-pull-request.md) | `create-pr` |
| Know what needs approval | [risk-tiers.md](risk-tiers.md) | |
| Set up another AI tool | [tools.md](tools.md) | |

## Layers

| Layer | Where | Strength |
|---|---|---|
| Rules | `AGENTS.md` | instruction |
| Entry points | `CLAUDE.md`, generated Cursor and Copilot files | instruction |
| Guardrails | `.claude/settings.json`, `.claude/hooks/` | enforced in Claude Code |
| Know-how | `.claude/skills/`, `recipes/` | instruction, loaded on demand |
| Delegation | `.claude/agents/reviewer.md` | instruction |
| Knowledge | installed Next.js docs, `docs/client-brief.md` | reference |
| Gates | `scripts/`, `.githooks/`, GitHub Actions | enforced once activated |

## What came from the guide

| Guide capability | Here | Reason |
|---|---|---|
| One rulebook and synced tool copies | adapted | same design, npm commands |
| Permissions and three hooks | adapted | ESLint for Biome, npm lockfile, Vercel and npm deploy blocks |
| Reviewer agent | adapted | checklist covers website risks |
| Engineering skill | `build-right-engineering` | backend reference dropped |
| Frontend skill | `build-right-frontend` | rewritten from Astro to Next.js |
| `add-procedure` | replaced by `add-form` | forms are this site's only server writes |
| `add-module` | replaced by `add-page` | pages are the unit of work |
| `create-issue`, `create-pr` | adapted | issue-first starts when GitHub exists |
| `db-migration` | omitted | no database |
| Country, RLS and transaction recipes | omitted | no matching feature |
| Scoped AGENTS.md files | omitted | one app; add when an area needs its own rules |
| Architecture checker | omitted | no structure to check yet; stop hook checks lint and rules |
| `astro-docs` MCP | omitted | Next.js ships version-matched docs in `node_modules` |
| Lefthook | `.githooks/` | no extra dependency |
| Personal language and design-tool notes | omitted | specific to the source project |

## Activation, done by a person

- [ ] Open Claude Code in this folder and accept the trust prompt.
- [ ] Run `npm run hooks:install`.
- [ ] Fill in `docs/client-brief.md`.
- [ ] Create the GitHub repository and push.
- [ ] Protect the default branch and require the `verify` check.
- [ ] In a fresh session, confirm that a lockfile edit is blocked and `/create-pr` stops without an issue.

## When a check is wrong

Don't bypass it. Show the false positive, fix the check in its own change and add a case to
`scripts/agent-setup.test.mjs`.
