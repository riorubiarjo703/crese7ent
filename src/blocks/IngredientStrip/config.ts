import { backgroundColor } from '@/fields/color'
import { Block } from 'payload'

export const IngredientStripBlock: Block = {
  slug: 'ingredientStrip',
  interfaceName: 'IngredientStripBlock',
  labels: {
    singular: 'Ingredient Strip',
    plural: 'Ingredient Strips',
  },
  fields: [
    backgroundColor,
    {
      name: 'badges',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Badge', plural: 'Badges' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
