import React from 'react'

import type { OrisaWhyChooseUsBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaWhyChooseUsClient } from './Component.client'

export function OrisaWhyChooseUsBlockComponent(
  props: OrisaWhyChooseUsBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'orisaWhyChooseUs') return null

  return <OrisaWhyChooseUsClient {...props} />
}

export default OrisaWhyChooseUsBlockComponent
