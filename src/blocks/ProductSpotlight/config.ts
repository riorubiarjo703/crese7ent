import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ProductSpotlightBlock: Block = {
  slug: 'productSpotlight',
  interfaceName: 'ProductSpotlightBlock',
  labels: {
    singular: 'Product Spotlight',
    plural: 'Product Spotlights',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'hero-product',
    },
    {
      name: 'productCode',
      type: 'text',
      localized: true,
      admin: {
        description: {
          en: 'Small label above headline (e.g. Product n0.0123)',
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
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
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
        name: 'primaryCta',
        label: 'Primary CTA',
      },
    }),
    {
      name: 'variants',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Variant', plural: 'Variants' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          admin: {
            description: { en: 'Display price (e.g. $12.00)', de: 'Angezeigter Preis' },
          },
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
