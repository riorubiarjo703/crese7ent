import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from 'payload'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')

const MIME_BY_EXT: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
}

/** Upload a file from `public/seed/orisa/...` if not already in Payload Media. */
export async function ensureOrisaMedia(
  payload: Payload,
  repoRelativeDest: string,
  alt?: string,
): Promise<string | undefined> {
  const filePath = path.join(repoRoot, repoRelativeDest)
  const filename = path.basename(repoRelativeDest)
  const storageName = `orisa-${filename.replace(/\s+/g, '-')}`

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: storageName } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]?.id) return existing.docs[0].id

  if (!fs.existsSync(filePath)) {
    console.warn(`Missing Orisa seed file: ${filePath}`)
    return undefined
  }

  const ext = path.extname(filename).toLowerCase()
  const created = await payload.create({
    collection: 'media',
    data: { alt: alt ?? filename },
    file: {
      data: Buffer.from(fs.readFileSync(filePath)),
      mimetype: MIME_BY_EXT[ext] ?? 'application/octet-stream',
      name: storageName,
      size: fs.statSync(filePath).size,
    },
    overrideAccess: true,
  })

  return created.id
}

export async function ensureOrisaMediaMany(
  payload: Payload,
  repoRelativeDests: string[],
): Promise<(string | undefined)[]> {
  const ids: (string | undefined)[] = []

  for (const dest of repoRelativeDests) {
    ids.push(await ensureOrisaMedia(payload, dest))
  }

  return ids
}

export function mediaId(ids: (string | undefined)[], index: number): string | undefined {
  return ids[index]
}
