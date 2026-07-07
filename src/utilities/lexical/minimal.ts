type LexicalTextNode = {
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  type: 'text'
  version: 1
}

function textNode(text: string): LexicalTextNode {
  return {
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  }
}

export function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          children: [textNode(text)],
        },
      ],
    },
  }
}

export function lexicalHeading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'heading',
          tag,
          format: 'left' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          children: [textNode(text)],
        },
      ],
    },
  }
}

export function lexicalRichText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [textNode(text)],
      })),
    },
  }
}

export function lexicalHeadingNode(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    tag,
    format: 'left' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [textNode(text)],
  }
}

export function lexicalParagraphNode(text: string) {
  return {
    type: 'paragraph',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [textNode(text)],
  }
}

export function lexicalRoot(
  ...children: (
    | ReturnType<typeof lexicalHeadingNode>
    | ReturnType<typeof lexicalParagraphNode>
    | (ReturnType<typeof lexicalHeadingNode> | ReturnType<typeof lexicalParagraphNode>)[]
  )[]
) {
  const nodes =
    children.length === 1 && Array.isArray(children[0])
      ? children[0]
      : (children as (
          | ReturnType<typeof lexicalHeadingNode>
          | ReturnType<typeof lexicalParagraphNode>
        )[])

  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: nodes,
    },
  }
}
