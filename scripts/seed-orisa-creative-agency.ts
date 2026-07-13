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

async function seedOrisaCreativeAgency() {
  const payload = await getPayload({ config: configPromise })

  const [
    bgImg,
    heroLayer,
    heroVideo,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img5sm,
    img6sm,
    img7sm,
    img8sm,
    img9sm,
    img10sm,
    ...brandAndPortfolio
  ] = await ensureOrisaMediaMany(payload, [
    'public/seed/orisa/creative/pages/bg-img.webp',
    'public/seed/orisa/creative/pages/img-1.webp',
    'public/seed/orisa/creative/video/video-1.mp4',
    'public/seed/orisa/creative/pages/img-3.webp',
    'public/seed/orisa/creative/pages/img-4.webp',
    'public/seed/orisa/creative/pages/img-5.webp',
    'public/seed/orisa/creative/pages/img-6.webp',
    'public/seed/orisa/creative/pages/img-7.webp',
    'public/seed/orisa/creative/pages/img-8.webp',
    'public/seed/orisa/creative/pages/img-9.webp',
    'public/seed/orisa/creative/pages/img-10.webp',
    'public/seed/orisa/creative/pages/img-5-sm.webp',
    'public/seed/orisa/creative/pages/img-6-sm.webp',
    'public/seed/orisa/creative/pages/img-7-sm.webp',
    'public/seed/orisa/creative/pages/img-8-sm.webp',
    'public/seed/orisa/creative/pages/img-9-sm.webp',
    'public/seed/orisa/creative/pages/img-10-sm.webp',
    'public/seed/orisa/creative/icons/brand-1.webp',
    'public/seed/orisa/creative/icons/brand-2.webp',
    'public/seed/orisa/creative/icons/brand-3.webp',
    'public/seed/orisa/creative/icons/brand-4.webp',
    'public/seed/orisa/creative/icons/brand-5.webp',
    'public/seed/orisa/creative/icons/brand-6.webp',
    'public/seed/orisa/creative/icons/brand-7.webp',
    'public/seed/orisa/creative/icons/brand-8.webp',
    'public/seed/orisa/creative/icons/brand-9.webp',
    'public/seed/orisa/creative/pages/img-11.webp',
    'public/seed/orisa/creative/pages/img-12.webp',
    'public/seed/orisa/creative/pages/img-13.webp',
    'public/seed/orisa/creative/pages/img-14.webp',
    'public/seed/orisa/creative/pages/img-15.webp',
    'public/seed/orisa/creative/pages/img-16.webp',
    'public/seed/orisa/creative/template/logo/logo-w-lg.png',
    'public/seed/orisa/shared/pages/img-17.webp',
    'public/seed/orisa/shared/pages/img-18.webp',
    'public/seed/orisa/shared/pages/img-19.webp',
    'public/seed/orisa/shared/pages/img-20.webp',
    'public/seed/orisa/creative/pages/img-21.webp',
    'public/seed/orisa/creative/pages/img-22.webp',
    'public/seed/orisa/shared/template/avatar/avatar-1.webp',
    'public/seed/orisa/shared/template/avatar/avatar-2.webp',
    'public/seed/orisa/shared/template/avatar/avatar-3.webp',
    'public/seed/orisa/shared/template/avatar/avatar-4.webp',
    'public/seed/orisa/shared/template/avatar/avatar-5.webp',
    'public/seed/orisa/shared/template/avatar/avatar-6.webp',
    'public/seed/orisa/shared/template/avatar/avatar-7.webp',
    'public/seed/orisa/shared/template/avatar/avatar-8.webp',
    'public/seed/orisa/shared/template/avatar/avatar-10.webp',
    'public/seed/orisa/shared/template/avatar/avatar-11.webp',
    'public/seed/orisa/shared/template/avatar/avatar-12.webp',
    'public/seed/orisa/shared/template/avatar/avatar-13.webp',
  ])

  const brandIds = brandAndPortfolio.slice(0, 9)
  const portfolioIds = brandAndPortfolio.slice(9, 13)
  const whyChooseImg15 = brandAndPortfolio[13]
  const whyChooseImg16 = brandAndPortfolio[14]
  const whyChooseLogo = brandAndPortfolio[15]
  const teamPhotoIds = brandAndPortfolio.slice(16, 20)
  const faqSupportImageId = brandAndPortfolio[20]
  const closingBannerImageId = brandAndPortfolio[21]
  const aboutAvatarIds = brandAndPortfolio.slice(22, 27)
  const avatarIds = brandAndPortfolio.slice(27)

  const hero = {
    designVersion: 'ORISA_CREATIVE_01' as const,
    tagline: 'B2B Marketing Agency',
    headlineLines: [
      { line: 'Designing with' },
      { line: 'imagination,' },
      { line: 'driven by purpose.' },
    ],
    sideText:
      'We partner with brands to create digital design that drives conversions and commands attention.',
    images: [bgImg, heroLayer].filter(Boolean),
    backgroundVideo: heroVideo,
    backgroundPoster: heroLayer,
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

  const layout = [
    {
      blockType: 'about' as const,
      designVersion: 'ABOUT_ORISA_01',
      headline: lexicalHeading(
        'We shape animated stories that inspire and engage, uniting thoughtful design, fluid motion, and digital craftsmanship.',
        'h3',
      ),
      text1: lexicalParagraph(
        'We build bold, resilient brands designed to leave a lasting mark on the world.',
      ),
      text2: lexicalRoot(
        lexicalHeadingNode('Creative Expertise', 'h3'),
        lexicalParagraphNode(
          'With over a decade of design expertise, we create tailored solutions that engage audiences, build meaningful connections, and elevate brands with creativity and intent.',
        ),
      ),
      text3: lexicalRoot(
        lexicalHeadingNode('Experience & Innovation', 'h3'),
        lexicalParagraphNode(
          'Backed by a decade of creative experience, we craft visual experiences that bring together strategy, design, and technology to grow brands, inspire audiences, and create meaningful impact.',
        ),
      ),
      images: [img3, img4].filter(Boolean),
      logos: aboutAvatarIds.filter(Boolean),
      counter: [{ value: '15+', title: 'Team members' }],
      link: {
        type: 'custom' as const,
        url: '/contact',
        label: 'GET IN TOUCH',
        appearance: 'default' as const,
      },
    },
    {
      blockType: 'logos' as const,
      designVersion: 'LOGOS4',
      logos: brandIds.slice(0, 6).filter(Boolean),
    },
    {
      blockType: 'orisaServicesPin' as const,
      sectionId: 'services',
      eyebrow: 'OUR SOLUTIONS',
      sinceLabel: 'Since 2012',
      projectCount: '38',
      projectCountLabel: 'Completed projects',
      pinOnScroll: true,
      panelImages: [img5, img6, img7, img8, img9, img10].filter(Boolean),
      services: [
        {
          title: 'UI/UX Design',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img5sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Branding',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img6sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Development',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img7sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Motion Design',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img8sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Marketing',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img9sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
        {
          title: 'Graphics',
          description:
            'We help you build successful products by understanding your market and users.',
          thumbnail: img10sm,
          link: { type: 'custom' as const, url: '/services', label: 'Learn more' },
        },
      ],
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
      slides: [
        {
          name: 'Noirform',
          content: 'Brand art direction & visual identity',
          logo: mediaId(brandIds, 0),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View project' },
          tags: [{ label: 'Branding' }, { label: 'Web Design' }, { label: 'Web development' }],
          images: [{ src: mediaId(portfolioIds, 0), position: 0 }],
        },
        {
          name: 'Nebula',
          content: 'UI/UX & product design for digital platforms',
          logo: mediaId(brandIds, 1),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View project' },
          tags: [{ label: 'Branding' }, { label: 'Web Design' }, { label: 'Web development' }],
          images: [{ src: mediaId(portfolioIds, 1), position: 0 }],
        },
        {
          name: 'Voidline',
          content: '3D animation & motion branding',
          logo: mediaId(brandIds, 2),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View project' },
          tags: [{ label: 'Branding' }, { label: 'Web Design' }, { label: 'Web development' }],
          images: [{ src: mediaId(portfolioIds, 2), position: 0 }],
        },
        {
          name: 'Lumen',
          content: 'Branding system for modern startups',
          logo: mediaId(brandIds, 3),
          link: { type: 'custom' as const, url: '/portfolio', label: 'View project' },
          tags: [
            { label: 'brand strategy' },
            { label: 'visual identity' },
            { label: 'startup branding' },
            { label: 'design system' },
          ],
          images: [{ src: mediaId(portfolioIds, 3), position: 0 }],
        },
      ].filter((slide) => slide.images[0]?.src && slide.logo),
    },
    {
      blockType: 'testimonial' as const,
      designVersion: 'TESTIMONIAL2',
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
          authorAvatar: mediaId(avatarIds, 0),
          icon: mediaId(brandIds, 6),
        },
        {
          authorName: 'Lucas Moreno',
          authorDescription: 'Product Manager',
          authorLocation: 'Barcelona, Spain',
          rating: 4,
          text: lexicalParagraph(
            'The collaboration was seamless from start to finish. Their UX decisions significantly improved our product engagement.',
          ),
          authorAvatar: mediaId(avatarIds, 1),
          icon: mediaId(brandIds, 7),
        },
        {
          authorName: 'Hannah Lee',
          authorDescription: 'Creative Director',
          authorLocation: 'Studio Kinetic',
          rating: 5,
          text: lexicalParagraph(
            'A rare combination of technical expertise and artistic vision. The final result felt premium and purposeful.',
          ),
          authorAvatar: mediaId(avatarIds, 2),
          icon: mediaId(brandIds, 8),
        },
      ].filter((item) => item.authorAvatar),
      link: {
        type: 'custom' as const,
        url: 'mailto:hello@orisa.com',
        label: 'Client Stories',
      },
    },
    {
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
          image: whyChooseImg15,
          tag: 'Creative',
          tagLink: { type: 'custom' as const, url: '/portfolio', label: 'Creative' },
          watermark: whyChooseLogo,
        },
        {
          image: whyChooseImg16,
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
    },
    {
      blockType: 'orisaStatsBar' as const,
      stats: [
        { value: '10', suffix: 'K+', label: 'Years of Creative Practice' },
        { value: '50', suffix: 'K+', label: 'Projects Carefully Crafted' },
        { value: '16', suffix: 'K+', label: 'Brands Collaborated With' },
        { value: '20', suffix: 'M+', label: 'Total Funding Supported' },
        { value: '98', suffix: '%', label: 'Client satisfaction rate' },
      ],
    },
    {
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
        { name: 'Darrell Steward', role: 'UI/UX Designer', photo: teamPhotoIds[0], profileLink: { type: 'custom' as const, url: '/team' } },
        { name: 'Amelia Courtney', role: 'Project Manager', photo: teamPhotoIds[1], profileLink: { type: 'custom' as const, url: '/team' } },
        { name: 'Esther Howard', role: 'Software Developer', photo: teamPhotoIds[2], profileLink: { type: 'custom' as const, url: '/team' } },
        { name: 'Jacob Jones', role: 'Marketing CEO', photo: teamPhotoIds[3], profileLink: { type: 'custom' as const, url: '/team' } },
      ].filter((member) => member.photo),
    },
    {
      blockType: 'orisaFaq' as const,
      supportImage: faqSupportImageId,
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
    },
    {
      blockType: 'closingCta' as const,
      designVersion: 'ORISA_CLOSING_01' as const,
      headlineLines: [{ line: "Let's Create" }, { line: 'Meaning Together' }],
      hoursCaption: '[ From 8:00 To 16:30 ]',
      descriptionLine:
        '[ A creative studio crafting bold, user-focused digital experiences. At Orisa, we blend strategy, design, and innovation to help brands stand out and grow. ]',
      brandName: 'Orisa',
      showLocalTime: true,
      backgroundImage: closingBannerImageId,
      primaryCta: {
        type: 'custom' as const,
        url: '/contact',
        label: 'Book A Call Now',
      },
    },
    {
      blockType: 'blog' as const,
      designVersion: 'BLOG_ORISA_01' as const,
      eyebrow: 'INSIDE COMPANY',
      eyebrowLink: { type: 'custom' as const, url: '/posts', label: 'INSIDE COMPANY' },
      headlineLines: [
        { line: 'Latest Posts From Our' },
        { line: 'blog and Event Fan page' },
      ],
      links: [{ link: { type: 'custom' as const, url: '/posts', label: 'ALL ARTICLES' } }],
      populateBy: 'collection' as const,
      postCollection: 'posts' as const,
      limit: 4,
      sortField: 'publishedAt' as const,
      sortOrder: 'desc' as const,
    },
  ]

  const pageData = {
    title: 'Home',
    slug: 'home',
    _status: 'published' as const,
    hero,
    layout,
    layoutBundle: null,
    applyLayoutBundleMode: 'none' as const,
    breadcrumbs: [{ url: '/home', label: 'Home' }],
    meta: {
      title: 'Orisa — Creative Agency',
      description: 'Orisa Creative Agency homepage — design, branding, and development.',
    },
  } as const

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
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
    console.log('Updated Orisa Creative Agency home page (slug: home)')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData as any,
      overrideAccess: true,
      draft: false,
    })
    console.log('Created Orisa Creative Agency home page (slug: home)')
  }

  console.log('Run pnpm seed:storeframe-bundles to refresh Creative + Marketing Storeframe bundles.')

  if (shouldUpdateSeedGlobals()) {
    await updateOrisaGlobalsFromSeed()
  }

  process.exit(0)
}

await seedOrisaCreativeAgency().catch((error) => {
  console.error(error)
  process.exit(1)
})
