import configPromise from '@payload-config'
import { getPayload } from 'payload'

const LEGACY_PAGE_SLUGS = ['bucks-sauce', 'business-outcomes'] as const

const LEGACY_BUNDLE_SLUGS = [
  'bucks-sauce',
  'business-outcomes',
  'corporate-homepage',
] as const

async function purgeLegacyDemos() {
  const payload = await getPayload({ config: configPromise })

  for (const slug of LEGACY_PAGE_SLUGS) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 100,
      overrideAccess: true,
      depth: 0,
    })

    for (const doc of found.docs) {
      await payload.delete({ collection: 'pages', id: doc.id, overrideAccess: true })
      console.log(`Deleted page: ${slug}`)
    }
  }

  for (const slug of LEGACY_BUNDLE_SLUGS) {
    const found = await payload.find({
      collection: 'layout-bundles',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })

    if (found.docs[0]) {
      await payload.delete({
        collection: 'layout-bundles',
        id: found.docs[0].id,
        overrideAccess: true,
      })
      console.log(`Deleted layout bundle: ${slug}`)
    }
  }

  const orisaCategoryBundles = await payload.find({
    collection: 'layout-bundles',
    where: {
      and: [
        { category: { exists: true } },
        { category: { not_in: ['creative-storeframe', 'marketing-storeframe'] } },
      ],
    },
    limit: 200,
    overrideAccess: true,
    depth: 0,
  })

  for (const bundle of orisaCategoryBundles.docs) {
    const category =
      bundle.slug === 'marketing-storeframe'
        ? 'marketing-storeframe'
        : 'creative-storeframe'

    await payload.update({
      collection: 'layout-bundles',
      id: bundle.id,
      data: { category },
      overrideAccess: true,
    })
    console.log(`Migrated bundle category → ${category}: ${bundle.slug}`)
  }

  console.log('Legacy demo purge complete.')
  process.exit(0)
}

await purgeLegacyDemos().catch((error) => {
  console.error(error)
  process.exit(1)
})
