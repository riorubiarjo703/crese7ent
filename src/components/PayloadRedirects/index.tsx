import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'
import { locales } from '@/localization.config'

interface Props {
  disableNotFound?: boolean
  url: string
}

/**
 * Returns the breadcrumb URL only when it is a valid, usable path.
 * Rejects null, empty strings, and paths that contain the literal word
 * "undefined" — which can appear when the nested-docs plugin runs before
 * the parent's slug has been saved (stale seed data, race conditions).
 */
function validBreadcrumbUrl(url: string | null | undefined): string | null {
  if (!url || url.includes('undefined')) return null
  return url
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const slug = url.startsWith('/') ? url : `${url}`

  // Detect locale from the URL prefix (e.g. "/de/..." → "de").
  // This is used to fetch redirects with locale-aware breadcrumbs.
  const urlLocale = locales.find((l) => slug === `/${l}` || slug.startsWith(`/${l}/`))

  const redirects = await getCachedRedirects(urlLocale)()

  const redirectItem =
    redirects.find((redirect) => redirect.from === slug) ||
    redirects.find((redirect) => decodeURIComponent(redirect.from) === slug)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    const isPages = redirectItem.to?.reference?.relationTo === 'pages'
    const collectionPrefix = isPages ? '' : `/${redirectItem.to?.reference?.relationTo}`

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      const breadcrumbs = isPages ? (document as Page)?.breadcrumbs : undefined
      const canonicalPath =
        breadcrumbs && breadcrumbs.length > 0
          ? validBreadcrumbUrl(breadcrumbs[breadcrumbs.length - 1]?.url)
          : null
      redirectUrl = `${collectionPrefix}${canonicalPath ?? `/${document?.slug}`}`
    } else {
      const value =
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value
          : null
      const breadcrumbs = isPages ? (value as Page)?.breadcrumbs : undefined
      const canonicalPath =
        breadcrumbs && breadcrumbs.length > 0
          ? validBreadcrumbUrl(breadcrumbs[breadcrumbs.length - 1]?.url)
          : null
      redirectUrl = `${collectionPrefix}${canonicalPath ?? `/${value?.slug ?? ''}`}`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
