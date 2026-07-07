# Crese7ent

Crese7ent is a modern website builder powered by [PayloadCMS](https://payloadcms.com) and [Next.js](https://nextjs.org). It combines a robust headless CMS with a rich block-based layout system and pre-built UI components from [shadcn/ui](https://ui.shadcn.com) and [shadcnblocks](https://shadcnblocks.com).

Built on the [Payblocks](https://github.com/shadcnblocks/payblocks) template, Crese7ent extends the foundation with custom Orisa-themed blocks, heroes, and layout bundles for agency and portfolio sites.

**Repository:** [github.com/riorubiarjo703/crese7ent](https://github.com/riorubiarjo703/crese7ent)

## Key Features

- **Rich component library** — Pre-built layout blocks (FAQ, CTA, Gallery, About, Case Studies, and more) with multiple variants per block type
- **Orisa theme integration** — Custom heroes, scroll-pinned service sections, megamenu header, and 21+ seeded layout bundles
- **Layout builder** — Drag-and-drop page composition with live preview and draft workflow
- **Role-based access control** — Secure authentication with optional Google OAuth login
- **SEO & redirects** — Built-in SEO fields, meta generation, and redirect management
- **Developer experience** — Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, and MongoDB

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 15 (App Router) + React 19 |
| CMS | PayloadCMS 3 |
| Database | MongoDB |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Storage | Vercel Blob (media + backups) |
| Email | Resend |

## Quick Start

**Local setup (MongoDB + Docker):** see [docs/local-setup.md](docs/local-setup.md)

```bash
cp .env.example .env
docker compose up -d mongo
pnpm install
pnpm dev
```

- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

For full environment options (Blob storage, email, Google login), see [.env.example](.env.example).

### Orisa Seeds

```bash
pnpm seed:orisa-globals              # Theme, header, footer
pnpm seed:orisa-creative-agency      # Creative agency homepage
pnpm seed:orisa-marketing-agency     # Marketing agency homepage
pnpm seed:orisa-all-bundles          # All 21 Orisa layout bundles
```

See [docs/orisa/README.md](docs/orisa/README.md) for the full Orisa implementation plan.

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm generate:types` | Regenerate Payload types |
| `pnpm generate:importmap` | Regenerate Payload import map |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm test:e2e` | Run Playwright E2E tests |

## Project Structure

```
src/
├── app/           # Next.js routes (frontend + Payload admin)
├── blocks/        # Layout builder blocks
├── collections/   # Payload collections (Pages, Posts, Media, …)
├── globals/       # Site-wide config (Header, Footer, ThemeConfig)
├── heros/         # Page hero variants
└── utilities/     # Shared helpers
```

## Documentation

- [Local setup guide](docs/local-setup.md)
- [Orisa theme plan](docs/orisa/README.md)
- [Payblocks docs](https://docs.shadcnblocks.com/payload/getting-started/)
- [Payload CMS docs](https://payloadcms.com/docs)

## License

MIT
