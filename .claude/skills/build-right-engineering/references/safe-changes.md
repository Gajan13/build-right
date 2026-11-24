# Safe changes

- Search for every import and string use before changing something shared.
- URLs are public: renaming one needs a redirect plus updated links and sitemap.
- A layout or token change affects every page, so check more than one.
- Prefer additive prop changes.
- Keep unfinished pages out of production. An unlinked page is still public.
- Check `git status` and the final diff.
