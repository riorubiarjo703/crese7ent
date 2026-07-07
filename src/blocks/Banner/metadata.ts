type BannerMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allBannerDesignVersions = [
  {
    label: 'BANNER1',
    value: 'BANNER1',
    image: '/admin/previews/banner/banner1.webp',
    description:
      'A thin top bar with centered title, muted supporting text, an inline external link, and a ghost icon button that hides the banner.',
    longDescription:
      'Banner1 is a narrow horizontal strip built with Shadcn UI Button for dismissal: full viewport width, background matching the page, a bottom hairline border, and modest vertical padding. The middle flex region centers a single inline sentence that combines a semibold title, muted descriptive text, an underlined link that opens in a new tab, and a trailing period, while a square ghost icon button sits at the end of the row for closing. Showing and hiding is handled locally: when closed, the section returns null so the banner unmounts for the session unless you lift state yourself. There are no icons beside the message itself, which keeps the row quiet and text-first. The look is utilitarian and product-announcement oriented, closer to a changelog bar than a marketing hero. Complexity is low and props are limited to strings for title, description, link label, URL, plus an optional default visibility flag. Because content is one continuous line, very small screens may wrap the sentence; the flex layout still keeps the dismiss control pinned on the same row as far as flex rules allow.',
  },
  {
    label: 'BANNER5',
    value: 'BANNER5',
    image: '/admin/previews/banner/banner5.webp',
    description:
      'Absolutely positioned rounded banner with title, muted description, outline link button, and dismiss control that reflows from column to row on wider viewports.',
    longDescription:
      'Banner5 is a floating notice built with Shadcn UI buttons and spacing utilities, centered near the top of the viewport inside a max-width shell with horizontal margins. Text stacks on small screens and stretches into a row with actions aligned to the end on wider breakpoints. An outline button opens the configured URL in a new tab while paired ghost icon buttons dismiss the banner. Visually the panel reads as a raised card: rounded rectangle, light border, soft shadow, and muted secondary copy under the bold title line. Close mirrors Banner4 with mobile-first placement vs desktop inline alignment next to the CTA. The pattern feels modern and product-like without extra ornament; animation is limited to a simple fade-in on mount for the floating shell. Because it is absolutely positioned, it overlays page content rather than pushing layout; pairing it with top padding on the page avoids accidental overlap with navigation.',
  },
] as const satisfies readonly BannerMetadataItem[]

export type BannerDesignVersion = (typeof allBannerDesignVersions)[number]['value']
