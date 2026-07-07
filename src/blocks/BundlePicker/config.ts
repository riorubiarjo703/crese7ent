import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const BundlePickerBlock: Block = {
  slug: 'bundlePicker',
  interfaceName: 'BundlePickerBlock',
  labels: {
    singular: 'Bundle Picker',
    plural: 'Bundle Pickers',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'bundles',
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
      name: 'subheadline',
      type: 'text',
      localized: true,
    },
    {
      name: 'packOptions',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Pack option', plural: 'Pack options' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
        },
      ],
    },
    {
      name: 'products',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Product', plural: 'Products' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'prices',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          labels: { singular: 'Price', plural: 'Prices' },
          admin: {
            description: {
              en: 'One price per pack option, in the same order as pack options above',
              de: 'Ein Preis pro Pack-Option, in derselben Reihenfolge',
            },
          },
          fields: [
            {
              name: 'amount',
              type: 'text',
              required: true,
            },
          ],
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
            name: 'buyNow',
            label: 'Buy now link',
            required: false,
          },
        }),
      ],
    },
  ],
}
