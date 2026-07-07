# 05 — Asset sync (Phase 0)

Automated pipeline to copy Orisa theme media into Payblocks **without manual file picking**. Bundle membership (Creative vs Marketing) is derived from which HTML page references each file.

---

## Why not read the theme folder at runtime?

| Context | Theme folder `/Users/admin/Documents/Theme/...` |
|---------|--------------------------------------------------|
| Your Mac (dev) | ✅ Exists |
| Teammate / CI / Vercel | ❌ Not present |
| Production website | ❌ Must use Payload Media URLs (Vercel Blob) |

Flow:

```
Orisa theme zip (local)
    ↓  pnpm orisa:sync-assets
public/seed/orisa/  (in git)
    ↓  pnpm seed:orisa-* 
Payload Media collection
    ↓
Blocks reference media IDs in MongoDB
```

---

## Script: `scripts/orisa/sync-assets.ts`

### Inputs

| Input | Default | Purpose |
|-------|---------|---------|
| `ORISA_THEME_PATH` | *(required if not using default dev path)* | Root of unzipped Orisa package |
| HTML files | All 21 bundles in `scripts/orisa/bundle-registry.ts` | Asset discovery |
| Template root | `{ORISA_THEME_PATH}/1.Orisa_HTML_template/` | Source files |

### Parsing rules

Extract paths matching `assets/imgs/...` from:

- `src="..."`
- `href="..."`
- `data-background="..."`
- `url(...)` inside inline `style` attributes

Normalize paths (strip query strings, resolve relative segments).

Also include **shared shell assets** used by header/footer on both pages:

- `assets/imgs/template/logo/*` (favicon, logo variants)
- Any path appearing in **both** HTML files → `shared/` bucket

### Output layout

```
public/seed/orisa/
  shared/              # referenced by multiple HTML files
  creative/            # index.html only
  marketing/           # index-3.html only
  about/               # about-1.html
  contact/             # contact-1.html
  digital/             # index-2.html
  home-4/ … home-15/   # index-4.html … index-15.html
  about-2/, about-3/   # about-2.html, about-3.html
  contact-2/           # contact-2.html (may be empty — uses shared/)
  portfolio-cinema/    # portfolio-cinema.html

scripts/orisa/
  asset-manifest.json   # machine-readable map for seed scripts
  bundle-registry.ts    # 21 bundle definitions (HTML → bucket key)
```

### Manifest format

```json
{
  "generatedAt": "2026-06-19T...",
  "sourceHtml": {
    "creative": "index.html",
    "marketing": "index-3.html"
  },
  "buckets": {
    "shared": [
      {
        "relativePath": "assets/imgs/template/logo/favicon.svg",
        "filename": "favicon.svg",
        "dest": "public/seed/orisa/shared/favicon.svg"
      }
    ],
    "creative": [ "..." ],
    "marketing": [ "..." ]
  },
  "stats": {
    "shared": 12,
    "creativeOnly": 49,
    "marketingOnly": 41,
    "totalCopied": 102
  }
}
```

Seed scripts load manifest and upload:

- `seed-orisa-creative-agency.ts` → `shared/` + `creative/`
- `seed-orisa-marketing-agency.ts` → `shared/` + `marketing/`
- `seed-orisa-about-01.ts` → `shared/` + `about/`
- `seed-orisa-contact-01.ts` → `shared/` + `contact/`
- `seed-orisa-all-bundles.ts` → `shared/` + per-bundle folder via `load-bucket-media.ts`

---

## npm script

```json
{
  "orisa:sync-assets": "tsx scripts/orisa/sync-assets.ts"
}
```

*(Or `payload run` / `node --import tsx` — match existing script runner in repo.)*

---

## Usage

```bash
# 1. Point at your local Orisa unzip (one-time env or .env.local — do not commit)
export ORISA_THEME_PATH="/Users/admin/Documents/Theme/Orisa_v4.1.0_Unzip-First"

# 2. Sync — copies only HTML-referenced files, assigns buckets automatically
pnpm orisa:sync-assets

# 3. Commit synced assets (curated subset, ~102 files not 764)
git add public/seed/orisa scripts/orisa/asset-manifest.json

# 4. Later: seed uploads to Payload Media
pnpm seed:orisa-creative-agency
pnpm seed:orisa-marketing-agency
pnpm seed:orisa-about-01
pnpm seed:orisa-contact-01
pnpm seed:orisa-all-bundles   # remaining 17 bundles
```

---

## What gets excluded automatically

| Excluded | Reason |
|----------|--------|
| ~660 unused images in theme zip | Not referenced by Creative or Marketing HTML |
| Font Awesome Pro bundles | Use Lucide instead |
| `assets/js/`, `assets/css/` | Not media; rebuilt in React |
| Other demo homepages | ✅ All 21 HTML files in `bundle-registry.ts` |

The sync script reads `ORISA_BUNDLE_REGISTRY` from `scripts/orisa/bundle-registry.ts` — each entry's `html` file gets its own bucket key. Re-run sync after adding a new registry entry.

```ts
// bundle-registry.ts — add entry, then:
pnpm orisa:sync-assets
pnpm seed:orisa-all-bundles   // or write a dedicated seed script
```

---

## Videos

Orisa includes e.g. `assets/imgs/video/video-1.mp4`. If referenced in HTML, the sync script copies it like any image. Seed uploads to Payload Media with correct `mimetype: 'video/mp4'`.

---

## Git & size

- **Do commit** `public/seed/orisa/` after sync (~100 files for two bundles, much smaller than full 107MB theme)
- **Do commit** `asset-manifest.json`
- **Do not commit** `ORISA_THEME_PATH` or the full theme zip
- Add `ORISA_THEME_PATH` to `.env.example` as optional dev var

---

## Phase 0 checklist (assets)

- [x] `scripts/orisa/sync-assets.ts` implemented
- [x] `pnpm orisa:sync-assets` runs clean against local theme path
- [x] `asset-manifest.json` stats match expectations (~61 / ~53 / ~12 shared)
- [x] `public/seed/orisa/` committed to repo
- [x] Seed scripts read manifest via `load-bucket-media.ts` — no hardcoded image lists
