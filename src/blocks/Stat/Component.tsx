import React from 'react'

import { statLoaders } from '@/blocks/Stat/loaders'
import type { StatDesignVersion } from '@/blocks/Stat/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function StatBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'stat') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const StatToRender = await loadLazyComponent(statLoaders[designVersion as StatDesignVersion])

  if (!StatToRender) return null

  return <StatToRender {...props} />
}

export default StatBlock
