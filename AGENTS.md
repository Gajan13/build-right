# build-right website

The company website for the client build-right. Stack: Next.js 16 App Router, React 19, TypeScript and
Tailwind CSS 4, with npm. It is one app: no database, backend service or authentication.

## Core rules

<!-- core-rules:start -->
- Never invent client facts: services, prices, projects, reviews, licences, statistics, addresses or contact details. Use `docs/client-brief.md`; mark gaps as TODO and ask.
- Don't guess APIs. Read the installed docs in `node_modules/next/dist/docs/` before writing Next.js code.
- Change only what the task needs, and don't overwrite someone else's uncommitted work.
- Reuse before creating, and ask before adding a dependency.
- Use Server Components by default. Add `"use client"` only to the smallest part that needs the browser.
- Every page works at 360px wide, by keyboard and with a screen reader, and has its own title and description.
- Never ship a control wired to nothing, including a form that pretends to send.
- Validate all visitor input on the server. Never log personal data or expose a secret.
- Done means `npm run check` passes, or `npm run check -- --full` for anything visitors can see.
- Ask before every commit, push, PR, issue and comment. One yes covers one action.
- Once the repository is on GitHub, start features and fixes from an issue and use `gh`.
- Report unrelated findings separately instead of fixing them in the same change.
- Tier 1 changes (`docs/agents/risk-tiers.md`) need a deep review and the owner's approval.
- Designs and generated mockups are references, not sources of content or behavior.
- Spend few tokens: open only the files you need and verify by running commands.
<!-- core-rules:end -->

## 1. Sources of truth

In order: the user's request or linked issue, `docs/client-brief.md` for client facts, this file, `docs/agents/`,
then the existing code. If they conflict, say so and ask.

## 2. Don't guess

Check versions in `package.json` and APIs in the installed docs. Ask when an answer changes what gets built.

## 3. Don't overwrite other work

Run `git status` before editing. Never discard changes you did not make, rewrite history or bypass a hook.

## 4. How a change flows

Understand, find code to reuse, read the relevant recipe, make the smallest change, run the gate, have the
`reviewer` check it (or run the gate yourself without subagents), then report findings.

## 5. Architecture

Create a folder when it gets its first file.

| Path | Holds |
|---|---|
| `app/` | Routes, layouts, metadata and route-only files. `page.tsx` stays thin |
| `components/ui/` | Generic pieces with no business content |
| `components/sections/` | Page sections, which receive content as props |
| `content/` | Typed, client-approved copy and data |
| `lib/` | Shared logic. Server-only code goes in `lib/server/` |
| `public/` | Static files the client has the right to use |

Dependencies point one way: `app` to `components`, `content` and `lib`. Those three never import from `app`.

## 6. Code style

- ESLint and strict TypeScript. No `any`, non-null `!`, `@ts-ignore` or unexplained suppression.
- Files are kebab-case, components PascalCase, functions are verbs, booleans start with `is` or `has`.
- Import across folders with `@/`. Use Tailwind theme tokens from `app/globals.css`, not repeated hex values.
- Comment on why, not what.

## 7. Tests

`npm test` covers the agent guardrails. No website test runner is installed yet: verify pages with the full
gate and a browser, and propose a runner when the first real logic (usually a form) arrives.

## 8. Git hooks and definition of done

| Command | Runs |
|---|---|
| `npm run check -- --fast` | rules, lint |
| `npm run check` | rules, lint, typecheck, tests |
| `npm run check -- --full` | all of the above, build |
| `npm run verify` | the full gate, used by pre-push and CI |

Each clone activates git hooks once with `npm run hooks:install`; the user runs it. Commit subjects use
`type: summary`, with type one of feat, fix, content, style, refactor, perf, test, docs, chore, ci or build.

## 9. Issues and PRs

See `docs/agents/workflow.md`. Branches are `<type>/BR-<issue>-<summary>`. Until a GitHub remote exists, the
user's request is the spec: don't block work on a missing issue.

## 10. Paths that need an owner's review

Forms and server actions, route handlers, `proxy.ts`, `next.config.ts`, environment variables, dependencies,
analytics, legal pages, client claims, `.claude/`, `.githooks/` and `.github/workflows/`.

## 11. Work from the spec, spend few tokens

Don't re-read what you know, paste long logs or load every reference. Follow the spec and stop when it is met.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
