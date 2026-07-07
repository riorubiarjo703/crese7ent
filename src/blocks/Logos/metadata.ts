type LogosMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allLogosDesignVersions = [
  {
    label: 'LOGOS1',
    value: 'LOGOS1',
    image: '/admin/previews/logos/logos1.webp',
    description:
      'A component displaying a title and a row of partner logos with adjustable gaps, featuring grayscale and partial opacity effects.',
    longDescription:
      "Logos1 is designed to showcase a selection of partner logos in an elegant and organized manner. It serves as a visual testament to the affiliations with prominent companies, providing social proof and reinforcing credibility. The layout is structured to display logos side by side, ensuring they stand out and grab attention. The component presents a scrolling-friendly section with a flexible design that accommodates various company logos. The arrangement allows for easy adaptation to different screen sizes, while maintaining a consistent look and feel. Key elements such as spacing and opacity are used to create a harmonious display, supporting the component's aesthetic appeal. The shadcn UI prioritizes clarity and simplicity, allowing users to quickly identify and explore the brands featured.",
  },
  {
    label: 'LOGOS2',
    value: 'LOGOS2',
    image: '/admin/previews/logos/logos2.webp',
    description:
      'A two-column block featuring certifications with text and a button on one side and a 3x2 grid of logos on the other.',
    longDescription:
      "The Logos2 component presents a visually appealing way to showcase a collection of logos alongside a call-to-action message. The design is structured into two main sections: an informative text block and a grid layout displaying logos. This configuration highlights key certifications or partnerships by displaying logos in a structured grid next to a compelling message and a button for user interaction. The left portion prominently features a headline and a brief description, designed to capture the user's attention and convey the significance of the displayed logos. The right side consists of a uniformly styled grid layout, each cell harboring an image representing a logo. This design not only provides a balanced visual experience but also emphasizes the diversity and credibility of the featured brands. By utilizing grid systems and logical spacing, this shadcn component offers an intuitive way to consolidate and display brand identity elements seamlessly within a webpage.",
  },
  {
    label: 'LOGOS3',
    value: 'LOGOS3',
    image: '/admin/previews/logos/logos3.webp',
    description:
      'A component displaying logos in a carousel with auto-scroll feature. Logos are shown in columns that adjust layout based on screen size.',
    longDescription:
      'The Logos3 component is a visually engaging section designed to showcase logos within a dynamic carousel. It features a scrolling effect that cycles through a collection of brand logos, highlighting associations and partnerships. This component helps to establish credibility and trust by displaying respected brands along with customizable headings. Logos3 takes advantage of an auto-scrolling carousel to display logos, each described by its image, description, and optional custom classes. Users can provide a heading and a list of logos to personalize the displayed content. With a focused design, subtle animations, and customization options, it is an ideal tool for drawing user attention to important brand affiliations in an elegant, unobtrusive manner.',
  },
  {
    label: 'LOGOS4',
    value: 'LOGOS4',
    image: '/admin/previews/logos/logos3.webp',
    description:
      'Full-width infinite logo marquee (Orisa brand strip). No heading — logos scroll continuously.',
    longDescription:
      'Logos4 mirrors the Orisa HTML brand ticker: a full-bleed horizontal marquee with CSS animation, grayscale logos, and edge fade masks. Ideal for partner strips below the hero on creative agency layouts.',
  },
  {
    label: 'LOGOS9',
    value: 'LOGOS9',
    image: '/admin/previews/logos/logos9.webp',
    description:
      'A component showcasing product team endorsements and logos in carousels, with auto-scrolling functionality and dynamic column adjustments.',
    longDescription:
      "The Logos9 component is designed to exhibit a visually appealing carousel that showcases a collection of logos and testimonials. It integrates an auto-scrolling feature to dynamically display each logo, capturing the viewer's attention with a seamless transition effect. This component is structured to highlight notable companies, thereby reinforcing brand trust and connection. Logos9 mainly features two sections within its design layout: a logo carousel and a testimonial carousel. The logo carousel smoothly cycles through various company logos, each positioned with precise spacing to ensure a clean visual flow. The testimonial carousel situates actual customer reviews, adding credibility through authentic endorsements. Each testimonial is presented with an individual's quote alongside their name and company logo, enhancing the personal touch.",
  },
] as const satisfies readonly LogosMetadataItem[]

export type LogosDesignVersion = (typeof allLogosDesignVersions)[number]['value']
