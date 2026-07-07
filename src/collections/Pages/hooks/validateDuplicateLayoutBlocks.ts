import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import { detectDuplicateLayoutBlocks } from '@/utilities/detectDuplicateLayoutBlocks'

export const validateDuplicateLayoutBlocks: CollectionBeforeChangeHook = ({ data }) => {
  if (data?._status !== 'published') return data

  const duplicates = detectDuplicateLayoutBlocks(data?.layout)

  if (duplicates.length === 0) return data

  if (data?.duplicateBlocksAcknowledged) {
    data.duplicateBlocksAcknowledged = false
    return data
  }

  const summary = duplicates.map(({ blockType, count }) => `${blockType} (×${count})`).join(', ')

  throw new APIError(
    `Duplicate page sections detected: ${summary}. Review the sidebar warning to acknowledge and publish anyway, or remove duplicate sections first.`,
    400,
  )
}
