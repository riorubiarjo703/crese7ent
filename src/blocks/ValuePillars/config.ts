import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ValuePillarsBlock: Block = {
  slug: 'valuePillars',
  interfaceName: 'ValuePillarsBlock',
  labels: {
    singular: 'Value Pillars',
    plural: 'Value Pillars',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'journey',
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
      name: 'intro',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'journeyCard',
      type: 'group',
      label: {
        en: 'Immersive journey card',
        de: 'Immersive Journey-Karte',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: {
            en: 'Show journey card',
            de: 'Journey-Karte anzeigen',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Immersive journey',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        link({
          overrides: {
            name: 'cta',
            label: 'Link',
            required: false,
          },
        }),
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Pillar',
        plural: 'Pillars',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        link({
          overrides: {
            name: 'cta',
            label: 'Link',
            required: false,
          },
        }),
      ],
    },
  ],
}
