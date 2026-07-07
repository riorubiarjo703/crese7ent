import type { Field } from 'payload'

import {
  LAYOUT_BUNDLE_PAGE_TYPE_LABELS,
  LAYOUT_BUNDLE_PAGE_TYPES,
} from '@/constants/layoutBundles'
import { pageLayoutField } from '@/fields/pageLayout'
import { hero } from '@/heros/config'

const heroFields = hero.type === 'group' ? hero.fields : []

export const layoutBundlePageTemplateFields: Field[] = [
  {
    name: 'pageType',
    type: 'select',
    required: true,
    options: LAYOUT_BUNDLE_PAGE_TYPES.map((value) => ({
      label: LAYOUT_BUNDLE_PAGE_TYPE_LABELS[value],
      value,
    })),
    admin: {
      description: {
        en: 'Which page type this template is for (one template per type per bundle).',
        de: 'Für welchen Seitentyp dieses Template gedacht ist.',
      },
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: {
        en: 'Display name shown in the page editor gallery.',
        de: 'Anzeigename in der Bundle-Galerie.',
      },
    },
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'previewImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: {
        en: 'Thumbnail for this page template in the gallery.',
        de: 'Vorschaubild für dieses Seiten-Template.',
      },
    },
  },
  {
    name: 'hero',
    type: 'group',
    interfaceName: 'Hero',
    fields: heroFields,
  },
  pageLayoutField({ required: false }),
]
