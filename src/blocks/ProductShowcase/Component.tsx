import React from 'react'

import type { ProductShowcaseBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ProductShowcaseClient } from './Component.client'

export function ProductShowcaseBlockComponent(
  props: ProductShowcaseBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'productShowcase') return null
  return <ProductShowcaseClient {...props} />
}

export default ProductShowcaseBlockComponent
