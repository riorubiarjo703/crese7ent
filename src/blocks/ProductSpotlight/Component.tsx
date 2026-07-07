import React from 'react'

import type { ProductSpotlightBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ProductSpotlightClient } from './Component.client'

export function ProductSpotlightBlockComponent(
  props: ProductSpotlightBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'productSpotlight') return null
  return <ProductSpotlightClient {...props} />
}

export default ProductSpotlightBlockComponent
