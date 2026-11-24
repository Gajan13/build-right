# build-right repository rules

<!-- Generated from AGENTS.md by `npm run rules:sync`. Do not edit; change AGENTS.md instead. -->

Read [AGENTS.md](../AGENTS.md) and the procedures in [docs/agents](../docs/agents/README.md).

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

When reviewing a pull request, look first for invented client claims, exposed secrets, unvalidated form input,
accessibility regressions and unnecessary client components.
