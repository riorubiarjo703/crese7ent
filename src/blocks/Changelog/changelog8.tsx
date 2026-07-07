import { extractPlainText } from '@/utilities/richtext'
import type { Changelogblock } from '@/payload-types'
import { Changelog8 } from '@/components/changelog8'

type EntryImage = { url?: string } | string | null | undefined

const resolveImageUrl = (image: EntryImage): string | undefined => {
  if (!image) return undefined
  if (typeof image === 'string') return undefined
  if (typeof image === 'object' && 'url' in image && image.url) return image.url
  return undefined
}

export const Changelog8Block: React.FC<Changelogblock> = ({ entries, richText, tagline }) => {
  const mappedEntries = (entries || []).map((entry) => ({
    version: entry.version,
    date: entry.date ? new Date(entry.date).toLocaleDateString() : '',
    title: entry.title || entry.version,
    description: entry.description ? extractPlainText(entry.description) : '',
    image: resolveImageUrl(entry.image as EntryImage),
  }))

  const introText = richText ? extractPlainText(richText) : ''

  return <Changelog8 title={tagline || ''} description={introText} entries={mappedEntries} />
}
