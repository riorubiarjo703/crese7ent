import type { GlobalAfterChangeHook } from 'payload'
import { safeRevalidateTag } from '@/utilities/safeRevalidate'

export const revalidatePageConfig: GlobalAfterChangeHook = async ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating globalpage config`)
  safeRevalidateTag('global_page-config', 'max')
}
