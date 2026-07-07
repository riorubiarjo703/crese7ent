import { locales } from '@/localization.config'

export function isHomePath(pathname: string): boolean {
  if (pathname === '/') return true

  const segments = pathname.split('/').filter(Boolean)
  return segments.length === 1 && locales.includes(segments[0] as (typeof locales)[number])
}
