import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Dev-only route that idempotently seeds an admin + regular user for the
 * Playwright e2e suite.
 *
 * Why this exists:
 *   Payload's built-in `/api/users/first-register` only works when the
 *   users collection is empty. On developer machines the dev database
 *   usually already contains other users, so `first-register` returns 403
 *   and there is no out-of-the-box way to bootstrap a deterministic test
 *   admin with a known password. This route does so via the Local API.
 *
 * Safety:
 *   1. Refuses to run when `NODE_ENV === 'production'`.
 *   2. Requires a `Bearer <ADMIN_CLI_SECRET>` Authorization header, where
 *      `ADMIN_CLI_SECRET` must be set in the environment.
 *   3. Only touches the `users` collection and (if present) the `roles`
 *      collection.
 */

type SeedUser = { email: string; password: string; name?: string }

type Body = {
  admin?: SeedUser
  user?: SeedUser
}

function isSeedUser(value: unknown): value is SeedUser {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return typeof v.email === 'string' && typeof v.password === 'string'
}

export async function POST(req: Request): Promise<Response> {
  // Defense-in-depth: never expose this endpoint in a real production deploy.
  // next start forces NODE_ENV=production, so we also require an explicit
  // E2E_TEST opt-in for CI and other non-dev test runs.
  if (process.env.NODE_ENV === 'production' && process.env.E2E_TEST !== 'true') {
    return Response.json({ error: 'disabled in production' }, { status: 403 })
  }

  const secret = process.env.ADMIN_CLI_SECRET
  if (!secret) {
    return Response.json(
      { error: 'ADMIN_CLI_SECRET is not configured on the server' },
      { status: 500 },
    )
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  if (!isSeedUser(body.admin)) {
    return Response.json({ error: 'body.admin must include { email, password }' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  /**
   * The `roles` collection is project-specific and not part of Payload's
   * built-in types. Query through `payload.db` guardedly so this route
   * keeps working in projects that do not have a `roles` collection.
   */
  async function findRoleIdBySlug(slug: string): Promise<string | null> {
    const collections = payload.config.collections.map((c) => c.slug)
    if (!collections.includes('roles')) return null
    try {
      const res = await payload.find({
        // `roles` is a project-specific collection not represented in the
        // generated Payload types; cast so the Local API call type-checks.
        collection: 'roles' as Parameters<typeof payload.find>[0]['collection'],
        where: { slug: { equals: slug } },
        limit: 1,
        overrideAccess: true,
        depth: 0,
      })
      const doc = (res.docs as Array<{ id?: string }>)[0]
      return doc?.id ?? null
    } catch (err) {
      payload.logger.warn(`e2e-setup: could not look up role "${slug}": ${String(err)}`)
      return null
    }
  }

  const adminRoleId = await findRoleIdBySlug('admin')
  const editorRoleId = await findRoleIdBySlug('editor')

  const results: Record<string, { id: string; email: string; action: 'created' | 'updated' }> = {}

  const targets = [
    { label: 'admin', info: body.admin, roleId: adminRoleId ?? editorRoleId },
    ...(isSeedUser(body.user)
      ? [{ label: 'user', info: body.user, roleId: editorRoleId ?? adminRoleId }]
      : []),
  ]

  for (const { label, info, roleId } of targets) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: info.email } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })

    const baseData: Record<string, unknown> = {
      password: info.password,
      ...(info.name ? { name: info.name } : {}),
      ...(roleId ? { roles: [roleId] } : {}),
    }

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      await payload.update({
        collection: 'users',
        id: doc.id,
        data: baseData,
        overrideAccess: true,
      })
      results[label] = { id: String(doc.id), email: info.email, action: 'updated' }
    } else {
      const created = await payload.create({
        collection: 'users',
        data: { email: info.email, ...baseData },
        overrideAccess: true,
      })
      results[label] = { id: String(created.id), email: info.email, action: 'created' }
    }
  }

  // Seed a minimal homepage so GET / returns 200 rather than 404.
  // The frontend page router resolves the page with slug 'home' as the
  // root route. Upsert idempotently.
  try {
    const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    if (existingHome.docs.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          _status: 'published',
          // Pages collection requires a non-empty layout. Use a minimal
          // TextBlock (no required fields) so validation passes.
          layout: [{ blockType: 'text' }],
          // nested-docs breadcrumbs are normally populated by the plugin's
          // afterChange hook. queryPageBySlug checks that each breadcrumb
          // url's last path segment matches the slug array. For the root
          // home page cleanSlugs=['home'], so we explicitly seed one
          // breadcrumb whose url ends in 'home' in case the hook is
          // bypassed by the seed path.
          breadcrumbs: [{ url: '/home', label: 'Home' }],
        } as any,
        overrideAccess: true,
        draft: false,
      })
    }
  } catch (err) {
    // Log AND surface in the response so CI seed failures are not silent.
    payload.logger.error(`e2e-setup: could not seed homepage: ${String(err)}`)
    return Response.json({ ok: false, results, homepageError: String(err) }, { status: 500 })
  }

  return Response.json({ ok: true, results })
}
