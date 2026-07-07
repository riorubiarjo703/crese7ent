import { backgroundColor } from '@/fields/color'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const BrandStoryBlock: Block = {
  slug: 'brandStory',
  interfaceName: 'BrandStoryBlock',
  labels: {
    singular: 'Brand Story',
    plural: 'Brand Stories',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'story',
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
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Step', plural: 'Steps' },
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
      ],
    },
  ],
}
