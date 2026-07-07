import { backgroundColor } from '@/fields/color'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ImpactHighlightsBlock: Block = {
  slug: 'impactHighlights',
  interfaceName: 'ImpactHighlightsBlock',
  labels: {
    singular: 'Impact Highlights',
    plural: 'Impact Highlights',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'impact',
      admin: {
        description: {
          en: 'HTML id for in-page anchors',
          de: 'HTML-ID für Anker-Links',
        },
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Auto-advance slides',
        de: 'Folien automatisch weiterschalten',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Highlight',
        plural: 'Highlights',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: {
              en: 'Large stat value (e.g. 25, 500)',
              de: 'Große Statistik (z.B. 25, 500)',
            },
          },
        },
        {
          name: 'prefix',
          type: 'text',
          admin: {
            description: {
              en: 'Text before value (e.g. $)',
              de: 'Text vor dem Wert (z.B. $)',
            },
          },
        },
        {
          name: 'suffix',
          type: 'text',
          admin: {
            description: {
              en: 'Text after value (e.g. M)',
              de: 'Text nach dem Wert (z.B. M)',
            },
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            description: {
              en: 'Short label shown beside the number',
              de: 'Kurze Beschriftung neben der Zahl',
            },
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
