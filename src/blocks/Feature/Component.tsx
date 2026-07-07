import React from 'react'

import type { Page } from '@/payload-types'

import { featureLoaders } from '@/blocks/Feature/loaders'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function FeatureBlock(props: Page['layout'][0]) {
  if (props.blockType !== 'feature') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const FeatureToRender = await loadLazyComponent(featureLoaders[designVersion])

  if (!FeatureToRender) return null

  return <FeatureToRender {...props} />
}
