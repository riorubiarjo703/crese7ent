type AboutMetadataItem = {
  label: string
  value: string
  description?: string
  longDescription?: string
}

export const allAboutDesignVersions = [
  {
    label: 'ABOUT_ORISA_01',
    value: 'ABOUT_ORISA_01',
    description:
      'Orisa Creative Agency about section with eyebrow link, headline + CTA, subtitle, avatar stack, and two-column expertise cards.',
    longDescription:
      'Matches Orisa index.html at-about-area: white background, About Us eyebrow with arrow, large headline with inline GET IN TOUCH button, orange diamond icon with subtitle, overlapping team avatars with count, decorative SVG accents, and two columns with alternating image/text for Creative Expertise and Experience & Innovation.',
  },
  {
    label: 'ABOUT3',
    value: 'ABOUT3',
    description:
      'A two-column about section with main image, breakout card, logo strip, and achievements stats grid on muted background.',
    longDescription:
      'About3 is a company profile section with a two-column header containing a headline and description. Below is a three-column grid with a large main image spanning two columns, and a right column split between a muted breakout card with logo, text, and outline button, and a secondary image. A centered logo strip shows partner company logos. The bottom section is a muted rounded panel with an achievements headline, description, and four-column stats grid. Light background throughout with muted panels for the breakout card and achievements section. The breakout card includes a logo that inverts in dark mode. Stats display large bold numbers with labels below. Rounded corners on images and panels. The outline button provides a secondary action style. This is a well-rounded company overview block with moderate complexity. It balances imagery with data-driven content through the stats section. The logo strip adds credibility. Requires multiple images, company logos, and achievement metrics to populate. On mobile, the three-column image grid stacks vertically. The stats grid becomes two columns then single column on smallest screens.',
  },
  {
    label: 'ABOUT4',
    value: 'ABOUT4',
    description:
      'A centered about section with six-image grid, two-column vision and creators text blocks, and muted CTA banner.',
    longDescription:
      'About4 is a centered about section that opens with a large headline and supporting paragraph. Below is a six-image grid arranged in three columns and two rows. The main content area splits into two columns for Vision and Creators sections, each with a heading and multiple paragraphs of body text. The block closes with a muted rounded banner containing a headline and large CTA button. The design uses a light background with dark text. Images have no rounding and fill their grid cells edge to edge. The bottom CTA banner uses a subtle muted background with rounded corners. Typography relies on large headings with generous line height in the body text. Spacing between sections is substantial. This is a text-heavy narrative block focused on company story and team background. The six-image grid provides visual interest but the emphasis is on the written content. Simple, understated styling without decorative elements. Requires six images and substantial copy for the vision and creators sections. On mobile, the image grid becomes two columns then single column. The vision and creators columns stack vertically. The CTA banner stacks its content centered.',
  },
] as const satisfies readonly AboutMetadataItem[]

export type AboutDesignVersion = (typeof allAboutDesignVersions)[number]['value']
