import React, { Fragment } from 'react'

import { cn } from '@/utilities/cn'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, fill, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = (htmlElement as any) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: cn(fill && 'relative', className),
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
