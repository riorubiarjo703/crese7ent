import React from 'react'

import { aboutLoaders } from '@/blocks/About/loaders'
import type { AboutDesignVersion } from '@/blocks/About/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function AboutBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'about') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const AboutToRender = await loadLazyComponent(aboutLoaders[designVersion as AboutDesignVersion])

  if (!AboutToRender) return null

  return <AboutToRender {...props} />
}

export default AboutBlock
