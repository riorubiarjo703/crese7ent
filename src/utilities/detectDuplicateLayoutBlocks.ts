interface LayoutBlock {
  blockType?: string | null
}

export interface DuplicateLayoutBlock {
  blockType: string
  count: number
}

/** Returns block types that appear more than once in a page layout. */
export function detectDuplicateLayoutBlocks(
  layout: LayoutBlock[] | null | undefined,
): DuplicateLayoutBlock[] {
  if (!layout?.length) return []

  const counts = new Map<string, number>()

  for (const block of layout) {
    if (!block.blockType) continue
    counts.set(block.blockType, (counts.get(block.blockType) ?? 0) + 1)
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([blockType, count]) => ({ blockType, count }))
    .sort((a, b) => a.blockType.localeCompare(b.blockType))
}
