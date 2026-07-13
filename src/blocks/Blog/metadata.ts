type BlogMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allBlogDesignVersions = [
  {
    label: 'BLOG_ORISA_01',
    value: 'BLOG_ORISA_01',
    image: '/seed/orisa/creative/pages/img-23.webp',
    description:
      'Orisa blog grid with eyebrow link, split headline, ALL ARTICLES CTA, and four image cards with author meta.',
    longDescription:
      'Blog Orisa 01 recreates the at-sec13-area from the Orisa Creative homepage. A top row pairs an INSIDE COMPANY eyebrow and split reveal headline with a pill ALL ARTICLES button. Below, a responsive four-column grid shows blog cards with hover zoom thumbnails, title links, and By Author – Date meta lines.',
  },
  {
    label: 'BLOG29',
    value: 'BLOG29',
    image: '/admin/previews/blog/blog29.jpeg',
    description:
      'A blog index with a page title, stacked post rows showing date, title, excerpt, tag badges, and a circular arrow button, with separators between entries.',
    longDescription:
      'Blog29 is a vertical blog index built with shadcn/ui cards, badges, buttons, and separators inside a contained section. A large left-aligned page title sits above a stack of borderless cards; each row shows the publish date, post title, a multi-line excerpt, and a wrap row of secondary badges. A round secondary button with an arrow icon sits in the corner of each card and links the whole post target. The layout reads as a light editorial list with muted foreground on supporting text, medium weight on titles, and compact badge chips. Separators are full width rules between cards so the list stays scannable without heavy card chrome. The link control uses a short transition and a hover rotation on the icon button. This is a moderate, content-forward pattern that fits a standard marketing blog listing. The tag row and the icon-only outbound control are the clearest differences from a plain text list. On smaller widths the typography scales down while the stacked flow stays the same.',
  },
  {
    label: 'BLOG27',
    value: 'BLOG27',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/screenshots/block/blog27-4x3.webp',
    description:
      'Top band with dotted muted background, breadcrumb, headline copy, and spotlight card, then a filtered grid with load-more pagination.',
    longDescription:
      'Blog27 is a two-stage blog hub built with shadcn/ui Breadcrumb, Card, AspectRatio, RadioGroup, Label, and Button components. The upper region sits on a muted dotted pattern background and splits into a text stack with slash-separated breadcrumbs, a large title, supporting paragraph, and a wide spotlight card. The lower region introduces an All Blogs heading and mounts a client-side filter form where horizontal radio items pick categories before rendering a responsive grid of linked cards. Selecting a category filters posts client-side and resets visible count, while Load More reveals additional items in batches. This pattern is high complexity versus simple blog lists due to interleaved demo data, pagination state, and accessible radio labeling.',
  },
] as const satisfies readonly BlogMetadataItem[]

export type BlogDesignVersion = (typeof allBlogDesignVersions)[number]['value']
