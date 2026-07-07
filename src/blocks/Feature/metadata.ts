type FeatureMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allFeatureDesignVersions = [
  {
    label: 'FEATURE1',
    value: 'FEATURE1',
    image: '/admin/previews/feature/feature1.jpeg',
    description:
      'Split feature section with a large heading, optional description, an outline call-to-action, and a square bordered product image in the second column.',
    longDescription:
      'Feature1 is a two-column marketing feature built with shadcn/ui Button primitives and props from the shared feature-single-focus shape. Text sits in one column with centered alignment on small screens, then left alignment from the large breakpoint. It shows a prominent heading, an optional paragraph in muted foreground, and an outline button wired as an external link when secondary link data is present. The opposite column holds a single square image with rounded corners, border, and object-cover cropping. Light theme defaults with muted supporting text and a single primary interaction path through the outline button row. The image column mirrors the editorial weight of the headline and keeps the section image-forward without extra UI chrome. The layout is static and easy to scan. This is a simple, standard split feature closer to starter marketing patterns than a dense bento. Content requirements are a strong headline, optional blurb, one outbound CTA, and one representative image. Uniqueness is low, which makes it a dependable baseline block. The grid collapses so copy stacks above the image on small viewports while preserving spacing and image aspect.',
  },
  {
    label: 'FEATURE25',
    value: 'FEATURE25',
    image: '/admin/previews/feature/feature25.jpeg',
    description:
      'A long-form feature section with a small badge, headline, then three separated bands of copy, each with a title and a four-column grid of checkmarked items.',
    longDescription:
      'Feature25 is a dense product-capabilities page slice built with Shadcn UI badges and separators. An outlined badge introduces the block, followed by a page-width heading. Three thematic bands, each with its own title and short explanation, break the page into parallel capability areas such as project management, customization, and styling. Within each band, items flow in a multi-column grid where every row begins with a check icon and a compact line of text, making long lists scannable. Separators between bands add clear rests so the section does not read as one uninterrupted wall. This is a high-content, moderate-layout block: structurally simple grids and rules, but it expects many real bullets across categories. Empty bands will look unfinished; consider trimming to fewer columns if you do not have enough items. On smaller breakpoints the four-column grid steps down to fewer columns so line lengths stay practical without horizontal scrolling.',
  },
  {
    label: 'FEATURE50',
    value: 'FEATURE50',
    image: '/admin/previews/feature/feature50.jpeg',
    description:
      'Centered headline, deck copy, and outline button lead into three muted link tiles that mix eyebrow labels, titles, supporting text, imagery, and learn-more actions in an uneven grid.',
    longDescription:
      'This section built with Shadcn UI opens with a narrow centered column containing a large title, muted supporting paragraph, and an outline call-to-action with a trailing chevron. Below that, three whole-card links use muted panel backgrounds: the first stretches full width and splits text plus a bordered learn-more button against a large image panel, while the lower pair divide the next row with uneven column weight so one tile feels wider than the other. Eyebrow labels in small caps-style muted text introduce each story. Surfaces stay soft gray with outline controls and photography that snaps to aspect rules per tile. Some tiles tuck a circular icon-only button that eases into view on wide screens to hint at navigation without crowding the card face. Borders separate image and copy regions on split layouts. Overall rhythm alternates between a hero-style full-width promo and three supporting link destinations. The pattern reads as one primary promise with three supporting link destinations underneath. It is more complex than a static trio of cards because of the split media panels and asymmetric column spanning.',
  },
  {
    label: 'FEATURE53',
    value: 'FEATURE53',
    image: '/admin/previews/feature/feature53.jpeg',
    description:
      'Two-column table tightens into four columns on wider screens with one-pixel dividers, mono index labels paired with titles, and centered wordmarks per cell.',
    longDescription:
      'This block built with shadcn/ui lays out a matrix of technology or partner marks inside a border grid where adjacent cells share hairline separators. Each cell reserves space for a monospace index plus a short title anchored toward the upper corner while the logo artwork centers vertically in the remaining area. The effect resembles a specimen sheet or stack diagram rather than a loose logo cloud. Graphic weight comes entirely from the wordmarks; backgrounds stay plain with subtle border contrast so the grid reads crisply. Minimum heights expand on large screens so tall logos breathe, while smaller breakpoints compress vertical slack. Alignment stays centered for marks and top-left for numbering, giving a mild editorial tension. Motion is absent in the template. The presentation feels technical and catalog-like, with the numbered labels as the clearest differentiator from a standard logo strip. Complexity is moderate because you must curate several SVG or PNG marks with consistent visual balance. It is distinctive among marketing grids thanks to the spreadsheet-style dividers and dual captioning.',
  },
  {
    label: 'FEATURE57',
    value: 'FEATURE57',
    image: '/admin/previews/feature/feature57.jpg',
    description:
      'A marketing feature block with outline badge, headline, and intro copy, then a selectable feature list beside a bordered carousel with dot indicators and a bottom gradient overlay on slides.',
    longDescription:
      'Feature57 is a split layout built with shadcn/ui badge and carousel pieces. Centered intro at the top carries an outline badge, a large title, and a short muted description. Below, a narrow column holds clickable feature rows with outline icons in small rounded squares, titles, and clipped descriptions. The wider column shows a looping carousel in a rounded, bordered frame with portrait-leaning aspect, a gradient scrim at the bottom with repeated icon and text, and pill-shaped dot controls under the frame. Selected rows pick up accent background and a thin border while idle rows stay transparent until hover. The carousel area uses border, light shadow, and a bottom fade so the slide reads like a product still. Transitions are smooth on selection and slide change, giving a polished product-tour feeling. This block is relatively elaborate because list and carousel stay in sync through client state. It feels current and interactive without heavy illustration. Uniqueness comes from coupling a vertical selector to a large visual rather than using tabs or static pairs.',
  },
  {
    label: 'FEATURE70',
    value: 'FEATURE70',
    image: '/admin/previews/feature/feature70.jpeg',
    description:
      'Same selectable rows and carousel pairing as sibling blocks, ordered so imagery leads horizontally on wider layouts while list selection continues to steer which slide displays.',
    longDescription:
      'Feature70 repeats the carousel-and-accordion interplay built with shadcn/ui carousel components, only it leads with the imagery column before the explanatory stack that lists feature titles triggering expanded descriptions and supplementary links. The architecture still pairs carousel scroll position with whichever row is focused so images and narratives stay tethered automatically. Muted neutral backgrounds, oversized rounded carousel housing, headline plus wide intro body, accordion rows with tinted active bands, rotating chevrons, and circular cue buttons mimic premium marketing walkthrough pacing. Typography balances bold headings against medium-weight triggers and subdued supporting copy. Highly interactive sibling to other carousel-heavy blocks; differentiate primarily by directional emphasis for design systems that require left-heavy photography.',
  },
  {
    label: 'FEATURE72',
    value: 'FEATURE72',
    image: '/admin/previews/feature/feature72.jpeg',
    description:
      'Narrow-width heading band with optional copy and link-style primary action sits above up to four bordered cards in a responsive grid; each card links an image topper to a title stack and muted body text below.',
    longDescription:
      'Feature72 showcases Shadcn UI link buttons and bordered cards sourced from configurable content props. Intro copy sits within a restrained width atop the repeating media blocks so the section establishes context before scans hit each card pairing linked photography with emphasized titles and subdued blurbs beneath each image preview. Flat white surrounds with razor-thin outlines encase each stacked story; photography hovers by gently dropping opacity revealing interactivity cues without dramatic motion. Type scale grows modestly as viewport widens ensuring cards stay legible inside generous internal padding beneath each visual. Approachable pattern for repeatable feature storytelling with limited interaction overhead. Complexity trends moderate because each card demands distinct art, title, description, and destination but the chrome stays minimal. It reads modern marketing rather than dense documentation.',
  },
  {
    label: 'FEATURE91',
    value: 'FEATURE91',
    image: '/admin/previews/feature/feature91.jpeg',
    description:
      'Two-column feature block, contrasting "Team Leads" and "Developers" with icons, links, and bordered list items.',
    longDescription:
      'Feature91 is a versatile shadcn component designed to aid both team leads and developers in enhancing their product functionalities. By providing a user-friendly interface for integrating seamless workflows and accessing vital resources, it helps in driving project efficiency and growth. The component divides its focus between two distinct user roles, offering tailored content for both team leads and developers to meet their specific needs and objectives. For team leads, Feature91 emphasizes creating seamless integrations with a focus on enhancing product growth effortlessly. The component offers tools and API access for easy setup, enabling focus on core business objectives. Meanwhile, developers are provided with infrastructure and API resources to mitigate the complexities of building from scratch, allowing them to utilize flexible customization options to streamline their workflow.',
  },
  {
    label: 'FEATURE97',
    value: 'FEATURE97',
    image: '/admin/previews/feature/feature97.jpeg',
    description:
      'A component showcasing platform highlights in a two-column grid with icons, titles, and texts for each feature. Includes a title, description, and buttons above the grid.',
    longDescription:
      'Feature97 is a dynamic section designed to showcase the key aspects of a platform, providing users with a comprehensive overview of its highlights. This shadcn component utilizes an engaging layout to communicate essential features and benefits effectively. By combining visually appealing icons with concise descriptions, this component ensures that users can grasp the core offerings of the platform effortlessly. The section is structured to facilitate a detailed understanding of how lifestyle choices intersect with health insights. It integrates call-to-action buttons that invite users to explore more features or schedule consultations, enhancing user engagement. Through a carefully organized grid, Feature97 presents focused areas such as health overviews, personalized insights, and comprehensive analytics.',
  },
  {
    label: 'FEATURE99',
    value: 'FEATURE99',
    image: '/admin/previews/feature/feature99.jpeg',
    description:
      'A component displaying a setup guide with a heading, introductory section, and a 3-column layout for steps, each having a title and description.',
    longDescription:
      'Feature99 serves as a structured onboarding component designed to guide users through a streamlined setup process. The component effectively communicates a step-by-step guide to help users integrate their systems with minimal effort, ensuring quick adoption and seamless functionality within any application it is incorporated into. The component is organized into a series of steps, each clearly laid out with bold typography and a design that emphasizes legibility. Its layout is crafted to accommodate varied content sizes and types, making use of flexible grids and responsive design blocks. This ensures all necessary information is delivered concisely, maintaining a dynamic flow of content that adheres to shadcn ui principles.',
  },
  {
    label: 'FEATURE102',
    value: 'FEATURE102',
    image: '/admin/previews/feature/feature102.jpeg',
    description:
      'Centered launch headline and intro, then three horizontal steps with circled numbers, vertical line connectors, text, and paired rounded images.',
    longDescription:
      'Feature102 is a three-step narrative section built with shadcn/ui spacing and typography patterns. A centered heading and muted paragraph frame the story. Each step pairs a vertical spine with a numbered circular badge, a title, supporting copy, and a rounded bordered image that sits opposite the text on wide layouts via a row flex pattern. Gradient line segments connect the badges to imply continuity down the timeline. Primary-colored vertical guides and neutral badge fills give a slightly technical, operations-oriented tone. Images use distinct placeholders per step to reinforce progression. The aesthetic reads as modern SaaS process marketing with an illustrated walkthrough. Elaboration is moderate: the structure is fixed at three beats, so content authors must map messaging to monitoring, detection, and recovery style themes or replace copy wholesale. The numbered spine is the memorable motif.',
  },
  {
    label: 'FEATURE103',
    value: 'FEATURE103',
    image: '/admin/previews/feature/feature103.jpeg',
    description:
      'Outlined badge and title over a responsive grid of bordered link cards with headings, blurbs, and circular arrow icons that highlight on hover.',
    longDescription:
      'Feature103 is a card grid marketing block built with shadcn/ui Badge and border-rounded anchor cards. An outline badge precedes a sizeable section title. Five links appear in a hybrid grid: two equal cards in the first row, then three columns inside a lower row that stretches full width on medium screens. Each card stacks a title row with a circular bordered arrow icon, then muted descriptive text. Hover shifts the border color toward the primary token. Thin outlines, generous padding, and icon-forward headers give a crisp, product-console tone. Lucide ArrowRight reinforces clickability without loud buttons. The layout is image-free and text-centric, so clarity depends on concise card titles and support blurbs. The style skews modern SaaS utility: structured, scannable, slightly dense.',
  },
  {
    label: 'FEATURE105',
    value: 'FEATURE105',
    image: '/admin/previews/feature/feature105.webp',
    description:
      'Centered intro with outline badge, headline, and supporting copy, plus many icon-labeled tabs on a line-style tab list; each selection shows a bordered aspect-video image.',
    longDescription:
      'Feature105 is a centered feature section built with shadcn/ui. The top stacks an outline badge with a small flag icon and the word Highlights, a balanced headline, and a muted supporting paragraph. Below that, a line-variant tab strip lists up to seven steps (labels such as Aim, Plans, Execution, and Files), each trigger showing a rounded square icon tile and short label. Choosing a tab swaps the panel content to a single full-width image inside an aspect-video frame with rounded corners and a light border. Light theme styling relies on muted fills for inactive icon backgrounds and a primary fill on the active tab icon. The tab row sits in a horizontal scroll container so the full set of triggers stays reachable on narrow viewports. Apart from tab state colors, motion is minimal. This reads as a structured workflow or checklist pattern rather than a dense product tour.',
  },
  {
    label: 'FEATURE114',
    value: 'FEATURE114',
    image: '/admin/previews/feature/feature114.jpeg',
    description:
      'A two-column feature area with overlapping avatars, a headline and CTA, two numeric highlights, and side-by-side vertical carousels that auto-scroll feature cards with Lucide icons.',
    longDescription:
      'Feature114 is a two-column marketing section built with shadcn/ui. On the left, overlapping circular avatars introduce a large heading, supporting paragraph in muted foreground color, a primary button with a trailing arrow icon, and a two-up row of large numeric stats with short labels. On the right, one or two vertical carousels (depending on breakpoint) loop through bordered cards that pair a Lucide icon with a short title and description; the lanes sit in a shallow column grid with tall max height and fade masks at the top and bottom so the motion reads like ticker bands rather than a full-bleed list. The palette stays light and neutral, with hairline borders on carousel cards and quiet muted text for descriptions. Auto-scroll runs continuously, and the carousels are marked non-interactive so the motion does not fight hover targets on the feature bullets.',
  },
  {
    label: 'FEATURE117',
    value: 'FEATURE117',
    image: '/admin/previews/feature/feature117.jpeg',
    description:
      'A centered heading and line of supporting copy sit above three wide image columns that use gradient scrims, Lucide-forward chips, and chevron links sourced from shared feature card content.',
    longDescription:
      'Feature117 is a three-column image feature row built with Shadcn UI avatars on select overlays and Lucide accents. The section begins with a centered display heading and optional muted description. Each column is a link wrapping a photo, with a translucent bottom gradient, a small decorative chip area that can show a filled pill, avatar chip, or zap label, and lower-stack title text plus a chevron-linked prompt. Layout uses extra-large breakpoints to align three even columns with consistent aspect-ratio imagery. Styling leans on photography contrast with animated gradient reveals on hover, pill badges using primary fills, and white or near-white text on the overlays. Avatar chips add a frosted treatment with backdrop blur for separation from the photo. This pattern is a focused, photography-forward trio often used to funnel visitors into categories or collections.',
  },
  {
    label: 'FEATURE126',
    value: 'FEATURE126',
    image: '/admin/previews/feature/feature126.jpeg',
    description:
      'A marketing section using accordion rows for titles and copy while a paired image updates to match the expanded item.',
    longDescription:
      'Feature126 is an interactive feature block built with Shadcn UI accordion patterns: collapsible rows with titles and paragraphs on one side and a prominent image region on the other. Expanding a row reveals fuller copy while the image area reflects the active topic so text and visual stay aligned. Neutral surfaces with active-state emphasis on the open row through stronger labels or borders. Imagery sits large beside the list as photographic or illustrative placeholders. Motion comes from expanding and collapsing rows rather than from ornamental animation layered everywhere. The accordion-plus-image pairing reads deliberate rather than decorative because interaction gates longer copy before it surfaces. Compared with a static grid it skews toward product-demo pacing. Complexity sits in the moderate range because copy, imagery, and expanded state need to stay coherent per panel.',
  },
  {
    label: 'FEATURE159',
    value: 'FEATURE159',
    image: '/admin/previews/feature/feature159.webp',
    description:
      'Compact four-column row of icons with titles and short descriptions, finishing with inline text inviting visitors to browse the full integration catalog.',
    longDescription:
      "Feature159 is an integrations snapshot row built with straightforward markup, aligning four terse feature cells beneath a concise section header. Each cell repeats the same scaffold: symbolic iconography, bold label, two-line explanation, evenly split width across four columns before the trailing 'see more' emphasis. Muted icon treatments and restrained body sizing keep density high without feeling cramped, which suits product pages that already carry heavier hero content above. The pattern is deliberate and symmetrical, closer to enterprise marketing clarity than expressive editorial layout. Complexity is modest: you trade animation for quick scanning across four bullets rendered as prose. Because the closing item doubles as gateway copy, tighten language so link text reads as deliberate rather than cramped. Narrow screens collapse the row into stacks.",
  },
  {
    label: 'FEATURE250',
    value: 'FEATURE250',
    image: '/admin/previews/feature/feature250.webp',
    description:
      'A feature section with a heading, body copy, and an illustration of CPU nodes linked by animated beams that stacks or widens with the viewport.',
    longDescription:
      'Feature250 is a feature section built with shadcn/ui that pairs a text stack with a large illustrative scene of CPU-like nodes and connecting paths. The layout places the copy and the graphic in a flexible arrangement so the illustration stays readable while the beams imply data moving between nodes. Muted panel-style background behind the graphic with crisp icon shapes and thin accent lines for the beams. Motion is the main decoration: beams redraw or pulse between endpoints while the headline and body stay static. Spacing is generous around the illustration so the animation does not crowd the text. This reads as a tech or platform story block: network, sync, or distributed work without needing a photo. It is more elaborate than a static icon row because the animated beams are the centerpiece.',
  },
] as const satisfies readonly FeatureMetadataItem[]

export type FeatureDesignVersion = (typeof allFeatureDesignVersions)[number]['value']
