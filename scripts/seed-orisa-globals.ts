import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')

function loadDesignTokens() {
  const tokensPath = path.join(repoRoot, 'docs/orisa/design-tokens.json')
  return JSON.parse(fs.readFileSync(tokensPath, 'utf8')) as {
    themeConfigSeed: {
      regularColors: Record<string, string>
      darkmodeColors: Record<string, string | boolean>
      radius: string
    }
  }
}

async function ensureStoreframeLogoMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const filename = 'logo-storeframe.svg'
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]?.id) return existing.docs[0].id

  const filePath = path.join(repoRoot, 'public/media/logo-storeframe.svg')
  if (!fs.existsSync(filePath)) {
    console.warn(`Storeframe logo not found at ${filePath}. Upload logo-storeframe.svg in admin.`)
    return undefined
  }

  const created = await payload.create({
    collection: 'media',
    data: { alt: 'Storeframe' },
    file: {
      data: Buffer.from(fs.readFileSync(filePath)),
      mimetype: 'image/svg+xml',
      name: filename,
      size: fs.statSync(filePath).size,
    },
    overrideAccess: true,
  })

  return created.id
}

async function seedOrisaGlobals() {
  const payload = await getPayload({ config: configPromise })
  const tokens = loadDesignTokens()
  const logoId = await ensureStoreframeLogoMedia(payload)

  await payload.updateGlobal({
    slug: 'themeConfig',
    data: {
      radius: tokens.themeConfigSeed.radius,
      regularColors: tokens.themeConfigSeed.regularColors,
      darkmodeColors: tokens.themeConfigSeed.darkmodeColors,
    } as any,
    overrideAccess: true,
  })
  console.log('Updated themeConfig (Storeframe / Orisa theme tokens + dark mode)')

  await payload.updateGlobal({
    slug: 'header',
    data: {
      designVersion: '6',
      isSearchEnabled: true,
      ...(logoId ? { logo: logoId } : {}),
      items: [
        {
          blockType: 'sub',
          label: 'Home',
          subitems: [
            { link: { type: 'custom', url: '/', label: 'Creative Agency' } },
            { link: { type: 'custom', url: '/', label: 'Marketing Agency' } },
          ],
        },
        {
          blockType: 'sub',
          label: 'Page',
          subitems: [
            { link: { type: 'custom', url: '/about', label: 'About 01' } },
            { link: { type: 'custom', url: '/services', label: 'Services 01' } },
            { link: { type: 'custom', url: '/team', label: 'Team' } },
            { link: { type: 'custom', url: '/pricing', label: 'Pricing' } },
            { link: { type: 'custom', url: '/faqs', label: 'FAQs' } },
          ],
        },
        {
          blockType: 'sub',
          label: 'Portfolio',
          subitems: [
            { link: { type: 'custom', url: '/portfolio', label: 'Portfolio 01' } },
            { link: { type: 'custom', url: '/portfolio', label: 'Portfolio Cinema' } },
          ],
        },
        {
          blockType: 'link',
          link: { type: 'custom', url: '/blog', label: 'News' },
        },
        {
          blockType: 'link',
          link: { type: 'custom', url: '/contact', label: 'Contact' },
        },
      ],
      buttons: [
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: "Let's Talk",
            appearance: 'default',
          },
        },
      ],
    } as any,
    overrideAccess: true,
  })
  console.log('Updated header global (navbar6)')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      designVersion: '9',
      ...(logoId ? { logo: logoId } : {}),
      copyright: 'Storeframe. All rights reserved.',
      orisaFooter: {
        headline: "Let's Shape Your Next Idea",
        address: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA',
        phone: '(212) 555-7398',
        email: 'hello@storeframe.com',
        brandMark: 'Storeframe®',
        marqueeTags: [
          { label: 'Web Development' },
          { label: 'Motion Graphics' },
          { label: 'Brand Strategy' },
          { label: 'Product Design' },
        ],
      },
      socialLinks: [
        { icon: 'twitter', url: 'https://twitter.com' },
        { icon: 'facebook', url: 'https://facebook.com' },
        { icon: 'instagram', url: 'https://instagram.com' },
        { icon: 'linkedin', url: 'https://linkedin.com' },
      ],
      navItems: [
        {
          title: 'Navigation',
          subNavItems: [
            { link: { type: 'custom', url: '/', label: 'Home' } },
            { link: { type: 'custom', url: '/about', label: 'About' } },
            { link: { type: 'custom', url: '/portfolio', label: 'Works' } },
            { link: { type: 'custom', url: '/blog', label: 'Blog' } },
            { link: { type: 'custom', url: '/contact', label: 'Contact' } },
          ],
        },
        {
          title: 'Shop',
          subNavItems: [
            { link: { type: 'custom', url: '/shop', label: 'Shop' } },
            { link: { type: 'custom', url: '/pricing', label: 'Pricing' } },
          ],
        },
      ],
      legalLinks: [
        { link: { type: 'custom', url: '/privacy', label: 'Privacy Policy' } },
        { link: { type: 'custom', url: '/imprint', label: 'Imprint' } },
      ],
    } as any,
    overrideAccess: true,
  })
  console.log('Updated footer global (footer9)')

  process.exit(0)
}

await seedOrisaGlobals().catch((error) => {
  console.error(error)
  process.exit(1)
})
