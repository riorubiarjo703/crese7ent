export interface OrisaAssetEntry {
  /** Path as referenced in HTML, e.g. assets/imgs/pages/bg-img.webp */
  relativePath: string
  /** Path under public/seed/orisa/{bucket}/, e.g. pages/bg-img.webp */
  seedPath: string
  /** Repo-relative destination, e.g. public/seed/orisa/creative/pages/bg-img.webp */
  dest: string
  filename: string
}

/** Bucket key from `bundle-registry.ts` (e.g. creative, marketing, home-4). */
export type OrisaBundleKey = string

export interface OrisaAssetManifest {
  generatedAt: string
  orisaThemePath: string
  sourceHtml: Record<string, string>
  buckets: Record<string, OrisaAssetEntry[]>
  stats: Record<string, number> & {
    totalUnique: number
    copied: number
    missing: number
  }
  missing: string[]
}
