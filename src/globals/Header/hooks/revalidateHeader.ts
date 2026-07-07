import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '@/utilities/safeRevalidate'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating header`)

  safeRevalidateTag('global_header', 'max')

  return doc
}
