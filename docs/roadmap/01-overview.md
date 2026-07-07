# 01 — Overview

## 1. Project intent

Build an award-aspiring corporate homepage that:

- Feels premium: scroll narrative, motion discipline, editorial typography
- Stays editable: non-technical users manage copy, media, stats, team via Payload admin
- Uses Payblocks as intended: **Payload for CMS**, **shadcn + Tailwind for frontend**
- Takes inspiration from [Tresmares Capital](https://www.tresmarescapital.com/en/) without cloning it 1:1

We are **not** rebuilding the Payload admin with shadcn. Editors use Payload forms + **live preview** to see the real animated frontend.

## 2. Design reference (what we adopt)

From Tresmares / [Dgrees case study](https://dgrees.studio/works/tresmares-capital/):

| Pattern | Our adaptation |
|---------|----------------|
| Split hero headline | `headlineLines` array + staggered Framer reveal |
| 3D mountain centerpiece | Phase 1: video loop + gradient; Phase 3: particles or lightweight WebGL |
| Scroll cue | Animated indicator, hides on scroll |
| Credibility stats | Animated counters on viewport enter |
| Four strategy cards + metrics | `solutionsShowcase` with tabs / carousel |
| Europe expansion story | `expansionMap` with SVG + country list |
| Office locations | Office cards inside expansion block |
| Draggable team gallery | `teamGallery` with Embla drag |
| Minimal closing CTA | Existing `cta` block, optional full-bleed upgrade |
| EN / ES | Payblocks localization (`en`, `de` today — extend as needed) |

## 3. Narrative arc

```text
IMPACT → CREDIBILITY → OFFER → REACH → PEOPLE → ACTION
```

| Order | Section | Reader takeaway |
|-------|---------|-----------------|
| 0 | Hero | “This firm is serious and different.” |
| 1 | Credibility strip | “They have scale and history.” |
| 2 | Solutions showcase | “They solve my specific need.” |
| 3 | Expansion map | “They operate where I operate.” |
| 4 | Team gallery | “I trust these people.” |
| 5 | Closing CTA | “I know what to do next.” |

Offices are presented inside the expansion section (Tresmares places them after the map). A separate `officesStrip` block remains an option if layout needs splitting later.

## 4. Guiding principles

### Motion discipline

- **One signature moment** on the hero — not animation on every element
- Shared easing, duration, and stagger across sections (see [04-technical-architecture.md](./04-technical-architecture.md))
- Honor `prefers-reduced-motion`: disable count-up, parallax, scroll-pin, heavy video

### CMS discipline

- Editors change **content**, not layout code
- Each custom block exposes clear, human labels (avoid `text1` / `text2` in new blocks)
- Use `localized: true` on all public copy fields
- Section anchors (`sectionId`) for in-page nav and hero CTAs

### Performance discipline

- LCP target: hero poster image or lightweight video; defer WebGL to Phase 3
- Lazy-load below-fold media
- Client components only where motion/interaction requires them

### Award discipline

Originality beats effect count. Juries reward:

- Cohesive art direction (type, color, space)
- One memorable interaction
- Flawless mobile
- Fast, accessible experience

## 5. Scope

### In scope

- Custom hero `HERO_CORP_01`
- Custom blocks: `credibilityStrip`, `solutionsShowcase`, `expansionMap`, `teamGallery`
- Motion infrastructure: Lenis, shared animation primitives, section reveal wrapper
- Homepage page assembly in Payload
- Header nav anchors to homepage sections
- Documentation and implementation checklist

### Out of scope (initial delivery)

- Investors portal / gated document area
- Full WebGL 3D scene (Phase 3 optional)
- GSAP scroll-pinned solutions section (Phase 3 optional)
- Replacing Payload admin UI with shadcn
- Seed content for a specific real company (demo content optional)

### Existing blocks retained for inner pages

`about`, `stat`, `feature`, `contact`, `faq`, `blog`, etc. remain for About, Contact, Legal, and Blog routes.

## 6. Success criteria

### Editor experience

- [ ] Editor can update all homepage copy, stats, strategies, team, and media without code deploy
- [ ] Live preview reflects motion (hero, counters, tab switches)
- [ ] Role separation: theme/globals admin-only; editors manage pages

### Visitor experience

- [ ] Homepage tells a coherent scroll story in &lt; 2 minutes of reading
- [ ] Mobile: no broken horizontal scroll; team and solutions usable on touch
- [ ] `prefers-reduced-motion` respected sitewide

### Technical

- [ ] All new blocks registered in `Pages`, `RenderBlocks.tsx`, types regenerated
- [ ] No regression on existing pages/blocks
- [ ] Lighthouse: aim LCP &lt; 2.5s desktop on broadband (hero optimized)

### Award readiness (aspirational)

- [ ] Distinct visual identity (not default shadcn slate template)
- [ ] Case-study-ready: before/after, motion reel, performance notes
- [ ] Submittable to [Awwwards](https://www.awwwards.com/) / similar after polish pass

## 7. Stakeholder roles

| Role | Responsibility |
|------|----------------|
| **Developer** | Custom blocks, hero, motion system, performance, Payload schema |
| **Designer** | Type scale, color, spacing, hero art (video/stills), map SVG |
| **Editor / client** | Copy, stats, team photos, strategy content, publish workflow |
| **Admin** | Theme config, header/footer structure, user roles |

## 8. Homepage wire (target)

```text
Page: home (slug: home)
├── Hero tab
│   └── designVersion: HERO_CORP_01
└── Content tab (layout, in order)
    1. credibilityStrip
    2. solutionsShowcase     (sectionId: solutions)
    3. expansionMap
    4. teamGallery
    5. cta                   (CTA10 or CTA12)
```

Globals: `header`, `footer`, `themeConfig`, `page-config` — configured once, not repeated per section.
