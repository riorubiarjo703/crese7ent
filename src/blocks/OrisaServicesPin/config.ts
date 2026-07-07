import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OrisaServicesPinBlock: Block = {
  slug: 'orisaServicesPin',
  interfaceName: 'OrisaServicesPinBlock',
  labels: {
    singular: 'Orisa Services Pin',
    plural: 'Orisa Services Pin',
  },
  fields: [
    backgroundColor,
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'services',
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'OUR SOLUTIONS',
    },
    {
      name: 'sinceLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Since 2012',
    },
    {
      name: 'projectCount',
      type: 'text',
      localized: true,
      defaultValue: '38',
    },
    {
      name: 'projectCountLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Completed projects',
    },
    {
      name: 'panelImages',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: {
          en: 'Images for the pinned left panel (sync with services order)',
          de: 'Bilder für das linke Panel (Reihenfolge wie Services)',
        },
      },
    },
    link({
      overrides: {
        name: 'cta',
        label: 'Section CTA',
        admin: {
          description: {
            en: 'Button shown below the service list (defaults to “Get a free quote” → /contact)',
            de: 'Button unter der Service-Liste',
          },
        },
      },
    }),
    {
      name: 'pinOnScroll',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Pin left panel on scroll (desktop)',
        de: 'Linkes Panel beim Scrollen fixieren (Desktop)',
      },
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
        link({
          overrides: {
            name: 'link',
            admin: {
              description: {
                en: 'Optional link for the whole service row (URL only — no button label shown)',
                de: 'Optionaler Link für die gesamte Service-Zeile',
              },
            },
          },
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
    {
      name: 'headline',
      type: 'richText',
      localized: true,
      admin: {
        description: {
          en: 'Optional section headline below the pin area',
          de: 'Optionale Überschrift unter dem Pin-Bereich',
        },
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
  ],
}
