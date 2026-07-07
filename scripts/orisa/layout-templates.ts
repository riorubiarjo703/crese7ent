import type { OrisaBundleDefinition } from './bundle-registry'
import { buildOrisaAboutPageLayout } from './about-page-layout'
import {
  mediaIdByFilename,
  mediaIdsByFilenames,
  type OrisaBucketMedia,
} from './load-bucket-media'

import {
  lexicalHeading,
  lexicalParagraph,
  lexicalHeadingNode,
  lexicalParagraphNode,
  lexicalRoot,
} from '@/utilities/lexical/minimal'

function headlineLines(text: string) {
  return text.split(/,\s*/).map((line) => ({ line: line.trim() }))
}

function splitHeadline(text: string, words = 3) {
  const parts = text.split(/\s+/)
  if (parts.length <= words) return parts.map((line) => ({ line }))
  const chunk = Math.ceil(parts.length / words)
  const lines: string[] = []
  for (let i = 0; i < parts.length; i += chunk) {
    lines.push(parts.slice(i, i + chunk).join(' '))
  }
  return lines.map((line) => ({ line }))
}

const CREATIVE_HERO_SIDE_TEXT =
  'We partner with brands to create digital design that drives conversions and commands attention.'

const CREATIVE_SERVICE_PANELS = [
  'img-5.webp',
  'img-6.webp',
  'img-7.webp',
  'img-8.webp',
  'img-9.webp',
  'img-10.webp',
] as const

const CREATIVE_SERVICE_THUMBS = [
  'img-5-sm.webp',
  'img-6-sm.webp',
  'img-7-sm.webp',
  'img-8-sm.webp',
  'img-9-sm.webp',
  'img-10-sm.webp',
] as const

const CREATIVE_PORTFOLIO_IMAGES = [
  'img-11.webp',
  'img-12.webp',
  'img-13.webp',
  'img-14.webp',
] as const

const CREATIVE_SERVICES = [
  'UI/UX Design',
  'Branding',
  'Development',
  'Motion Design',
  'Marketing',
  'Graphics',
] as const

function buildCreativeHero(bundle: OrisaBundleDefinition, media: OrisaBucketMedia) {
  const heroBg = mediaIdByFilename(media, 'bg-img.webp')
  const heroLayer = mediaIdByFilename(media, 'img-1.webp')

  return {
    designVersion: 'ORISA_CREATIVE_01' as const,
    tagline: bundle.tagline,
    headlineLines: headlineLines(bundle.headline),
    sideText: CREATIVE_HERO_SIDE_TEXT,
    images: [heroBg, heroLayer].filter(Boolean),
    backgroundVideo: media.videos[0],
    backgroundPoster: heroLayer ?? heroBg,
    videoLink: {
      type: 'custom' as const,
      url: '/about',
      label: 'How we work',
      appearance: 'default' as const,
    },
    talkBadgeLink: {
      type: 'custom' as const,
      url: '/contact',
      label: "Let's Talk",
      appearance: 'default' as const,
    },
    links: [
      {
        link: {
          type: 'custom' as const,
          url: '/portfolio',
          label: 'Explore All Work',
          appearance: 'default' as const,
        },
      },
      {
        link: {
          type: 'custom' as const,
          url: '/contact',
          label: 'Get a free quote',
          appearance: 'outline' as const,
        },
      },
    ],
  }
}

