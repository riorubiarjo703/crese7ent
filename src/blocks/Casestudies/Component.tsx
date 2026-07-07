import React from 'react'

import { casestudiesLoaders } from '@/blocks/Casestudies/loaders'
import type { CasestudiesDesignVersion } from '@/blocks/Casestudies/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function CasestudiesBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'casestudies') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const CasestudiesToRender = await loadLazyComponent(
    casestudiesLoaders[designVersion as CasestudiesDesignVersion],
  )

  if (!CasestudiesToRender) return null

  return <CasestudiesToRender {...props} />
}

export default CasestudiesBlock
