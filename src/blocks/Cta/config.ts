import { icon } from '@/components/Icon/config'
import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { backgroundColor } from '@/fields/color'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { allCtaDesignVersions } from './metadata'

export type { CtaDesignVersion } from './metadata'
export { allCtaDesignVersions }

const ctaDesignVersions: string[] = allCtaDesignVersions.map((item) => item.value)

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allCtaDesignVersions),
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CTA3', 'CTA4', 'CTA7', 'CTA13', 'CTA15', 'CTA19'].includes(designVersion),
      },
    },
    icon({
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CTA1', 'CTA6', 'CTA7', 'CTA13', 'CTA15'].includes(designVersion),
      },
    }),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          [
            'CTA1',
            'CTA3',
            'CTA4',
            'CTA5',
            'CTA6',
            'CTA7',
            'CTA10',
            'CTA11',
            'CTA12',
            'CTA13',
            'CTA15',
            'CTA16',
            'CTA19',
          ].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          ParagraphFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { designVersion = '' } = {}) => ctaDesignVersions.includes(designVersion), // All CTAs use links
        },
      },
    }),
    {
      name: 'featureDescriptions',
      type: 'array',
      localized: true,
      maxRows: 2,
      admin: {
        condition: (_, { designVersion = '' } = {}) => designVersion === 'CTA19',
        description: 'Optional description lines for CTA19 resource links (ordered top to bottom).',
      },
      fields: [
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CTA1', 'CTA4', 'CTA6', 'CTA7', 'CTA13', 'CTA15', 'CTA16'].includes(designVersion),
      },
      relationTo: 'media',
      required: false,
    },
  ],
}
