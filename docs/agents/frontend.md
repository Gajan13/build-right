# Frontend rules

The `build-right-frontend` skill explains how to meet these.

- **Rendering:** static by default. Cache shared data; stream request-time data inside Suspense.
- **Content:** comes from approved content, with no lorem ipsum or plausible placeholders in a release.
- **Accessibility:** WCAG 2.2 AA, one `h1`, landmarks, visible focus, labels, reduced-motion support.
- **Responsive:** check 360, 768 and 1280px with no horizontal scroll.
- **SEO:** unique title and description, descriptive links, canonical URL once the domain is known.
- **Performance:** target LCP under 2.5s, CLS under 0.1, INP under 200ms. Size images and use `next/font`.
- **Security:** no secrets in client code or `NEXT_PUBLIC_*`, no unsanitised HTML, no unapproved third-party scripts.
