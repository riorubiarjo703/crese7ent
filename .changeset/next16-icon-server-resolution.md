---
'payblocks': patch
---

Fix icon rendering in Next.js 16 and reduce frontend icon bundle size.

- Resolve CMS icon fields server-side across page, header, and footer data.
- Make `Icon` render synchronously from resolved payloads and keep SSR Lucide markers for regression checks.
- Remove frontend `react-icons/fa` and `react-icons/fc` usage to avoid large icon-library chunks.

Breaking changes: none (no Payload schema migration, no content migration required).
