import React from 'react'

import type { BundlePickerBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { BundlePickerClient } from './Component.client'

export function BundlePickerBlockComponent(
  props: BundlePickerBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'bundlePicker') return null
  return <BundlePickerClient {...props} />
}

export default BundlePickerBlockComponent
