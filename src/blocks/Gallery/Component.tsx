import React from 'react'

import type { Page } from '@/payload-types'

import { galleryLoaders } from '@/blocks/Gallery/loaders'
import { allGalleryDesignVersions } from '@/blocks/Gallery/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

type GalleryDesignVersionValue = (typeof allGalleryDesignVersions)[number]['value']

export async function GalleryBlock(props: Page['layout'][0]) {
  if (props.blockType !== 'gallery') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const GalleryToRender = await loadLazyComponent(
    galleryLoaders[designVersion as GalleryDesignVersionValue],
  )

  if (!GalleryToRender) return null

  return <GalleryToRender {...props} />
}
