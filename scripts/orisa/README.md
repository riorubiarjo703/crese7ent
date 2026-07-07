# Orisa scripts

## Sync theme assets (Phase 0)

Copies HTML-referenced media from the local Orisa theme zip into `public/seed/orisa/`, bucketed by layout bundle.

```bash
export ORISA_THEME_PATH="/path/to/Orisa_v4.1.0_Unzip-First"  # optional if default dev path exists
pnpm orisa:sync-assets
```

**Outputs:**

- `public/seed/orisa/shared/` — used by both Creative & Marketing bundles
- `public/seed/orisa/creative/` — `index.html` only
- `public/seed/orisa/marketing/` — `index-3.html` only
- `scripts/orisa/asset-manifest.json` — consumed by Phase 2+ seed scripts

**Helpers for seeds:**

```ts
import { getSeedAssetsForBundle, loadOrisaAssetManifest } from './orisa/load-manifest'

const assets = getSeedAssetsForBundle('creative') // shared + creative
```

See [docs/orisa/05-asset-sync.md](../docs/orisa/05-asset-sync.md).
