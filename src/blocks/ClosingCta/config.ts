import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

import { allClosingCtaDesignVersions } from './metadata'

export type { ClosingCtaDesignVersion } from './metadata'
export { allClosingCtaDesignVersions }

const orisaDesign = (designVersion?: string) => designVersion === 'ORISA_CLOSING_01'
const defaultDesign = (designVersion?: string) =>
  !designVersion || designVersion === 'DEFAULT'

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
      name: 'designVersion',
      type: 'select',
      defaultValue: 'DEFAULT',
      options: allClosingCtaDesignVersions.map((version) => ({
        label: version.label,
        value: version.value,
      })),
    },
    {
      name: 'headlineLines',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Headline line', plural: 'Headline lines' },
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
        description: 'Each line renders on its own row in the banner headline.',
      },
      fields: [
        {
          name: 'line',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => defaultDesign(designVersion),
      },
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
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => defaultDesign(designVersion),
      },
    },
    {
      name: 'hoursCaption',
      type: 'text',
      localized: true,
      defaultValue: '[ From 8:00 To 16:30 ]',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
      },
    },
    {
      name: 'descriptionLine',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
        description: 'Right-aligned bracketed description shown on desktop.',
      },
    },
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Orisa',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
      },
    },
    {
      name: 'showLocalTime',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
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
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            defaultDesign(designVersion),
        },
      },
    }),
  ],
}
