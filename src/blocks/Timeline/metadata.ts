type TimelineMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allTimelineDesignVersions = [
  {
    label: 'TIMELINE2',
    value: 'TIMELINE2',
    image: '/admin/previews/timeline/timeline2.jpeg',
    description:
      'A component displaying a timeline of sections with images and text. It has a two-column layout, with text on the left and a sticky, changing image on the right as you scroll.',
    longDescription: 'This component provides a reusable UI element for your application.',
  },
  {
    label: 'TIMELINE8',
    value: 'TIMELINE8',
    image: '/admin/previews/timeline/timeline8.jpeg',
    description:
      'A vertical timeline block, showcasing events with dates, displayed in a centered max-width container with decorative separators.',
    longDescription: 'This component provides a reusable UI element for your application.',
  },
] as const satisfies readonly TimelineMetadataItem[]

export type TimelineDesignVersion = (typeof allTimelineDesignVersions)[number]['value']
