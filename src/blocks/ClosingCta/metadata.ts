type ClosingCtaMetadataItem = {
  label: string
  value: string
  description?: string
}

export const allClosingCtaDesignVersions = [
  {
    label: 'Default',
    value: 'DEFAULT',
    description:
      'Full-bleed background image with gradient overlay, headline, supporting text, and primary/secondary CTAs.',
  },
  {
    label: 'Orisa Closing Banner',
    value: 'ORISA_CLOSING_01',
    description:
      'Desktop-only cinematic banner with parallax background, logo row, live local time badge, split headline, bordered CTA, and bracketed description.',
  },
] as const satisfies readonly ClosingCtaMetadataItem[]

export type ClosingCtaDesignVersion = (typeof allClosingCtaDesignVersions)[number]['value']
