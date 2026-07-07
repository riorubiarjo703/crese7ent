export const STOREFRAME_BUNDLE_SLUGS = ['creative-storeframe', 'marketing-storeframe'] as const

export type StoreframeBundleSlug = (typeof STOREFRAME_BUNDLE_SLUGS)[number]

export const LAYOUT_BUNDLE_PAGE_TYPES = [
  'home',
  'about',
  'services',
  'team',
  'contact',
  'faq',
  'coming-soon',
] as const

export type LayoutBundlePageType = (typeof LAYOUT_BUNDLE_PAGE_TYPES)[number]

export const LAYOUT_BUNDLE_PAGE_TYPE_LABELS: Record<LayoutBundlePageType, string> = {
  home: 'Homepage',
  about: 'About page',
  services: 'Services page',
  team: 'Team page',
  contact: 'Contact page',
  faq: 'FAQ page',
  'coming-soon': 'Coming soon page',
}
