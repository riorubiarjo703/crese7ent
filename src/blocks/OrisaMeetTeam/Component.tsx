import React from 'react'

import type { OrisaMeetTeamBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

import { OrisaMeetTeamClient } from './Component.client'

export function OrisaMeetTeamBlockComponent(
  props: OrisaMeetTeamBlock & { publicContext: PublicContextProps },
) {
  if (props.blockType !== 'orisaMeetTeam') return null

  return <OrisaMeetTeamClient {...props} />
}

export default OrisaMeetTeamBlockComponent
