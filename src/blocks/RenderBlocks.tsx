import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { blockLoaders } from '@/blocks/blockLoaders'
import { getBlockBackgroundClassName } from '@/blocks/getBlockBackgroundClassName'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function RenderBlocks(props: {
  blocks: Page['layout'][0][]
  publicContext: PublicContextProps
  disableContainer?: boolean
}) {
  const { blocks, publicContext, disableContainer } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  const renderedBlocks = await Promise.all(
    blocks.map(async (block, index) => {
      const { blockType } = block

      if (!blockType || !(blockType in blockLoaders)) return null

      const Block = await loadLazyComponent(blockLoaders[blockType])

      if (!Block) return null

      const className =
        'backgroundColor' in block ? getBlockBackgroundClassName(block.backgroundColor) : ''

      return (
        <div key={index} className={className} id={block.id || undefined}>
          <Block {...block} publicContext={publicContext} disableContainer={disableContainer} />
        </div>
      )
    }),
  )

  return <Fragment>{renderedBlocks}</Fragment>
}
