import { backgroundColor } from '@/fields/color'
import { Block } from 'payload'

export const ReviewsMarqueeBlock: Block = {
  slug: 'reviewsMarquee',
  interfaceName: 'ReviewsMarqueeBlock',
  labels: {
    singular: 'Reviews Marquee',
    plural: 'Reviews Marquees',
  },
  fields: [
    backgroundColor,
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'REVIEWS',
    },
    {
      name: 'reviews',
      type: 'array',
      minRows: 1,
      maxRows: 20,
      labels: { singular: 'Review', plural: 'Reviews' },
      fields: [
        {
          name: 'author',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'handle',
          type: 'text',
          localized: true,
          admin: {
            description: { en: 'Social handle (e.g. @username)', de: 'Social-Handle' },
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
