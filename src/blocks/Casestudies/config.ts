import { Block } from 'payload'
import { backgroundColor } from '@/fields/color'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { allCasestudiesDesignVersions } from './metadata'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

export type { CasestudiesDesignVersion } from './metadata'
export { allCasestudiesDesignVersions }

export const logoSizeOptions = [
  {
    label: 'Small (16px and 24px)',
    value: 'h-4 md:h-6',
  },
  {
    label: 'Medium (24px and 32px)',
    value: 'h-6 md:h-8',
  },
  {
    label: 'Large (32px and 40px)',
    value: 'h-8 md:h-10',
  },
  {
    label: 'Extra Large (40px and 48px)',
    value: 'h-10 md:h-12',
  },
]

export const CasestudiesBlock: Block = {
  slug: 'casestudies',
  interfaceName: 'CasestudiesBlock',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allCasestudiesDesignVersions),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional heading and intro text for this section',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          ParagraphFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    link({
      overrides: {
        name: 'cta',
        label: 'Section CTA',
        admin: {
          description: {
            en: 'Button below the intro copy (defaults to “View latest projects” → /portfolio)',
            de: 'Button unter dem Intro-Text',
          },
        },
      },
    }),
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          label: 'Content',
        },
        link({ appearances: false, disableIcon: true }),
        {
          name: 'tags',
          type: 'array',
          localized: true,
          admin: {
            description: {
              en: 'Tag pills shown on the right of each project card',
              de: 'Tag-Pills rechts neben dem Projekttitel',
            },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
        },
        {
          name: 'logoClass',
          type: 'select',
          defaultValue: 'h-6 md:h-8',
          options: logoSizeOptions,
          label: 'Logo Size',
        },
        {
          name: 'images',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 9,
          fields: [
            {
              name: 'src',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image',
            },
            {
              name: 'position',
              type: 'number',
              required: true,
              min: 0,
              max: 8,
              label: 'Grid Position (0-8)',
            },
          ],
        },
      ],
    },
  ],
}
