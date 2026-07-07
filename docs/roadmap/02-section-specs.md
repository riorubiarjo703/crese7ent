# 02 — Section specifications

Detailed specs for each homepage section: CMS schema, frontend behavior, and implementation notes.

---

## Section 0 — Hero (`HERO_CORP_01`)

### Purpose

Brand hook + value proposition. Signature visual moment.

### CMS — Page → Hero tab

Extend `src/heros/config.ts` and `src/heros/metadata.ts`.

| Field | Type | Label | Notes |
|-------|------|-------|-------|
| `designVersion` | select | Hero layout | Value: `CORP_01` |
| `headlineLines` | array → `line` (text) | Headline lines | One row per line, e.g. Drive / to / grow |
| `subheadline` | richText | Supporting text | Localized |
| `primaryCta` | link | Primary button | Often anchor to `#solutions` |
| `secondaryCta` | link | Secondary button | Optional |
| `backgroundType` | select | Background type | `video` \| `images` \| `particles` |
| `backgroundVideo` | upload | Background video | MP4/WebM; condition: `video` |
| `backgroundPoster` | upload | Video poster | LCP image; condition: `video` |
| `backgroundImages` | upload[] | Image sequence | condition: `images` |
| `showScrollIndicator` | checkbox | Show scroll cue | Default: `true` |

Reuse existing hero fields where possible: `backgroundColor`, shared `link` field pattern.

### Frontend — `src/heros/PageHero/heroCorp01.tsx`

| Behavior | Implementation |
|----------|----------------|
| Split headline stagger | Framer Motion, `staggerChildren` per line |
| Subheadline fade-up | Delay after headline |
| Background video | `<video autoPlay muted loop playsInline>` + gradient scrim |
| Image sequence | Crossfade like `hero214` |
| Particles (Phase 3) | `magicui/particles` or R3F |
| Scroll indicator | CSS + Framer pulse; hide on `scroll` / `wheel` |
| CTAs | `CMSLink` + shadcn `Button` |

**Client component:** yes (`'use client'`).

### Preview asset

`public/admin/previews/hero/hero-corp-01.jpeg` — static mock for design version picker.

---

## Section 1 — Credibility strip (`credibilityStrip`)

### Purpose

Firm story + quantitative proof in one cohesive band.

### CMS — custom block

**Slug:** `credibilityStrip`  
**Interface:** `CredibilityStripBlock`

| Field | Type | Label | Notes |
|-------|------|-------|-------|
| `backgroundColor` | color field | Background | Reuse `@/fields/color` |
| `eyebrow` | text | Eyebrow | e.g. “About [Company]” |
| `headline` | richText | Headline | Localized |
| `body` | richText | Body | 1–3 paragraphs |
| `cta` | link | Link | e.g. “Discover our history” |
| `metrics` | array | Key metrics | See below |
| `animateCounters` | checkbox | Animate numbers | Default: `true` |

**Metrics array item:**

| Subfield | Type | Example |
|----------|------|---------|
| `value` | text | `3500` or `2014` |
| `prefix` | text | `+` |
| `suffix` | text | `M €` |
| `label` | text | `Millions committed` |
| `useCounterAnimation` | checkbox | Override global animate |

### Frontend — `src/blocks/CredibilityStrip/`

| Behavior | Implementation |
|----------|----------------|
| Section enter | `SectionReveal` wrapper |
| Layout | Two-row: copy left/top, metrics grid below or beside |
| Counter | `useInView` + animated number (Framer or `motion` animate) |
| Metric stagger | 0.1s between items |

**Files:**

```text
src/blocks/CredibilityStrip/
├── config.ts
├── metadata.ts          # optional, if design versions added later
├── Component.tsx        # server router (thin)
└── Component.client.tsx # motion + layout
```

---

## Section 2 — Solutions showcase (`solutionsShowcase`)

### Purpose

Show 4–6 strategies/services with per-card metrics. Core “what we do” section.

### CMS

**Slug:** `solutionsShowcase`  
**Interface:** `SolutionsShowcaseBlock`

| Field | Type | Label | Notes |
|-------|------|-------|-------|
| `sectionId` | text | Section ID | Default: `solutions` — HTML `id` for anchors |
| `backgroundColor` | color | Background | |
| `eyebrow` | text | Eyebrow | |
| `headline` | richText | Headline | |
| `intro` | richText | Introduction | |
| `strategies` | array | Strategies | min 1, max 6 |

**Strategy item:**

| Subfield | Type | Notes |
|----------|------|-------|
| `title` | text | Required |
| `slug` | text | Auto from title; used for tab `id` |
| `description` | richText | |
| `cta` | link | “Know more” |
| `icon` | icon | Optional — reuse `@/components/Icon/config` |
| `accentImage` | upload | Optional card visual |
| `metrics` | array | `label` (text), `value` (text) |

### Frontend

| Viewport | UX |
|----------|-----|
| Desktop | Tab list + large active panel; optional horizontal metric row |
| Mobile | Embla carousel, one strategy per slide |
| Transition | `AnimatePresence` on panel content |
| Anchor | `id={sectionId}` on `<section>` |

