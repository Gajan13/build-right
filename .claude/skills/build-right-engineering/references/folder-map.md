# Where does it go?

Only `app/` and `public/` exist today. Create the others on first use.

| Need | Location |
|---|---|
| URL | `app/<route>/page.tsx` |
| Shared frame | `app/layout.tsx` or a nested layout |
| Generic button or field | `components/ui/` |
| Hero, service list | `components/sections/` |
| Copy, service data | `content/` |
| Pure helper | `lib/` |
| Email or other secret-using client | `lib/server/` |
| Form action | `actions.ts` beside its route |
| Theme token | `app/globals.css` |
| Image or logo | `public/` |
