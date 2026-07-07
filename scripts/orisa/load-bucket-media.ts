import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from 'payload'

import { ensureOrisaMediaMany } from './seed-media'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')

export interface OrisaBucketMedia {
  pages: string[]
  /** Media document IDs keyed by filename (e.g. `bg-img.webp`) */
  pagesByFilename: Record<string, string>
  avatars: string[]
  logos: string[]
  videos: string[]
  /** All uploaded media IDs in discovery order */
  all: string[]
}

const MEDIA_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.svg', '.mp4'])

function walkMediaFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  const results: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkMediaFiles(full))
    } else if (MEDIA_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(full)
    }
  }

  return results.sort()
}

function toRepoRelative(absPath: string): string {
  return path.relative(repoRoot, absPath).split(path.sep).join('/')
}

function categorize(ids: (string | undefined)[], repoPaths: string[]): OrisaBucketMedia {
  const pages: string[] = []
  const pagesByFilename: Record<string, string> = {}
  const avatars: string[] = []
  const logos: string[] = []
  const videos: string[] = []
  const all: string[] = []

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    if (!id) continue

    all.push(id)
    const p = repoPaths[i].toLowerCase()
    const filename = path.basename(repoPaths[i])

    if (p.includes('/video/') || p.endsWith('.mp4')) {
      videos.push(id)
    } else if (p.includes('/avatar/')) {
      avatars.push(id)
    } else if (
      p.includes('/logo/') ||
      p.includes('/icons/brand') ||
      p.includes('/about-3/icons/')
    ) {
      logos.push(id)
      pagesByFilename[filename] = id
    } else {
      pages.push(id)
      pagesByFilename[filename] = id
    }
  }

  return { pages, pagesByFilename, avatars, logos, videos, all }
}

/** Upload all media files from a seed bucket (shared + bucket-specific folders). */
export async function loadBucketMedia(
  payload: Payload,
  bucketKey: string,
): Promise<OrisaBucketMedia> {
  const dirs = [
    path.join(repoRoot, 'public/seed/orisa/shared'),
    path.join(repoRoot, 'public/seed/orisa', bucketKey),
    path.join(repoRoot, 'public/seed/orisa/about-3'),
  ]

  const absPaths = [...new Set(dirs.flatMap(walkMediaFiles))]
  const repoPaths = absPaths.map(toRepoRelative)
  const ids = await ensureOrisaMediaMany(payload, repoPaths)

  return categorize(ids, repoPaths)
}

export function mediaAt(media: OrisaBucketMedia, index: number): string | undefined {
  return media.all[index]
}

export function mediaIdByFilename(
  media: OrisaBucketMedia,
  filename: string,
): string | undefined {
  return media.pagesByFilename[filename]
}

export function mediaIdsByFilenames(media: OrisaBucketMedia, filenames: string[]): string[] {
  return filenames
    .map((filename) => media.pagesByFilename[filename])
    .filter((id): id is string => Boolean(id))
}

/** Creative Storeframe about page: shared assets + creative pages + about-3 logos/icons. */
export async function loadAboutMedia(payload: Payload): Promise<OrisaBucketMedia> {
  return loadBucketMedia(payload, 'creative')
}
