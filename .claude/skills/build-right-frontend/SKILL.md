---
name: build-right-frontend
description: Frontend decision guide for build-right with Next.js 16, React 19 and Tailwind 4. Use for any page, layout, section, component, form, style, image, animation, SEO, caching or responsive work, even a small visual tweak.
---

# build-right frontend

Rules: `docs/agents/frontend.md`. These versions are newer than most training data, so read the matching file
in `node_modules/next/dist/docs/01-app/` first.

## The loop

1. Match the mockup against approved content and working behavior. No controls wired to nothing.
2. Choose rendering from the table.
3. Reuse components and tokens.
4. Write semantic, mobile-first markup.
5. Add only the client code that is needed.
6. Add metadata and every state.
7. Verify in a browser and with `npm run check -- --full`.

## Rendering

| Need | Use |
|---|---|
| Fixed marketing content | static Server Component |
| Shared data that changes occasionally | `use cache` and `cacheLife` |
| Per-request data | Server Component inside Suspense |
| State, events, browser APIs | small client component |
| Form write | server action |
| Webhook or public HTTP endpoint | route handler |

## Common mistakes

| Wrong | Right |
|---|---|
| `"use client"` on a page | client leaf component |
| Fetch in an effect for initial content | fetch on the server |
| Clickable `div` | `button` or `Link` |
| Repeated hex colors | theme tokens |
| `priority` on an image | `preload` on the LCP image |

## References

- [rendering-and-hydration](references/rendering-and-hydration.md)
- [data-and-caching](references/data-and-caching.md)
- [assets-and-performance](references/assets-and-performance.md)

## Self-check

No hydration warnings, correct caching, images sized, keyboard works, metadata set, full gate passes.
