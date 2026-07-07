import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { ORISA_BUNDLE_REGISTRY } from './bundle-registry'
import type { OrisaAssetEntry, OrisaAssetManifest } from './types'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')

const DEFAULT_ORISA_THEME_PATH = '/Users/admin/Documents/Theme/Orisa_v4.1.0_Unzip-First'
const ASSET_PREFIX = 'assets/imgs/'

function resolveOrisaThemePath(): string {
  const fromEnv = process.env.ORISA_THEME_PATH?.trim()
  if (fromEnv) return path.resolve(fromEnv)

  if (fs.existsSync(DEFAULT_ORISA_THEME_PATH)) return DEFAULT_ORISA_THEME_PATH

  console.error(
    'ORISA_THEME_PATH is not set and the default dev path does not exist.\n' +
      'Set ORISA_THEME_PATH to your unzipped Orisa package root.',
  )
  process.exit(1)
}

function normalizeAssetPath(raw: string): string | null {
  let value = raw.trim().split('?')[0].split('#')[0]
  value = value.replace(/^\.\//, '')

  if (!value.startsWith(ASSET_PREFIX)) return null

  return value
}

export function extractAssetPaths(html: string): Set<string> {
  const paths = new Set<string>()

  const attributePattern =
    /(?:src|href|data-background|data-image|data-img-award|poster)\s*=\s*["'](assets\/imgs\/[^"'#?\s]+)["']/gi
  const urlPattern = /url\s*\(\s*["']?(assets\/imgs\/[^"')#?\s]+)["']?\s*\)/gi

  for (const pattern of [attributePattern, urlPattern]) {
    let match: RegExpExecArray | null
    while ((match = pattern.exec(html)) !== null) {
      const normalized = normalizeAssetPath(match[1])
      if (normalized) paths.add(normalized)
    }
  }

  return paths
}

function toSeedPath(relativePath: string): string {
  return relativePath.slice(ASSET_PREFIX.length)
}

function toAssetEntry(relativePath: string, bucket: string): OrisaAssetEntry {
  const seedPath = toSeedPath(relativePath)
  const filename = path.basename(seedPath)

  return {
    relativePath,
    seedPath,
    dest: path.join('public/seed/orisa', bucket, seedPath),
    filename,
  }
}

function readHtml(templateRoot: string, htmlFile: string): string {
  const htmlPath = path.join(templateRoot, htmlFile)
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML not found: ${htmlPath}`)
    process.exit(1)
  }
  return fs.readFileSync(htmlPath, 'utf8')
}

function emptyBucketDir(bucketDir: string) {
  if (!fs.existsSync(bucketDir)) return
  fs.rmSync(bucketDir, { recursive: true, force: true })
}

function copyAsset(sourceFile: string, destFile: string): void {
  fs.mkdirSync(path.dirname(destFile), { recursive: true })
  fs.copyFileSync(sourceFile, destFile)
}

function sortEntries(entries: OrisaAssetEntry[]): OrisaAssetEntry[] {
  return [...entries].sort((a, b) => a.relativePath.localeCompare(b.relativePath))
}

export function buildManifest(templateRoot: string, orisaThemePath: string): OrisaAssetManifest {
  const htmlPaths = new Map<string, Set<string>>()
  const sourceHtml: Record<string, string> = {}

  for (const bundle of ORISA_BUNDLE_REGISTRY) {
    sourceHtml[bundle.key] = bundle.html
    htmlPaths.set(bundle.key, extractAssetPaths(readHtml(templateRoot, bundle.html)))
  }

  const creativePaths = htmlPaths.get('creative') ?? new Set()
  const marketingPaths = htmlPaths.get('marketing') ?? new Set()

  const sharedPaths = [...creativePaths].filter((p) => marketingPaths.has(p))
  const creativeOnlyPaths = [...creativePaths].filter((p) => !marketingPaths.has(p))
  const marketingOnlyPaths = [...marketingPaths].filter((p) => !creativePaths.has(p))

  const assigned = new Set([...sharedPaths, ...creativeOnlyPaths, ...marketingOnlyPaths])

  const buckets: Record<string, OrisaAssetEntry[]> = {
    shared: sortEntries(sharedPaths.map((p) => toAssetEntry(p, 'shared'))),
    creative: sortEntries(creativeOnlyPaths.map((p) => toAssetEntry(p, 'creative'))),
    marketing: sortEntries(marketingOnlyPaths.map((p) => toAssetEntry(p, 'marketing'))),
  }

  for (const bundle of ORISA_BUNDLE_REGISTRY) {
    if (['creative', 'marketing'].includes(bundle.key)) continue

    const paths = htmlPaths.get(bundle.key) ?? new Set()
    const unique = [...paths].filter((p) => !assigned.has(p))
    buckets[bundle.key] = sortEntries(unique.map((p) => toAssetEntry(p, bundle.key)))
    for (const p of unique) assigned.add(p)
  }

  const stats: OrisaAssetManifest['stats'] = {
    totalUnique: assigned.size,
    copied: 0,
    missing: 0,
  }

  for (const [key, entries] of Object.entries(buckets)) {
    stats[key] = entries.length
  }

  return {
    generatedAt: new Date().toISOString(),
    orisaThemePath,
    sourceHtml,
    buckets,
    stats,
    missing: [],
  }
}

async function syncOrisaAssets() {
  const orisaThemePath = resolveOrisaThemePath()
  const templateRoot = path.join(orisaThemePath, '1.Orisa_HTML_template')

  if (!fs.existsSync(templateRoot)) {
    console.error(`Orisa template folder not found: ${templateRoot}`)
    process.exit(1)
  }

  const manifest = buildManifest(templateRoot, orisaThemePath)
  const seedRoot = path.join(repoRoot, 'public/seed/orisa')

  for (const key of Object.keys(manifest.buckets)) {
    emptyBucketDir(path.join(seedRoot, key))
  }

  let copied = 0
  const missing: string[] = []

  const allEntries = Object.values(manifest.buckets).flat()

  for (const entry of allEntries) {
    const sourceFile = path.join(templateRoot, entry.relativePath)
    const destFile = path.join(repoRoot, entry.dest)

    if (!fs.existsSync(sourceFile)) {
      missing.push(entry.relativePath)
      continue
    }

    copyAsset(sourceFile, destFile)
    copied++
  }

  manifest.stats.copied = copied
  manifest.stats.missing = missing.length
  manifest.missing = missing

  const manifestPath = path.join(scriptDir, 'asset-manifest.json')
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  console.log('Orisa asset sync complete')
  console.log(`  Theme path:     ${orisaThemePath}`)
  for (const [key, count] of Object.entries(manifest.stats)) {
    if (['totalUnique', 'copied', 'missing'].includes(key)) continue
    console.log(`  ${key.padEnd(16)} ${count}`)
  }
  console.log(`  Total unique:   ${manifest.stats.totalUnique}`)
  console.log(`  Copied:         ${manifest.stats.copied}`)
  console.log(`  Missing:        ${manifest.stats.missing}`)
  console.log(`  Manifest:       ${path.relative(repoRoot, manifestPath)}`)

  if (missing.length > 0) {
    console.warn('\nMissing source files:')
    for (const file of missing.slice(0, 20)) console.warn(`  - ${file}`)
    if (missing.length > 20) console.warn(`  … and ${missing.length - 20} more`)
  }

  if (manifest.stats.missing > 0) process.exit(1)
}

await syncOrisaAssets()
