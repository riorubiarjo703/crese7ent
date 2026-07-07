type TestimonialMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allTestimonialDesignVersions = [
  {
    label: 'TESTIMONIAL2',
    value: 'TESTIMONIAL2',
    image: '/admin/previews/testimonial/testimonial2.webp',
    description:
      'Orisa “Trusted by Clients” section: black rounded container, testimonial carousel with avatar + logo cards, star ratings, and prev/next controls.',
    longDescription:
      'Matches Orisa index.html sec-6-home-1: full-bleed black rounded card, orange brand mark, white heading with intro copy, circular nav arrows, and a horizontal carousel of testimonial cards with avatar, company logo, 4-line quote, variable star rating, and author meta. Used on the creative agency homepage.',
  },
  {
    label: 'TESTIMONIAL3',
    value: 'TESTIMONIAL3',
    image: '/admin/previews/testimonial/testimonial3.webp',
    description:
      'A testimonial component with a quote, image logo, and author attribution centered in a bordered block with adjustable padding.',
    longDescription: 'This component provides a reusable UI element for your application.',
  },
  {
    label: 'TESTIMONIAL4',
    value: 'TESTIMONIAL4',
    image: '/admin/previews/testimonial/testimonial4.webp',
    description:
      'A testimonial component with 1 large image & text block plus 3 smaller text cards, each featuring an avatar.',
    longDescription: 'This component provides a reusable UI element for your application.',
  },
  {
    label: 'TESTIMONIAL7',
    value: 'TESTIMONIAL7',
    image: '/admin/previews/testimonial/testimonial7.webp',
    description:
      'A component showcasing two auto-scrolling carousels of client testimonials, with avatars, names, roles, and quotes, plus a section header.',
    longDescription: 'This component provides a reusable UI element for your application.',
  },
  {
    label: 'TESTIMONIAL14',
    value: 'TESTIMONIAL14',
    image: '/admin/previews/testimonial/testimonial14.webp',
    description:
      'A carousel component showcasing testimonials, featuring text quotes, avatars, names, roles, and a 5-star rating system. Includes navigation dots for carousel control.',
    longDescription:
      "Testimonial14 is a shadcn component that presents user testimonials in a visually appealing carousel format. It allows users to navigate through different testimonials dynamically, leveraging a carousel structure for smooth transition and engagement. As a user advances through the testimonials, each testimonial card is displayed with a quote, an avatar, and the name of the customer providing the testimonial. The component uses a combination of carousel and avatar elements to create an organized and interactive experience. Each testimonial occupies a carousel item, containing a text quote wrapped in quotation marks, an avatar image for visual representation, and the customer's name. Users can navigate through these testimonials using pagination buttons, which are styled to indicate the current selection by changing colors, enhancing usability and visual feedback. Its implementation employs a useEffect hook to manage state synchronization between the displayed testimonial and the user's selection.",
  },
] as const satisfies readonly TestimonialMetadataItem[]

export type TestimonialDesignVersion = (typeof allTestimonialDesignVersions)[number]['value']
