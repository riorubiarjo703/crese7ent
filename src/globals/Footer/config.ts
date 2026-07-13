import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from '@/config/server'
import { socialIcon } from '@/components/SocialIcon/config'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { backgroundColor } from '@/fields/color'
import { authenticated } from '@/access/authenticated'

import { allFooterDesignVersions } from './metadata'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    description: 'Theme configuration (For live preview config has to be saved)',
    livePreview: {
      url: ({ req }) => {
        const path = generatePreviewPath({
          slug: 'home',
          breadcrumbs: undefined,
          collection: 'pages',
          locale: 'en',
          req,
        })

        return `${NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: () => {
      const path = generatePreviewPath({
        slug: 'home',
        breadcrumbs: undefined,
        collection: 'pages',
        locale: 'en',
      })

      return `${NEXT_PUBLIC_SERVER_URL}${path}`
    },
  },
  fields: [
    backgroundColor,
    designVersionPreview(allFooterDesignVersions, {
      defaultValue: '1',
    }),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'orisaFooter',
      type: 'group',
      label: 'Orisa footer',
      admin: {
        condition: (_, siblingData) => siblingData?.designVersion === '9',
        description: 'Contact block, brand mark, and service marquee for Orisa footer (v9).',
      },
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
        },
        {
          name: 'headlineLines',
          type: 'array',
          maxRows: 3,
          labels: { singular: 'Headline line', plural: 'Headline lines' },
          admin: {
            description: 'Optional line breaks for the footer headline. Falls back to headline text.',
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
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'brandMark',
          type: 'text',
          localized: true,
          defaultValue: 'Orisa Studio®',
        },
        {
          name: 'sinceCaption',
          type: 'text',
          localized: true,
          defaultValue: '[ Since 2012 ]',
        },
        {
          name: 'marqueeTags',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      label: 'Copyright',
      defaultValue: 'Company Name. All rights reserved.',
    },
    /**
     * A subline to display under the logo. Only design options 6,7,8 have this field.
     */
    {
      name: 'subline',
      type: 'text',
      localized: true,
      label: 'Subline',
      defaultValue:
        'Components made easy. This cool starter template will help you get started with your next project.',
      admin: {
        condition: (_, siblingData) =>
          siblingData.designVersion === '2' ||
          siblingData.designVersion === '6' ||
          siblingData.designVersion === '7' ||
          siblingData.designVersion === '8',
      },
    },
    /**
     * Legal links like imprint, privacy policy, etc. that are displayed at the bottom of the footer.
     */
    {
      name: 'legalLinks',
      label: {
        de: 'Rechtliches',
        en: 'Legal Links',
      },
      admin: {
        description: {
          de: 'Legale Links wie Impressum, Datenschutzerklärung, etc.',
          en: 'Legal links like imprint, privacy policy, etc.',
        },
        condition: (_, siblingData) => {
          const version = siblingData?.designVersion
          return (
            version === '1' ||
            version === '2' ||
            version === '3' ||
            version === '4' ||
            version === '6' ||
            version === '7' ||
            version === '9'
          )
        },
      },
      type: 'array',
      fields: [
        link({
          appearances: false,
          disableIcon: true,
        }),
      ],
      maxRows: 3,
    },
    /**
     * Social media links that are displayed in the footer
     */
    {
      name: 'socialLinks',
      type: 'array',
      label: {
        en: 'Social Media Links',
        de: 'Social Media Links',
      },
      admin: {
        description: {
          en: 'Add social media links with icons',
          de: 'Fügen Sie Social Media Links mit Icons hinzu',
        },
        condition: (_, siblingData) => {
          const version = siblingData?.designVersion
          return (
            version === '1' ||
            version === '3' ||
            version === '4' ||
            version === '5' ||
            version === '6' ||
            version === '7' ||
            version === '8' ||
            version === '9'
          )
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            socialIcon,
            {
              name: 'url',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                placeholder: 'https://...',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subNavItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 10,
        },
      ],
      maxRows: 4,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
