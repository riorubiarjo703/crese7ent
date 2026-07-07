# 03 — Implementation phases

Phased delivery plan with tasks, estimates, and acceptance criteria. Implement in order; each phase should be mergeable and demoable.

**Legend:** `[P]` Payload/CMS · `[F]` Frontend · `[I]` Infrastructure · `[D]` Design asset

---

## Phase 0 — Prerequisites (before coding)

| # | Task | Owner | Notes |
|---|------|-------|-------|
| 0.1 | Approve roadmap docs | Team | This folder |
| 0.2 | Define brand tokens (colors, fonts) | Design | Feeds `themeConfig` + Tailwind |
| 0.3 | Source hero video or poster + gradient spec | Design | 1920×1080 min; &lt;5MB video |
| 0.4 | Deliver Europe SVG map with region IDs | Design | ISO codes match `countries[].code` |
| 0.5 | Confirm locales (en/de or en/es) | Product | Extend `localization.config.ts` if needed |

**Exit criteria:** Brand one-pager + hero asset + map SVG ready.

---

## Phase 1 — Foundation (est. 2–3 weeks)

Goal: Credible homepage skeleton with hero, credibility, CTA, motion base.

### 1.1 Motion infrastructure `[I]`

| # | Task | Files |
|---|------|-------|
| 1.1.1 | Add Lenis smooth scroll | `package.json`, `src/providers/SmoothScroll/` or layout client wrapper |
| 1.1.2 | Create `SectionReveal` component | `src/components/motion/SectionReveal.tsx` |
| 1.1.3 | Create `AnimatedCounter` | `src/components/motion/AnimatedCounter.tsx` |
| 1.1.4 | Create `useReducedMotion` helper | `src/hooks/useReducedMotion.ts` |
| 1.1.5 | Document motion tokens | See [04-technical-architecture.md](./04-technical-architecture.md) |
| 1.1.6 | Wire smooth scroll in frontend layout | `src/app/(frontend)/[[...slugs]]/layout.tsx` |

**Acceptance:** Scroll feels smooth; sections fade in once; reduced-motion disables animations.

### 1.2 Hero `HERO_CORP_01` `[P][F]`

| # | Task | Files |
|---|------|-------|
| 1.2.1 | Add hero fields to `heros/config.ts` | `headlineLines`, `backgroundType`, etc. |
| 1.2.2 | Register in `heros/metadata.ts` | Preview image path |
| 1.2.3 | Implement `heroCorp01.tsx` | `src/heros/PageHero/heroCorp01.tsx` |
| 1.2.4 | Register in `RenderHero.tsx` | Map `CORP_01` |
| 1.2.5 | Add preview JPEG | `public/admin/previews/hero/` |
| 1.2.6 | Run `generate:types` + `generate:importmap` | |

**Acceptance:** Editor can set 3 headline lines, video/poster, CTA; live preview shows staggered text + scroll cue.

### 1.3 Credibility strip `[P][F]`

| # | Task | Files |
|---|------|-------|
| 1.3.1 | Create block config | `src/blocks/CredibilityStrip/config.ts` |
| 1.3.2 | Create components | `Component.tsx`, `Component.client.tsx` |
| 1.3.3 | Register in Pages + RenderBlocks | |
| 1.3.4 | Counter animation integrated | Uses `AnimatedCounter` |

**Acceptance:** Metrics count up on scroll (when enabled); all fields editable in admin.

### 1.4 Closing CTA `[P]`

| # | Task | Files |
|---|------|-------|
| 1.4.1 | Configure home page with `cta` block | Payload admin / seed |
| 1.4.2 | Pick design version CTA10 or CTA12 | Per brand review |

**Acceptance:** CTA renders; links to contact page.

### 1.5 Globals & nav `[P]`

| # | Task | Files |
|---|------|-------|
| 1.5.1 | Update header nav links | `src/globals/Header/` |
| 1.5.2 | Set corporate theme colors | `themeConfig` global |
| 1.5.3 | Default OG image | `page-config` global |

**Acceptance:** Header links to `/#solutions` and key pages; theme applied on frontend.

### 1.6 Homepage assembly `[P]`

