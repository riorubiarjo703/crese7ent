import React from 'react'

import type { ClosingCtaBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ClosingCtaClient } from './Component.client'

export const ClosingCtaBlockComponent: React.FC<
  ClosingCtaBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'closingCta') return null

  return <ClosingCtaClient {...props} />
}

export default ClosingCtaBlockComponent
