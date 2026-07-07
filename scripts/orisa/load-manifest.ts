import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { OrisaAssetManifest, OrisaBundleKey } from './types'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))

export function loadOrisaAssetManifest(): OrisaAssetManifest {
  const manifestPath = path.join(scriptDir, 'asset-manifest.json')

  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      'Orisa asset manifest not found. Run: pnpm orisa:sync-assets',
    )
  }

  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as OrisaAssetManifest
}

/** Entries needed to seed a layout bundle (shared + bundle-specific). */
export function getSeedAssetsForBundle(bundle: OrisaBundleKey) {
  const manifest = loadOrisaAssetManifest()
  return [...manifest.buckets.shared, ...manifest.buckets[bundle]]
}

export function resolveSeedAssetPath(repoRelativeDest: string): string {
  const repoRoot = path.resolve(scriptDir, '../..')
  return path.join(repoRoot, repoRelativeDest)
}
