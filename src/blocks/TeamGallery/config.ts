import { backgroundColor } from '@/fields/color'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const TeamGalleryBlock: Block = {
  slug: 'teamGallery',
  interfaceName: 'TeamGalleryBlock',
  labels: {
    singular: 'Team Gallery',
    plural: 'Team Galleries',
  },
  fields: [
    backgroundColor,
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
      name: 'layout',
      type: 'select',
      defaultValue: 'drag',
      options: [
        { label: 'Drag carousel', value: 'drag' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Member',
        plural: 'Members',
      },
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'linkedinUrl',
          type: 'text',
        },
      ],
    },
  ],
}
