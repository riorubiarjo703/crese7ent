type StatMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
}

export const allStatDesignVersions = [
  {
    label: 'STAT1',
    value: 'STAT1',
    image: '/admin/previews/stat/stats1.webp',
  },
  {
    label: 'STAT2',
    value: 'STAT2',
    image: '/admin/previews/stat/stats2.webp',
  },
] as const satisfies readonly StatMetadataItem[]

export type StatDesignVersion = (typeof allStatDesignVersions)[number]['value']
