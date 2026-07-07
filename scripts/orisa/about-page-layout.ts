import type { Payload } from 'payload'

import { ensureOrisaContactForm } from './ensure-contact-form'
import { loadAboutMedia, type OrisaBucketMedia } from './load-bucket-media'

import {
  lexicalHeading,
  lexicalParagraph,
  lexicalHeadingNode,
  lexicalParagraphNode,
  lexicalRoot,
} from '@/utilities/lexical/minimal'

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

export function buildOrisaAboutPageLayout(
  media: OrisaBucketMedia,
  contactFormId?: string,
  options?: {
    headline?: string
    text1?: string
  },
) {
  const { pages, avatars, logos, pagesByFilename } = media
  const headline =
    options?.headline ?? 'We are a creative digital agency shaping meaningful experiences'
  const text1 =
    options?.text1 ??
    'We blend strategy, creativity, and technology to help brands grow, connect, and stand out in an ever-evolving digital world.'

  const mainImage = pages[0]
  const breakoutLogo =
    pagesByFilename['logo-1.svg'] ?? logos[0] ?? pages[1] ?? pages[0]
  const secondaryImage = pages[1] ?? pages[2] ?? pages[0]
  const timelineImage = pages[2] ?? pages[0]
  const partnerLogos = logos.slice(0, 5).length >= 5 ? logos.slice(0, 5) : logos

  const teamPhotos = avatars.slice(0, 4)
  const teamNames = [
    { name: 'Daniel Carter', role: 'UI/UX Designer' },
    { name: 'Olivia Bennett', role: 'Project Manager' },
    { name: 'Lucas Nguyen', role: 'Software Developer' },
    { name: 'Emma Brooks', role: 'Marketing CEO' },
  ]

  return [
    {
      blockType: 'about' as const,
      designVersion: 'ABOUT3' as const,
      headline: lexicalHeading(headline),
      text1: lexicalParagraph(text1),
      text2: lexicalRoot([
        lexicalHeadingNode('Our achievements'),
        lexicalParagraphNode(
          'A decade of creative partnerships, industry recognition, and measurable impact for ambitious brands.',
        ),
      ]),
      images: [mainImage, breakoutLogo, secondaryImage].filter(Boolean),
      logos: partnerLogos,
      counter: [
        { value: '12+', title: 'Years of experience', description: 'Since 2012' },
        { value: '38+', title: 'Completed projects', description: 'Across industries' },
        { value: '24+', title: 'Industry awards', description: 'Recognition for craft' },
        { value: '98%', title: 'Client satisfaction', description: 'Long-term partnerships' },
      ],
      link: {
        type: 'custom' as const,
        url: '/contact',
        label: 'Get in touch',
        appearance: 'default' as const,
      },
    },
    {
      blockType: 'stat' as const,
      designVersion: 'STAT1',
      stats: [
        { counter: '$28M+', title: 'Funds raised' },
        { counter: '64K+', title: 'Global users' },
        { counter: '190+', title: 'Projects completed' },
      ],
    },
    timelineImage && {
      blockType: 'timeline' as const,
      designVersion: 'TIMELINE2',
      heading: 'Our Journey',
      sections: [
        {
          tagline: '2012 — The Beginning',
          image: timelineImage,
          richText: lexicalRoot([
            lexicalHeadingNode('From Design Studio to Digital Agency'),
            lexicalParagraphNode(
              'We started as a small design studio with a passion for meaningful digital experiences and grew into a full-service creative agency.',
            ),
          ]),
        },
        {
          tagline: '2018 — Trusted by Growing Brands',
          image: timelineImage,
          richText: lexicalRoot([
            lexicalHeadingNode('Building Long-Term Partnerships'),
            lexicalParagraphNode(
              'We began working with scaling businesses and established brands, focusing on collaboration instead of one-off projects.',
            ),
          ]),
        },
        {
          tagline: '2024 — Designing for the Future',
          image: timelineImage,
          richText: lexicalRoot([
            lexicalHeadingNode('Innovation, Scale, and What’s Next'),
            lexicalParagraphNode(
              'Today we continue to evolve — embracing new technologies, smarter workflows, and future-ready design systems.',
            ),
          ]),
        },
      ],
    },
    {
      blockType: 'impactHighlights' as const,
      eyebrow: 'Awards',
      headline: lexicalHeading('Recognition for craft and impact'),
      highlights: [
        {
          value: '24',
          suffix: '+',
          label: 'Industry awards',
          description: lexicalParagraph('Web Excellence Awards and honorable mentions.'),
        },
        {
          value: '12',
          suffix: '+',
          label: 'Years of recognition',
          description: lexicalParagraph('Consistent creative excellence since 2012.'),
        },
        {
          value: '98',
          suffix: '%',
          label: 'Client satisfaction',
          description: lexicalParagraph('Repeat clients and long-term partnerships.'),
        },
      ],
    },
    teamPhotos.length > 0 && {
      blockType: 'teamGallery' as const,
      layout: 'grid' as const,
      headline: lexicalHeading('Behind the Visionaries'),
      subheadline: lexicalParagraph(
        'Creative experts designing meaningful digital experiences that help ambitious brands grow faster.',
      ),
      members: teamNames
        .map((member, index) => ({
          ...member,
          photo: teamPhotos[index],
        }))
        .filter((member) => member.photo),
    },
    contactFormId && {
      blockType: 'contact' as const,
      designVersion: 'CONTACT2' as const,
      richText: lexicalRoot([
        lexicalHeadingNode('Get in touch'),
        lexicalParagraphNode(
          'Start the conversation by sharing your vision. Our team will respond within 1–2 business days.',
        ),
      ]),
      form: [{ blockType: 'formBlock' as const, form: contactFormId }],
    },
    {
      blockType: 'blog' as const,
      designVersion: 'BLOG29',
      richText: lexicalHeading('Explore our Latest journal'),
      populateBy: 'collection' as const,
      postCollection: 'posts' as const,
      limit: 3,
      sortField: 'publishedAt' as const,
      sortOrder: 'desc' as const,
    },
    closingCta("Let's shape your next idea"),
  ].filter(Boolean)
}

export async function loadAboutPageMedia(payload: Payload) {
  return loadAboutMedia(payload)
}

export async function resolveAboutContactFormId(payload: Payload) {
  return ensureOrisaContactForm(payload)
}
