import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { layoutBundlePageTemplateFields } from '@/fields/layoutBundlePageTemplate'
import { pageLayoutField } from '@/fields/pageLayout'
import { slugField } from '@/fields/slug'
import { hero } from '@/heros/config'

export const LayoutBundles: CollectionConfig = {
  slug: 'layout-bundles',
  labels: {
    singular: {
      en: 'Layout bundle',
      de: 'Layout-Bundle',
    },
    plural: {
      en: 'Layout bundles',
      de: 'Layout-Bundles',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
    description: {
      en: 'Storeframe bundles contain page templates (home, about, services, etc.). Only Creative Storeframe and Marketing Storeframe are used in the page editor.',
      de: 'Storeframe-Bundles enthalten Seiten-Templates. Im Editor werden nur Creative Storeframe und Marketing Storeframe verwendet.',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: {
          en: 'Shown when editors pick this bundle on a page.',
          de: 'Wird angezeigt, wenn Redakteure dieses Bundle auf einer Seite auswählen.',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'creative-storeframe',
      options: [
        { label: 'Creative Storeframe', value: 'creative-storeframe' },
        { label: 'Marketing Storeframe', value: 'marketing-storeframe' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: {
          en: 'Default thumbnail for bundle selection.',
          de: 'Standard-Vorschaubild für die Bundle-Auswahl.',
        },
      },
    },
    {
      name: 'pageTemplates',
      type: 'array',
      labels: {
        singular: 'Page template',
        plural: 'Page templates',
      },
      admin: {
        description: {
          en: 'One preset per page type. Editors pick exactly one template when applying a bundle to a page.',
          de: 'Ein Preset pro Seitentyp. Redakteure wählen genau ein Template beim Anwenden.',
        },
      },
      fields: layoutBundlePageTemplateFields,
    },
    {
      type: 'tabs',
      admin: {
        condition: () => false,
      },
      tabs: [
        {
          label: 'Legacy hero',
          fields: [hero],
        },
        {
          label: 'Legacy sections',
          fields: [pageLayoutField({ required: false })],
        },
      ],
    },
  ],
}
