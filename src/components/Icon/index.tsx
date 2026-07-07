import React from 'react'
import type { LucideProps } from 'lucide-react'

export type IconType = string
const RESOLVED_ICON_PREFIX = '__PAYBLOCKS_RESOLVED_ICON__'

type IconProps = {
  icon?: string | null
} & LucideProps

type IconNode = Array<[string, Record<string, string | number | boolean | undefined>]>

function parseResolvedIcon(icon: string): { name: string; node: IconNode } | null {
  if (!icon.startsWith(RESOLVED_ICON_PREFIX)) {
    return null
  }

  try {
    const json = icon.slice(RESOLVED_ICON_PREFIX.length)
    return JSON.parse(json) as { name: string; node: IconNode }
  } catch {
    return null
  }
}

export const Icon = ({ icon, size = 24, className }: IconProps) => {
  if (!icon) return null
  const resolved = parseResolvedIcon(icon)

  if (!resolved?.node?.length) {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['lucide', `lucide-${resolved.name}`, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      style={{
        display: 'inline-block',
        flexShrink: 0,
      }}
    >
      {resolved.node.map(([tagName, attributes], index) => {
        const cleanAttributes = Object.fromEntries(
          Object.entries(attributes).filter(([key, value]) => key !== 'key' && value !== undefined),
        )

        return React.createElement(tagName, {
          ...cleanAttributes,
          key: `${resolved.name}-${index}`,
        })
      })}
    </svg>
  )
}
