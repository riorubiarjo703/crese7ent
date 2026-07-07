import type { Page, Post } from '@/payload-types'
import localization from '@/localization.config'
import { PublicContextProps } from '@/utilities/publicContextProps'

interface ResolveCmsLinkHrefOptions {
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  section?: string | null
  publicContext: PublicContextProps
}

export function resolveCmsLinkHref({
  type,
  url,
  reference,
  section,
  publicContext,
}: ResolveCmsLinkHrefOptions): string | null {
  const locale = publicContext?.locale || localization.defaultLocale
  let href = url ?? null

  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const localePrefix = locale !== localization.defaultLocale ? `/${locale}` : ''
    const relationToPrefix = reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''
    const remainingPath = (() => {
      if (reference?.relationTo === 'pages') {
        const page = reference.value as Page
        const breadcrumbs = page.breadcrumbs

        if (breadcrumbs && breadcrumbs.length > 0) {
          const lastCrumb = breadcrumbs[breadcrumbs.length - 1]
          return lastCrumb?.url ?? `/${page.slug}`
        }

        return `/${page.slug}`
      }

      return `/${reference.value.slug}`
    })()
    const normalizedRemainingPath = reference.value.slug === 'home' ? '' : remainingPath
    href = `${localePrefix}${relationToPrefix}${normalizedRemainingPath}`
  }

  if (type === 'reference' && section && href) {
    href += `#${section}`
  }

  return href
}
