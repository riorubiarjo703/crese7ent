import React from 'react'

import { ctaLoaders } from '@/blocks/Cta/loaders'
import type { CtaDesignVersion } from '@/blocks/Cta/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function CtaBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'cta') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const CtaToRender = await loadLazyComponent(ctaLoaders[designVersion as CtaDesignVersion])

  if (!CtaToRender) return null

  return <CtaToRender {...props} />
}

export default CtaBlock
