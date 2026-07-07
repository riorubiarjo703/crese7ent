import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { STOREFRAME_BUNDLE_SLUGS } from '@/constants/layoutBundles'

import {
  buildCreativeStoreframeTemplates,
  buildMarketingStoreframeTemplates,
} from './orisa/storeframe-bundle-templates'

async function upsertStoreframeBundle(
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: {
    title: string
    slug: (typeof STOREFRAME_BUNDLE_SLUGS)[number]
    category: 'creative-storeframe' | 'marketing-storeframe'
    description: string
    previewImage?: string
    pageTemplates: Awaited<ReturnType<typeof buildCreativeStoreframeTemplates>>
  },
) {
  const existing = await payload.find({
    collection: 'layout-bundles',
    where: { slug: { equals: data.slug } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  const bundleData = {
    title: data.title,
    slug: data.slug,
    category: data.category,
    description: data.description,
    previewImage: data.previewImage,
    pageTemplates: data.pageTemplates,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'layout-bundles',
      id: existing.docs[0].id,
      data: bundleData as any,
      overrideAccess: true,
    })
    console.log(`Updated layout bundle: ${data.title}`)
    return
  }

  await payload.create({
    collection: 'layout-bundles',
    data: bundleData as any,
    overrideAccess: true,
  })
  console.log(`Created layout bundle: ${data.title}`)
}

async function purgeLegacyBundles(payload: Awaited<ReturnType<typeof getPayload>>) {
  const legacy = await payload.find({
    collection: 'layout-bundles',
    where: {
      slug: {
        not_in: [...STOREFRAME_BUNDLE_SLUGS],
      },
    },
    limit: 500,
    overrideAccess: true,
    depth: 0,
  })

  for (const bundle of legacy.docs) {
    await payload.delete({
      collection: 'layout-bundles',
      id: bundle.id,
      overrideAccess: true,
    })
    console.log(`Deleted legacy layout bundle: ${bundle.slug}`)
  }
}

async function seedStoreframeBundles() {
  const payload = await getPayload({ config: configPromise })

  const creativeTemplates = await buildCreativeStoreframeTemplates(payload)
  const marketingTemplates = await buildMarketingStoreframeTemplates(payload)

  await upsertStoreframeBundle(payload, {
    title: 'Creative Storeframe',
    slug: 'creative-storeframe',
    category: 'creative-storeframe',
    description: 'Creative agency page templates: home, about, services, team, contact, FAQ, coming soon.',
    previewImage: creativeTemplates[0]?.previewImage,
    pageTemplates: creativeTemplates,
  })

  await upsertStoreframeBundle(payload, {
    title: 'Marketing Storeframe',
    slug: 'marketing-storeframe',
    category: 'marketing-storeframe',
    description: 'Marketing agency page templates: home, about, services, team, contact, FAQ, coming soon.',
    previewImage: marketingTemplates[0]?.previewImage,
    pageTemplates: marketingTemplates,
  })

  await purgeLegacyBundles(payload)

  console.log('Storeframe bundles ready (Creative + Marketing).')
  process.exit(0)
}

await seedStoreframeBundles().catch((error) => {
  console.error(error)
  process.exit(1)
})
