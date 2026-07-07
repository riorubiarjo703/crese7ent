# Award-Homepage Roadmap

Roadmap for building a premium, motion-rich corporate homepage on Payblocks — inspired by [Tresmares Capital](https://www.tresmarescapital.com/en/) — using **Payload CMS (admin)** and **shadcn + Tailwind (frontend)**.

## Documents

| Doc | Purpose |
|-----|---------|
| [01-overview.md](./01-overview.md) | Goals, principles, narrative arc, success criteria |
| [02-section-specs.md](./02-section-specs.md) | Per-section CMS fields, frontend behavior, build type |
| [03-implementation-phases.md](./03-implementation-phases.md) | Phased delivery, task checklist, dependencies |
| [04-technical-architecture.md](./04-technical-architecture.md) | File layout, motion system, globals, editor workflow |

## Quick summary

**Narrative:** Impact → Credibility → Offer → Reach → People → Action

**Custom deliverables:**

| # | Section | Block / component |
|---|---------|-------------------|
| 0 | Hero | `HERO_CORP_01` (custom hero) |
| 1 | About + stats | `credibilityStrip` (custom block) |
| 2 | Financial solutions | `solutionsShowcase` (custom block) |
| 3 | Expansion / map | `expansionMap` (custom block) |
| 4 | Offices | Folded into `expansionMap` or `officesStrip` |
| 5 | Team | `teamGallery` (custom block) |
| 6 | CTA | `cta` (existing) → optional `closingCta` upgrade |

**Infrastructure:** Lenis smooth scroll, Framer Motion reveals, shared motion tokens, `prefers-reduced-motion` support.

**Phases:**

1. **Foundation** — Hero, credibility, CTA, globals, motion wrapper
2. **Core story** — Solutions showcase, expansion map, team gallery
3. **Award polish** — GSAP scroll-pin (optional), WebGL/particles hero (optional), performance pass

## Status

| Phase | Status |
|-------|--------|
| Roadmap docs | ✅ Complete |
| Phase 1.1 — Motion infrastructure | ✅ Complete |
| Phase 1.2 — HERO_CORP_01 | ✅ Complete |
| Phase 1.3–1.6 — Credibility strip + home seed | ✅ Complete |
| Phase 2 implementation | ✅ Complete (blocks + seed + e2e smoke) |
| Phase 3 implementation | ✅ Complete (GSAP pin, closingCta, perf polish) |

## Related

- [Payblocks docs](https://docs.shadcnblocks.com/payload/getting-started/)
- [AGENTS.md](../../AGENTS.md) — repo conventions, block registration, `generate:types` / `generate:importmap`
- [Tresmares case study (Dgrees)](https://dgrees.studio/works/tresmares-capital/)
