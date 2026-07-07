import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '@/utilities/safeRevalidate'

export const revalidateThemeConfig: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating themeConfig`)

  safeRevalidateTag('global_themeConfig', 'max')

  return doc
}
