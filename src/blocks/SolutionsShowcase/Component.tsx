import React from 'react'

import type { SolutionsShowcaseBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { SolutionsShowcaseClient } from './Component.client'

export const SolutionsShowcaseBlockComponent: React.FC<
  SolutionsShowcaseBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'solutionsShowcase') return null

  return <SolutionsShowcaseClient {...props} />
}

export default SolutionsShowcaseBlockComponent
