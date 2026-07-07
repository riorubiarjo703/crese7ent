const iconSvgCache = new Map<string, string | null>()
const ICON_FIELD_NAMES = new Set(['icon', 'iconBefore', 'iconAfter'])
const RESOLVED_ICON_PREFIX = '__PAYBLOCKS_RESOLVED_ICON__'

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function isSvgMarkup(value: string): boolean {
  return value.trimStart().startsWith('<svg')
}

async function resolveIconToSvg(iconName: string): Promise<string | null> {
  if (!iconName || isSvgMarkup(iconName)) {
    return iconName || null
  }

  const cached = iconSvgCache.get(iconName)
  if (cached !== undefined) {
    return cached
  }

  try {
    const kebabName = toKebabCase(iconName)
    const mod = await import(`lucide-react/dist/esm/icons/${kebabName}.js`)
    const iconNode = mod.__iconNode as
      | Array<[string, Record<string, string | number | boolean | undefined>]>
      | undefined

    if (!iconNode || iconNode.length === 0) {
      iconSvgCache.set(iconName, null)
      return null
    }

    const payload = `${RESOLVED_ICON_PREFIX}${JSON.stringify({
      name: kebabName,
      node: iconNode,
    })}`
    iconSvgCache.set(iconName, payload)
    return payload
  } catch {
    iconSvgCache.set(iconName, null)
    return null
  }
}

export async function resolveIconsInData<T>(value: T): Promise<T> {
  return resolveIconsInDataInternal(value, [])
}

function isLikelyLucideIconField(key: string): boolean {
  return ICON_FIELD_NAMES.has(key) || key.endsWith('Icon')
}

function shouldSkipIconResolution(path: string[]): boolean {
  return path.includes('socialLinks')
}

async function resolveIconsInDataInternal<T>(value: T, path: string[]): Promise<T> {
  if (value === null || value === undefined) {
    return value
  }

  if (Array.isArray(value)) {
    const resolvedArray = await Promise.all(
      value.map((item, index) => resolveIconsInDataInternal(item, [...path, String(index)])),
    )
    return resolvedArray as T
  }

  if (typeof value !== 'object') {
    return value
  }

  const objectValue = value as Record<string, unknown>
  const entries = await Promise.all(
    Object.entries(objectValue).map(async ([key, entryValue]) => {
      const nextPath = [...path, key]

      if (
        isLikelyLucideIconField(key) &&
        !shouldSkipIconResolution(path) &&
        typeof entryValue === 'string' &&
        /^[A-Z]/.test(entryValue)
      ) {
        const svg = await resolveIconToSvg(entryValue)
        return [key, svg ?? entryValue] as const
      }

      const resolved = await resolveIconsInDataInternal(entryValue, nextPath)
      return [key, resolved] as const
    }),
  )

  return Object.fromEntries(entries) as T
}
