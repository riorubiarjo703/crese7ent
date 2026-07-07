import type { Page } from '@/payload-types'

import type { LazyComponentLoader } from '@/utilities/loadLazyComponent'

type BlockType = Page['layout'][0]['blockType']

export const blockLoaders: Partial<Record<BlockType, LazyComponentLoader>> = {
  orisaScrollServices: () => import('@/blocks/OrisaScrollServices/Component'),
  orisaServicesPin: () => import('@/blocks/OrisaServicesPin/Component'),
  orisaWhyChooseUs: () => import('@/blocks/OrisaWhyChooseUs/Component'),
  orisaStatsBar: () => import('@/blocks/OrisaStatsBar/Component'),
  orisaMeetTeam: () => import('@/blocks/OrisaMeetTeam/Component'),
  orisaFaq: () => import('@/blocks/OrisaFaq/Component'),
  productSpotlight: () => import('@/blocks/ProductSpotlight/Component'),
  ingredientStrip: () => import('@/blocks/IngredientStrip/Component'),
  productShowcase: () => import('@/blocks/ProductShowcase/Component'),
  brandStory: () => import('@/blocks/BrandStory/Component'),
  bundlePicker: () => import('@/blocks/BundlePicker/Component'),
  reviewsMarquee: () => import('@/blocks/ReviewsMarquee/Component'),
  credibilityStrip: () => import('@/blocks/CredibilityStrip/Component'),
  solutionsShowcase: () => import('@/blocks/SolutionsShowcase/Component'),
  impactHighlights: () => import('@/blocks/ImpactHighlights/Component'),
  valuePillars: () => import('@/blocks/ValuePillars/Component'),
  expansionMap: () => import('@/blocks/ExpansionMap/Component'),
  teamGallery: () => import('@/blocks/TeamGallery/Component'),
  closingCta: () => import('@/blocks/ClosingCta/Component'),
  formBlock: () => import('@/blocks/Form/Component').then((m) => ({ default: m.FormBlock })),
  feature: () => import('@/blocks/Feature/Component').then((m) => ({ default: m.FeatureBlock })),
  gallery: () => import('@/blocks/Gallery/Component').then((m) => ({ default: m.GalleryBlock })),
  cta: () => import('@/blocks/Cta/Component').then((m) => ({ default: m.CtaBlock })),
  logos: () => import('@/blocks/Logos/Component').then((m) => ({ default: m.LogosBlock })),
  about: () => import('@/blocks/About/Component').then((m) => ({ default: m.AboutBlock })),
  testimonial: () =>
    import('@/blocks/Testimonial/Component').then((m) => ({ default: m.TestimonialBlock })),
  faq: () => import('@/blocks/Faq/Component').then((m) => ({ default: m.FaqBlock })),
  stat: () => import('@/blocks/Stat/Component').then((m) => ({ default: m.StatBlock })),
  splitView: () =>
    import('@/blocks/SplitView/Component').then((m) => ({ default: m.SplitViewBlock })),
  text: () => import('@/blocks/TextBlock/Component').then((m) => ({ default: m.TextBlock })),
  mediaBlock: () =>
    import('@/blocks/MediaBlock/Component').then((m) => ({ default: m.MediaBlock })),
  changelog: () =>
    import('@/blocks/Changelog/Component').then((m) => ({ default: m.ChangelogBlock })),
  contact: () => import('@/blocks/Contact/Component'),
  blog: () => import('@/blocks/Blog/Component').then((m) => ({ default: m.BlogBlock })),
  customblock: () => import('@/blocks/CustomBlock'),
  banner: () => import('@/blocks/Banner/Component'),
  casestudies: () =>
    import('@/blocks/Casestudies/Component').then((m) => ({ default: m.CasestudiesBlock })),
  timeline: () => import('@/blocks/Timeline/Component'),
  login: () => import('@/blocks/Login/Component').then((m) => ({ default: m.LoginBlock })),
  signup: () => import('@/blocks/Signup/Component').then((m) => ({ default: m.SignupBlock })),
}
