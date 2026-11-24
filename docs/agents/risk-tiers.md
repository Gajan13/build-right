# Risk tiers

A change takes the highest tier it touches.

| Tier | Examples | Required |
|---|---|---|
| 1 critical | forms, server actions, route handlers, personal data, secrets, proxy or headers, analytics, legal pages, licence, price or review claims, agent guardrails, CI, deployment | full gate, deep review, owner approval, written risk and rollback |
| 2 standard | pages, navigation, shared components, theme, dependencies, SEO and redirects, Next.js config | full gate, reviewer, browser check; owner approval for paths in AGENTS.md section 10 |
| 3 low | typos, internal docs, spacing within one section | `npm run check`, full gate if visitors can see it |
