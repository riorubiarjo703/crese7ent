import React from 'react'

import type { TeamGalleryBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { TeamGalleryClient } from './Component.client'

export const TeamGalleryBlockComponent: React.FC<
  TeamGalleryBlock & { publicContext: PublicContextProps }
> = (props) => {
  if (props.blockType !== 'teamGallery') return null

  return <TeamGalleryClient {...props} />
}

export default TeamGalleryBlockComponent
