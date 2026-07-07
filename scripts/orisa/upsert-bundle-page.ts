import type { Payload } from 'payload'

import type { OrisaBundleDefinition } from './bundle-registry'
import { buildHero, buildLayout } from './layout-templates'
import { loadBucketMedia, mediaIdByFilename } from './load-bucket-media'
import { ensureOrisaContactForm } from './ensure-contact-form'

export async function upsertOrisaBundlePage(
  payload: Payload,
  bundle: OrisaBundleDefinition,
): Promise<void> {
  const media = await loadBucketMedia(payload, bundle.key)
  const needsForm = bundle.template === 'about' || bundle.template === 'contact'
  const contactFormId = needsForm ? await ensureOrisaContactForm(payload) : undefined

  const hero = buildHero(bundle, media)
  const layout = buildLayout(bundle, media, contactFormId)

  const pageData = {
    title: bundle.title.replace(/^Orisa — /, ''),
    slug: bundle.pageSlug,
    _status: 'published' as const,
    hero,
    layout,
    breadcrumbs: [
      { url: '/home', label: 'Home' },
      { url: `/${bundle.pageSlug}`, label: bundle.title.replace(/^Orisa — /, '') },
    ],
    meta: {
      title: `${bundle.title} | Orisa`,
      description: bundle.description,
    },
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: bundle.pageSlug } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log(`Updated page: ${bundle.pageSlug}`)
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log(`Created page: ${bundle.pageSlug}`)
  }

  const bundleData = {
    title: bundle.title,
    slug: bundle.bundleSlug,
    category: 'storeframe' as const,
    description: bundle.description,
    previewImage: mediaIdByFilename(media, 'bg-img.webp') ?? media.pages[0],
    hero: pageData.hero,
    layout: pageData.layout,
  }

  const existingBundle = await payload.find({
    collection: 'layout-bundles',
    where: { slug: { equals: bundle.bundleSlug } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  if (existingBundle.docs.length > 0) {
    await payload.update({
      collection: 'layout-bundles',
      id: existingBundle.docs[0].id,
      data: bundleData as any,
      overrideAccess: true,
    })
    console.log(`Updated layout bundle: ${bundle.title}`)
  } else {
    await payload.create({
      collection: 'layout-bundles',
      data: bundleData as any,
      overrideAccess: true,
    })
    console.log(`Created layout bundle: ${bundle.title}`)
  }
}
