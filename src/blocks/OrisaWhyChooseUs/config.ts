import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OrisaWhyChooseUsBlock: Block = {
  slug: 'orisaWhyChooseUs',
  interfaceName: 'OrisaWhyChooseUsBlock',
  labels: {
    singular: 'Orisa Why Choose Us',
    plural: 'Orisa Why Choose Us',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'why-choose-us',
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Why choose us',
    },
    link({
      overrides: {
        name: 'eyebrowLink',
        label: 'Eyebrow link',
        admin: {
          description: 'Optional link on the “Why choose us” label',
        },
      },
    }),
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
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
          HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'imageCards',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'Image card', plural: 'Image cards' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'tag',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional pill label (e.g. Creative)',
          },
        },
        {
          name: 'tagLink',
          type: 'group',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.tag?.trim()),
            description: 'Optional — only used when a tag label is set',
          },
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'custom',
              options: [
                { label: 'Internal link', value: 'reference' },
                { label: 'Custom URL', value: 'custom' },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'section',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
          ],
        },
        {
          name: 'watermark',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional logo watermark (bottom-left)',
          },
        },
        {
          name: 'overlayText',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional quote line overlaid on the image',
          },
        },
      ],
    },
    {
      name: 'statColumns',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'Stat column', plural: 'Stat columns' },
      fields: [
        {
          name: 'compactPosition',
          type: 'select',
          defaultValue: 'top',
          options: [
            { label: 'Compact stat on top', value: 'top' },
            { label: 'Compact stat on bottom', value: 'bottom' },
          ],
        },
        {
          name: 'compactValue',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 1.8M or 16K' },
        },
        {
          name: 'compactSuffix',
          type: 'text',
          defaultValue: '+',
        },
        {
          name: 'featureTitle',
          type: 'textarea',
          localized: true,
          admin: { description: 'Use line breaks for stacked title lines' },
        },
        {
          name: 'featureDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'featureIcon',
          type: 'select',
          defaultValue: 'active-cases',
          options: [
            { label: 'Active cases', value: 'active-cases' },
            { label: 'Trusted partners', value: 'trusted-partners' },
          ],
        },
      ],
    },
  ],
}
