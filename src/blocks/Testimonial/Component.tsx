import React from 'react'

import { testimonialLoaders } from '@/blocks/Testimonial/loaders'
import type { TestimonialDesignVersion } from '@/blocks/Testimonial/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function TestimonialBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'testimonial') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const TestimonialToRender = await loadLazyComponent(
    testimonialLoaders[designVersion as TestimonialDesignVersion],
  )

  if (!TestimonialToRender) return null

  return <TestimonialToRender {...props} />
}

export default TestimonialBlock