| # | Task |
|---|------|
| 1.6.1 | Create/update `home` page in Payload |
| 1.6.2 | Layout order: credibilityStrip → (placeholder for phase 2) → cta |
| 1.6.3 | Verify live preview end-to-end |

### Phase 1 exit criteria

- [x] Lenis smooth scroll wired in frontend providers
- [x] `SectionReveal`, `AnimatedCounter`, `useReducedMotion`, motion tokens
- [x] `HERO_CORP_01` hero schema + `heroCorp01` component
- [x] Home page live with hero + credibility + CTA (`pnpm seed:corporate-home`)
- [ ] Mobile layout acceptable (Playwright review 2026-06-17: no overflow; tap targets & hero spacing need polish — see `lighthouse-reports/mobile-review/`)

---

## Phase 2 — Core story (est. 3–4 weeks)

Goal: Solutions, expansion map, team — full Tresmares-style narrative.

### 2.1 Solutions showcase `[P][F]`

| # | Task | Files |
|---|------|-------|
| 2.1.1 | Block config with `strategies` array | `src/blocks/SolutionsShowcase/config.ts` |
| 2.1.2 | Desktop tabs UI | `Component.client.tsx` |
| 2.1.3 | Mobile Embla carousel | Reuse `embla-carousel-react` |
| 2.1.4 | `sectionId` anchor | `id="solutions"` |
| 2.1.5 | Register + generate types | |
| 2.1.6 | Hero CTA links to `#solutions` | Content config |

**Acceptance:** Tab switch animates content; 4 strategies with metrics editable; mobile swipe works.

### 2.2 Expansion map `[P][F][D]`

| # | Task | Files |
|---|------|-------|
| 2.2.1 | Block config | `src/blocks/ExpansionMap/config.ts` |
| 2.2.2 | SVG map component | `src/components/maps/EuropeMap.tsx` |
| 2.2.3 | Country highlight logic | Match `code` to SVG path `id` |
| 2.2.4 | Partner group UI | |
| 2.2.5 | Office cards | |
| 2.2.6 | Register + types | |

**Acceptance:** Countries from CMS highlight on map; 3 offices render; partner logo optional.

### 2.3 Team gallery `[P][F]`

| # | Task | Files |
|---|------|-------|
| 2.3.1 | Block config | `src/blocks/TeamGallery/config.ts` |
| 2.3.2 | Embla drag layout | `layout: drag` |
| 2.3.3 | Grid fallback | `layout: grid` |
| 2.3.4 | Register + types | |

**Acceptance:** Drag scroll on desktop; touch scroll on mobile; members CRUD in admin.

### 2.4 Full homepage wire `[P]`

Update `home` layout order:

```text
1. credibilityStrip
2. solutionsShowcase
3. expansionMap
4. teamGallery
5. cta
```

### 2.5 Testing `[I]`

| # | Task |
|---|------|
| 2.5.1 | E2E smoke: home loads, sections visible | `e2e/tests/home.spec.ts` (new) |
| 2.5.2 | Playwright reduced-motion snapshot optional | |

### Phase 2 exit criteria

- [x] Full 6-section homepage wired
- [x] All custom blocks in admin (live preview images optional — Phase 3)
- [ ] EN/DE (or target locales) populated for demo
- [x] No console errors on home route (SVG logo + hydration fixes)
- [x] E2E smoke test added (`e2e/tests/home.spec.ts`)

---

## Phase 3 — Award polish (est. 2–4 weeks, optional)

Goal: Signature upgrades, performance, submission readiness.

### 3.1 Hero upgrades `[F]`

| # | Task | Priority |
|---|------|----------|
| 3.1.1 | `backgroundType: particles` using magicui | Medium |
| 3.1.2 | Lightweight R3F abstract scene | Low — only if concept demands |
| 3.1.3 | Video optimize (WebM + MP4, poster LCP) | High |

### 3.2 Advanced scroll `[F]`

| # | Task | Notes |
|---|------|-------|
| 3.2.1 | Add GSAP + ScrollTrigger | `package.json` |
| 3.2.2 | Optional pin `solutionsShowcase` | Behind feature flag or CMS checkbox |
| 3.2.3 | Text marquee block (optional) | Separate small block |

### 3.3 Closing CTA upgrade `[P][F]`

| # | Task |
|---|------|
| 3.3.1 | `closingCta` full-bleed block if CTA10 insufficient |

