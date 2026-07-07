import React from 'react'

import { faqLoaders } from '@/blocks/Faq/loaders'
import type { FaqDesignVersion } from '@/blocks/Faq/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function FaqBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'faq') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const FaqToRender = await loadLazyComponent(faqLoaders[designVersion as FaqDesignVersion])

  if (!FaqToRender) return null

  return <FaqToRender {...props} />
}

export default FaqBlock
