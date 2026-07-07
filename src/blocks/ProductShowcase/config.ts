import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ProductShowcaseBlock: Block = {
  slug: 'productShowcase',
  interfaceName: 'ProductShowcaseBlock',
  labels: {
    singular: 'Product Showcase',
    plural: 'Product Showcases',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'products',
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
      name: 'products',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Product', plural: 'Products' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        link({
          overrides: {
            name: 'addToCart',
            label: 'Add to cart link',
            required: false,
          },
        }),
        link({
          overrides: {
            name: 'viewProduct',
            label: 'View product link',
            required: false,
          },
        }),
      ],
    },
  ],
}
