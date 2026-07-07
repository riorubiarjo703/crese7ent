import React from 'react'

import type { BrandStoryBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { BrandStoryClient } from './Component.client'

export function BrandStoryBlockComponent(
  props: BrandStoryBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'brandStory') return null
  return <BrandStoryClient {...props} />
}

export default BrandStoryBlockComponent
