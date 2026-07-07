import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * POST /next/admin/cli
 *
 * Direct admin CLI for Payload Local API operations.
 * Secured by: (1) localhost-only, (2) shared secret from ADMIN_CLI_SECRET env var.
 *
 * ─── Operations ───────────────────────────────────────────────────────
 *
 * FIND (list/query documents):
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"find","collection":"pages","where":{},"limit":5,"depth":1,"locale":"en"}'
 *
 * FIND BY ID:
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"findByID","collection":"pages","id":"abc123"}'
 *
 * CREATE:
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"create","collection":"posts","data":{"title":"Test"}}'
 *
 * UPDATE:
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"update","collection":"posts","id":"abc123","data":{"title":"Updated"},"draft":false,"autosave":false}'
 *
 * DELETE:
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"delete","collection":"posts","id":"abc123"}'
 *
 * COUNT:
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"count","collection":"pages","where":{}}'
 *
 * COLLECTIONS (list all collection slugs):
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"collections"}'
 *
 * SCHEMA (get full collection config/fields):
 *   curl -s -X POST http://localhost:3000/next/admin/cli \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer <secret>" \
 *     -d '{"op":"schema","collection":"pages"}'
 */

type CliBody = {
  op?:
    | 'find'
    | 'findByID'
    | 'create'
    | 'update'
    | 'delete'
    | 'count'
    | 'collections'
    | 'schema'
    | 'findGlobal'
    | 'updateGlobal'
  collection?: string
  id?: string
  data?: Record<string, any>
  where?: Record<string, any>
  limit?: number
  page?: number
  sort?: string
  depth?: number
  draft?: boolean
  autosave?: boolean
  locale?: string
  fallbackLocale?: string | false
}

export async function POST(request: Request) {
  // --- Guard 1: localhost only ---
  const url = new URL(request.url)
  const host = url.hostname
  const isLocal =
    host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '0.0.0.0'
  if (!isLocal) {
    return NextResponse.json({ error: 'Forbidden: localhost only' }, { status: 403 })
  }

  // --- Guard 2: shared secret ---
  const envSecret = process.env.ADMIN_CLI_SECRET
  if (!envSecret) {
    return NextResponse.json(
      { error: 'ADMIN_CLI_SECRET is not set in environment. Add it to .env.local' },
      { status: 500 },
    )
  }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
  if (token !== envSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 403 })
  }

  const body = (await request.json().catch(() => ({}))) as CliBody

  const payload = await getPayload({ config: configPromise })
  const {
    op,
    collection,
    id,
    data,
    where,
    limit,
    page: pageNum,
    sort,
    depth,
    draft,
    autosave,
    locale,
    fallbackLocale,
  } = body

  // Safety limits to prevent OOM/DoS
  const safeLimit = typeof limit === 'number' ? Math.min(limit, 100) : 10
  const safeDepth = typeof depth === 'number' ? Math.min(depth, 3) : 1

  const localeOpts = {
    ...(locale !== undefined && { locale: locale as any }),
    ...(fallbackLocale !== undefined && { fallbackLocale: fallbackLocale as any }),
  }

  try {
    switch (op) {
      case 'collections': {
        const slugs = Object.keys(payload.collections)
        return NextResponse.json({ collections: slugs })
      }

      case 'schema': {
        if (!collection) return NextResponse.json({ error: 'collection required' }, { status: 400 })

        const collectionConfig = (payload.collections as any)[collection]?.config
        if (!collectionConfig)
          return NextResponse.json(
            { error: `collection not found: ${collection}` },
            { status: 404 },
          )

        return NextResponse.json(collectionConfig)
      }

      case 'find': {
        if (!collection) return NextResponse.json({ error: 'collection required' }, { status: 400 })
        const result = await payload.find({
          collection: collection as any,
          where: where || {},
          limit: safeLimit,
          page: pageNum,
          sort: sort as any,
          depth: safeDepth,
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(result)
      }

      case 'findByID': {
        if (!collection || !id)
          return NextResponse.json({ error: 'collection and id required' }, { status: 400 })
        const doc = await payload.findByID({
          collection: collection as any,
          id,
          depth: safeDepth,
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(doc)
      }

      case 'create': {
        if (!collection || !data)
          return NextResponse.json({ error: 'collection and data required' }, { status: 400 })
        const created = await payload.create({
          collection: collection as any,
          data: data as any,
          depth: safeDepth,
          overrideAccess: true,
          draft: (draft ?? false) as any,
          ...localeOpts,
        })
        return NextResponse.json(created)
      }

      case 'update': {
        if (!collection || !id || !data)
          return NextResponse.json({ error: 'collection, id, and data required' }, { status: 400 })
        const updated = await payload.update({
          collection: collection as any,
          id,
          data: data as any,
          depth: safeDepth,
          overrideAccess: true,
          draft: (draft ?? false) as any,
          autosave: autosave ?? false,
          ...localeOpts,
        })
        return NextResponse.json(updated)
      }

      case 'delete': {
        if (!collection || !id)
          return NextResponse.json({ error: 'collection and id required' }, { status: 400 })
        const deleted = await payload.delete({
          collection: collection as any,
          id,
          depth: safeDepth,
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(deleted)
      }

      case 'findGlobal': {
        if (!collection)
          return NextResponse.json({ error: 'collection (global slug) required' }, { status: 400 })
        const global = await payload.findGlobal({
          slug: collection as any,
          depth: safeDepth,
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(global)
      }

      case 'updateGlobal': {
        if (!collection || !data)
          return NextResponse.json(
            { error: 'collection (global slug) and data required' },
            { status: 400 },
          )
        const updatedGlobal = await payload.updateGlobal({
          slug: collection as any,
          data: data as any,
          depth: safeDepth,
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(updatedGlobal)
      }

      case 'count': {
        if (!collection) return NextResponse.json({ error: 'collection required' }, { status: 400 })
        const count = await payload.count({
          collection: collection as any,
          where: where || {},
          overrideAccess: true,
          ...localeOpts,
        })
        return NextResponse.json(count)
      }

      default:
        return NextResponse.json(
          {
            error: `Unknown op: ${op}`,
            validOps: [
              'find',
              'findByID',
              'create',
              'update',
              'delete',
              'count',
              'collections',
              'schema',
              'findGlobal',
              'updateGlobal',
            ],
          },
          { status: 400 },
        )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
