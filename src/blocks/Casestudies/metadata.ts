type CasestudiesMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allCasestudiesDesignVersions = [
  {
    label: 'CASESTUDIES5',
    value: 'CASESTUDIES5',
    image: '/admin/previews/casestudies/casestudies5.webp',
  },
  {
    label: 'CASESTUDIES_ORISA01',
    value: 'CASESTUDIES_ORISA01',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/screenshots/block/case-studies12-4x3.webp',
    description:
      'Orisa creative portfolio: pinned intro column with CTA button group and a vertical stack of project cards with tag pills.',
    longDescription:
      'Matches Orisa index.html mg-portfolio-area: white background, orange logo mark, large heading with intro copy, at-btn-group CTA, and stacked portfolio items with zoom-on-hover images, title, subtitle, and outline tag pills.',
  },
  {
    label: 'CASESTUDIES12',
    value: 'CASESTUDIES12',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/screenshots/block/case-studies12-4x3.webp',
    description:
      'Orisa creative portfolio: pinned intro column with CTA button group and a vertical stack of project cards with tag pills.',
    longDescription:
      'Matches Orisa index.html mg-portfolio-area: white background, orange logo mark, large heading with intro copy, at-btn-group CTA, and stacked portfolio items with zoom-on-hover images, title, subtitle, and outline tag pills. Used on the creative agency homepage.',
  },
] as const satisfies readonly CasestudiesMetadataItem[]

export type CasestudiesDesignVersion = (typeof allCasestudiesDesignVersions)[number]['value']
