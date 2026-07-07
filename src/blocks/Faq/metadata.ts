type FaqMetadataItem = {
  label: string
  value: string
  description?: string
  longDescription?: string
}

export const allFaqDesignVersions = [
  {
    label: 'FAQ1',
    value: 'FAQ1',
    description:
      'Narrow container FAQ heading above a collapsible accordion list where each question triggers expansion and answers render in muted body color for readability.',
    longDescription:
      'Faq1 is a compact FAQ section built with shadcn/ui accordion primitives inside a constrained centered column with generous vertical padding on the outer section shell. Users see a customizable page heading followed by a vertical list of interactive questions. Opening a question reveals its answer text while chevrons and borders follow the default accordion affordances for expand and collapse. Visually the block is quiet: large semibold title, standard hairline separators between items, semibold question labels, and answers set in muted foreground color for contrast against questions. There are no hero images, badges, or extra framing lines beyond the accordion chrome. This is a straightforward marketing FAQ pattern with low complexity. It exists to host many text-only Q and A pairs without layout surprises. Swap the visible heading and supply your own question-and-answer entries; long answers simply grow the open panel height. Responsive behavior narrows typography slightly on phones but retains the centered single-column accordion so touch targets remain full width triggers.',
  },
  {
    label: 'FAQ4',
    value: 'FAQ4',
    description:
      'Accordion FAQ introduced by a small badge, with separators between items and a trailing link to contact support when answers are not enough.',
    longDescription:
      'Faq4 is an accordion FAQ built with shadcn/ui primitives: a pill badge labels the section, a headline and subtitle set context, and each question expands into richer answer text. Between groups you get subtle separator lines so the rhythm stays steady even when copy length varies. The palette stays neutral with crisp type and reserved accent coming from the badge and link affordances. Hover and open states lean on standard accordion motion rather than custom illustration, so the section feels like part of a shared design system. The support link at the end is typographically lighter but still obvious as an escape hatch. This lands as a polished marketing FAQ with light ornamentation rather than a bare list. It is moderately complex because it coordinates badge, separators, accordion items, and a closing CTA string. Prepare real questions, paragraph-length answers, badge label text, and the support URL or handler for the trailing link. Stacking behavior follows typical single-column accordion patterns on small breakpoints, with triggers remaining full width for touch targets.',
  },
  {
    label: 'FAQ5',
    value: 'FAQ5',
    description:
      'FAQ block with badge, title, intro copy, and a vertical list of numbered questions each paired with an answer paragraph.',
    longDescription:
      'Faq5 opens with a Shadcn UI badge, section heading, and supporting sentence, then moves into a numbered list where each entry shows an index, the question line, and a multi-sentence answer below. The numbering is typographic rather than an ordered-list gimmick, so long answers still read like documentation. Contrast comes from bold questions, softer answer color, and generous vertical gaps so each pair registers as its own unit. The layout avoids cards and shadows; separation is mostly whitespace and consistent text sizing. Nothing collapses, so the entire FAQ is visible at once. The aesthetic is minimal and editorial: useful when you want scan-friendly order without accordion mechanics. Complexity is low to moderate because structure is predictable, but you need enough copy per answer to justify the numbered format. The block keeps one centered column on large screens and lets the list breathe on phones without introducing a second pattern.',
  },
  {
    label: 'FAQ12',
    value: 'FAQ12',
    description:
      'Categorized accordion FAQs with a sidebar that jumps to each group and highlights the active category as the main column scrolls.',
    longDescription:
      'Faq12 is a documentation-style FAQ built with Shadcn UI: a vertical list of category buttons anchors the left rail while the right column stacks matching sections, each containing an accordion of questions for that topic. Clicking a category scrolls the page to the corresponding block so long help pages stay navigable. The sidebar uses quiet button styling with an obvious active treatment, and the accordion panels mirror standard shadcn patterns with clear triggers and padded answer areas. The interaction model depends on scroll position to keep the sidebar state honest, so the section feels like a miniature knowledge base rather than a single folded list. This is a more complex FAQ because you must maintain category metadata, multiple accordion instances, and scroll affordances. It suits dense content where users already think in topics. On smaller breakpoints the sidebar and content stack, preserving category order while trading the persistent side nav for a linear read.',
  },
] as const satisfies readonly FaqMetadataItem[]

export type FaqDesignVersion = (typeof allFaqDesignVersions)[number]['value']
