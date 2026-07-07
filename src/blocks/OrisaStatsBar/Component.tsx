import React from 'react'

import type { OrisaStatsBarBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaStatsBarClient } from './Component.client'

export function OrisaStatsBarBlockComponent(
  props: OrisaStatsBarBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'orisaStatsBar') return null

  return <OrisaStatsBarClient {...props} />
}

export default OrisaStatsBarBlockComponent
