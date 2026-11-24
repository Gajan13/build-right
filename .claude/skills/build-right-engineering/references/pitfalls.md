# Pitfalls

Add an entry when a trap is actually hit. These follow from the current config and installed docs.

- `cacheComponents` is on: use `use cache` and `cacheLife`, not the `dynamic`, `revalidate`, `fetchCache` or
  `dynamicParams` segment options.
- With it, client state and form input survive navigation. Reset deliberately.
- `params`, `searchParams`, `cookies()` and `headers()` are async.
- `middleware` is now `proxy`, and `next lint` is gone.
- `next/image` uses `preload`; `priority` is deprecated.
- `next/font/google` needs network access at build time.
- `next dev` maintains marked blocks in AGENTS.md. Write outside them.