**Client component:** yes (tabs/carousel state).

### Phase 3 enhancement (optional)

GSAP ScrollTrigger: pin section while scrubbing through strategies. Document as optional — not Phase 1.

---

## Section 3 — Expansion map (`expansionMap`)

### Purpose

Geographic reach + optional partner story (e.g. bank alliance).

### CMS

**Slug:** `expansionMap`  
**Interface:** `ExpansionMapBlock`

| Field | Type | Label |
|-------|------|-------|
| `backgroundColor` | color | Background |
| `eyebrow` | text | Eyebrow |
| `headline` | richText | Headline |
| `body` | richText | Supporting copy |
| `partner` | group | Partner (optional) |
| `countries` | array | Countries |
| `offices` | array | Offices |

**Partner group:**

| Subfield | Type |
|----------|------|
| `name` | text |
| `logo` | upload |
| `url` | text |

**Country item:**

| Subfield | Type |
|----------|------|
| `name` | text |
| `code` | text | ISO 3166-1 alpha-2, e.g. `ES` |
| `highlighted` | checkbox |

**Office item:**

| Subfield | Type |
|----------|------|
| `city` | text |
| `address` | textarea |
| `image` | upload |
| `mapUrl` | text | Google Maps link |

### Frontend

| Piece | Implementation |
|-------|----------------|
| Map | Static SVG Europe map in `public/` or inline component; highlight paths by `code` |
| Country list | Staggered text column |
| Partner | Logo + headline integration |
| Offices | 3-column cards below map; stack on mobile |
| Hover | Country hover highlights map region (optional) |

**Designer deliverable:** SVG map with identifiable region paths per country code.

---

## Section 4 — Team gallery (`teamGallery`)

### Purpose

Humanize the firm; draggable discovery on desktop.

### CMS

**Slug:** `teamGallery`  
**Interface:** `TeamGalleryBlock`

| Field | Type | Label |
|-------|------|-------|
| `backgroundColor` | color | Background |
| `headline` | richText | Headline |
| `subheadline` | richText | Optional |
| `layout` | select | `drag` \| `grid` | Default: `drag` |
| `members` | array | Team members |

**Member item:**

| Subfield | Type |
|----------|------|
| `photo` | upload | Required |
| `name` | text | Required |
| `role` | text | Required |
| `bio` | textarea | Optional |
| `linkedinUrl` | text | Optional |

### Frontend

| Layout | Behavior |
|--------|----------|
| `drag` | Embla with `dragFree: true`; “Drag” hint on desktop |
| `grid` | Responsive grid, simpler fallback |

Card: portrait aspect, name/role overlay, subtle hover scale.

---

## Section 5 — Closing CTA

### Purpose

Single conversion point.

### Phase 1 — existing block

Use `cta` block, design version `CTA10` or `CTA12`.

| CMS | Already in `src/blocks/Cta/config.ts` |
|-----|--------------------------------------|

### Phase 2 optional — `closingCta`

Only if full-viewport CTA needed.

| Field | Type |
|-------|------|
| `headline` | richText |
| `subheadline` | text |
| `primaryCta` | link |
| `secondaryCta` | link |
| `backgroundImage` | upload |

---

## Globals (homepage dependencies)

### Header (`src/globals/Header/config.ts`)

Add nav items pointing to:

- `/#solutions` or `/en/#solutions` (locale-aware)
- Standard pages: About, Team, Contact, Investors (external URL field if needed)

### Footer

Copyright, legal links — unchanged pattern.

### ThemeConfig

Recommend dark/neutral corporate palette once during setup. Admin-only access already enforced.

### Page config

Default OG image 1200×630 for social shares when page meta image absent.

---

## Shared field patterns

Reuse existing Payblocks utilities:

| Pattern | Source |
|---------|--------|
| Links | `@/fields/link` |
| Background color | `@/fields/color` |
| Icons | `@/components/Icon/config` |
| Rich text | Lexical with `HeadingFeature` |
| Localization | `localized: true` on copy fields |

---

## Block registration checklist (per new block)

1. Create `src/blocks/<Name>/config.ts`
2. Create `Component.tsx` (+ `.client.tsx` if needed)
3. Add to `PageBlocks` in `src/collections/Pages/index.ts`
4. Register in `src/blocks/RenderBlocks.tsx` `blockComponents` map
5. Run `pnpm generate:types` and `pnpm generate:importmap`
6. Add Tailwind classes via explicit `switch` in `RenderBlocks` if dynamic `bg-*` used
7. Add admin preview image if `designVersionPreview` used

---

## Demo content (seed)

After implementation, optional seed document `home` with:

- 3 headline lines, 1 video or poster
- 4–6 metrics
- 4 strategies with sample metrics
- 10–15 EU countries, 3 offices
- 8–12 team members (placeholder portraits)
- CTA linking to contact page

Seed via admin CLI or dedicated seed script — separate task from block implementation.
