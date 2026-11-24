# Rendering and hydration

Docs: `01-getting-started/05-server-and-client-components.md`.

- Pass only serializable props to client components, and never secrets.
- Pass server-rendered content through `children`.
- Don't render random values, the current time or `window` values during hydration.
- Use `LayoutProps` and `PageProps` route types.
