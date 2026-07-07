import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { navbar } from './navbar/navbar.config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from '@/config/server'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { backgroundColor } from '@/fields/color'
import { authenticated } from '@/access/authenticated'

import { allHeaderDesignVersions } from './metadata'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    description: 'Theme configuration (For live preview config has to be saved)',
    livePreview: {
      url: () => {
        const path = generatePreviewPath({
          slug: 'home',
          breadcrumbs: undefined,
          collection: 'pages',
          locale: 'en',
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
    designVersionPreview(allHeaderDesignVersions, {
      defaultValue: '1',
    }),
    {
      name: 'isSearchEnabled',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ...navbar,
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
