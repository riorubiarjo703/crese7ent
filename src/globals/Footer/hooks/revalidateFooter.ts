import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '@/utilities/safeRevalidate'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating footer`)

  safeRevalidateTag('global_footer', 'max')

  return doc
}
