import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CredibilityStripBlock: Block = {
  slug: 'credibilityStrip',
  interfaceName: 'CredibilityStripBlock',
  labels: {
    singular: 'Credibility Strip',
    plural: 'Credibility Strips',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'about',
      admin: {
        description: {
          en: 'HTML id for in-page anchors (e.g. header links to /#about)',
          de: 'HTML-ID für Anker-Links (z.B. /#about)',
        },
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: {
          en: 'Small label above the headline',
          de: 'Kleine Beschriftung über der Überschrift',
        },
      },
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
      name: 'body',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    link({
      overrides: {
        name: 'cta',
        label: 'Link',
      },
    }),
    {
      name: 'animateCounters',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Animate metrics on scroll',
        de: 'Metriken beim Scrollen animieren',
      },
    },
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Metric',
        plural: 'Metrics',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: {
              en: 'Numeric value (e.g. 3500, 2014, 60)',
              de: 'Numerischer Wert (z.B. 3500, 2014, 60)',
            },
          },
        },
        {
          name: 'prefix',
          type: 'text',
          admin: {
            description: {
              en: 'Text before the value (e.g. +)',
              de: 'Text vor dem Wert (z.B. +)',
            },
          },
        },
        {
          name: 'suffix',
          type: 'text',
          admin: {
            description: {
              en: 'Text after the value (e.g. M €)',
              de: 'Text nach dem Wert (z.B. M €)',
            },
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
