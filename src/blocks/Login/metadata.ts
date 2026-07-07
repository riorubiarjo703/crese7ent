type LoginMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allLoginDesignVersions = [
  {
    label: 'LOGIN3',
    value: 'LOGIN3',
    image: '/admin/previews/login/login3.webp',
    description:
      'A login block with logo, main heading, subheading, email/password inputs, remember me checkbox, forgot password link, login & google login buttons, and signup prompt.',
    longDescription:
      'Login3 is a shadcn component designed to provide a robust and visually appealing login interface. This component combines essential form elements such as input fields for email and password, a login button, and an option to navigate to a signup page, ensuring a smooth entry point for users accessing applications or services. With its simple layout and customizable properties, the component ensures that developers can seamlessly integrate it into existing projects with personal branding or design adjustments. Login3 emphasizes user access and authentication while offering a sleek, modern design. Its layout is centered with a minimalist aesthetic, featuring a logo at the top, optional headings, and well-spaced form elements to promote readability and user-friendliness. Customizable elements such as the logo, headings, and button text provide a level of personalization, allowing the component to suit a variety of application styles.',
  },
] as const satisfies readonly LoginMetadataItem[]

export type LoginDesignVersion = (typeof allLoginDesignVersions)[number]['value']
