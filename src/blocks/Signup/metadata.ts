type SignupMetadataItem = {
  label: string
  value: string
  image: string
  description?: string
  longDescription?: string
}

export const allSignupDesignVersions = [
  {
    label: 'SIGNUP4',
    value: 'SIGNUP4',
    image: '/admin/previews/signup/signup4.webp',
    description:
      "A signup component featuring a logo, headings, email/password inputs, and social media signup options (Google, Facebook, Apple). Includes a 'login' link.",
    longDescription: 'This component provides a reusable UI element for your application.',
  },
] as const satisfies readonly SignupMetadataItem[]

export type SignupDesignVersion = (typeof allSignupDesignVersions)[number]['value']
