import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OrisaScrollServicesBlock: Block = {
  slug: 'orisaScrollServices',
  interfaceName: 'OrisaScrollServicesBlock',
  labels: {
    singular: 'Orisa Scroll Services',
    plural: 'Orisa Scroll Services',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'services',
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'What we do',
    },
    {
      name: 'introHeadline',
      type: 'textarea',
      localized: true,
      admin: {
        description: {
          en: 'Large intro headline above the scroll section',
          de: 'Große Intro-Überschrift über dem Scroll-Bereich',
        },
      },
    },
    link({
      overrides: {
        name: 'cta',
        label: 'Section CTA',
      },
    }),
    {
      name: 'pinOnScroll',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Sticky side navigation (desktop)',
        de: 'Fixierte Seitennavigation (Desktop)',
      },
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'summary',
          type: 'text',
          localized: true,
          admin: {
            description: {
              en: 'Large panel headline',
              de: 'Große Panel-Überschrift',
            },
          },
        },
        {
          name: 'bullets',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        link({
          overrides: {
            name: 'link',
          },
        }),
      ],
    },
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      admin: {
        description: {
          en: 'Optional rich headline (alternative to introHeadline)',
          de: 'Optionale Rich-Text-Überschrift',
        },
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
}
