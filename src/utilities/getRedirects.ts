import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { Config } from '@/payload-types'

export async function getRedirects(depth = 1, locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
    ...(locale ? { locale: locale as Config['locale'] } : {}),
  })

  return redirects
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache per locale so breadcrumbs on the populated page reference are
 * fetched in the correct language (nested-docs stores breadcrumb URLs
 * per locale).
 */
export const getCachedRedirects = (locale?: string) =>
  unstable_cache(async () => getRedirects(1, locale), ['redirects', locale ?? 'default'], {
    tags: ['redirects'],
  })