### 3.4 Performance & a11y `[I]`

| # | Task |
|---|------|
| 3.4.1 | Lighthouse audit on `/` |
| 3.4.2 | Lazy-load below-fold images |
| 3.4.3 | `prefers-reduced-motion` audit all blocks |
| 3.4.4 | Focus states on tabs/carousel |

### 3.5 Content & launch `[P]`

| # | Task |
|---|------|
| 3.5.1 | Homepage seed script or CLI seed |
| 3.5.2 | Editor training doc (1-pager) |
| 3.5.3 | Case study / motion reel for award submission |

### Phase 3 exit criteria

- [x] GSAP + ScrollTrigger wired with Lenis (`pinOnScroll` on solutions showcase)
- [x] `closingCta` full-bleed block
- [x] Lazy-load below-fold images (default on `ImageMedia`)
- [x] `prefers-reduced-motion` on hero particles + scroll pin
- [x] Focus states on solutions tabs
- [x] Header nav seeded with `/#about`, `/#solutions`, contact
- [x] Lighthouse run on `/` (dev server: perf 35–38, a11y 93–96, SEO/BP 100 — reports in `lighthouse-reports/`)
- [ ] LCP &lt; 2.5s desktop (LCP ~13s on Turbopack dev — re-run against `pnpm build && pnpm start`)
- [ ] Editor training doc (optional)

---

## Master task checklist

Copy into issue tracker as needed.

### Infrastructure

- [ ] Lenis smooth scroll
- [ ] SectionReveal
- [ ] AnimatedCounter
- [ ] useReducedMotion
- [ ] Motion tokens documented

### Custom hero

- [ ] HERO_CORP_01 schema
- [ ] heroCorp01 component
- [ ] RenderHero registration
- [ ] Admin preview image

### Custom blocks

- [ ] credibilityStrip
- [ ] solutionsShowcase
- [ ] expansionMap
- [ ] teamGallery
- [ ] closingCta (optional)

### Integration

- [ ] PageBlocks array updated
- [ ] RenderBlocks map updated
- [ ] generate:types
- [ ] generate:importmap
- [ ] Header nav anchors
- [ ] themeConfig corporate palette
- [ ] home page content

### Quality

- [ ] lint + tsc
- [ ] e2e home smoke
- [ ] mobile QA
- [ ] reduced-motion QA
- [ ] Lighthouse pass

---

## Dependencies to add

| Package | Phase | Purpose |
|---------|-------|---------|
| `lenis` | 1 | Smooth scroll |
| `@studio-freight/lenis` or `lenis` | 1 | Check latest maintained package |
| `gsap` | 3 | ScrollTrigger (optional) |
| `@react-three/fiber` + `three` | 3 | WebGL hero (optional) |

**Already in project:** `framer-motion`, `motion`, `embla-carousel-react`, magicui components.

---

## Risk register

| Risk | Mitigation |
|------|------------|
| SVG map mismatch with country codes | Design delivers map + code mapping doc early |
| Hero video hurts LCP | Poster image as LCP; lazy video |
| Too many client components hurt SEO | Keep server wrappers; client only for motion islands |
| Editor overwhelmed by fields | Clear labels; sensible defaults; seed demo page |
| GSAP bundle size | Phase 3 only; dynamic import |
| Plugin upgrades break custom fields | Follow Payload changelog; run e2e after upgrade |

---

## Suggested PR breakdown

| PR | Contents |
|----|----------|
| PR1 | Motion infrastructure + Lenis |
| PR2 | HERO_CORP_01 |
| PR3 | credibilityStrip |
| PR4 | solutionsShowcase |
| PR5 | expansionMap + Europe SVG |
| PR6 | teamGallery |
| PR7 | Globals, home content, e2e |
| PR8 | Phase 3 polish (optional) |

Each PR should include `generate:types` output and pass CI.

---

## Timeline summary (indicative)

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 0 | 3–5 days | Week 1 |
| Phase 1 | 2–3 weeks | Weeks 1–4 |
| Phase 2 | 3–4 weeks | Weeks 4–8 |
| Phase 3 | 2–4 weeks | Weeks 8–12 |

Total: **~8–12 weeks** for one developer + design support, depending on asset readiness and polish level.
