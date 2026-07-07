import { cn } from 'src/utilities/cn'
import React from 'react'
import type { SplitViewBlock as SplitViewBlockProps } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'
import { PublicContextProps } from '@/utilities/publicContextProps'

type Props = {
  columns: SplitViewBlockProps['columns']
  publicContext: PublicContextProps
}

const colsSpanClasses = {
  half: 'lg:col-span-6',
  oneThird: 'lg:col-span-4',
  twoThirds: 'lg:col-span-8',
}

/**
 * Enable columns for a split view with subcomponent blocks
 */
export async function SplitViewBlock(props: Props) {
  const { columns, publicContext } = props

  if (!columns?.length) return null

  const renderedColumns = await Promise.all(
    columns.map(async (column, index) => {
      const size = (column as { size?: keyof typeof colsSpanClasses })?.size || 'half'

      return (
        <div
          key={index}
          className={cn('col-span-12', colsSpanClasses[size], 'flex items-center')}
        >
          {await RenderBlocks({
            blocks: [column],
            publicContext,
            disableContainer: true,
          })}
        </div>
      )
    }),
  )

  return (
    <section className="w-full overflow-x-hidden py-16">
      <div className="container">
        <div className="grid grid-cols-12 gap-4 md:gap-8">{renderedColumns}</div>
      </div>
    </section>
  )
}
