type ChangelogMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allChangelogDesignVersions = [
  {
    label: 'CHANGELOG1',
    value: 'CHANGELOG1',
    image: '/admin/previews/changelog/changelog1.webp',
    description:
      'Stacked release entries pair a narrow sticky column of version badge and date with titles, descriptions, optional lists, images, and links.',
  },
  {
    label: 'CHANGELOG8',
    value: 'CHANGELOG8',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/screenshots/block/changelog8-4x3.webp',
    description:
      'Desktop sidebar lists each release title with version and date while the main column shows badge, date, copy, and optional inset bullets.',
    longDescription:
      'Changelog8 is a configurable changelog with Shadcn UI scroll areas and badges driven by structured entries. A sticky left column on large screens repeats the page title and summary, then offers an on-this-page navigation list inside a constrained scroll viewport where each control shows release title plus version and date metadata and scrolls to the matching section. Main entries align along a subtle accent border, with badges for version, date labels, titles, descriptions, optional grouped bullets, and bordered imagery. Mobile hides the sidebar and reads as a single stacked timeline.',
  },
] as const satisfies readonly ChangelogMetadataItem[]

export type ChangelogDesignVersion = (typeof allChangelogDesignVersions)[number]['value']
