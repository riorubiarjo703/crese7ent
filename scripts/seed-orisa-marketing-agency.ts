import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ensureOrisaMediaMany, mediaId } from './orisa/seed-media'
import { shouldUpdateSeedGlobals } from './seed-globals'

import {
  lexicalHeading,
  lexicalParagraph,
  lexicalHeadingNode,
  lexicalParagraphNode,
  lexicalRoot,
} from '@/utilities/lexical/minimal'

async function updateOrisaGlobalsFromSeed() {
  const { execSync } = await import('node:child_process')
  execSync('pnpm seed:orisa-globals', { stdio: 'inherit', cwd: process.cwd() })
}

async function seedOrisaMarketingAgency() {
  const payload = await getPayload({ config: configPromise })

  const [
    img54,
    img55,
    img58,
    img59,
    img60,
    img61,
    img62,
    avatar6,
    avatar15,
    avatar16,
    avatar17,
    avatar18,
    avatar19,
    ...logoAndPortfolio
  ] = await ensureOrisaMediaMany(payload, [
    'public/seed/orisa/marketing/pages/img-54.webp',
    'public/seed/orisa/marketing/pages/img-55.webp',
    'public/seed/orisa/marketing/pages/img-58.webp',
    'public/seed/orisa/marketing/pages/img-59.webp',
    'public/seed/orisa/marketing/pages/img-60.webp',
    'public/seed/orisa/marketing/pages/img-61.webp',
    'public/seed/orisa/marketing/pages/img-62.webp',
    'public/seed/orisa/shared/template/avatar/avatar-6.webp',
    'public/seed/orisa/marketing/template/avatar/avatar-15.webp',
    'public/seed/orisa/marketing/template/avatar/avatar-16.webp',
    'public/seed/orisa/marketing/template/avatar/avatar-17.webp',
    'public/seed/orisa/marketing/template/avatar/avatar-18.webp',
    'public/seed/orisa/marketing/template/avatar/avatar-19.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-01.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-02.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-03.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-04.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-05.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-06.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-07.webp',
    'public/seed/orisa/marketing/template/logo/logo-brand-08.webp',
    'public/seed/orisa/marketing/pages/img-63.webp',
    'public/seed/orisa/marketing/pages/img-64.webp',
    'public/seed/orisa/marketing/pages/img-65.webp',
    'public/seed/orisa/marketing/pages/img-66.webp',
    'public/seed/orisa/shared/template/avatar/avatar-10.webp',
    'public/seed/orisa/shared/template/avatar/avatar-11.webp',
    'public/seed/orisa/shared/template/avatar/avatar-12.webp',
    'public/seed/orisa/shared/template/avatar/avatar-13.webp',
  ])

  const logoIds = logoAndPortfolio.slice(0, 8)
  const portfolioIds = logoAndPortfolio.slice(8, 12)
  const teamAvatarIds = logoAndPortfolio.slice(12)

  const hero = {
    designVersion: 'ORISA_MARKETING_01' as const,
    tagline: 'Performance Marketing Agency',
    headlineLines: [{ line: 'Marketing' }, { line: 'That Delivers' }, { line: 'Real' }],
    marketingHero: {
      accentWord: 'Value',
      intro:
        'We help ambitious brands acquire customers, increase conversions, and scale revenue through data-driven marketing strategies.',
      testimonialQuote:
        "Real experiences. Real results. Hear from clients who've gained clarity, confidence, and financial growth.",
      testimonialAuthorName: 'Hannah Lee',
      testimonialAuthorRole: 'Creative Director',
      testimonialCardImage: img54,
      testimonialAuthorAvatar: avatar6,
      featureImage: img55,
      clientCount: '16',
      clientCountSuffix: 'K+',
      clientCountLabel: 'Clients word-wide',
      clientAvatars: [avatar15, avatar16, avatar17, avatar18, avatar19].filter(Boolean),
      traitLabels: [
        { label: 'Conversion-focused' },
        { label: 'Data-driven' },
        { label: 'Built for scale' },
        { label: 'User-centric' },
        { label: 'Future-proof' },
      ],
    },
    links: [
      {
        link: {
          type: 'custom' as const,
          url: '/portfolio',
          label: 'View latest projects',
          appearance: 'default' as const,
        },
      },
      {
        link: {
          type: 'custom' as const,
          url: '/pricing',
          label: 'View Pricing Plan',
          appearance: 'outline' as const,
        },
      },
    ],
  }

  const layout = [
    {
      blockType: 'credibilityStrip' as const,
      eyebrow: 'Capabilities',
      headline: lexicalHeading('Positioning · Value proposition · Brand identity'),
      body: lexicalParagraph(
        'Dark metrics marquee showcasing core marketing disciplines and strategic focus areas.',
      ),
      metrics: [
        { value: 'Positioning', label: 'Strategy' },
        { value: 'Performance', label: 'Marketing' },
        { value: 'Brand', label: 'Identity' },
        { value: 'Growth', label: 'Scale' },
      ],
      animateCounters: false,
      cta: {
        type: 'custom' as const,
        url: '/services',
        label: 'Our services',
        appearance: 'text' as const,
      },
    },
    {
      blockType: 'logos' as const,
      designVersion: 'LOGOS2',
      richText: lexicalHeading('Trusted by leading brands worldwide'),
      logos: logoIds.filter(Boolean),
      link: {
        type: 'custom' as const,
        url: '/contact',
        label: 'Become a partner',
        appearance: 'default' as const,
      },
    },
    {
      blockType: 'orisaScrollServices' as const,
      sectionId: 'services',
      eyebrow: 'What we do',
      introHeadline:
        'We turn ideas into high-impact digital solutions that attract customers, boost conversions, and accelerate sustainable growth.',
      pinOnScroll: true,
      cta: {
        type: 'custom' as const,
        url: '/portfolio',
        label: 'View latest projects',
        appearance: 'default' as const,
      },
      services: [
        {
          title: 'Performance Marketing',
          summary: 'Paid ads across Google, Meta, TikTok, LinkedIn',
          bullets: [
            { item: 'Campaign strategy & planning' },
            { item: 'Ad creative & copy testing' },
            { item: 'Audience targeting & retargeting' },
            { item: 'Budget optimization & scaling' },
            { item: 'ROAS & CPA optimization' },
          ],
          image: img58,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'SEO & Content Growth',
          summary: 'Search visibility that compounds over time',
          bullets: [
            { item: 'Keyword research & search intent mapping' },
            { item: 'On-page SEO optimization' },
            { item: 'Content strategy & editorial planning' },
            { item: 'Technical SEO audits' },
            { item: 'Link building & authority growth' },
          ],
          image: img59,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Rate Optimization',
          summary: 'Turning high-intent traffic into loyal customers',
          bullets: [
            { item: 'Funnel analysis & user behavior tracking' },
            { item: 'Landing page optimization' },
            { item: 'A/B testing & experimentation' },
            { item: 'UX & messaging refinement' },
            { item: 'Conversion tracking setup' },
          ],
          image: img60,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Marketing Automation',
          summary: 'Scale personalized journeys without manual overhead',
          bullets: [
            { item: 'Email & lifecycle automation' },
            { item: 'CRM integration & segmentation' },
            { item: 'Lead scoring & nurturing' },
            { item: 'Workflow design & optimization' },
          ],
          image: img61,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Analytics & Attribution',
          summary: 'Measure what matters and optimize with confidence',
          bullets: [
            { item: 'Multi-touch attribution modeling' },
            { item: 'Dashboard & reporting setup' },
            { item: 'GA4 & pixel implementation' },
            { item: 'ROI tracking & forecasting' },
          ],
          image: img62,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
      ],
    },
    {
      blockType: 'feature' as const,
      designVersion: 'FEATURE1',
      badge: 'About',
      richText: lexicalRoot(
        lexicalHeadingNode('Data-driven marketing that scales with your ambition', 'h2'),
        lexicalParagraphNode(
          'We combine performance marketing, content strategy, and conversion optimization to deliver measurable growth for B2B and D2C brands.',
        ),
      ),
    },
    {
      blockType: 'casestudies' as const,
      designVersion: 'CASESTUDIES12',
      richText: lexicalRoot(
        lexicalHeadingNode('Campaigns that drive real results', 'h2'),
        lexicalParagraphNode('Selected case studies from brands we have helped scale.'),
      ),
      slides: [
        {
          name: 'GrowthLab',
          content: '3x ROAS improvement in 90 days',
          logo: mediaId(logoIds, 0),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View case study' },
          images: [{ src: mediaId(portfolioIds, 0), position: 0 }],
        },
        {
          name: 'ScaleUp Co',
          content: 'Lead generation funnel optimization',
          logo: mediaId(logoIds, 1),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View case study' },
          images: [{ src: mediaId(portfolioIds, 1), position: 0 }],
        },
        {
          name: 'BrandForge',
          content: 'Full-funnel brand launch campaign',
          logo: mediaId(logoIds, 2),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View case study' },
          images: [{ src: mediaId(portfolioIds, 2), position: 0 }],
        },
        {
          name: 'MetricMind',
          content: 'Attribution model & analytics overhaul',
          logo: mediaId(logoIds, 3),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View case study' },
          images: [{ src: mediaId(portfolioIds, 3), position: 0 }],
        },
      ].filter((slide) => slide.images[0]?.src && slide.logo),
    },
    {
      blockType: 'feature' as const,
      designVersion: 'FEATURE25',
      tagline: 'Our approach',
      richText: lexicalHeading('Strategy first, execution always'),
    },
    {
      blockType: 'cta' as const,
      designVersion: 'CTA19',
      richText: lexicalRoot(
        lexicalHeadingNode('Ready to scale your marketing?', 'h2'),
        lexicalParagraphNode('Book a free strategy call and discover your growth opportunities.'),
      ),
    },
    {
      blockType: 'teamGallery' as const,
      layout: 'grid' as const,
      headline: lexicalHeading('Behind the Visionaries'),
      subheadline: lexicalParagraph('The strategists and creatives driving measurable growth.'),
      members: [
        { name: 'Hannah Lee', role: 'Creative Director', photo: mediaId(teamAvatarIds, 0) },
        { name: 'Marcus Chen', role: 'Performance Lead', photo: mediaId(teamAvatarIds, 1) },
        { name: 'Priya Sharma', role: 'SEO Strategist', photo: mediaId(teamAvatarIds, 2) },
        { name: 'Alex Morgan', role: 'Growth Analyst', photo: mediaId(teamAvatarIds, 3) },
      ].filter((m) => m.photo),
    },
    {
      blockType: 'solutionsShowcase' as const,
      sectionId: 'solutions',
      pinOnScroll: true,
      eyebrow: 'Solutions',
      headline: lexicalHeading('End-to-end marketing solutions'),
      intro: lexicalParagraph('From acquisition to retention — we cover the full growth stack.'),
      strategies: [
        {
          title: 'Acquisition',
          slug: 'acquisition',
          description: lexicalParagraph('Paid media, SEO, and content that brings qualified traffic.'),
          metrics: [
            { label: 'Channels', value: '8+' },
            { label: 'Avg. ROAS', value: '4.2x' },
          ],
          cta: {
            type: 'custom' as const,
            url: '/contact',
            label: 'Learn more',
            appearance: 'text' as const,
          },
        },
        {
          title: 'Conversion',
          slug: 'conversion',
          description: lexicalParagraph('Landing pages, CRO, and messaging that turns clicks into customers.'),
          metrics: [
            { label: 'Lift', value: '+35%' },
            { label: 'Tests', value: '200+' },
          ],
          cta: {
            type: 'custom' as const,
            url: '/contact',
            label: 'Learn more',
            appearance: 'text' as const,
          },
        },
        {
          title: 'Retention',
          slug: 'retention',
          description: lexicalParagraph('Email, automation, and lifecycle programs that maximize LTV.'),
          metrics: [
            { label: 'Retention', value: '+28%' },
            { label: 'LTV', value: '2.1x' },
          ],
          cta: {
            type: 'custom' as const,
            url: '/contact',
            label: 'Learn more',
            appearance: 'text' as const,
          },
        },
      ],
    },
    {
      blockType: 'feature' as const,
      designVersion: 'FEATURE1',
      badge: 'Process',
      richText: lexicalHeading('A proven framework for sustainable growth'),
    },
    {
      blockType: 'closingCta' as const,
      headline: lexicalHeading("Let's build your growth engine"),
      supportingText: 'Start with a free audit of your current marketing performance.',
      primaryCta: {
        type: 'custom' as const,
        url: '/contact',
        label: 'Get a free audit',
        appearance: 'default' as const,
      },
      secondaryCta: {
        type: 'custom' as const,
        url: '/pricing',
        label: 'View pricing',
        appearance: 'outline' as const,
      },
    },
  ]

  const pageData = {
    title: 'Orisa Marketing',
    slug: 'orisa-marketing',
    _status: 'published' as const,
    hero,
    layout,
    breadcrumbs: [{ url: '/orisa-marketing', label: 'Marketing' }],
    meta: {
      title: 'Orisa — Marketing Agency',
      description: 'Orisa Marketing Agency homepage — performance marketing and growth.',
    },
  } as const

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'orisa-marketing' } },
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
    console.log('Updated Orisa Marketing Agency page (slug: orisa-marketing)')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log('Created Orisa Marketing Agency page (slug: orisa-marketing)')
  }

  console.log('Run pnpm seed:storeframe-bundles to refresh Creative + Marketing Storeframe bundles.')

  if (shouldUpdateSeedGlobals()) {
    await updateOrisaGlobalsFromSeed()
  }

  process.exit(0)
}

await seedOrisaMarketingAgency().catch((error) => {
  console.error(error)
  process.exit(1)
})
