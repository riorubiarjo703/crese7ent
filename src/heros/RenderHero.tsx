import React from 'react'

import type { Page } from '@/payload-types'

import { heroLoaders } from '@/heros/heroLoaders'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function RenderHero(props: Page['hero'] & { publicContext: PublicContextProps }) {
  const { designVersion, publicContext } = props || {}

  if (!designVersion || designVersion === 'none') return null

  const HeroToRender = await loadLazyComponent(heroLoaders[String(designVersion)])

  if (!HeroToRender) return null

  return <HeroToRender {...props} publicContext={publicContext} />
}
