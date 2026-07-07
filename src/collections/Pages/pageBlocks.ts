import type { Block } from 'payload'

import { OrisaFaqBlock } from '@/blocks/OrisaFaq/config'
import { OrisaMeetTeamBlock } from '@/blocks/OrisaMeetTeam/config'
import { OrisaStatsBarBlock } from '@/blocks/OrisaStatsBar/config'
import { OrisaWhyChooseUsBlock } from '@/blocks/OrisaWhyChooseUs/config'
import { OrisaScrollServicesBlock } from '@/blocks/OrisaScrollServices/config'
import { OrisaServicesPinBlock } from '@/blocks/OrisaServicesPin/config'
import { AboutBlock } from '@/blocks/About/config'
import { BannerBlock } from '@/blocks/Banner/config'
import { Blog } from '@/blocks/Blog/config'
import { CasestudiesBlock } from '@/blocks/Casestudies/config'
import { ChangelogBlock } from '@/blocks/Changelog/config'
import { ClosingCtaBlock } from '@/blocks/ClosingCta/config'
import { ContactBlock } from '@/blocks/Contact/config'
import { CredibilityStripBlock } from '@/blocks/CredibilityStrip/config'
import { CtaBlock } from '@/blocks/Cta/config'
import { CustomBlock } from '@/blocks/CustomBlock/config'
import { ExpansionMapBlock } from '@/blocks/ExpansionMap/config'
import { FaqBlock } from '@/blocks/Faq/config'
import { FeatureBlock } from '@/blocks/Feature/config'
import { FormBlock } from '@/blocks/Form/config'
import { Gallery } from '@/blocks/Gallery/config'
import { ImpactHighlightsBlock } from '@/blocks/ImpactHighlights/config'
import { LoginBlock } from '@/blocks/Login/config'
import { LogosBlock } from '@/blocks/Logos/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ProductSpotlightBlock } from '@/blocks/ProductSpotlight/config'
import { IngredientStripBlock } from '@/blocks/IngredientStrip/config'
import { ProductShowcaseBlock } from '@/blocks/ProductShowcase/config'
import { BrandStoryBlock } from '@/blocks/BrandStory/config'
import { BundlePickerBlock } from '@/blocks/BundlePicker/config'
import { ReviewsMarqueeBlock } from '@/blocks/ReviewsMarquee/config'
import { SignupBlock } from '@/blocks/Signup/config'
import { SolutionsShowcaseBlock } from '@/blocks/SolutionsShowcase/config'
import { SplitViewBlock } from '@/blocks/SplitView/config'
import { StatBlock } from '@/blocks/Stat/config'
import { TeamGalleryBlock } from '@/blocks/TeamGallery/config'
import { TestimonialBlock } from '@/blocks/Testimonial/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import { ValuePillarsBlock } from '@/blocks/ValuePillars/config'

/** Block types available in page layout fields and layout bundles. */
export const PageBlocks: Block[] = [
  OrisaScrollServicesBlock,
  OrisaServicesPinBlock,
  OrisaWhyChooseUsBlock,
  OrisaStatsBarBlock,
  OrisaMeetTeamBlock,
  OrisaFaqBlock,
  ProductSpotlightBlock,
  IngredientStripBlock,
  ProductShowcaseBlock,
  BrandStoryBlock,
  BundlePickerBlock,
  ReviewsMarqueeBlock,
  CredibilityStripBlock,
  SolutionsShowcaseBlock,
  ImpactHighlightsBlock,
  ValuePillarsBlock,
  ExpansionMapBlock,
  TeamGalleryBlock,
  ClosingCtaBlock,
  FeatureBlock,
  FormBlock,
  CtaBlock,
  LogosBlock,
  AboutBlock,
  ContactBlock,
  Gallery,
  TestimonialBlock,
  FaqBlock,
  StatBlock,
  SplitViewBlock,
  TextBlock,
  MediaBlock,
  CustomBlock,
  ChangelogBlock,
  Blog,
  BannerBlock,
  CasestudiesBlock,
  TimelineBlock,
  LoginBlock,
  SignupBlock,
]
