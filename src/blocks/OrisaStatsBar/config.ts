import { backgroundColor } from '@/fields/color'
import { Block } from 'payload'

export const OrisaStatsBarBlock: Block = {
  slug: 'orisaStatsBar',
  interfaceName: 'OrisaStatsBarBlock',
  labels: {
    singular: 'Orisa Stats Bar',
    plural: 'Orisa Stats Bar',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'stats-bar',
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'Numeric value for odometer count-up (e.g. 10, 50, 98)' },
        },
        {
          name: 'suffix',
          type: 'text',
          admin: { description: 'Suffix after number (e.g. K+, M+, %)' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
