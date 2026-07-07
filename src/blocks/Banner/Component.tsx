import React from 'react'

import { bannerLoaders } from '@/blocks/Banner/loaders'
import type { BannerDesignVersion } from '@/blocks/Banner/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function BannerBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'banner') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const BannerToRender = await loadLazyComponent(
    bannerLoaders[designVersion as BannerDesignVersion],
  )

  if (!BannerToRender) return null

  return <BannerToRender {...props} />
}

export default BannerBlock
