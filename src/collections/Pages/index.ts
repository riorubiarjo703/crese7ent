import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { hero } from '@/heros/config'
import { pageLayoutField } from '@/fields/pageLayout'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  LAYOUT_BUNDLE_PAGE_TYPE_LABELS,
  LAYOUT_BUNDLE_PAGE_TYPES,
} from '@/constants/layoutBundles'
import { applyLayoutBundle } from './hooks/applyLayoutBundle'
import { revalidatePage } from './hooks/revalidatePage'
import { validateDuplicateLayoutBlocks } from './hooks/validateDuplicateLayoutBlocks'
import { PageBlocks } from './pageBlocks'

export { PageBlocks } from './pageBlocks'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from '@/config/server'
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    plural: {
      en: 'Pages',
      de: 'Seiten',
    },
    singular: {
      en: 'Page',
      de: 'Seite',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, locale, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          breadcrumbs: data?.breadcrumbs,
          collection: 'pages',
          locale: locale.code,
          req,
        })

        return `${NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data, options) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        breadcrumbs: data?.breadcrumbs as Breadcrumb[],
        collection: 'pages',
        locale: options.locale,
        req: options.req,
      })

      return `${NEXT_PUBLIC_SERVER_URL}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            hero,
          ],
          label: 'Hero',
          admin: {
            description: {
              en: 'Top banner only. All other homepage sections live in the Page sections tab.',
              de: 'Nur der obere Banner. Alle weiteren Abschnitte befinden sich unter „Page sections“.',
            },
          },
        },
        {
          fields: [pageLayoutField()],
          label: 'Page sections',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layoutBundleGallery',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/AdminDashboard/LayoutBundleGallery',
        },
      },
    },
    {
      name: 'duplicateBlocksWarning',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/AdminDashboard/DuplicateBlocksWarning',
        },
      },
    },
    {
      name: 'layoutBundle',
      type: 'relationship',
      relationTo: 'layout-bundles',
      admin: {
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'layoutBundlePageType',
      type: 'select',
      options: LAYOUT_BUNDLE_PAGE_TYPES.map((value) => ({
        label: LAYOUT_BUNDLE_PAGE_TYPE_LABELS[value],
        value,
      })),
      admin: {
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'duplicateBlocksAcknowledged',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'applyLayoutBundleMode',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'Do not apply', value: 'none' },
        { label: 'Replace page sections only', value: 'replace' },
        { label: 'Replace hero + page sections', value: 'replace-all' },
      ],
      admin: {
        position: 'sidebar',
        description: {
          en: 'Pick a bundle template above, choose how to apply it, then save. One template per page — append is disabled to prevent duplicate sections.',
          de: 'Template oben wählen, Anwendungsmodus setzen und speichern. Ein Template pro Seite.',
        },
      },
    },

    ...slugField(),
    {
      name: 'enableBreadcrumbs',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'Breadcrumbs',
        de: 'Breadcumbs',
      },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Enable breadcrumbs for the page',
          de: 'Breadcumbs für die Seite aktivieren',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt, applyLayoutBundle, validateDuplicateLayoutBlocks],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
    },
    maxPerDoc: 50,
  },
}