export function buildHero(bundle: OrisaBundleDefinition, media: OrisaBucketMedia) {
  const p = media.pages

  if (bundle.template === 'about') {
    return { designVersion: 'none' as const }
  }

  if (bundle.template === 'contact') {
    return {
      designVersion: 'ORISA_PAGE_01' as const,
      tagline: bundle.tagline,
      headlineLines: [{ line: bundle.headline }],
      pageHero: {
        bannerImage: p[0],
        intro:
          'Start the conversation by sharing your vision. Our team will respond within 1–2 business days.',
      },
    }
  }

  if (bundle.template === 'portfolio' || bundle.template === 'minimal') {
    return {
      designVersion: 'ORISA_PAGE_01' as const,
      tagline: bundle.tagline,
      headlineLines: [{ line: bundle.headline }],
      pageHero: {
        bannerImage: p[0],
        intro: bundle.description,
      },
    }
  }

  if (bundle.template === 'marketing') {
    return {
      designVersion: 'ORISA_MARKETING_01' as const,
      tagline: bundle.tagline,
      headlineLines: splitHeadline(bundle.headline, 3),
      marketingHero: {
        accentWord: 'Value',
        intro: bundle.description,
        testimonialQuote: 'Real experiences. Real results from clients who trust our team.',
        testimonialAuthorName: 'Hannah Lee',
        testimonialAuthorRole: 'Creative Director',
        testimonialCardImage: p[0],
        testimonialAuthorAvatar: media.avatars[0],
        featureImage: p[1] ?? p[0],
        clientCount: '16',
        clientCountSuffix: 'K+',
        clientCountLabel: 'Clients worldwide',
        clientAvatars: media.avatars.slice(0, 5),
        traitLabels: [
          { label: 'Conversion-focused' },
          { label: 'Data-driven' },
          { label: 'Built for scale' },
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
            url: '/contact',
            label: 'Get in touch',
            appearance: 'outline' as const,
          },
        },
      ],
    }
  }

  return buildCreativeHero(bundle, media)
}

function ensureMinLogos(ids: string[], min = 5): string[] {
  const pool = ids.filter(Boolean)
  if (pool.length === 0) return []

  const result = [...pool]
  while (result.length < min) {
    result.push(pool[result.length % pool.length])
  }
  return result
}

