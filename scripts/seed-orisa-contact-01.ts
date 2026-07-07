import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ensureOrisaContactForm } from './orisa/ensure-contact-form'
import { ensureOrisaMediaMany } from './orisa/seed-media'
import { shouldUpdateSeedGlobals } from './seed-globals'

import {
  lexicalHeadingNode,
  lexicalParagraphNode,
  lexicalRoot,
} from '@/utilities/lexical/minimal'

async function updateOrisaGlobalsFromSeed() {
  const { execSync } = await import('node:child_process')
  execSync('pnpm seed:orisa-globals', { stdio: 'inherit', cwd: process.cwd() })
}

async function seedOrisaContact01() {
  const payload = await getPayload({ config: configPromise })

  const [bannerImg] = await ensureOrisaMediaMany(payload, [
    'public/seed/orisa/contact/pages/img-166.webp',
  ])

  const contactFormId = await ensureOrisaContactForm(payload)

  const hero = {
    designVersion: 'ORISA_PAGE_01' as const,
    tagline: 'Contact Us',
    headlineLines: [{ line: 'Get in touch' }],
    pageHero: {
      bannerImage: bannerImg,
      intro:
        'Start the conversation by sharing your vision. Our team will respond within 1–2 business days.',
    },
  }

  const layout = contactFormId
    ? [
        {
          blockType: 'contact' as const,
          designVersion: 'CONTACT2' as const,
          richText: lexicalRoot([
            lexicalHeadingNode('Chicago Office'),
            lexicalParagraphNode(
              '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA\nPhone: (212) 555-7398\nEmail: hello@orisa.com',
            ),
            lexicalHeadingNode('New York Office'),
            lexicalParagraphNode(
              '245 Fifth Avenue, Suite 1800\nNew York, NY 10016, USA\nPhone: (212) 555-7398\nEmail: sale@orisa.com',
            ),
            lexicalParagraphNode(
              'By submitting, you agree to our Terms and Privacy Policy.',
            ),
          ]),
          form: [{ blockType: 'formBlock' as const, form: contactFormId }],
        },
      ]
    : []

  const pageData = {
    title: 'Contact',
    slug: 'contact',
    _status: 'published' as const,
    hero,
    layout,
    breadcrumbs: [
      { url: '/home', label: 'Home' },
      { url: '/contact', label: 'Contact' },
    ],
    meta: {
      title: 'Contact | Orisa',
      description: 'Get in touch with Orisa — Chicago and New York offices.',
    },
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
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
    console.log('Updated Orisa Contact page (slug: contact)')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log('Created Orisa Contact page (slug: contact)')
  }

  console.log('Run pnpm seed:storeframe-bundles to refresh Creative + Marketing Storeframe bundles.')

  if (shouldUpdateSeedGlobals()) {
    await updateOrisaGlobalsFromSeed()
  }

  process.exit(0)
}

await seedOrisaContact01().catch((error) => {
  console.error(error)
  process.exit(1)
})
