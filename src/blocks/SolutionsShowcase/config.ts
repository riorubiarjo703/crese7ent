import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { icon } from '@/components/Icon/config'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const SolutionsShowcaseBlock: Block = {
  slug: 'solutionsShowcase',
  interfaceName: 'SolutionsShowcaseBlock',
  labels: {
    singular: 'Solutions Showcase',
    plural: 'Solutions Showcases',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'solutions',
      admin: {
        description: {
          en: 'HTML id for in-page anchors (e.g. /#solutions)',
          de: 'HTML-ID für Anker-Links (z.B. /#solutions)',
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
      name: 'intro',
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
    {
      name: 'pinOnScroll',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Horizontal scroll cards (desktop)',
        de: 'Horizontale Karten beim Scrollen (Desktop)',
      },
      admin: {
        description: {
          en: 'Full-screen pinned section; vertical scroll moves strategy cards right to left. Disabled when reduced motion is preferred.',
          de: 'Vollbild-Abschnitt; vertikales Scrollen bewegt Strategie-Karten von rechts nach links. Deaktiviert bei reduzierter Bewegung.',
        },
      },
    },
    {
      name: 'strategies',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Strategy',
        plural: 'Strategies',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            description: {
              en: 'Used for tab id; auto-generated from title if empty',
              de: 'Wird für Tab-ID verwendet; automatisch aus Titel wenn leer',
            },
          },
        },
        {
          name: 'description',
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
        link({
          overrides: {
            name: 'cta',
            label: 'Link',
            required: false,
          },
        }),
        icon({
          admin: {
            description: {
              en: 'Optional icon for the strategy tab',
              de: 'Optionales Icon für den Strategie-Tab',
            },
          },
        }),
        {
          name: 'accentImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'metrics',
          type: 'array',
          maxRows: 4,
          labels: {
            singular: 'Metric',
            plural: 'Metrics',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