function buildLogosBlock(
  media: OrisaBucketMedia,
  designVersion: 'LOGOS3' | 'LOGOS4' = 'LOGOS4',
  options?: { creativeBrandStrip?: boolean },
) {
  const creativeBrandLogos = mediaIdsByFilenames(media, [
    'brand-1.webp',
    'brand-2.webp',
    'brand-3.webp',
    'brand-4.webp',
    'brand-5.webp',
    'brand-6.webp',
  ])

  const logos =
    options?.creativeBrandStrip && creativeBrandLogos.length >= 5
      ? creativeBrandLogos
      : ensureMinLogos(media.logos)
  if (logos.length < 5) return null

  return {
    blockType: 'logos' as const,
    designVersion,
    richText:
      designVersion === 'LOGOS3' ? lexicalHeading('Trusted by innovative brands') : undefined,
    logos,
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

const DEFAULT_PORTFOLIO_TAGS = ['Branding', 'Web Design', 'Web development']

function buildOrisaTestimonialBlock(media: OrisaBucketMedia) {
  const avatars = media.avatars
  const brand7 = mediaIdByFilename(media, 'brand-7.webp')
  const brand8 = mediaIdByFilename(media, 'brand-8.webp')
  const brand9 = mediaIdByFilename(media, 'brand-9.webp')

  return {
    blockType: 'testimonial' as const,
    designVersion: 'TESTIMONIAL2' as const,
    headline: lexicalRoot(
      lexicalHeadingNode('Trusted by Clients', 'h2'),
      lexicalParagraphNode(
        'Real client experiences that speak to the strength of our work.',
      ),
    ),
    testimonial: [
      {
        authorName: 'Amelia Wright',
        authorDescription: 'Head of Marketing',
        authorLocation: 'London United Kingdom',
        rating: 5,
        text: lexicalParagraph(
          'They delivered not just a design, but a complete brand experience. Strategic, creative, and incredibly detail-oriented.',
        ),
        authorAvatar: avatars[0],
        icon: brand7,
      },
      {
        authorName: 'Lucas Moreno',
        authorDescription: 'Product Manager',
        authorLocation: 'Barcelona, Spain',
        rating: 4,
        text: lexicalParagraph(
          'The collaboration was seamless from start to finish. Their UX decisions significantly improved our product engagement.',
        ),
        authorAvatar: avatars[1] ?? avatars[0],
        icon: brand8,
      },
      {
        authorName: 'Hannah Lee',
        authorDescription: 'Creative Director',
        authorLocation: 'Studio Kinetic',
        rating: 5,
        text: lexicalParagraph(
          'A rare combination of technical expertise and artistic vision. The final result felt premium and purposeful.',
        ),
        authorAvatar: avatars[2] ?? avatars[0],
        icon: brand9,
      },
    ].filter((item) => item.authorAvatar),
    link: {
      type: 'custom' as const,
      url: 'mailto:hello@orisa.com',
      label: 'Client Stories',
    },
  }
}

function buildOrisaWhyChooseUsBlock(media: OrisaBucketMedia) {
  const img15 = mediaIdByFilename(media, 'img-15.webp')
  const img16 = mediaIdByFilename(media, 'img-16.webp')
  const logoW = mediaIdByFilename(media, 'logo-w-lg.png')

  return {
    blockType: 'orisaWhyChooseUs' as const,
    eyebrow: 'Why choose us',
    eyebrowLink: { type: 'custom' as const, url: '/about', label: 'Why choose us' },
    headline: lexicalHeading(
      'Delivering measurable results through a strong balance of design excellence and functional performance.',
      'h3',
    ),
    intro: lexicalParagraph(
      'Orisa™ goes beyond aesthetics—bringing clarity through motion, flexible structure, and practical tools that help you move faster without defining your identity.',
    ),
    imageCards: [
      {
        image: img15,
        tag: 'Creative',
        tagLink: { type: 'custom' as const, url: '/portfolio', label: 'Creative' },
        watermark: logoW,
      },
      {
        image: img16,
        overlayText: 'Great digital experiences begin with a conversation. Let’s talk.',
      },
    ].filter((card) => card.image),
    statColumns: [
      {
        compactPosition: 'top' as const,
        compactValue: '1.8M',
        compactSuffix: '+',
        featureTitle: 'Active\nlive cases',
        featureDescription:
          'We always provide people a complete solution upon focused of any business',
        featureIcon: 'active-cases' as const,
      },
      {
        compactPosition: 'bottom' as const,
        compactValue: '16K',
        compactSuffix: '+',
        featureTitle: 'Trusted\nPartners',
        featureDescription:
          'Because sometimes the best design is the one you don’t have to think about.',
        featureIcon: 'trusted-partners' as const,
      },
    ],
  }
}

function buildOrisaStatsBarBlock() {
  return {
    blockType: 'orisaStatsBar' as const,
    stats: [
      { value: '10', suffix: 'K+', label: 'Years of Creative Practice' },
      { value: '50', suffix: 'K+', label: 'Projects Carefully Crafted' },
      { value: '16', suffix: 'K+', label: 'Brands Collaborated With' },
      { value: '20', suffix: 'M+', label: 'Total Funding Supported' },
      { value: '98', suffix: '%', label: 'Client satisfaction rate' },
    ],
  }
}

function buildOrisaMeetTeamBlock(media: OrisaBucketMedia) {
  const teamPhotos = mediaIdsByFilenames(media, [
    'img-17.webp',
    'img-18.webp',
    'img-19.webp',
    'img-20.webp',
  ])

  return {
    blockType: 'orisaMeetTeam' as const,
    eyebrow: 'Meet our team',
    eyebrowLink: { type: 'custom' as const, url: '/team', label: 'Meet our team' },
    headline: lexicalHeading(
      'Meet the minds behind Orisa Studio. Rely on our experienced professionals to find solutions tailored just for you.',
      'h2',
    ),
    cta: { type: 'custom' as const, url: '/team', label: 'Join our Team' },
    contactTitle: 'We are here',
    locations: [
      {
        address: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA',
        phone: '+1234567890',
        email: 'hello@orisa.com',
      },
      {
        address: '245 Fifth Avenue, Suite 1800\nNew York, NY 10016, USA',
        phone: '+2125557398',
        email: 'sale@orisa.com',
      },
    ],
    members: [
      { name: 'Darrell Steward', role: 'UI/UX Designer', photo: teamPhotos[0], profileLink: { type: 'custom' as const, url: '/team' } },
      { name: 'Amelia Courtney', role: 'Project Manager', photo: teamPhotos[1], profileLink: { type: 'custom' as const, url: '/team' } },
      { name: 'Esther Howard', role: 'Software Developer', photo: teamPhotos[2], profileLink: { type: 'custom' as const, url: '/team' } },
      { name: 'Jacob Jones', role: 'Marketing CEO', photo: teamPhotos[3], profileLink: { type: 'custom' as const, url: '/team' } },
    ].filter((member) => member.photo),
  }
}

function buildOrisaFaqBlock(media: OrisaBucketMedia) {
  const supportImage = mediaIdByFilename(media, 'img-21.webp')

  return {
    blockType: 'orisaFaq' as const,
    supportImage,
    supportTitle: 'Still no luck? We can help!',
    supportDescription: 'Let us Know how we can assist',
    supportCta: { type: 'custom' as const, url: '/contact', label: 'Support Center' },
    eyebrow: 'FAQ',
    eyebrowLink: { type: 'custom' as const, url: '/faqs', label: 'FAQ' },
    headline: lexicalHeading(
      'Answered questions. Everything you might want to know—up front.',
      'h2',
    ),
    faqs: [
      {
        question: 'How does your design process work?',
        answer: lexicalParagraph(
          'Our process includes discovery, strategy, design, feedback, and delivery — ensuring clarity, collaboration, and results at every stage.',
        ),
      },
      {
        question: 'How long does a typical project take?',
        answer: lexicalParagraph(
          'Timelines vary by scope, but most projects take between 2–6 weeks — with clear milestones to keep everything on track.',
        ),
      },
      {
        question: 'Do you work with startups or only established brands?',
        answer: lexicalParagraph(
          'We work with both startups and established brands — tailoring our approach to fit each stage of growth.',
        ),
      },
      {
        question: 'Can you handle custom or complex requests?',
        answer: lexicalParagraph(
          'Yes — we specialize in custom and complex projects, creating flexible solutions to meet unique needs.',
        ),
      },
    ],
  }
}

function portfolioSlides(media: OrisaBucketMedia, orisaCreative = false) {
  const { pages, logos } = media
  const portfolioIds = mediaIdsByFilenames(media, [...CREATIVE_PORTFOLIO_IMAGES])
  const names = orisaCreative
    ? ['Noirform', 'Nebula', 'Voidline', 'Lumen']
    : ['Noirform', 'Nebula', 'Studio K', 'Arcline']
  const contents = orisaCreative
    ? [
        'Brand art direction & visual identity',
        'UI/UX & product design for digital platforms',
        '3D animation & motion branding',
        'Branding system for modern startups',
      ]
    : [
        'Brand art direction & visual identity',
        'UI/UX & product design for digital platforms',
        'Motion graphics & campaign design',
        'Web development & e-commerce',
      ]
  const tagSets = orisaCreative
    ? [
        DEFAULT_PORTFOLIO_TAGS,
        DEFAULT_PORTFOLIO_TAGS,
        DEFAULT_PORTFOLIO_TAGS,
        ['brand strategy', 'visual identity', 'startup branding', 'design system'],
      ]
    : [DEFAULT_PORTFOLIO_TAGS, DEFAULT_PORTFOLIO_TAGS, DEFAULT_PORTFOLIO_TAGS, DEFAULT_PORTFOLIO_TAGS]

  return names
    .map((name, index) => ({
      name,
      content: contents[index] ?? `${name} — selected project`,
      logo: logos[index] ?? logos[0],
      link: { type: 'custom' as const, url: '/portfolio', label: 'View project' },
      tags: tagSets[index]?.map((label) => ({ label })) ?? [],
      images: [{ src: portfolioIds[index] ?? pages[index] ?? pages[0], position: 0 }],
    }))
    .filter((slide) => slide.images[0]?.src)
}

function buildTeamBlock(avatars: string[]) {
  return {
    blockType: 'teamGallery' as const,
    layout: 'grid' as const,
    headline: lexicalHeading('Meet the team'),
    subheadline: lexicalParagraph('Talented designers, developers, and strategists united by craft.'),
    members: [
      { name: 'Alex Rivera', role: 'Creative Director', photo: avatars[0] },
      { name: 'Jordan Lee', role: 'Lead Designer', photo: avatars[1] },
      { name: 'Sam Ortiz', role: 'Developer', photo: avatars[2] },
      { name: 'Taylor Kim', role: 'Brand Strategist', photo: avatars[3] },
    ].filter((m) => m.photo),
  }
}

export function buildLayout(
  bundle: OrisaBundleDefinition,
  media: OrisaBucketMedia,
  contactFormId?: string,
) {
  const { pages, avatars, logos } = media
  const logosSection = buildLogosBlock(
    media,
    bundle.template === 'marketing' ? 'LOGOS3' : 'LOGOS4',
    { creativeBrandStrip: bundle.template === 'creative' },
  )
  const teamBlock = buildTeamBlock(avatars)

  const creativeAboutImages = mediaIdsByFilenames(media, ['img-3.webp', 'img-4.webp'])

  const aboutBlock = {
    blockType: 'about' as const,
    designVersion: bundle.template === 'creative' ? ('ABOUT_ORISA_01' as const) : ('ABOUT3' as const),
    headline:
      bundle.template === 'creative'
        ? lexicalHeading(
            'We shape animated stories that inspire and engage, uniting thoughtful design, fluid motion, and digital craftsmanship.',
            'h3',
          )
        : lexicalHeading(bundle.headline),
    text1:
      bundle.template === 'creative'
        ? lexicalParagraph(
            'We build bold, resilient brands designed to leave a lasting mark on the world.',
          )
        : lexicalParagraph(bundle.description),
    text2:
      bundle.template === 'creative'
        ? lexicalRoot(
            lexicalHeadingNode('Creative Expertise', 'h3'),
            lexicalParagraphNode(
              'With over a decade of design expertise, we create tailored solutions that engage audiences, build meaningful connections, and elevate brands with creativity and intent.',
            ),
          )
        : undefined,
    text3:
      bundle.template === 'creative'
        ? lexicalRoot(
            lexicalHeadingNode('Experience & Innovation', 'h3'),
            lexicalParagraphNode(
              'Backed by a decade of creative experience, we craft visual experiences that bring together strategy, design, and technology to grow brands, inspire audiences, and create meaningful impact.',
            ),
          )
        : undefined,
    images:
      bundle.template === 'creative'
        ? creativeAboutImages
        : pages.slice(0, 2).filter(Boolean),
    logos:
      bundle.template === 'creative'
        ? avatars.slice(0, 5)
        : ensureMinLogos(logos).slice(0, 5),
    counter:
      bundle.template === 'creative'
        ? [{ value: '15+', title: 'Team members' }]
        : [
            { value: '12+', title: 'Years of experience', description: 'Since 2012' },
            { value: '38+', title: 'Completed projects', description: 'Across industries' },
          ],
    link: {
      type: 'custom' as const,
      url: '/contact',
      label: bundle.template === 'creative' ? 'GET IN TOUCH' : 'Get in touch',
      appearance: 'default' as const,
    },
  }

  const contactBlock = contactFormId
    ? {
        blockType: 'contact' as const,
        designVersion: 'CONTACT2' as const,
        richText: lexicalRoot([
          lexicalHeadingNode('Get in touch'),
          lexicalParagraphNode(
            'Start the conversation by sharing your vision. Our team will respond within 1–2 business days.',
          ),
        ]),
        form: [{ blockType: 'formBlock' as const, form: contactFormId }],
      }
    : null

  if (bundle.template === 'minimal') {
    return [aboutBlock, logosSection, closingCta("Let's work together")].filter(Boolean)
  }

  if (bundle.template === 'contact') {
    return contactBlock ? [contactBlock] : []
  }

  if (bundle.template === 'about') {
    return buildOrisaAboutPageLayout(media, contactFormId, {
      headline: bundle.headline,
      text1: bundle.description,
    })
  }

  if (bundle.template === 'portfolio') {
    return [
      {
        blockType: 'casestudies' as const,
        designVersion: 'CASESTUDIES12',
        richText: lexicalRoot(
          lexicalHeadingNode("Selected work we're proud of", 'h2'),
          lexicalParagraphNode('A curated selection of projects where strategy and craft meet.'),
        ),
        cta: { type: 'custom' as const, url: '/portfolio', label: 'View latest projects' },
        slides: portfolioSlides(media),
      },
      pages.length >= 1 && {
        blockType: 'gallery' as const,
        designVersion: 'GALLERY25',
        elements: pages.slice(0, 8).filter(Boolean).map((image) => ({ image })),
      },
      teamBlock,
      closingCta("Let's Create Meaning Together"),
    ].filter(Boolean)
  }

  if (bundle.template === 'marketing') {
    return [
      {
        blockType: 'credibilityStrip' as const,
        eyebrow: 'Capabilities',
        headline: lexicalHeading('Strategy · Performance · Growth'),
        body: lexicalParagraph('Core disciplines that drive measurable outcomes.'),
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
      logosSection,
      {
        blockType: 'orisaScrollServices' as const,
        sectionId: 'services',
        eyebrow: 'What we do',
        introHeadline: bundle.description,
        pinOnScroll: true,
        cta: {
          type: 'custom' as const,
          url: '/portfolio',
          label: 'View latest projects',
          appearance: 'default' as const,
        },
        services: ['Strategy', 'Design', 'Development', 'Growth'].map((title, index) => ({
          title,
          summary: `${title} services tailored to your goals`,
          bullets: [{ item: 'Discovery & planning' }, { item: 'Execution & optimization' }],
          image: pages[index + 2] ?? pages[index] ?? pages[0],
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        })),
      },
      {
        blockType: 'casestudies' as const,
        designVersion: 'CASESTUDIES12',
        richText: lexicalRoot(
          lexicalHeadingNode('Campaigns that drive results', 'h2'),
          lexicalParagraphNode('Selected case studies from brands we have helped scale.'),
        ),
        cta: { type: 'custom' as const, url: '/portfolio', label: 'View latest projects' },
        slides: portfolioSlides(media),
      },
      teamBlock,
      closingCta('Ready to scale?'),
    ].filter(Boolean)
  }

  return [
    aboutBlock,
    logosSection,
    {
      blockType: 'orisaServicesPin' as const,
      sectionId: 'services',
      eyebrow: 'OUR SOLUTIONS',
      sinceLabel: 'Since 2012',
      projectCount: '38',
      projectCountLabel: 'Completed projects',
      pinOnScroll: true,
      panelImages: mediaIdsByFilenames(media, [...CREATIVE_SERVICE_PANELS]),
      services: CREATIVE_SERVICES.map((title, index) => ({
        title,
        description: 'We help you build successful products by understanding your market and users.',
        thumbnail:
          mediaIdByFilename(media, CREATIVE_SERVICE_THUMBS[index]) ??
          mediaIdByFilename(media, CREATIVE_SERVICE_PANELS[index]),
        link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
      })),
      cta: { type: 'custom' as const, url: '/contact', label: 'Get a free quote' },
    },
    {
      blockType: 'casestudies' as const,
      designVersion: 'CASESTUDIES12',
      richText: lexicalRoot(
        lexicalHeadingNode("Selected work we're proud of", 'h2'),
        lexicalParagraphNode(
          'A curated selection of projects where strategy, creativity, and craftsmanship come together to build meaningful and enduring brand experiences.',
        ),
      ),
      cta: { type: 'custom' as const, url: '/portfolio', label: 'View latest projects' },
      slides: portfolioSlides(media, true),
    },
    buildOrisaTestimonialBlock(media),
    buildOrisaWhyChooseUsBlock(media),
    buildOrisaStatsBarBlock(),
    buildOrisaMeetTeamBlock(media),
    buildOrisaFaqBlock(media),
    closingCta("Let's Create Meaning Together"),
    {
      blockType: 'blog' as const,
      designVersion: 'BLOG29',
      richText: lexicalHeading('Latest from the blog'),
      populateBy: 'collection' as const,
      postCollection: 'posts' as const,
      limit: 3,
      sortField: 'publishedAt' as const,
      sortOrder: 'desc' as const,
    },
  ].filter(Boolean)
}
