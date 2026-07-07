import React from 'react'

import type { ReviewsMarqueeBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ReviewsMarqueeClient } from './Component.client'

export function ReviewsMarqueeBlockComponent(
  props: ReviewsMarqueeBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'reviewsMarquee') return null
  return <ReviewsMarqueeClient {...props} />
}

export default ReviewsMarqueeBlockComponent
