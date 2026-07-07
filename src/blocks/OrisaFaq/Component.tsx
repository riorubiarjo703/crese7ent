import React from 'react'

import type { OrisaFaqBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaFaqClient } from './Component.client'

export function OrisaFaqBlockComponent(
  props: OrisaFaqBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'orisaFaq') return null

  return <OrisaFaqClient {...props} />
}

export default OrisaFaqBlockComponent
