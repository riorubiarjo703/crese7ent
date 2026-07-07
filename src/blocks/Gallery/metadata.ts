type GalleryMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allGalleryDesignVersions = [
  {
    label: 'GALLERY4',
    value: 'GALLERY4',
    image: '/admin/previews/gallery/gallery4.jpeg',
    description:
      'A component showcasing a scrollable gallery with navigation buttons and indicators, featuring images, titles, and descriptions for each item.',
    longDescription:
      "The Gallery4 component presents an engaging carousel interface for showcasing a series of items, such as articles or case studies. This component organizes content into slides, enabling users to navigate through them seamlessly. With visual elements and interactive controls, it delivers an immersive viewing experience, well-suited for highlighting key stories or projects. Gallery4 leverages a carousel system to manage multiple entries, each featuring an image, title, description, and a hyperlink for further reading. Users can navigate through the slides using arrow buttons, with the display automatically adjusting based on viewport size. By integrating the shadcn block concept, it combines intuitive interaction with aesthetic design, ensuring content is both accessible and attractive. The component's layout emphasizes visuals while providing concise contextual information, making it a dynamic asset for digital storytelling.",
  },
  {
    label: 'GALLERY5',
    value: 'GALLERY5',
    image: '/admin/previews/gallery/gallery5.jpeg',
    description:
      'A feature gallery component with a carousel layout, toggles for selecting features, and next/prev buttons. It displays items in two columns, with icons, text, and images.',
    longDescription:
      "The Gallery5 component is a dynamic carousel that serves as an interactive productivity showcase. It allows users to navigate through different productivity tools such as task management, time tracking, and team collaboration using intuitive UI elements. The component highlights each tool's key features with an icon and description, providing users with a brief overview of what each tool offers. Designed with shadcn UI, Gallery5 presents a refined and user-friendly interface that supports both individual and team productivity. The component's layout includes a toggle group for easy access to different items and a carousel system to navigate between detailed descriptions. This structure not only provides a quick summary through icons and titles but also offers a seamless transition to detailed descriptions with image support.",
  },
  {
    label: 'GALLERY6',
    value: 'GALLERY6',
    image: '/admin/previews/gallery/gallery6.jpeg',
    description:
      "A carousel component with a heading, 'Book a demo' link, scrolling buttons, and dynamic content blocks comprising images, titles, and summaries.",
    longDescription:
      "The Gallery6 component is a dynamic and interactive carousel designed to showcase a collection of gallery items, each displaying a title, summary, and an image. This shadcn ui component enhances user experience by integrating navigation controls and a demo booking link, presenting user-friendly content in a visually appealing, organized layout. Gallery6 leverages advanced carousel features from the shadcn ui library. The component manages internal state to enable seamless scrolling functionality through its items. It adapts to screen sizes and supports smooth interactions with modern, minimalistic aesthetics. Users can navigate through carousel items effectively with arrow buttons that update according to the carousel's state. The component further enhances interactivity by featuring hover effects on images and links, encouraging user engagement.",
  },
  {
    label: 'GALLERY7',
    value: 'GALLERY7',
    image: '/admin/previews/gallery/gallery7.webp',
    description:
      'A component that combines a 2-column text intro with a looping AI-themed image carousel. Unique feature: staggered image positions.',
    longDescription:
      "The Gallery7 component is a highly interactive and visually dynamic image carousel designed to engage users through a seamless display of images. Utilizing an automated scrolling feature, it enables a hands-free browsing experience across a collection of vibrant visuals. Not only does it provide a visually-appealing interface, but it also enhances user interaction by integrating elegantly into any interface, making content transition feel fluid and modern. Gallery7 capitalizes on the flexibility of the shadcn ui components to present a constantly moving gallery of images. It effectively employs a grid layout, with text content and navigation on one side, balanced by an image carousel on the other. The component integrates auto-scrolling capabilities, ensuring continual motion that draws the viewer's attention. Designed using shadcn blocks, it makes efficient use of space and responsiveness.",
  },
  {
    label: 'GALLERY25',
    value: 'GALLERY25',
    image: '/admin/previews/gallery/gallery25.webp',
    description:
      'A 4-column animated image gallery, each column with varying image heights and animated transitions on view. (Grid - Number of images should be in multiples of 4)',
    longDescription:
      "The Gallery25 component presents a visually appealing and dynamic image gallery layout, utilizing motion effects to enhance the viewing experience. This component is designed to display images in a grid format, with columns that organize and structure the images for clarity and aesthetic value. As users scroll through, the images gracefully appear with animations that adjust their opacity and scale, capturing the viewer's attention seamlessly. Gallery25 showcases images distributed across four columns, each column arranged with varying image height to add visual interest and depth. With the implementation of motion-based visibility and transition effects, the component ensures that images are presented smoothly as users interact with the gallery. The inclusion of muted background and rounded corners contributes to a polished and cohesive visual design.",
  },
  {
    label: 'GALLERY26',
    value: 'GALLERY26',
    image: '/admin/previews/gallery/gallery26.webp',
    description:
      'A gallery block with animated blur vignettes around images, arranged in a 5-column grid. Features image reveal animations on scroll.',
    longDescription:
      'Gallery26 is an elegant image gallery component structured into a grid layout, showcasing various images within customizable sections. The component is designed to enhance visual engagement through the use of dynamic transitions and stylistic effects, powered by the BlurVignette component. It organizes images into different column spans within the grid, creating a visually appealing display that seamlessly integrates with various design templates. The main highlight of Gallery26 is its use of the BlurVignette component, which applies a subtle yet sophisticated blur overlay to images. This effect is achieved through a combination of customizable CSS properties such as blur intensity, radius, and inset. Each image can be wrapped within a BlurVignette, which allows control over these styling properties to adapt the visual feel for unique gallery presentations. Additionally, animations managed by the motion library are included to bring a smooth, interactive feel.',
  },
] as const satisfies readonly GalleryMetadataItem[]

export type GalleryDesignVersion = (typeof allGalleryDesignVersions)[number]['value']
