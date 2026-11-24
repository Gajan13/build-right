# Add a page

1. Confirm the page's purpose, URL, call to action and approved content. Ask about gaps.
2. Read the installed Next.js docs for pages and metadata.
3. Reuse sections and UI. Put copy in `content/`.
4. Create `app/<route>/page.tsx` as a Server Component with metadata and one `h1`.
5. For dynamic routes await `params` and follow the Cache Components guidance on static params and Suspense.
6. Link it from navigation if it should be found, and add it to the sitemap if one exists.
7. Check it at 360, 768 and 1280px and by keyboard, then run `npm run check -- --full`.
