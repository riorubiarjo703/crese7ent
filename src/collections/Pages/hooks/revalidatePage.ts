import type { CollectionAfterChangeHook } from 'payload'

import type { Page } from '../../../payload-types'
import localization from '@/localization.config'
import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidate'

const nonDefaultLocale = localization.locales.filter(
  (locale) => locale !== localization.defaultLocale,
)

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  // Redirect revalidations — only needed when the slug (canonical URL) changes
  if (doc.slug !== previousDoc?.slug) {
    safeRevalidateTag('redirects', 'max')
  }

  if (doc._status === 'published') {
    const url =
      (doc?.breadcrumbs ? doc?.breadcrumbs[doc?.breadcrumbs?.length - 1].url : `/${doc.slug}`) ||
      `/${doc.slug}`
    const path = doc.slug === 'home' ? '/' : url

    payload.logger.info(`Revalidating page at path: ${path}`)

    safeRevalidatePath(path)
    nonDefaultLocale.forEach((locale) => {
      safeRevalidatePath(`/${locale}${path}`)
    })
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const url =
      (previousDoc?.breadcrumbs
        ? previousDoc?.breadcrumbs[previousDoc?.breadcrumbs?.length - 1].url
        : `/${previousDoc.slug}`) || `/${previousDoc.slug}`
    const oldPath = previousDoc.slug === 'home' ? '/' : url

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    safeRevalidatePath(oldPath)
    nonDefaultLocale.forEach((locale) => {
      safeRevalidatePath(`/${locale}${oldPath}`)
    })
  }

  return doc
}
