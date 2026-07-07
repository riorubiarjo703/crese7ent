type CtaMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allCtaDesignVersions = [
  {
    label: 'CTA1',
    value: 'CTA1',
    image: '/admin/previews/cta/cta1.webp',
    description:
      'Bordered card with text and media columns, small icon badge beside the title, body copy, a single primary action with a trailing arrow, and a rectangular image on the opposite side.',
    longDescription:
      'Cta1 is a split card call-to-action built with shadcn/ui: the text column opens with a muted icon chip and headline on one line, then supporting paragraph, then one button that includes a trailing arrow icon. The opposite column shows a rectangular image sized to match the card height on larger breakpoints. A thin border wraps the whole card with rounded corners; the icon treatment and typography mirror other side-image CTAs in the set. Visual emphasis stays on the headline and photography, with the button as a single clear exit. This version places copy first and imagery second in the DOM order, which affects reading order on stacked mobile layouts compared with variants that lead with the photo. The block is a compact promotional row rather than a full hero. It is simpler than multi-button strips because only one action appears. Swap placeholder icon, strings, link, and asset to reuse. Small screens stack text above the image block inside the same bordered frame.',
  },
  {
    label: 'CTA6',
    value: 'CTA6',
    image: '/admin/previews/cta/cta6.webp',
    description:
      'A wide accent band with a text stack and three overlapping, rotated rectangles; heading, body, and a single Get Started button are fixed in source.',
    longDescription:
      'Cta6 is a full-bleed call-to-action built with Shadcn UI inside a section with heavy vertical padding. The content sits in a bordered horizontal band on an accent background. The left side carries a large heading, a muted paragraph, and one default Button. The right side is purely decorative: three tall rounded rectangles stacked with different rotations, offsets, and shadow strengths to read like fanning cards. Visually the block leans on contrast between flat accent fill and faux-card panels that use background color, large radius, and layered shadows. The illustration area is positioned partially below the text on small screens with generous bottom margin so the cards peek into the section. From medium widths up the layout becomes a row with the graphic anchored to the bottom and offset toward the edge. The aesthetic is graphic and product-marketing oriented rather than minimal documentation chrome. The depth comes almost entirely from those rotated shells rather than photography or icons. The heading, body paragraph, and button label are hardcoded in the TSX rather than props, and the body still uses Lorem-style placeholder text, so you customize this block by editing source until it matches the content-pack pattern used elsewhere.',
  },
  {
    label: 'CTA10',
    value: 'CTA10',
    image: '/admin/previews/cta/cta10.webp',
    description:
      'Contained CTA band with headline, supporting text, and optional primary and secondary actions aligned inline on larger breakpoints and stacked when space is tight.',
    longDescription:
      'Cta10 is a compact call-to-action band built with Shadcn UI, centered headline and description, and up to two buttons for contrasting actions such as purchase versus learn more. The block is self-contained with no illustration dependency, which makes it easy to drop between sections on marketing pages. A tinted or accent-backed panel surrounds the text stack while buttons sit on a flex row that wraps cleanly. Typography is headline-forward with concise body lines underneath. The presentation stays flat with rounded corners on the container, which reads as a gentle emphasis rather than a full hero treatment. Overall it feels like a utility marketing strip: flexible, common, and easy to understand. The dual-button option is the functional hook versus single-action variants. Elaboration is intentionally low; you provide title, description, labels, and destinations. Narrow screens stack actions vertically while keeping reading order headline, body, then buttons.',
  },
  {
    label: 'CTA12',
    value: 'CTA12',
    image: '/admin/previews/cta/cta12.webp',
    description:
      'Full-width accent panel with centered headline, supporting copy, and optional primary and secondary buttons that stack on narrow viewports and align in a row when space allows.',
    longDescription:
      'Cta12 is a centered call-to-action band built with Shadcn UI: heading and body text sit in a single centered column above a button group, all inside a rounded accent surface with generous vertical padding. Unlike split layouts that park buttons beside copy on desktop, this pattern keeps the narrative and actions in one vertical rhythm for a classic full-width strip. The accent fill carries most of the visual weight, with muted foreground on the description and standard filled and outline buttons for the two outcomes. Motion is static; emphasis comes from size jumps between title levels and comfortable spacing in the padded container. The max-width constraint keeps line length tight so the block does not feel like edge-to-edge text. It reads as a focused conversion moment meant to interrupt a scroll with a single decision. Compared with side-by-side CTA bands, the centered stack reads more like a modal or card without a dialog. Complexity stays low: supply strings and URLs for up to two links. The block fits mid-page promos where symmetry matters more than horizontal efficiency. Small screens stack buttons full width before switching to an inline pair when breakpoints allow.',
  },
  {
    label: 'CTA19',
    value: 'CTA19',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/screenshots/block/cta19-4x3.webp',
    description:
      'A wide card pairing badge, headline, body, and dual buttons with a separated column of two large icon link rows for deeper resources.',
    longDescription:
      'Cta19 is a horizontal call-to-action built with Shadcn UI inside one rounded bordered shell split into primary messaging and a secondary link stack. The left side optionally shows an outline badge, then a headline and muted paragraph capped by primary and outline buttons that behave as anchors. The right side is a separate flex column with hairline separators between full-width rows, each row an entire clickable band with icon, title, and longer supporting text. Surfaces stay flat with crisp borders and generous padding so the emphasis lands on typography and icons rather than gradients. Hover states mute the link bands slightly to signal interactivity while keeping contrast steady for the icon strokes. This pattern is moderately structured for teams that want twin commitments beside richer explanatory hops without nested accordions. The symmetry between commerce-style buttons and documentation-like destinations makes it flexible beyond one niche narrative. Stacked vertically below large breakpoints, the separator shifts from vertical-divider psychology to stacked bands separated by horizontal rules so scanning stays predictable on phones.',
  },
] as const satisfies readonly CtaMetadataItem[]

export type CtaDesignVersion = (typeof allCtaDesignVersions)[number]['value']
