import React from 'react'

import { closingCtaLoaders } from '@/blocks/ClosingCta/loaders'
import type { ClosingCtaDesignVersion } from '@/blocks/ClosingCta/config'
import type { ClosingCtaBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function ClosingCtaBlockComponent(
  props: ClosingCtaBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'closingCta') return null

  const designVersion = (props.designVersion ?? 'DEFAULT') as ClosingCtaDesignVersion
  const ClosingCtaToRender = await loadLazyComponent(closingCtaLoaders[designVersion])

  if (!ClosingCtaToRender) return null

  return <ClosingCtaToRender {...props} />
}

export default ClosingCtaBlockComponent
