import React from 'react'

import type { ExpansionMapBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ExpansionMapClient } from './Component.client'

export const ExpansionMapBlockComponent: React.FC<
  ExpansionMapBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'expansionMap') return null

  return <ExpansionMapClient {...props} />
}

export default ExpansionMapBlockComponent
