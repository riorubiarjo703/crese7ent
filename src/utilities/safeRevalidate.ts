import { revalidatePath, revalidateTag } from 'next/cache'

export function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // No-op outside Next.js request context (e.g. payload run seed scripts)
  }
}

export function safeRevalidateTag(tag: string, profile: string = 'max') {
  try {
    revalidateTag(tag, profile)
  } catch {
    // No-op outside Next.js request context (e.g. payload run seed scripts)
  }
}
