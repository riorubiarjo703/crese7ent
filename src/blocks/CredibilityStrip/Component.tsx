import React from 'react'

import type { CredibilityStripBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { CredibilityStripClient } from './Component.client'

export const CredibilityStripBlockComponent: React.FC<
  CredibilityStripBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'credibilityStrip') return null

  return <CredibilityStripClient {...props} />
}

export default CredibilityStripBlockComponent
