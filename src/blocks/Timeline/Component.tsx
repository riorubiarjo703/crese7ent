import React from 'react'

import { timelineLoaders } from '@/blocks/Timeline/loaders'
import type { TimelineDesignVersion } from '@/blocks/Timeline/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function TimelineBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'timeline') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const TimelineToRender = await loadLazyComponent(
    timelineLoaders[designVersion as TimelineDesignVersion],
  )

  if (!TimelineToRender) return null

  return <TimelineToRender {...props} />
}

export default TimelineBlock
