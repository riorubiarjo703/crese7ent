type HeaderMetadataItem = {
  label: string
  value: string
  image?: string
  description?: string
}

export const allHeaderDesignVersions = [
  {
    label: '1 — left aligned',
    value: '1',
    description: 'Classic left-aligned logo with horizontal navigation links.',
  },
  {
    label: '4 — multi block submenus',
    value: '4',
    image: '/admin/previews/header/navbar4/cardGrid.jpeg',
    description: 'Rich megamenu with card grids, category grids, and featured banners.',
  },
  {
    label: '5 — simple',
    value: '5',
    description: 'Minimal header with logo, links, and optional CTA buttons.',
  },
  {
    label: '6 — Storeframe megamenu',
    value: '6',
    image: '/admin/previews/header/navbar6.webp',
    description:
      'Orisa ThemeForest megamenu with multi-column dropdowns, search overlay, and mobile sheet.',
  },
] as const satisfies readonly HeaderMetadataItem[]

export type HeaderDesignVersion = (typeof allHeaderDesignVersions)[number]['value']
