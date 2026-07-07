import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { HeadingFeature, lexicalEditor, UnorderedListFeature } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { allFaqDesignVersions } from './metadata'

export type { FaqDesignVersion } from './metadata'
export { allFaqDesignVersions }

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    backgroundColor,
    {
      name: 'designVersion',
      type: 'select',
      required: true,
      options: allFaqDesignVersions.map((version) => ({
        label: version.label,
        value: version.value,
      })),
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
      defaultValue: 'FAQ',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          ['FAQ4', 'FAQ5', 'FAQ6'].includes(designVersion),
      },
    },
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
      }),
    },
    {
      name: 'faqs',
      type: 'array',
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
        {
          name: 'category',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional category label used for grouped FAQ layouts like FAQ12',
          },
        },
      ],
    },
    {
      name: 'calloutText',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          ['FAQ3', 'FAQ4'].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => rootFeatures,
      }),
    },
    link({
      overrides: {
        name: 'calloutLink',
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['FAQ3', 'FAQ4'].includes(designVersion),
        },
      },
    }),
  ],
}
