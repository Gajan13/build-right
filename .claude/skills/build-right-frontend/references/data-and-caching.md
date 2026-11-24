# Data and caching

Docs: `01-getting-started/08-caching.md`, `09-revalidating.md`, `02-guides/instant-navigation.md`.

- Local content imports need no fetch.
- Never put visitor-specific data in a shared cache.
- Await URL and request data inside Suspense, with a fallback of the same size.
- Partial Prefetching loads the app shell, so use full prefetch only for a measured need.
