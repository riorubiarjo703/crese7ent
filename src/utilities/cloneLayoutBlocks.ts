/** Deep-clone block arrays for bundle import — strips Payload block `id`s so new blocks are created. */
export function cloneLayoutBlocks<T>(blocks: T[] | null | undefined): T[] {
  if (!blocks?.length) return []

  return blocks.map((block) => stripBlockIds(block))
}

function stripBlockIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripBlockIds(item)) as T
  }

  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}

    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'id') continue
      result[key] = stripBlockIds(nested)
    }

    return result as T
  }

  return value
}

/** Deep-clone a hero group for bundle import. */
export function cloneHero<T>(hero: T | null | undefined): T | undefined {
  if (!hero) return undefined
  return stripBlockIds(structuredClone(hero))
}
