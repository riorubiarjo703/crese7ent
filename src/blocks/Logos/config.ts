import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { allLogosDesignVersions } from './metadata'

export type { LogosDesignVersion } from './metadata'
export { allLogosDesignVersions }

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  labels: {
    singular: 'Logos',
    plural: 'multiple Logos',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allLogosDesignVersions),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
    },
    link({
      overrides: {
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['LOGOS2'].includes(designVersion),
        },
      },
    }),
    {
      name: 'logos',
      type: 'upload',
      relationTo: 'media',
      required: true,
      minRows: 5,
      hasMany: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          ['LOGOS9'].includes(designVersion),
      },
      fields: [
        {
          name: 'quote',
          type: 'text',
          localized: true,
        },
        {
          name: 'name',
          type: 'text',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          hasMany: false,
        },
      ],
    },
  ],
}
