import type { Field } from 'payload'

import { PageBlocks } from '@/collections/Pages/pageBlocks'

interface PageLayoutFieldOptions {
  required?: boolean
}

export function pageLayoutField({ required = true }: PageLayoutFieldOptions = {}): Field {
  return {
    name: 'layout',
    type: 'blocks',
    blocks: PageBlocks,
    required,
    labels: {
      singular: 'Section',
      plural: 'Sections',
    },
    admin: {
      description: {
        en: 'Drag and drop sections to build the page. Expand each block to edit headlines, copy, images, and links.',
        de: 'Abschnitte per Drag & Drop anordnen. Jeden Block aufklappen, um Texte, Bilder und Links zu bearbeiten.',
      },
    },
  }
}
