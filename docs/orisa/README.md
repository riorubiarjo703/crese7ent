# Orisa Theme — Implementation Plan

Plan for porting the [Orisa HTML theme](https://orisa-html-demo.pages.dev/) into Payblocks as CMS-managed blocks, layout bundles, and site-wide header/footer/globals — so non-technical editors can pick homepage recipes and edit content without code.

**Source assets:** `/Users/admin/Documents/Theme/Orisa_v4.1.0_Unzip-First/1.Orisa_HTML_template/`

## Documents

| Doc | Purpose |
|-----|---------|
| [01-overview.md](./01-overview.md) | Goals, architecture, editor workflow, one-brand model |
| [02-section-specs.md](./02-section-specs.md) | Creative Agency + Marketing Agency section → block mapping |
| [03-implementation-phases.md](./03-implementation-phases.md) | Phased delivery, tasks, estimates, acceptance criteria |
| [04-technical-architecture.md](./04-technical-architecture.md) | File layout, globals, bundles, seeds, motion stack |
| [05-asset-sync.md](./05-asset-sync.md) | **Phase 0** — automated HTML-driven media copy (no manual picking) |
| [design-tokens.json](./design-tokens.json) | Orisa colors/fonts for ThemeConfig seed (Phase 1) |

## Quick summary

**Architecture (three layers):**

| Layer | CMS location | Scope | Orisa example |
|-------|--------------|-------|---------------|
| **Site shell** | `header`, `footer`, `themeConfig` globals | One brand → one header, one footer | Orisa megamenu nav + dark footer |
| **Page template** | Layout bundle on `pages` | Per page (optional starter) | Creative Agency homepage |
| **Content** | Blocks in `layout` field | Per page, drag-and-drop | Edit headlines, images, order |

**Layout bundles are content-only** (hero + page sections). They do **not** include header or footer.

**Initial scope:** 21 Orisa layout bundles (2 dedicated home demos + 13 additional home demos + 4 inner pages + portfolio cinema)

1. **Orisa — Creative Agency** (`index.html`) — slug `home`
2. **Orisa — Marketing Agency** (`index-3.html`) — slug `orisa-marketing`
3. **17 additional bundles** via `pnpm seed:orisa-all-bundles` — see [03-implementation-phases.md](./03-implementation-phases.md#phase-5--expansion)

**Later:** bespoke heroes per demo, Playwright visual regression, magic cursor.

## Status

| Phase | Status |
|-------|--------|
| Planning docs | ✅ Complete |
| Phase 0 — Prerequisites (tokens, **orisa:sync-assets**, manifest) | ✅ Complete |
| Phase 1 — Site shell (navbar6, footer9, theme tokens, `orisa` bundle category) | ✅ Complete |
| Phase 2 — Creative Agency bundle | ✅ Complete |
| Phase 3 — Marketing Agency bundle | ✅ Complete |
| Phase 4 — Polish & editor UX | ✅ Complete |
| Phase 5 — All remaining bundles (17 generic + About/Contact 01) | ✅ Complete |

### Phase 2 deliverables

- Hero `ORISA_CREATIVE_01` — `src/heros/PageHero/heroOrisaCreative01.tsx`
- Block `orisaServicesPin` — scroll-pinned services section
- `pnpm seed:orisa-creative-agency` — home page + layout bundle `orisa-creative-agency`
- Media upload helper — `scripts/orisa/seed-media.ts`

### Phase 3 deliverables

- Hero `ORISA_MARKETING_01` — `src/heros/PageHero/heroOrisaMarketing01.tsx`
- Block `orisaScrollServices` — side nav + scroll-pinned service panels
- `pnpm seed:orisa-marketing-agency` — page `orisa-marketing` + bundle `orisa-marketing-agency`

### Phase 4 deliverables

- `designVersionPreview` on header (v6) and footer (v9) — `src/globals/Header/metadata.ts`, `src/globals/Footer/metadata.ts`
- Admin preview thumbnails — `public/admin/previews/header/navbar6.webp`, `public/admin/previews/footer/footer9.webp`
- `LayoutBundleGallery` — visual bundle picker on Pages sidebar (`src/components/AdminDashboard/LayoutBundleGallery/`)
- Orisa E2E smoke tests — `e2e/tests/orisa.spec.ts` (CI seeds Orisa via `global-setup.ts`)
- Performance pass — hero LCP `priority`, below-fold `loading="lazy"` on Orisa heroes and blocks
- Dark mode tokens — `docs/orisa/design-tokens.json` + `seed-orisa-globals.ts`
- Bundle `previewImage` seeded on Orisa layout bundles

### Phase 5 deliverables

- Asset sync extended for all 21 HTML demos → registry-driven buckets in `public/seed/orisa/`
- Hero `ORISA_PAGE_01` — inner-page banner + headline (`src/heros/PageHero/heroOrisaPage01.tsx`)
- Dedicated seeds: `pnpm seed:orisa-about-01`, `pnpm seed:orisa-contact-01`
- Generic seed infrastructure:
  - `scripts/orisa/bundle-registry.ts` — 21 bundle definitions
  - `scripts/orisa/layout-templates.ts` — hero/layout builders by template type
  - `scripts/orisa/load-bucket-media.ts` — shared + bucket media upload
  - `scripts/orisa/upsert-bundle-page.ts` — page + layout bundle upsert
- `pnpm seed:orisa-all-bundles` — seeds 17 remaining pages (skips 4 dedicated bundles)
- Shared Orisa contact form seed — `scripts/orisa/ensure-contact-form.ts`
- CI: `e2e/setup/global-setup.ts` runs all Orisa seeds including `seed:orisa-all-bundles`

**Seeded page slugs (Phase 5 generic):**

| Slug | HTML | Template |
|------|------|----------|
| `orisa-digital-agency` | index-2.html | creative |
| `orisa-ai-tech-agency` | index-4.html | marketing |
| `orisa-personal-creative` | index-5.html | minimal |
| `orisa-branding-studio` | index-6.html | creative |
| `orisa-startup-agency` | index-7.html | marketing |
| `orisa-uiux-agency` | index-8.html | marketing |
| `orisa-modern-agency` | index-9.html | marketing |
| `orisa-3d-studio` | index-10.html | creative |
| `orisa-motion-video-studio` | index-11.html | creative |
| `orisa-minimal-portfolio` | index-12.html | minimal |
| `orisa-architecture-studio` | index-13.html | creative |
| `orisa-photography-showcase` | index-14.html | portfolio |
| `orisa-agency-portfolio` | index-15.html | portfolio |
| `orisa-about-2` | about-2.html | about |
| `orisa-about-3` | about-3.html | about |
| `orisa-contact-2` | contact-2.html | contact |
| `orisa-portfolio-cinema` | portfolio-cinema.html | portfolio |

### Phase 1 deliverables

- `pnpm seed:orisa-globals` — applies Orisa `themeConfig`, header (navbar6), footer (footer9)
- `src/globals/Header/navbar/navbar6.tsx` — Orisa megamenu header
- `src/globals/Footer/footer/footer9.tsx` + `footer9.client.tsx` — dark footer + marquee tags
- DM Sans via `next/font` in frontend layout
- Layout bundle category `orisa` in admin
- Admin preview JPEGs for navbar6/footer9 — ✅ webp previews in `public/admin/previews/`

## Related

- [Payblocks AGENTS.md](../../AGENTS.md) — block registration, seeds, `generate:types`
- [Corporate homepage roadmap](../roadmap/README.md) — prior custom block patterns (`TeamGallery`, `SolutionsShowcase`, etc.)
- [Orisa live demo](https://orisa-html-demo.pages.dev/)
