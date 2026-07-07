import React from 'react'

import type { ImpactHighlightsBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ImpactHighlightsClient } from './Component.client'

export function ImpactHighlightsBlockComponent(
  props: ImpactHighlightsBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'impactHighlights') return null

  return <ImpactHighlightsClient {...props} />
}

export default ImpactHighlightsBlockComponent
