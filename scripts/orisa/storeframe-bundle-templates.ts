import type { LayoutBundlePageType } from '@/constants/layoutBundles'

import type { OrisaBundleDefinition } from './bundle-registry'
import { ensureOrisaContactForm } from './ensure-contact-form'
import { buildHero, buildLayout } from './layout-templates'
import { loadBucketMedia, mediaIdByFilename, type OrisaBucketMedia } from './load-bucket-media'

import { lexicalHeading, lexicalParagraph } from '@/utilities/lexical/minimal'

export interface StoreframePageTemplateSeed {
  pageType: LayoutBundlePageType
  title: string
  description?: string
  previewImage?: string
  hero: Record<string, unknown>
  layout: Record<string, unknown>[]
}

function asLayoutBlocks(layout: unknown[]): Record<string, unknown>[] {
  return layout.filter(
    (block): block is Record<string, unknown> => Boolean(block) && typeof block === 'object',
  )
}

function pickBlocks(layout: Record<string, unknown>[], blockTypes: string[]) {
  return layout.filter(
    (block) => typeof block.blockType === 'string' && blockTypes.includes(block.blockType),
  )
}

function pageHero(media: OrisaBucketMedia, tagline: string, headline: string, intro?: string) {
  return {
    designVersion: 'ORISA_PAGE_01' as const,
    tagline,
    headlineLines: [{ line: headline }],
    pageHero: {
      bannerImage: media.pages[0],
      intro: intro ?? 'Crafted for Storeframe-powered sites.',
    },
  }
}

function closingCta(headline: string) {
  return {
    blockType: 'closingCta' as const,
    headline: lexicalHeading(headline),
    supportingText: 'Ready to start your next project? Get in touch today.',
    primaryCta: {
      type: 'custom' as const,
      url: '/contact',
      label: 'Get in touch',
      appearance: 'default' as const,
    },
    secondaryCta: {
      type: 'custom' as const,
      url: '/portfolio',
      label: 'View our work',
      appearance: 'outline' as const,
    },
  }
}

function creativeBase(): OrisaBundleDefinition {
  return {
    key: 'creative',
    html: 'index.html',
    title: 'Creative Storeframe',
    bundleSlug: 'creative-storeframe',
    pageSlug: 'home',
    description: 'Creative agency layouts for Storeframe.',
    template: 'creative',
    tagline: 'B2B Marketing Agency',
    headline: 'Designing with imagination, driven by purpose.',
  }
}

function marketingBase(): OrisaBundleDefinition {
  return {
    key: 'marketing',
    html: 'index-3.html',
    title: 'Marketing Storeframe',
    bundleSlug: 'marketing-storeframe',
    pageSlug: 'orisa-marketing',
    description: 'Marketing agency layouts for Storeframe.',
    template: 'marketing',
    tagline: 'Performance Marketing Agency',
    headline: 'Marketing That Delivers Real Value',
  }
}

export async function buildCreativeStoreframeTemplates(
  payload: Parameters<typeof loadBucketMedia>[0],
): Promise<StoreframePageTemplateSeed[]> {
  const media = await loadBucketMedia(payload, 'creative')
  const contactFormId = await ensureOrisaContactForm(payload)
  const base = creativeBase()

  const homeHero = buildHero(base, media) as Record<string, unknown>
  const homeLayout = asLayoutBlocks(buildLayout(base, media, contactFormId))

  const aboutDef: OrisaBundleDefinition = {
    ...base,
    template: 'about',
    tagline: 'About Us',
    headline: 'We are a creative digital agency shaping meaningful experiences',
  }
  const aboutLayout = asLayoutBlocks(buildLayout(aboutDef, media, contactFormId))

  const contactDef: OrisaBundleDefinition = {
    ...base,
    template: 'contact',
    tagline: 'Contact Us',
    headline: 'Get in touch',
  }
  const contactLayout = asLayoutBlocks(buildLayout(contactDef, media, contactFormId))

  return [
    {
      pageType: 'home',
      title: 'Homepage',
      description: 'Hero, about, marquee, services, portfolio, testimonials, FAQ, blog.',
      previewImage: mediaIdByFilename(media, 'bg-img.webp') ?? media.pages[0],
      hero: homeHero,
      layout: homeLayout,
    },
    {
      pageType: 'about',
      title: 'About page',
      description: 'Story, stats, team preview, and contact form.',
      previewImage: mediaIdByFilename(media, 'img-1.webp') ?? media.pages[0],
      hero: { designVersion: 'none' },
      layout: aboutLayout,
    },
    {
      pageType: 'services',
      title: 'Services page',
      description: 'Scroll-pinned services list with brand strip and CTA.',
      previewImage: media.pages[2] ?? media.pages[0],
      hero: pageHero(media, 'Our Services', 'Solutions built for ambitious brands'),
      layout: pickBlocks(homeLayout, ['logos', 'orisaServicesPin', 'closingCta']),
    },
    {
      pageType: 'team',
      title: 'Team page',
      description: 'Team gallery with agency stats and intro.',
      previewImage: media.avatars[0] ?? media.pages[0],
      hero: pageHero(media, 'Our Team', 'Meet the people behind the work'),
      layout: pickBlocks(aboutLayout, ['about', 'stat', 'teamGallery', 'closingCta']),
    },
    {
      pageType: 'contact',
      title: 'Contact page',
      description: 'Banner hero and contact form.',
      previewImage: media.pages[0],
      hero: buildHero(contactDef, media) as Record<string, unknown>,
      layout: contactLayout,
    },
    {
      pageType: 'faq',
      title: 'FAQ page',
      description: 'Accordion FAQ with closing CTA.',
      previewImage: media.pages[3] ?? media.pages[0],
      hero: pageHero(media, 'FAQ', 'Answers to common questions'),
      layout: [...pickBlocks(homeLayout, ['faq']), closingCta("Let's Create Meaning Together")],
    },
    {
      pageType: 'coming-soon',
      title: 'Coming soon page',
      description: 'Minimal launch page with CTA.',
      previewImage: media.pages[0],
      hero: pageHero(media, 'Coming Soon', 'Something great is on the way'),
      layout: [closingCta('Stay in the loop')],
    },
  ]
}

