import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { icon } from '@/components/Icon/config'
import { backgroundColor } from '@/fields/color'
import { linkGroup } from '@/fields/linkGroup'
import { createBlockItemCondition } from '@/utilities/findParentFeatureVersion'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { allStatDesignVersions } from './metadata'

export type { StatDesignVersion } from './metadata'
export { allStatDesignVersions }

export const StatBlock: Block = {
  slug: 'stat',
  interfaceName: 'StatBlock',
  labels: {
    singular: 'Stat',
    plural: 'Stats',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allStatDesignVersions),
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
      name: 'stats',
      type: 'array',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          ['STAT1', 'STAT2'].includes(designVersion),
      },
      fields: [
        icon({
          name: 'icon',
          admin: {
            condition: createBlockItemCondition(['STAT2']),
          },
        }),
        {
          name: 'iconColor',
          type: 'select',
          admin: {
            condition: createBlockItemCondition(['STAT2']),
          },
          defaultValue: 'black',
          options: [
            {
              label: 'Black',
              value: 'black',
            },
            {
              label: 'Green',
              value: 'green',
            },
            {
              label: 'Red',
              value: 'red',
            },
          ],
        },
        {
          name: 'counter',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            condition: createBlockItemCondition(['STAT1']),
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => rootFeatures,
          }),
        },
      ],
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['STAT6', 'STAT8'].includes(designVersion),
        },
      },
    }),
  ],
}
