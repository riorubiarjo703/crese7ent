import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  buildOrisaAboutPageLayout,
  resolveAboutContactFormId,
} from './orisa/about-page-layout'
import { loadAboutMedia } from './orisa/load-bucket-media'
import { shouldUpdateSeedGlobals } from './seed-globals'

async function updateOrisaGlobalsFromSeed() {
  const { execSync } = await import('node:child_process')
  execSync('pnpm seed:orisa-globals', { stdio: 'inherit', cwd: process.cwd() })
}

async function seedOrisaAbout01() {
  const payload = await getPayload({ config: configPromise })

  const media = await loadAboutMedia(payload)
  const contactFormId = await resolveAboutContactFormId(payload)

  const hero = {
    designVersion: 'none' as const,
  }

  const layout = buildOrisaAboutPageLayout(media, contactFormId)

  const pageData = {
    title: 'About',
    slug: 'about',
    _status: 'published' as const,
    hero,
    layout,
    breadcrumbs: [
      { url: '/home', label: 'Home' },
      { url: '/about', label: 'About' },
    ],
    meta: {
      title: 'About | Orisa',
      description: 'Learn about Orisa — our journey, team, and the work we create.',
    },
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
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
    console.log('Updated Orisa About page (slug: about)')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log('Created Orisa About page (slug: about)')
  }

  console.log('Run pnpm seed:storeframe-bundles to refresh Creative + Marketing Storeframe bundles.')

  if (shouldUpdateSeedGlobals()) {
    await updateOrisaGlobalsFromSeed()
  }

  process.exit(0)
}

await seedOrisaAbout01().catch((error) => {
  console.error(error)
  process.exit(1)
})
