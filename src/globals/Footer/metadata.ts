type FooterMetadataItem = {
  label: string
  value: string
  image?: string
  description?: string
}

export const allFooterDesignVersions = [
  { label: '1', value: '1', description: 'Standard footer with logo, nav columns, and legal links.' },
  { label: '2', value: '2', description: 'Footer with subline text under the logo.' },
  { label: '3', value: '3', description: 'Compact footer with social links and navigation.' },
  { label: '4', value: '4', description: 'Footer with social icons and multi-column nav.' },
  { label: '5', value: '5', description: 'Minimal footer layout with social links.' },
  { label: '6', value: '6', description: 'Footer with subline and extended link columns.' },
  { label: '7', value: '7', description: 'Footer variant with subline and social links.' },
  { label: '8', value: '8', description: 'Footer with subline and social media row.' },
  {
    label: '9 — Storeframe dark footer',
    value: '9',
    image: '/admin/previews/footer/footer9.webp',
    description:
      'Orisa dark footer with contact block, brand mark, service tag marquee, and nav columns.',
  },
] as const satisfies readonly FooterMetadataItem[]

export type FooterDesignVersion = (typeof allFooterDesignVersions)[number]['value']
