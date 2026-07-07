import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { Page, TestimonialBlock as TestimonialBlockType } from '@/payload-types'
import { parentLayoutCondition } from '@/utilities/parentLayoutCondition'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { allTestimonialDesignVersions } from './metadata'

export type { TestimonialDesignVersion } from './metadata'
export { allTestimonialDesignVersions }

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allTestimonialDesignVersions),
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          [
            'TESTIMONIAL2',
            'TESTIMONIAL6',
            'TESTIMONIAL7',
            'TESTIMONIAL13',
            'TESTIMONIAL16',
            'TESTIMONIAL17',
            'TESTIMONIAL18',
            'TESTIMONIAL19',
          ].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
    },

    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) =>
          [
            'TESTIMONIAL13',
            'TESTIMONIAL16',
            'TESTIMONIAL17',
            'TESTIMONIAL18',
            'TESTIMONIAL19',
          ].includes(designVersion),
      },
    },

    linkGroup({
      overrides: {
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['TESTIMONIAL7'].includes(designVersion),
        },
      },
    }),

    link({
      overrides: {
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['TESTIMONIAL2', 'TESTIMONIAL19'].includes(designVersion),
        },
      },
    }),

    {
      name: 'testimonial',
      label: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      type: 'array',
      fields: [
        {
          name: 'authorName',
          type: 'text',
          localized: true,
          admin: {
            condition: (parent: Page, { id }) =>
              [
                'TESTIMONIAL2',
                'TESTIMONIAL3',
                'TESTIMONIAL4',
                'TESTIMONIAL6',
                'TESTIMONIAL7',
                'TESTIMONIAL10',
                'TESTIMONIAL14',
                'TESTIMONIAL17',
                'TESTIMONIAL18',
                'TESTIMONIAL19',
              ].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'authorDescription',
          type: 'text',
          localized: true,
          admin: {
            condition: (parent: Page, { id }) =>
              [
                'TESTIMONIAL2',
                'TESTIMONIAL3',
                'TESTIMONIAL4',
                'TESTIMONIAL6',
                'TESTIMONIAL7',
                'TESTIMONIAL10',
                'TESTIMONIAL17',
                'TESTIMONIAL18',
                'TESTIMONIAL19',
              ].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'authorLocation',
          type: 'text',
          localized: true,
          admin: {
            description: 'City, country, or company name shown below the role',
            condition: (parent: Page, { id }) =>
              ['TESTIMONIAL2'].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (parent: Page, { id }) =>
              [
                'TESTIMONIAL2',
                'TESTIMONIAL4',
                'TESTIMONIAL6',
                'TESTIMONIAL7',
                'TESTIMONIAL13',
                'TESTIMONIAL10',
                'TESTIMONIAL14',
                'TESTIMONIAL16',
                'TESTIMONIAL17',
                'TESTIMONIAL18',
                'TESTIMONIAL19',
              ].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (parent: Page, { id }) =>
              ['TESTIMONIAL2', 'TESTIMONIAL3', 'TESTIMONIAL17'].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            condition: (parent: Page, { id }) =>
              ['TESTIMONIAL2', 'TESTIMONIAL18', 'TESTIMONIAL19'].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
        },
        {
          name: 'text',
          type: 'richText',
          localized: true,
          admin: {
            condition: (parent: Page, { id }) =>
              [
                'TESTIMONIAL2',
                'TESTIMONIAL3',
                'TESTIMONIAL4',
                'TESTIMONIAL6',
                'TESTIMONIAL7',
                'TESTIMONIAL10',
                'TESTIMONIAL14',
                'TESTIMONIAL16',
                'TESTIMONIAL17',
                'TESTIMONIAL18',
                'TESTIMONIAL19',
              ].includes(
                parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                  ?.designVersion ?? '',
              ),
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
            ],
          }),
        },
        link({
          overrides: {
            admin: {
              condition: (parent: Page, { id }) =>
                ['TESTIMONIAL19'].includes(
                  parentLayoutCondition<TestimonialBlockType>(parent, id, 'testimonial')
                    ?.designVersion || '',
                ),
            },
          },
        }),
      ],
    },
  ],
}
