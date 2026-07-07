import React from 'react'

import type { OrisaScrollServicesBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaScrollServicesClient } from './Component.client'

export const OrisaScrollServicesBlockComponent: React.FC<
  OrisaScrollServicesBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'orisaScrollServices') return null

  return <OrisaScrollServicesClient {...props} />
}

export default OrisaScrollServicesBlockComponent
