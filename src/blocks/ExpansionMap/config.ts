import { backgroundColor } from '@/fields/color'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ExpansionMapBlock: Block = {
  slug: 'expansionMap',
  interfaceName: 'ExpansionMapBlock',
  labels: {
    singular: 'Expansion Map',
    plural: 'Expansion Maps',
  },
  fields: [
    backgroundColor,
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
      name: 'body',
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
      name: 'partner',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'countries',
      type: 'array',
      labels: {
        singular: 'Country',
        plural: 'Countries',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          admin: {
            description: {
              en: 'ISO 3166-1 alpha-2 code (e.g. ES, DE, FR)',
              de: 'ISO 3166-1 alpha-2 Code (z.B. ES, DE, FR)',
            },
          },
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'offices',
      type: 'array',
      maxRows: 6,
      labels: {
        singular: 'Office',
        plural: 'Offices',
      },
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mapUrl',
          type: 'text',
          admin: {
            description: {
              en: 'Google Maps or similar link',
              de: 'Google Maps oder ähnlicher Link',
            },
          },
        },
      ],
    },
  ],
}
