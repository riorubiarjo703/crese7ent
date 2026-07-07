import React from 'react'

import type { ValuePillarsBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { ValuePillarsClient } from './Component.client'

export function ValuePillarsBlockComponent(
  props: ValuePillarsBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'valuePillars') return null

  return <ValuePillarsClient {...props} />
}

export default ValuePillarsBlockComponent
