import type { Payload } from 'payload'

import { lexicalParagraph, lexicalRoot } from '@/utilities/lexical/minimal'

const FORM_TITLE = 'Orisa Contact'

export async function ensureOrisaContactForm(
  payload: Payload,
): Promise<string | undefined> {
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: FORM_TITLE } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  if (existing.docs[0]?.id) return existing.docs[0].id

  const created = await payload.create({
    collection: 'forms',
    data: {
      title: FORM_TITLE,
      fields: [
        {
          blockType: 'text',
          name: 'name',
          label: 'Your name',
          required: true,
          width: 100,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Your email',
          required: true,
          width: 100,
        },
        {
          blockType: 'telephone',
          name: 'phone',
          label: 'Your phone',
          required: true,
          width: 100,
        },
        {
          blockType: 'textarea',
          name: 'message',
          label: 'Your message',
          required: true,
          width: 100,
        },
      ],
      submitButtonLabel: 'Send message',
      confirmationType: 'message',
      confirmationMessage: lexicalParagraph(
        'Thanks for reaching out. Our team will respond within 1–2 business days.',
      ),
    } as any,
    overrideAccess: true,
  })

  return created.id
}