export async function buildMarketingStoreframeTemplates(
  payload: Parameters<typeof loadBucketMedia>[0],
): Promise<StoreframePageTemplateSeed[]> {
  const media = await loadBucketMedia(payload, 'marketing')
  const contactFormId = await ensureOrisaContactForm(payload)
  const base = marketingBase()

  const homeHero = buildHero(base, media) as Record<string, unknown>
  const homeLayout = asLayoutBlocks(buildLayout(base, media, contactFormId))

  const aboutDef: OrisaBundleDefinition = {
    ...base,
    template: 'about',
    tagline: 'About Us',
    headline: 'A growth partner for ambitious brands',
  }
  const aboutLayout = asLayoutBlocks(buildLayout(aboutDef, media, contactFormId))

  const contactDef: OrisaBundleDefinition = {
    ...base,
    template: 'contact',
    tagline: 'Contact Us',
    headline: 'Start a conversation',
  }
  const contactLayout = asLayoutBlocks(buildLayout(contactDef, media, contactFormId))

  return [
    {
      pageType: 'home',
      title: 'Homepage',
      description: 'Metrics hero, services, portfolio, team, solutions, and CTA.',
      previewImage: media.pages[0],
      hero: homeHero,
      layout: homeLayout,
    },
    {
      pageType: 'about',
      title: 'About page',
      description: 'Agency story, stats, and team section.',
      previewImage: media.pages[1] ?? media.pages[0],
      hero: { designVersion: 'none' },
      layout: aboutLayout,
    },
    {
      pageType: 'services',
      title: 'Services page',
      description: 'Capabilities strip, logos, and scroll services.',
      previewImage: media.pages[2] ?? media.pages[0],
      hero: pageHero(media, 'Services', 'Performance marketing that scales'),
      layout: pickBlocks(homeLayout, [
        'credibilityStrip',
        'logos',
        'orisaScrollServices',
        'closingCta',
      ]),
    },
    {
      pageType: 'team',
      title: 'Team page',
      description: 'Team grid with supporting feature copy.',
      previewImage: media.avatars[0] ?? media.pages[0],
      hero: pageHero(media, 'Our Team', 'Strategists and creatives driving growth'),
      layout: pickBlocks(homeLayout, ['teamGallery', 'feature', 'closingCta']),
    },
    {
      pageType: 'contact',
      title: 'Contact page',
      description: 'Contact hero and form block.',
      previewImage: media.pages[0],
      hero: buildHero(contactDef, media) as Record<string, unknown>,
      layout: contactLayout,
    },
    {
      pageType: 'faq',
      title: 'FAQ page',
      description: 'Marketing FAQ with CTA.',
      previewImage: media.pages[3] ?? media.pages[0],
      hero: pageHero(media, 'FAQ', 'Common questions about working with us'),
      layout: [
        {
          blockType: 'faq',
          designVersion: 'FAQ1',
          headline: lexicalHeading('Marketing FAQ'),
          faqs: [
            {
              question: 'Which channels do you manage?',
              answer: lexicalParagraph(
                'Paid search, paid social, SEO, email, and lifecycle automation.',
              ),
            },
            {
              question: 'How do you measure success?',
              answer: lexicalParagraph(
                'We track ROAS, CAC, LTV, and pipeline contribution with clear reporting.',
              ),
            },
          ],
        },
        closingCta('Ready to scale?'),
      ],
    },
    {
      pageType: 'coming-soon',
      title: 'Coming soon page',
      description: 'Launch placeholder with CTA.',
      previewImage: media.pages[0],
      hero: pageHero(media, 'Coming Soon', 'Launching soon — stay tuned'),
      layout: [closingCta('Join the waitlist')],
    },
  ]
}
