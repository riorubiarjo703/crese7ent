import React from 'react'

import type { IngredientStripBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { IngredientStripClient } from './Component.client'

export function IngredientStripBlockComponent(
  props: IngredientStripBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'ingredientStrip') return null
  return <IngredientStripClient {...props} />
}

export default IngredientStripBlockComponent
