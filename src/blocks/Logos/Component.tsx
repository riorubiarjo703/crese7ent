import React from 'react'

import { logosLoaders } from '@/blocks/Logos/loaders'
import type { LogosDesignVersion } from '@/blocks/Logos/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function LogosBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'logos') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const LogosToRender = await loadLazyComponent(logosLoaders[designVersion as LogosDesignVersion])

  if (!LogosToRender) return null

  return <LogosToRender {...props} />
}

export default LogosBlock
