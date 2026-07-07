# 02 — Section specs

Section-by-section mapping from Orisa HTML to Payblocks blocks/heroes. Legend:

| Tag | Meaning |
|-----|---------|
| **Reuse** | Existing block; Orisa styling via `designVersion` or Tailwind tokens |
| **Extend** | Existing block + new design variant |
| **New** | New block or hero variant required |
| **Global** | Header/footer — not in layout bundle |

---

## Creative Agency — `index.html`

Reference: [orisa-html-demo.pages.dev](https://orisa-html-demo.pages.dev/)

| # | Orisa section | HTML class / ID | Payblocks target | Action | Priority |
|---|---------------|-----------------|------------------|--------|----------|
| — | Header + megamenu | `at-header-area` | `header` global | **New** `navbar6` (Orisa megamenu) | P0 |
| — | Search overlay | `at-search-form-toggle` | Header client | **Extend** search in header | P2 |
| — | Mobile offcanvas | `at-offcanvas-area` | Header client | **Extend** Sheet/mobile menu | P1 |
| 1 | Hero | `at-hero-area` | Hero `ORISA_CREATIVE_01` | **New** hero variant | P0 |
| 2 | About + stats | `at-about-area` | `about` + `stat` | **Extend** Orisa variants | P1 |
| 3 | Logo marquee | `at-brand-area` | `credibilityStrip` or `logos` | **Extend** marquee variant | P1 |
| 4 | Services (scroll pin) | `at-service-area at-panel-pin-area` | `orisaServicesPin` | **New** block | P0 |
| 5 | Portfolio | portfolio grid section | `gallery` or `casestudies` | **Extend** Orisa card grid | P1 |
| 6 | Testimonials | testimonial slider | `testimonial` | **Extend** Orisa slider variant | P1 |
| 7 | Why choose us | `at-sec7-area` | `impactHighlights` or `feature` | **Reuse/extend** | P2 |
| 8 | Team | team grid | `teamGallery` | **Extend** Orisa grid variant | P1 |
| 9 | Locations | `at-sec8-area` | `expansionMap` or new `orisaLocations` | **Extend** | P2 |
| 10 | Capability marquee | `at-sec9-area` + second `at-brand-area` | `credibilityStrip` | **Extend** text marquee | P2 |
| 11 | FAQ | accordion section | `faq` | **Reuse** | P1 |
| 12 | CTA | “Let’s Create Meaning Together” | `closingCta` | **Extend** Orisa variant | P1 |
| 13 | Blog | blog grid | `blog` | **Reuse** | P2 |
| — | Footer | `at-footer-area` | `footer` global | **New** `footer9` (Orisa dark + marquee) | P0 |
| — | Magic cursor | `at-magic-cursor` | Optional layout client | **New** — P3, skip for a11y v1 | P3 |

### Creative Agency — layout bundle composition

```
Layout bundle: orisa-creative-agency
Category: orisa
Hero: ORISA_CREATIVE_01
Sections (order):
  1. about          (designVersion: orisa-1)
  2. logos          (designVersion: orisa-marquee)
  3. orisaServicesPin
  4. casestudies    (designVersion: orisa-grid)
  5. testimonial    (designVersion: orisa-slider)
  6. impactHighlights
  7. teamGallery    (layout: grid)
  8. expansionMap   (or orisaLocations)
  9. credibilityStrip (marquee tags)
  10. faq
  11. closingCta
  12. blog
```

---

## Marketing Agency — `index-3.html`

| # | Orisa section | HTML class | Payblocks target | Action | Priority |
|---|---------------|------------|------------------|--------|----------|
| 1 | Hero + testimonial card | `sec-1-home-3` | Hero `ORISA_MARKETING_01` | **New** hero variant | P0 |
| 2 | Supporting metrics | `sec-2-home-3` | `stat` or `credibilityStrip` | **Extend** | P1 |
| 3 | Brand logo grid | `sec-3-home-3` | `logos` | **Extend** grid variant | P1 |
| 4 | What we do (scroll pin nav) | `sec-4-home-3` | `orisaScrollServices` | **New** block | P0 |
| 5 | Content block | `sec-5-home-3` | `textBlock` or `feature` | **Reuse** | P2 |
| 6 | Portfolio | `sec-6-home-3` | `gallery` / `casestudies` | **Extend** | P1 |
| 7 | Section 7 | `home-3-section-7` | `feature` | **Extend** | P2 |
| 8 | Dark full-width | `home-3-section-8` | `banner` or `cta` | **Extend** | P2 |
| 9 | Team — “Behind the Visionaries” | `home-3-section-9` | `teamGallery` | **Extend** | P1 |
| 10 | Scroll pin + nav | `home-3-section-10` | `orisaScrollServices` or `solutionsShowcase` | **Extend** | P1 |
| 11 | Section 11 | `home-3-section-11` | `feature` | **Extend** | P2 |
| 12 | Closing | `home-3-section-12` | `closingCta` | **Extend** | P1 |

### Marketing Agency — layout bundle composition

```
Layout bundle: orisa-marketing-agency
Category: orisa
Hero: ORISA_MARKETING_01
Sections (order):
  1. credibilityStrip  (metrics)
  2. logos             (grid variant)
  3. orisaScrollServices
  4. feature           (sec-5 placeholder)
  5. casestudies
  6. feature           (sec-7)
  7. banner            (dark sec-8)
  8. teamGallery
  9. solutionsShowcase (sec-10 pin variant)
  10. feature          (sec-11)
  11. closingCta
```

---

## Shared blocks across both bundles

Build once, use in both demos:

| Block | Creative | Marketing | Notes |
|-------|----------|-----------|-------|
| `teamGallery` | ✅ | ✅ | Different layout prop |
| `testimonial` | ✅ | — | Marketing hero embeds mini testimonial |
| `casestudies` / `gallery` | ✅ | ✅ | Shared portfolio cards |
| `faq` | ✅ | — | |
| `blog` | ✅ | — | |
| `closingCta` | ✅ | ✅ | |
| `credibilityStrip` | ✅ | ✅ | Marquee vs metrics |
| `logos` | ✅ | ✅ | Marquee vs grid |

Unique per demo:

| Block / Hero | Demo |
|--------------|------|
| `ORISA_CREATIVE_01` | Creative Agency |
| `ORISA_MARKETING_01` | Marketing Agency |
| `orisaServicesPin` | Creative Agency |
| `orisaScrollServices` | Marketing Agency |

---

## Header & footer (globals — not in bundles)

### Header — `navbar6` (proposed)

| Field | Source in Orisa | Notes |
|-------|-----------------|-------|
| Transparent over hero | `header-transparent` | Scroll → solid (like `navbar5`) |
| Megamenu | Home / Page / Portfolio dropdowns | Radix NavigationMenu |
| Logo + wordmark | Orisa header | Media + text |
| Search toggle | `at-search-form-toggle` | Optional; `isSearchEnabled` |
| Mobile offcanvas | `at-offcanvas-area` | Sheet component |
| CTA button | “Let’s Talk” | From `header.buttons` |

Register as `designVersion: '6'` in `src/globals/Header/config.ts`.

### Footer — `footer9` (proposed)

| Field | Source in Orisa | Notes |
|-------|-----------------|-------|
| Dark rounded container | `at-footer-area mp-footer-style` | |
| Logo + contact | Footer col 1 | |
| Nav columns | Navigation, Shop | From `navItems` |
| Service tags marquee | Bottom ticker | Client marquee |
| Copyright + social | Footer bottom | Existing footer fields |

Register as `designVersion: '9'` in `src/globals/Footer/config.ts`.

---

## ThemeConfig — Orisa tokens

Extract from Orisa `main.css` / Bootstrap variables:

| Token | Orisa reference | Default (approx) |
|-------|-----------------|------------------|
| `primary` | `bg-primary-1`, `theme-primary` | Warm red/coral |
| `background` | `neutral-50` sections | Off-white |
| `foreground` | `neutral-900` | Near black |
| `radius` | `rounded-5` cards | ~1rem |
| Font sans | Orisa body font | Map to `next/font` |
| Font display | Hero headlines | Optional second font |

Seed via `scripts/seed-orisa-globals.ts` with `--globals` flag (pattern from `seed-globals.ts`).

---

## Block field guidelines (new blocks)

Follow existing Payblocks conventions:

```ts
// src/blocks/OrisaServicesPin/config.ts
export const OrisaServicesPinBlock: Block = {
  slug: 'orisaServicesPin',
  interfaceName: 'OrisaServicesPinBlock',
  fields: [
    backgroundColor,
    // headline richText, services array, CTA link, etc.
  ],
}
```

Each new block needs:

1. `config.ts` — Payload fields
2. `Component.tsx` — server wrapper
3. `Component.client.tsx` — GSAP/motion (if needed)
4. Register in `src/collections/Pages/pageBlocks.ts`
5. Register in `src/blocks/blockLoaders.ts`
6. Run `pnpm generate:types` + `pnpm generate:importmap`

Hero variants follow `src/heros/config.ts` + `src/heros/PageHero/` + `metadata.ts`.

---

## Assets

**No manual copy.** Phase 0 ships `pnpm orisa:sync-assets` — see [05-asset-sync.md](./05-asset-sync.md).

| Asset type | How it gets into Payblocks |
|------------|----------------------------|
| Demo images / video | HTML parse → `public/seed/orisa/{shared,creative,marketing}/` → seed uploads to Payload **Media** |
| SVG UI icons | Sync script or static `src/components/icons/orisa/` (not CMS) |
| Fonts | Sync to `public/fonts/orisa/` + `next/font/local` |
| Admin previews | Screenshots → `public/admin/previews/orisa/` (manual or Playwright capture) |

### Bundle ↔ media mapping (automatic)

| Layout bundle | HTML source | Seed reads from |
|---------------|-------------|-----------------|
| Orisa — Creative Agency | `index.html` | `public/seed/orisa/shared/` + `creative/` |
| Orisa — Marketing Agency | `index-3.html` | `public/seed/orisa/shared/` + `marketing/` |

Seed scripts use `scripts/orisa/asset-manifest.json` — not hardcoded filenames.

Do **not** ship Font Awesome Pro from theme; use Lucide + existing icon system where possible.

---

## jQuery → React mapping

| Orisa JS (`main.js`) | Payblocks approach |
|----------------------|-------------------|
| Swiper sliders | shadcn Carousel / `swiper/react` |
| Scroll pin panels | GSAP ScrollTrigger + `useGSAP` |
| Odometer counters | `AnimatedCounter` / GSAP |
| Isotope portfolio filter | React state + CSS grid |
| Magnific popup | Radix Dialog |
| Magic cursor | Optional client provider — defer |
| ScrollSmoother | Optional; test with App Router — defer |
| Mobile menu | Radix Sheet (existing pattern) |
