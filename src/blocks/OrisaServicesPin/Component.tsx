import React from 'react'

import type { OrisaServicesPinBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaServicesPinClient } from './Component.client'

export const OrisaServicesPinBlockComponent: React.FC<
  OrisaServicesPinBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'orisaServicesPin') return null

  return <OrisaServicesPinClient {...props} />
}

export default OrisaServicesPinBlockComponent
