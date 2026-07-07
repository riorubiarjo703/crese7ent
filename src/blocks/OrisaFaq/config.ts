import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OrisaFaqBlock: Block = {
  slug: 'orisaFaq',
  interfaceName: 'OrisaFaqBlock',
  labels: {
    singular: 'Orisa FAQ',
    plural: 'Orisa FAQ',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'faq',
    },
    {
      name: 'supportImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'supportTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Still no luck? We can help!',
    },
    {
      name: 'supportDescription',
      type: 'text',
      localized: true,
      defaultValue: 'Let us Know how we can assist',
    },
    link({
      overrides: {
        name: 'supportCta',
        label: 'Support CTA',
      },
    }),
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'FAQ',
    },
    link({
      overrides: {
        name: 'eyebrowLink',
        label: 'Eyebrow link',
      },
    }),
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
      name: 'faqs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'FAQ item', plural: 'FAQ items' },
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures, UnorderedListFeature()],
          }),
        },
      ],
    },
  ],
}
