import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ClosingCtaBlock: Block = {
  slug: 'closingCta',
  interfaceName: 'ClosingCtaBlock',
  labels: {
    singular: 'Closing CTA',
    plural: 'Closing CTAs',
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
      name: 'supportingText',
      type: 'text',
      localized: true,
      label: {
        en: 'Supporting text',
        de: 'Begleittext',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    link({
      overrides: {
        name: 'primaryCta',
        label: 'Primary CTA',
      },
    }),
    link({
      overrides: {
        name: 'secondaryCta',
        label: 'Secondary CTA',
        required: false,
      },
    }),
  ],
}
