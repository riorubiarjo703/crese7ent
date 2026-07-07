type HeroMetadataItem = {
  value: string
  label?: string
  image?: string
  description?: string
  longDescription?: string
}

export const heroDesignMetadata: readonly HeroMetadataItem[] = [
  { value: 'none' },
  {
    value: '1',
    image: '/admin/previews/hero/hero1.jpeg',
    description:
      'A two-column marketing hero with text first, then a badge, headline, body copy, and paired CTAs aligned start on large screens beside the media column.',
    longDescription:
      'This block is a text-first split hero built with shadcn/ui Badge and Button components. On large breakpoints the copy column sits in the first grid track and the image in the second; on small screens the text stack stays first in the document so the narrative leads, with the graphic below. The block uses theme tokens for borders, muted body copy, and standard outline and default button variants. The content column is centered on mobile and flips to left-aligned from the large breakpoint, with CTAs in a full-width vertical group on narrow viewports and a horizontal row from sm. The primary action uses a trailing arrow icon; the secondary uses the outline variant. The hero graphic uses an aspect-video frame, rounded corners, a full border, and top-weighted cropping so screenshots stay composed predictably.',
  },
  {
    value: '2',
    image: '/admin/previews/hero/hero2.jpeg',
    description:
      'A two-column marketing hero with the media column first, then a badge, headline, body copy, and paired CTAs aligned start on large screens.',
    longDescription:
      'This block is the mirror of the text-first split hero: on large breakpoints the photograph or screenshot occupies the first grid column and the copy block sits beside it. On small screens the image stacks above the text so the visual still leads, then the badge, heading, description, and buttons follow in one column. Everything uses shadcn/ui Badge and Button primitives with theme tokens for borders and typography. The content column stays centered on mobile and switches to left alignment from the large breakpoint upward, with the CTA row using the same full-width stack on narrow widths and a horizontal group from sm. The hero image uses a fixed aspect-video frame, rounded corners, and a full border so the asset reads as a contained panel.',
  },
  {
    value: '3',
    image: '/admin/previews/hero/hero3.jpeg',
    description:
      'A two-column hero using shadcn/ui Avatar and Button rows where overlapped faces, star score, and review total sit beside a tall rounded cover image.',
    longDescription:
      'Hero3 splits the section into a text column and a photography column on large breakpoints, built around shadcn/ui buttons and overlapping Avatar stacks that sit next to a five-star row and numeric review summary. Copy stacks headline, muted paragraph, social proof, then primary and outline actions so scanning flows top to bottom before the eye crosses to the image. On narrow viewports the grid collapses to a single column while typography stays centered until the layout switches to left alignment. The right rail carries one tall rounded rectangle frame suited to product or editorial hero shots with generous max height.',
  },
  {
    value: '4',
    image: '/admin/previews/hero/hero4.jpeg',
    description:
      'A two-column marketing hero with a muted image panel, headline and supporting copy, overlapping reviewer avatars, a five-star rating summary, and paired primary and outline buttons.',
    longDescription:
      'Hero4 is a two-column hero built with shadcn/ui that pairs a tall hero image with a text column on large screens. The image sits inside a muted panel, is right weighted on wide layouts, and uses rounded corners with responsive max heights. The text side carries a large title, supporting paragraph in muted foreground color, a row of overlapping circular avatars next to a five-star display with a numeric score and short review label, and two actions built as primary and outline buttons with a trailing icon on the second control. The block is straightforward marketing hero work with an obvious social-proof strip.',
  },
  {
    value: '5',
    image: '/admin/previews/hero/hero5.jpeg',
    description:
      'A hero pairing headline, supporting line, and large shadcn/ui primary button with leading icon opposite an aspect-video rounded image.',
    longDescription:
      'Hero5 keeps shadcn/ui presentation straightforward: a flex row on large screens places headline, short paragraph, and oversized primary button on one side and a single aspect-video frame on the other. Text stays centered on small breakpoints then pins left once horizontal space opens. The primary action ships with a leading icon slot inside the button so downloads or imports read instantly without a second line of copy. Media uses rounded corners and object-cover behavior typical of marketing screenshots or photographic fills. This is a compact block with few moving parts beyond typography scale and the split responsive alignment.',
  },
  {
    value: '6',
    image: '/admin/previews/hero/hero6.jpeg',
    description:
      'A hero with centered headline, muted paragraph, paired chevron shadcn/ui buttons, five-slot photography grid with outline button on one tile, and repeating logo row.',
    longDescription:
      'Hero6 opens with a centered stack built from shadcn/ui buttons and typography: large semibold headline, muted paragraph, then primary and ghost actions both carrying chevron icons so paired journeys stay visible. Below the text band a thin bordered grid tiles photography across five columns where one wider span carries an overlay outline button anchored to the corner for a secondary narrative cue. A logo runway repeats familiar toolchain marks in uniform heights to imply integrations without adding prose lists. Overall depth comes from the mosaic imagery plus logo strip rather than extra form fields or cards.',
  },
  {
    value: '12',
    image: '/admin/previews/hero/hero12.jpeg',
    description:
      'A centered hero with radial-masked grid backdrop, frosted logo tile, highlighted keyword in the headline, paired CTAs, and square outline buttons carrying saturated tech icons.',
    longDescription:
      'Hero12 centers marketing copy on a radially masked square-grid illustration so the middle stays bright while outer pixels fall away. Above the headline, a compact frosted panel lifts a brand illustration with blur and slight shadow. The title mixes neutral words with one accent-colored keyword, followed by wide muted body copy and two shadcn/ui buttons where the secondary adds an external-link glyph shift on hover. Below, a label introduces a wrap row of square outline buttons that each nest a technology icon desaturated until hover restores color. The layout stays intrinsically centered end-to-end, so narrow phones simply tighten gaps while preserving stacking order.',
  },
  {
    value: '101',
    image: '/admin/previews/hero/hero101.webp',
    description:
      'A centered hero with pastel radial gradient, headline, demo entry that opens a video modal, primary CTA, and a partner logo strip.',
    longDescription:
      'Hero101 is a centered single-column hero built with Shadcn UI and a radial gradient background. The content includes a large headline, supporting paragraph, two CTAs (primary button and a watch-demo link with play icon), and a row of company logos at the bottom. Clicking the demo link opens a modal dialog with an embedded video player. Soft pastel gradient styling and a polished, approachable visual treatment make this more feature-complete than a basic centered hero.',
  },
  {
    value: '112',
    image: '/admin/previews/hero/hero112.jpeg',
    description:
      'A hero with headline, ghost play control that opens a video dialog, circular photo collage with join pill, tilted icon chips, and a three-cell stats footer.',
    longDescription:
      'Hero112 is a course-focused hero built with shadcn/ui inside a medium-width container. The left side stacks a medium-weight headline, muted description, a solid primary button, and a ghost-trigger row with a circular play icon that opens a dialog embedding a widescreen iframe. The right side is a large primary-filled circle framing a hero photo with a floating white join pill showing three avatars and a participation count. Two smaller rounded squares with thick white borders sit on the circle edge and carry icon cues. A rounded bordered panel below splits into three equal columns listing numeric stats with short subtitles.',
  },
  {
    value: '195',
    image: '/admin/previews/hero/hero195.webp',
    description:
      'Headline paragraph optional Buttons TabsList swapping wide dashboard TabsContent accented by animated border beam silhouette plus dashed ornamental frame lines bordering captured UI.',
    longDescription:
      'Hero195 anchors a bordered marketing column mixing Shadcn UI Tabs and Buttons with BorderBeam accenting previews. Heading and paragraph stack optional dual CTAs above a pill tabs list with icons beside tab labels, swapping wide dashboard tab content bordered by softened shadow overlays while animated beams trace edges. Muted analytics photography and subdued tab chrome imply product proof. It is a straightforward SaaS storyline that demands believable dashboards per selectable tab variant.',
  },
  {
    value: '220',
    image: '/admin/previews/hero/hero220.jpeg',
    description:
      'A near fullscreen hero with low opacity landscape backdrop, motion fade on mount, and oversized MagicUI video text spelling the main word in Playfair.',
    longDescription:
      'Hero220 is a shadcn/ui hero that behaves like a title card: the section stretches toward a full small viewport height with upper bounds so tall monitors do not sprawl. A photographic landscape sits as a low-opacity full-bleed backdrop, while the foreground centers a motion wrapper around MagicUI VideoText that maps looping footage into huge Playfair letterforms. The layout is intentionally sparse so the wordmark dominates. The mount animation scales the text container from slightly enlarged to resting size over a short ease.',
  },
  {
    value: '214',
    image: '/admin/previews/hero/hero214.webp',
    description:
      'A hero with left-aligned serif headline, large masked image slideshow, two satellite frames on desktop and paired tiles on mobile, and rounded contact button.',
    longDescription:
      'Hero214 is a shadcn/ui hero with asymmetrical real-estate messaging on the left and a masked photo system on the right. A tall Playfair headline introduces the theme, while the primary visual uses an organic SVG mask that cycles three portraits on a steady timer. Two smaller rounded frames float along the top-right on desktop, each bound to offset indices so the collage feels choreographed; on small widths those previews drop under the hero as paired tiles. A pill button with an arrow icon anchors the lower-left on large screens and follows the collage on small ones.',
  },
  {
    value: '219',
    image: '/admin/previews/hero/hero219.webp',
    description:
      'A centered hero with kicker, static heading plus 3D animated accent words, MagicUI particles, and seven vertical integration marquees capped by soft blurs.',
    longDescription:
      'Hero219 is a Shadcn UI integrations hero: muted kicker, a primary heading line rendered as plain text, then a trailing accent phrase whose words animate in with perspective lift. MagicUI particles flood the full width behind the stack for texture. Below, seven narrow marquee columns run vertically, each repeating rounded integration tiles with gradient borders while gradient caps hide seams at top and bottom. It feels like a high-energy launch announcement with ecosystem proof and relatively high complexity due to motion layers plus synchronized vertical marquees.',
  },
  {
    value: 'FOOD_01',
    label: 'HERO_FOOD_01',
    description:
      'Warm food-brand hero with cream background, product badge, split headline, optional bottle image, and staggered typography.',
    longDescription:
      'HERO_FOOD_01 targets CPG and food e-commerce demos. Editors set an optional badge (e.g. product SKU), multi-line headline, subheadline, CTAs, and an optional hero product image. The layout uses a warm cream canvas with soft red/orange radial washes—no corporate mist or dark finance styling. Framer Motion staggers headline lines on load; the product image floats subtly when motion is allowed.',
  },
  {
    value: 'ORISA_CREATIVE_01',
    label: 'HERO_ORISA_CREATIVE_01',
    image: '/admin/previews/header/navbar6.webp',
    description:
      'Orisa Creative Agency hero with primary background, parallax layer, hero video, split headline, side copy, CTAs, and service tags row.',
    longDescription:
      'HERO_ORISA_CREATIVE_01 recreates the Orisa Creative Agency homepage hero. Editors set a tagline, multi-line headline, optional side text blurb, background texture and parallax images, looping hero video with poster, a video caption link, dual CTAs, and floating service tags. The layout uses Orisa primary color, white typography, and a bottom grid matching the ThemeForest demo structure.',
  },
  {
    value: 'ORISA_PAGE_01',
    label: 'HERO_ORISA_PAGE_01',
    image: '/seed/orisa/contact/pages/img-166.webp',
    description:
      'Orisa inner-page hero with optional full-width banner, tagline, multi-line headline, and intro paragraph.',
    longDescription:
      'HERO_ORISA_PAGE_01 targets About, Contact, and other Orisa inner pages. Editors set an optional banner image, tagline, headline lines, and supporting intro copy. The layout matches Orisa about/contact page headers from the HTML theme — wide banner followed by editorial headline grid.',
  },
  {
    value: 'ORISA_MARKETING_01',
    label: 'HERO_ORISA_MARKETING_01',
    image: '/seed/orisa/marketing/pages/img-1.webp',
    description:
      'Orisa Marketing Agency hero with grid backdrop, embedded testimonial card, split headline with accent word, client stats, and trait labels.',
    longDescription:
      'HERO_ORISA_MARKETING_01 recreates the Orisa Marketing Agency homepage hero from index-3.html. Editors configure tagline, multi-line headline with accent word, intro paragraph, CTAs, testimonial card, feature image with client count, avatar stack, and bottom trait labels.',
  },
  {
    value: 'CORP_01',
    label: 'HERO_CORP_01',
    image: '/admin/previews/hero/hero-corp-01.jpeg',
    description:
      'Full-viewport corporate hero with split headline lines, video or particle background, staggered typography, dual CTAs, and animated scroll cue.',
    longDescription:
      'HERO_CORP_01 is a premium corporate hero for award-style marketing sites. Editors enter one headline line per row for editorial rhythm (e.g. Drive / to / grow), optional subheadline rich text, and up to two CTA links. Background modes include looping video with poster, a cover image, Three.js animated mist over a hero photograph, or MagicUI particles. Framer Motion staggers each headline line on load; a scroll indicator pulses until the visitor scrolls. Built for finance and institutional brands that need cinematic first impressions while remaining fully CMS-driven.',
  },
] as const

export const allHeroDesignVersions = heroDesignMetadata.map((entry) => ({
  ...entry,
  label: entry.value === 'none' ? 'no Hero' : (entry.label ?? `HERO${entry.value}`),
  shadcnblocksItem: entry.value === 'none' ? undefined : `hero${entry.value}`,
}))

export type HeroDesignVersion = (typeof allHeroDesignVersions)[number]
