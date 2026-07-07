import type { Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'
import { icon } from '@/components/Icon/config'
import { customHeroFields } from './CustomHero/config'
import { backgroundColor } from '@/fields/color'
import { designVersionDescription } from '@/components/AdminDashboard/DesignVersionDescription'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { MotionText } from '@/blocks/LexicalBlocks/MotionText/config'
import { allHeroDesignVersions } from './metadata'

/* TODO:
13 -> X
30 -> X
16 -> X




29 -> rating
31 -> 3 images
37 -> 3 images
38 -> 3 images
15 -> rating
27 -> tagline
26 -> tagline, badge-link
55 -> tagline, badge-link
21 -> tagline, badge-link (+ dritter button checken ob neues feld oder array aufteilen?)
53 -> headline aus richtext rauslösen, icons (faces mit textinfo), tagline
28 -> 5 icons
32 -> 14 icons
12 -> 1 - 5 icons, tagline
51 -> 4 icons, tagline
57 -> 4 icons, tagline
50 -> 2 icons, badge-link
24 -> icon, 4 USPs: icon, headline, description
25 -> icon, 3-4 USPs: icon, headline
20 -> 2-5 USPs: icon, headline, description, time
45 -> badge, 3 USPs: icon, headline, description

33 -> pricing: headline, price, description


What should happen with the two big boxes? Image or Tex?
18 -> 2 images + 14 icons

*/

export const hero: Field = {
  name: 'hero',
  type: 'group',
  interfaceName: 'Hero',
  fields: [
    backgroundColor,
    designVersionPreview(allHeroDesignVersions),
    {
      name: 'badge',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['1', '2', '3', '4', '5', '6', '12', '112', 'FOOD_01'].includes(designVersion),
      },
    },
    icon({
      name: 'badgeIcon',
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['1', '2', '3', '4', '5', '6'].includes(designVersion),
      },
    }),
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['3', '27', '26', '55', '21', '53', '12', '51', '57', '112', '220', 'ORISA_CREATIVE_01', 'ORISA_MARKETING_01', 'ORISA_PAGE_01'].includes(
            designVersion,
          ),
      },
    },
    link({
      appearances: false,
      disableLabel: true,
      overrides: {
        name: 'badgeLink',
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['26', '55', '21', '50'].includes(designVersion),
        },
      },
    }),
    link({
      appearances: false,
      disableIcon: true,
      overrides: {
        name: 'buttonLink',
        label: 'Button Link',
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['214'].includes(designVersion),
        },
      },
    }),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['1', '2', '3', '4', '5', '6', '12', '101', '112', '195', '214', '219'].includes(
            designVersion,
          ),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1'] }),
            BlocksFeature({
              blocks: [MotionText],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { designVersion = '' } = {}) =>
            ['1', '2', '3', '4', '5', '6', '12', '101', '112', '195', 'CORP_01', 'FOOD_01', 'ORISA_CREATIVE_01', 'ORISA_MARKETING_01'].includes(
              designVersion,
            ),
        },
      },
    }),
    {
      name: 'headlineLines',
      type: 'array',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CORP_01', 'FOOD_01', 'ORISA_CREATIVE_01', 'ORISA_MARKETING_01', 'ORISA_PAGE_01'].includes(designVersion),
        description: {
          en: 'One headline line per row (e.g. Drive, to, grow)',
          de: 'Eine Überschriftzeile pro Zeile (z.B. Drive, to, grow)',
        },
      },
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sideText',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) => designVersion === 'ORISA_CREATIVE_01',
        description: {
          en: 'Short blurb beside the hero video (Orisa service intro)',
          de: 'Kurzer Text neben dem Hero-Video',
        },
      },
    },
    link({
      appearances: false,
      disableIcon: true,
      overrides: {
        name: 'videoLink',
        label: 'Video caption link',
        admin: {
          condition: (_, { designVersion = '' } = {}) => designVersion === 'ORISA_CREATIVE_01',
          description: {
            en: 'Link below the hero video (e.g. How we work)',
            de: 'Link unter dem Hero-Video',
          },
        },
      },
    }),
    link({
      appearances: false,
      overrides: {
        name: 'talkBadgeLink',
        label: "Let's Talk badge",
        admin: {
          condition: (_, { designVersion = '' } = {}) => designVersion === 'ORISA_CREATIVE_01',
          description: {
            en: 'Floating circular badge link (left side of hero)',
            de: 'Schwebendes Badge links im Hero',
          },
        },
      },
    }),
    {
      name: 'marketingHero',
      type: 'group',
      admin: {
        condition: (_, { designVersion = '' } = {}) => designVersion === 'ORISA_MARKETING_01',
      },
      fields: [
        {
          name: 'intro',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'accentWord',
          type: 'text',
          localized: true,
          admin: {
            description: {
              en: 'Highlighted word at end of headline (e.g. Value)',
              de: 'Hervorgehobenes Wort am Ende der Überschrift',
            },
          },
        },
        {
          name: 'testimonialQuote',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'testimonialAuthorName',
          type: 'text',
          localized: true,
        },
        {
          name: 'testimonialAuthorRole',
          type: 'text',
          localized: true,
        },
        {
          name: 'testimonialCardImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'testimonialAuthorAvatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'featureImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'clientCount',
          type: 'text',
          defaultValue: '16',
        },
        {
          name: 'clientCountSuffix',
          type: 'text',
          defaultValue: 'K+',
        },
        {
          name: 'clientCountLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Clients word-wide',
        },
        {
          name: 'clientAvatars',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          maxRows: 5,
        },
        {
          name: 'traitLabels',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'pageHero',
      type: 'group',
      label: 'Inner page hero',
      admin: {
        condition: (_, { designVersion = '' } = {}) => designVersion === 'ORISA_PAGE_01',
        description: {
          en: 'Banner image and intro for Orisa inner pages (About, Contact, etc.)',
          de: 'Banner-Bild und Intro für Orisa-Unterseiten',
        },
      },
      fields: [
        {
          name: 'bannerImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'intro',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'subheadline',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CORP_01', 'FOOD_01', 'ORISA_CREATIVE_01', 'ORISA_MARKETING_01'].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Images', value: 'images' },
        { label: 'Mist (WebGL)', value: 'mist' },
        { label: 'Particles', value: 'particles' },
      ],
      admin: {
        condition: (_, { designVersion = '' } = {}) => designVersion === 'CORP_01',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => {
          const designVersion = siblingData?.designVersion ?? ''
          if (designVersion === 'ORISA_CREATIVE_01') return true
          return (
            designVersion === 'CORP_01' && siblingData?.backgroundType === 'video'
          )
        },
      },
    },
    {
      name: 'backgroundPoster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          en: 'Poster image shown while the video loads (recommended for LCP)',
          de: 'Poster-Bild während das Video lädt (empfohlen für LCP)',
        },
        condition: (_, siblingData) => {
          const designVersion = siblingData?.designVersion ?? ''
          if (designVersion === 'ORISA_CREATIVE_01') return true
          return (
            designVersion === 'CORP_01' && siblingData?.backgroundType === 'video'
          )
        },
      },
    },
    {
      name: 'showScrollIndicator',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['CORP_01', 'FOOD_01', 'ORISA_CREATIVE_01', 'ORISA_MARKETING_01'].includes(designVersion),
      },
    },
    {
      name: 'images',
      type: 'upload',
      admin: {
        condition: (_, siblingData) => {
          const designVersion = siblingData?.designVersion ?? ''
          if (designVersion === 'CORP_01') {
            return ['images', 'mist'].includes(siblingData?.backgroundType)
          }
          if (designVersion === 'FOOD_01') {
            return true
          }
          if (designVersion === 'ORISA_CREATIVE_01') {
            return true
          }
          return [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '12',
            '31',
            '37',
            '38',
            '18',
            '112',
            '220',
            '214',
          ].includes(designVersion)
        },
      },
      relationTo: 'media',
      hasMany: true,
      maxRows: 3,
    },
    designVersionDescription(
      'descriptionOrisaCreative',
      (_, { designVersion } = {}) => designVersion === 'ORISA_CREATIVE_01',
      {
        en: 'Image 1: background texture. Image 2: parallax layer (optional).',
        de: 'Bild 1: Hintergrund-Textur. Bild 2: Parallax-Ebene (optional).',
      },
    ),
    designVersionDescription(
      'description112',
      (_, { designVersion } = {}) => ['112'].includes(designVersion),
      {
        en: 'Just use a single image here as background image',
        de: 'Nur ein Bild hier als Hintergrund-Bild verwenden',
      },
    ),
    {
      name: 'icons',
      type: 'upload',
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['3', '53', '28', '32', '12', '51', '57', '50', '18', '112', '101', '219'].includes(
            designVersion,
          ),
      },
      relationTo: 'media',
      hasMany: true,
      maxRows: 14,
    },
    designVersionDescription(
      'description219',
      (_, { designVersion } = {}) => ['219'].includes(designVersion),
      {
        en: 'Use 14 logo images here',
        de: 'Verwende hier 14 Logo-Bilder',
      },
    ),
    {
      name: 'USPs',
      type: 'array',
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['24', '25', '20', '45'].includes(designVersion),
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'richText',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: false,
        },
      ],
    },
    {
      name: 'statsItems',
      label: 'Stats Items',
      type: 'array',
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['112'].includes(designVersion),
      },
      maxRows: 3,
      defaultValue: [
        {
          title: 'Courses by Experts',
          value: '87',
        },
        {
          title: 'Hours of Content',
          value: '200+',
        },
        {
          title: 'User Satisfaction Rating',
          value: '100%',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['33'].includes(designVersion),
      },
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
        },
        {
          name: 'price',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      max: 5,
      min: 1,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['3', '4', '7', '15'].includes(designVersion),
      },
    },
    ...customHeroFields,
    {
      name: 'presentationVideo',
      type: 'group',
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['112', '220', '101'].includes(designVersion),
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Presentation Video',
        },
        {
          name: 'videoDuration',
          type: 'text',
          localized: true,
          defaultValue: '2 min',
        },
        {
          name: 'videoUrl',
          type: 'text',
          localized: true,
          defaultValue: 'https://library.shadcnblocks.com/videos/block/landscape.mp4',
        },
      ],
    },
    {
      name: 'tabs',
      type: 'array',
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['195'].includes(designVersion),
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Square Kanban', value: 'SquareKanban' },
            { label: 'Bar Chart', value: 'BarChart' },
            { label: 'Pie Chart', value: 'PieChart' },
            { label: 'Database', value: 'Database' },
            { label: 'Layers', value: 'Layers' },
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      maxRows: 5,
    },
  ],
  label: false,
}
