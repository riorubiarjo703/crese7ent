import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OrisaMeetTeamBlock: Block = {
  slug: 'orisaMeetTeam',
  interfaceName: 'OrisaMeetTeamBlock',
  labels: {
    singular: 'Orisa Meet Team',
    plural: 'Orisa Meet Team',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'meet-our-team',
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Meet our team',
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
    link({
      overrides: {
        name: 'cta',
        label: 'Join team CTA',
      },
    }),
    {
      name: 'contactTitle',
      type: 'text',
      localized: true,
      defaultValue: 'We are here',
    },
    {
      name: 'locations',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'Location', plural: 'Locations' },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Team member', plural: 'Team members' },
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
        link({
          appearances: false,
          disableIcon: true,
          disableLabel: true,
          overrides: {
            name: 'profileLink',
            label: 'Profile link',
          },
        }),
      ],
    },
  ],
}
