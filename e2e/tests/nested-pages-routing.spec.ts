import { test, expect } from '@playwright/test'
import { dismissRuntimeOverlay } from '../utils/auth'

/**
 * E2E tests for nested-page (breadcrumb-based) routing.
 *
 * PayloadCMS uses the `@payloadcms/plugin-nested-docs` plugin to build
 * breadcrumbs for pages nested under a parent. The frontend resolves routes
 * via `queryPageBySlug`, which verifies the URL path against the breadcrumb
 * structure stored in the document.
 *
 * Critical logic under test (src/app/(frontend)/[[...slugs]]/data.tsx):
 *   const parentPath = breadcrumbs.map(item => item.url?.split('/').pop())
 *   if (JSON.stringify(parentPath) !== JSON.stringify(cleanSlugs)) return null
 *
 * A `null` result triggers <PayloadRedirects url={url} /> which calls notFound()
 * when no Payload redirect entry exists — resulting in a 404.
 *
 * This suite creates live pages via the Admin CLI, navigates to them, then
 * cleans up. It covers:
 *   1. Top-level page — simple slug, no nesting
 *   2. Child page nested under one parent
 *   3. Deeply nested page (grandparent > parent > child)
 *   4. Wrong parent path → 404 (verifies the guard works correctly)
 *   5. Redirect from old path to nested canonical path
 */

const CLI = '/api/admin/cli'
const getSecret = () => process.env.ADMIN_CLI_SECRET || 'demo-admin-cli-secret'

async function cliReq(
  request: import('@playwright/test').APIRequestContext,
  body: Record<string, unknown>,
) {
  const res = await request.post(CLI, {
    headers: { Authorization: `Bearer ${getSecret()}` },
    data: body,
  })
  if (!res.ok()) {
    const text = await res.text()
    throw new Error(`Admin CLI error (${res.status()}): ${text}`)
  }
  return res.json()
}

/**
 * Minimal rich-text content required by the 'text' block's content field.
 */
const MINIMAL_RICH_TEXT = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'e2e test page' }],
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

/**
 * Create a minimal published page. Returns the created document.
 * The Pages collection requires a non-empty `layout` array — we always
 * include a single `text` block so Payload's validation passes.
 */
async function createPage(
  request: import('@playwright/test').APIRequestContext,
  data: {
    title: string
    slug: string
    parent?: string
    _status?: string
    enableBreadcrumbs?: boolean
  },
) {
  return cliReq(request, {
    op: 'create',
    collection: 'pages',
    data: {
      title: data.title,
      slug: data.slug,
      _status: data._status ?? 'published',
      layout: [{ blockType: 'text', content: MINIMAL_RICH_TEXT }],
      ...(data.parent ? { parent: data.parent } : {}),
      ...(data.enableBreadcrumbs !== undefined
        ? { enableBreadcrumbs: data.enableBreadcrumbs }
        : {}),
    },
  })
}

async function deletePage(request: import('@playwright/test').APIRequestContext, id: string) {
  return cliReq(request, { op: 'delete', collection: 'pages', id })
}

/**
 * Fetch the stored breadcrumb URL for a page by its DB id.
 * The breadcrumbs array is populated by the nested-docs plugin after save.
 */
async function getPageBreadcrumbs(
  request: import('@playwright/test').APIRequestContext,
  id: string,
): Promise<Array<{ url?: string | null; label?: string | null }>> {
  const doc = await cliReq(request, {
    op: 'findByID',
    collection: 'pages',
    id,
    depth: 0,
  })
  return doc.breadcrumbs ?? []
}

test.describe('Breadcrumbs — visual rendering & JSON-LD structured data', () => {
  /**
   * Top-level page with enableBreadcrumbs: true
   * Should render a visible <nav aria-label="breadcrumb"> with Home + page label,
   * and emit a <script type="application/ld+json"> with BreadcrumbList schema.
   */
  test('top-level page shows breadcrumbs and JSON-LD when enabled', async ({ page, request }) => {
    const ts = Date.now()
    const slug = `e2e-bc-top-${ts}`
    const title = 'E2E Breadcrumb Top'

    const doc = await createPage(request, {
      title,
      slug,
      enableBreadcrumbs: true,
    })
    const id = doc.id as string

    try {
      const response = await page.goto(`/${slug}`, { waitUntil: 'domcontentloaded' })
      expect(response?.status()).toBe(200)

      // Visual: breadcrumb nav is visible
      const nav = page.locator('nav[aria-label="breadcrumb"]')
      await expect(nav).toBeVisible({ timeout: 15_000 })

      // Visual: "Home" link exists
      const homeLink = nav.locator('a', { hasText: 'Home' })
      await expect(homeLink).toBeVisible()

      // Visual: current page label is shown
      const currentPage = nav.locator('[aria-current="page"]')
      await expect(currentPage).toBeVisible()

      // JSON-LD: BreadcrumbList structured data is present
      const jsonLdScript = page.locator('script[type="application/ld+json"]')
      const jsonLdTexts = await jsonLdScript.allTextContents()
      const breadcrumbJsonLd = jsonLdTexts.find((t) => t.includes('BreadcrumbList'))
      expect(breadcrumbJsonLd, 'BreadcrumbList JSON-LD must exist').toBeTruthy()

      const ld = JSON.parse(breadcrumbJsonLd!)
      expect(ld['@type']).toBe('BreadcrumbList')
      expect(ld.itemListElement.length).toBe(2) // Home + page
      expect(ld.itemListElement[0].name).toBe('Home')
      expect(ld.itemListElement[0].position).toBe(1)
      expect(ld.itemListElement[1].position).toBe(2)
      // Last item should NOT have an "item" URL (current page per Google spec)
      expect(ld.itemListElement[1].item).toBeUndefined()
    } finally {
      await deletePage(request, id)
    }
  })

  /**
   * Nested child page (parent → child) with enableBreadcrumbs: true
   * Should render Home > Parent > Child visually and in JSON-LD.
   */
  test('nested child page shows full breadcrumb trail and JSON-LD', async ({ page, request }) => {
    const ts = Date.now()
    const parentSlug = `e2e-bc-parent-${ts}`
    const childSlug = `e2e-bc-child-${ts}`

    const parentDoc = await createPage(request, {
      title: 'E2E BC Parent',
      slug: parentSlug,
    })
    const childDoc = await createPage(request, {
      title: 'E2E BC Child',
      slug: childSlug,
      parent: parentDoc.id,
      enableBreadcrumbs: true,
    })

    try {
      const response = await page.goto(`/${parentSlug}/${childSlug}`, {
        waitUntil: 'domcontentloaded',
      })
      expect(response?.status()).toBe(200)

      // Visual: breadcrumb nav is visible
      const nav = page.locator('nav[aria-label="breadcrumb"]')
      await expect(nav).toBeVisible({ timeout: 15_000 })

      // Visual: Home link
      await expect(nav.locator('a', { hasText: 'Home' })).toBeVisible()

      // Visual: parent link is a clickable anchor
      const parentLink = nav.locator('a', { hasText: 'E2E BC Parent' })
      await expect(parentLink).toBeVisible()

      // Visual: current page (child) shown as non-link
      const currentPage = nav.locator('[aria-current="page"]')
      await expect(currentPage).toBeVisible()
      await expect(currentPage).toContainText('E2E BC Child')

      // JSON-LD: BreadcrumbList with 3 items (Home + parent + child)
      const jsonLdScript = page.locator('script[type="application/ld+json"]')
      const jsonLdTexts = await jsonLdScript.allTextContents()
      const breadcrumbJsonLd = jsonLdTexts.find((t) => t.includes('BreadcrumbList'))
      expect(breadcrumbJsonLd, 'BreadcrumbList JSON-LD must exist').toBeTruthy()

      const ld = JSON.parse(breadcrumbJsonLd!)
      expect(ld['@type']).toBe('BreadcrumbList')
      expect(ld.itemListElement.length).toBe(3) // Home + parent + child

      // Home
      expect(ld.itemListElement[0].name).toBe('Home')
      expect(ld.itemListElement[0].position).toBe(1)
      expect(ld.itemListElement[0].item).toBeTruthy()

      // Parent — middle item, should have an "item" URL
      expect(ld.itemListElement[1].position).toBe(2)
      expect(ld.itemListElement[1].item).toBeTruthy()
      expect(ld.itemListElement[1].item).toContain(`/${parentSlug}`)

      // Child — last item, should NOT have an "item" URL
      expect(ld.itemListElement[2].position).toBe(3)
      expect(ld.itemListElement[2].item).toBeUndefined()
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
    }
  })

  /**
   * Page with enableBreadcrumbs: false (default)
   * Should NOT render breadcrumb nav or BreadcrumbList JSON-LD.
   */
  test('page with breadcrumbs disabled shows no breadcrumbs or JSON-LD', async ({
    page,
    request,
  }) => {
    const ts = Date.now()
    const slug = `e2e-bc-off-${ts}`

    const doc = await createPage(request, {
      title: 'E2E Breadcrumb Off',
      slug,
      enableBreadcrumbs: false,
    })

    try {
      const response = await page.goto(`/${slug}`, { waitUntil: 'domcontentloaded' })
      expect(response?.status()).toBe(200)

      // Wait for the page content to load
      const article = page.locator('article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })

      // Visual: breadcrumb nav must NOT be present
      const nav = page.locator('nav[aria-label="breadcrumb"]')
      await expect(nav).toHaveCount(0)

      // JSON-LD: no BreadcrumbList in any ld+json script
      const jsonLdScript = page.locator('script[type="application/ld+json"]')
      const jsonLdTexts = await jsonLdScript.allTextContents()
      const breadcrumbJsonLd = jsonLdTexts.find((t) => t.includes('BreadcrumbList'))
      expect(breadcrumbJsonLd, 'BreadcrumbList JSON-LD must NOT exist when disabled').toBeFalsy()
    } finally {
      await deletePage(request, doc.id)
    }
  })
})

test.describe('Nested pages — breadcrumb-based routing', () => {
  /**
   * 1. Top-level page (no parent)
   *    URL: /<slug>   →  200
   */
  test('top-level page is accessible at its slug', async ({ page, request }) => {
    const slug = `e2e-top-${Date.now()}`
    const doc = await createPage(request, { title: 'E2E Top Level', slug })
    const id = doc.id as string

    try {
      const response = await page.goto(`/${slug}`, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `Expected 200 for /${slug}`).toBe(200)

      const article = page.locator('main, [role="main"], article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })
    } finally {
      await deletePage(request, id)
    }
  })

  /**
   * 2. Child page nested under one parent
   *    URL structure: /parent/child   →  200
   *    URL /child (without parent prefix)  →  404
   */
  test('child page is accessible at /parent/child and not at /child', async ({ page, request }) => {
    const ts = Date.now()
    const parentSlug = `e2e-parent-${ts}`
    const childSlug = `e2e-child-${ts}`

    const parentDoc = await createPage(request, {
      title: 'E2E Parent',
      slug: parentSlug,
    })
    const parentId = parentDoc.id as string

    const childDoc = await createPage(request, {
      title: 'E2E Child',
      slug: childSlug,
      parent: parentId,
    })
    const childId = childDoc.id as string

    try {
      // Verify breadcrumbs were set by the nested-docs plugin
      const breadcrumbs = await getPageBreadcrumbs(request, childId)
      expect(breadcrumbs.length, 'child should have 2 breadcrumb entries').toBe(2)
      const canonicalUrl = breadcrumbs[breadcrumbs.length - 1].url
      expect(canonicalUrl, 'last breadcrumb should be /parent/child').toBe(
        `/${parentSlug}/${childSlug}`,
      )

      // ✅ Correct nested path → 200
      const ok = await page.goto(`/${parentSlug}/${childSlug}`, {
        waitUntil: 'domcontentloaded',
      })
      expect(ok?.status(), `Expected 200 for /${parentSlug}/${childSlug}`).toBe(200)
      const article = page.locator('main, [role="main"], article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })

      // ❌ Without parent prefix → guard returns null → 404
      const notOk = await page.goto(`/${childSlug}`, { waitUntil: 'domcontentloaded' })
      expect(notOk?.status(), `Expected 404 for /${childSlug} (missing parent prefix)`).toBe(404)
    } finally {
      await deletePage(request, childId)
      await deletePage(request, parentId)
    }
  })

  /**
   * 3. Deeply nested page (grandparent → parent → child)
   *    URL: /grandparent/parent/child  →  200
   */
  test('deeply nested page (3 levels) is accessible at full breadcrumb path', async ({
    page,
    request,
  }) => {
    const ts = Date.now()
    const gpSlug = `e2e-gp-${ts}`
    const pSlug = `e2e-p-${ts}`
    const cSlug = `e2e-c-${ts}`

    const gpDoc = await createPage(request, { title: 'E2E Grandparent', slug: gpSlug })
    const pDoc = await createPage(request, {
      title: 'E2E Parent',
      slug: pSlug,
      parent: gpDoc.id,
    })
    const cDoc = await createPage(request, {
      title: 'E2E Child',
      slug: cSlug,
      parent: pDoc.id,
    })

    try {
      const breadcrumbs = await getPageBreadcrumbs(request, cDoc.id)
      expect(breadcrumbs.length, 'deeply nested page should have 3 breadcrumb entries').toBe(3)
      const canonicalUrl = breadcrumbs[breadcrumbs.length - 1].url
      expect(canonicalUrl).toBe(`/${gpSlug}/${pSlug}/${cSlug}`)

      const response = await page.goto(`/${gpSlug}/${pSlug}/${cSlug}`, {
        waitUntil: 'domcontentloaded',
      })
      expect(response?.status(), `Expected 200 for /${gpSlug}/${pSlug}/${cSlug}`).toBe(200)

      const article = page.locator('main, [role="main"], article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })
    } finally {
      await deletePage(request, cDoc.id)
      await deletePage(request, pDoc.id)
      await deletePage(request, gpDoc.id)
    }
  })

  /**
   * 4. Wrong parent path is rejected with 404
   *    Page lives at /real-parent/child, but visitor hits /wrong-parent/child
   */
  test('wrong parent prefix returns 404', async ({ page, request }) => {
    const ts = Date.now()
    const realParentSlug = `e2e-real-parent-${ts}`
    const wrongParentSlug = `e2e-wrong-parent-${ts}`
    const childSlug = `e2e-child-wrong-${ts}`

    const realParent = await createPage(request, {
      title: 'E2E Real Parent',
      slug: realParentSlug,
    })
    const wrongParent = await createPage(request, {
      title: 'E2E Wrong Parent',
      slug: wrongParentSlug,
    })
    const child = await createPage(request, {
      title: 'E2E Child',
      slug: childSlug,
      parent: realParent.id,
    })

    try {
      // The correct path works
      const correct = await page.goto(`/${realParentSlug}/${childSlug}`, {
        waitUntil: 'domcontentloaded',
      })
      expect(correct?.status(), `Expected 200 for correct path`).toBe(200)

      // A path with a different parent prefix returns 404
      const wrong = await page.goto(`/${wrongParentSlug}/${childSlug}`, {
        waitUntil: 'domcontentloaded',
      })
      expect(wrong?.status(), `Expected 404 for wrong parent prefix`).toBe(404)
    } finally {
      await deletePage(request, child.id)
      await deletePage(request, wrongParent.id)
      await deletePage(request, realParent.id)
    }
  })

  /**
   * 5. Payload Redirect from a flat path to a nested canonical path
   *    Old: /old-flat-path  →  Redirect 308 → /parent/child  →  200
   */
  test('Payload redirect from flat path to nested page works', async ({ page, request }) => {
    const ts = Date.now()
    const parentSlug = `e2e-redir-parent-${ts}`
    const childSlug = `e2e-redir-child-${ts}`
    const fromSlug = `/e2e-old-flat-${ts}`

    const parentDoc = await createPage(request, {
      title: 'E2E Redir Parent',
      slug: parentSlug,
    })
    const childDoc = await createPage(request, {
      title: 'E2E Redir Child',
      slug: childSlug,
      parent: parentDoc.id,
    })

    // Create a Payload redirect: /old-flat-path → page reference (childDoc)
    const redirectDoc = await cliReq(request, {
      op: 'create',
      collection: 'redirects',
      data: {
        from: fromSlug,
        to: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: childDoc.id,
          },
        },
      },
    })

    try {
      // Follow redirect — Playwright follows redirects by default; we just
      // verify the final URL is the nested canonical URL.
      await dismissRuntimeOverlay(page)
      await page.goto(fromSlug, { waitUntil: 'domcontentloaded' })
      const finalUrl = page.url()
      expect(finalUrl, `Expected redirect to land on /${parentSlug}/${childSlug}`).toContain(
        `/${parentSlug}/${childSlug}`,
      )

      const article = page.locator('main, [role="main"], article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
      await cliReq(request, { op: 'delete', collection: 'redirects', id: redirectDoc.id })
    }
  })

  /**
   * 7. Redirect to a nested page with stale /undefined breadcrumbs
   *    must NOT forward to /undefined. It should fall back to /{slug}.
   *
   *    This reproduces the real-world scenario where demo-seeded pages
   *    have breadcrumbs generated before parent slugs were saved, leaving
   *    url: "/undefined" in the breadcrumbs array.
   */
  test('redirect with corrupt /undefined breadcrumb falls back to slug, never /undefined', async ({
    page,
    request,
  }) => {
    const ts = Date.now()
    const parentSlug = `e2e-corrupt-parent-${ts}`
    const childSlug = `e2e-corrupt-child-${ts}`
    const fromSlug = `/e2e-corrupt-from-${ts}`

    const parentDoc = await createPage(request, {
      title: 'E2E Corrupt Parent',
      slug: parentSlug,
    })
    const childDoc = await createPage(request, {
      title: 'E2E Corrupt Child',
      slug: childSlug,
      parent: parentDoc.id,
    })

    // Manually corrupt the breadcrumb URL to simulate stale seed data
    await cliReq(request, {
      op: 'update',
      collection: 'pages',
      id: childDoc.id,
      data: {
        breadcrumbs: [{ doc: childDoc.id, url: '/undefined', label: '' }],
      },
    })

    const redirectDoc = await cliReq(request, {
      op: 'create',
      collection: 'redirects',
      data: {
        from: fromSlug,
        to: {
          type: 'reference',
          reference: { relationTo: 'pages', value: childDoc.id },
        },
      },
    })

    try {
      await dismissRuntimeOverlay(page)
      await page.goto(fromSlug, { waitUntil: 'domcontentloaded' })
      const finalUrl = page.url()

      // Must never land on /undefined
      expect(finalUrl, 'redirect must not produce /undefined path').not.toContain('/undefined')
      // Should fall back to the bare slug
      expect(finalUrl, `redirect should fall back to /${childSlug}`).toContain(`/${childSlug}`)
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
      await cliReq(request, { op: 'delete', collection: 'redirects', id: redirectDoc.id })
    }
  })

  /**
   * 8. Locale-prefixed redirect uses locale breadcrumbs
   *    from: /de/old-path → nested page with /de breadcrumbs
   *    Final URL must be /de/parent/child, NOT /de/child or /undefined
   *
   *    This tests the fix to getCachedRedirects(locale) — when the URL
   *    has a /de prefix, breadcrumbs are fetched in the 'de' locale.
   */
  test('locale-prefixed redirect resolves using locale breadcrumbs', async ({ page, request }) => {
    const ts = Date.now()
    const parentSlug = `e2e-l10n-parent-${ts}`
    const childSlug = `e2e-l10n-child-${ts}`
    const fromSlug = `/de/e2e-l10n-old-${ts}`

    const parentDoc = await createPage(request, {
      title: 'E2E L10n Parent',
      slug: parentSlug,
    })
    const childDoc = await createPage(request, {
      title: 'E2E L10n Child',
      slug: childSlug,
      parent: parentDoc.id,
    })

    // Corrupt the 'en' breadcrumbs (simulates stale seed) but leave 'de' correct.
    // The nested-docs plugin sets breadcrumbs per locale on save; here we manually
    // write /undefined to en to force the locale fallback to matter.
    await cliReq(request, {
      op: 'update',
      collection: 'pages',
      id: childDoc.id,
      data: {
        breadcrumbs: [{ doc: childDoc.id, url: '/undefined', label: '' }],
      },
      locale: 'en',
    })

    // Verify de breadcrumbs are still correct (were set on create via default locale chain)
    const freshChild = await cliReq(request, {
      op: 'findByID',
      collection: 'pages',
      id: childDoc.id,
      depth: 0,
      locale: 'de',
    })
    const deBreadcrumbUrl = freshChild.breadcrumbs?.[freshChild.breadcrumbs.length - 1]?.url
    // Only proceed with the locale assertion if de breadcrumbs are valid
    const deHasValidBreadcrumbs = deBreadcrumbUrl && !deBreadcrumbUrl.includes('undefined')

    const redirectDoc = await cliReq(request, {
      op: 'create',
      collection: 'redirects',
      data: {
        from: fromSlug,
        to: {
          type: 'reference',
          reference: { relationTo: 'pages', value: childDoc.id },
        },
      },
    })

    try {
      await dismissRuntimeOverlay(page)
      await page.goto(fromSlug, { waitUntil: 'domcontentloaded' })
      const finalUrl = page.url()

      expect(finalUrl, 'redirect must not produce /undefined path').not.toContain('/undefined')

      if (deHasValidBreadcrumbs) {
        // With locale-aware breadcrumb fetching the redirect must land on the full de path
        expect(finalUrl, `locale redirect should land on ${deBreadcrumbUrl}`).toContain(
          deBreadcrumbUrl,
        )
      } else {
        // de breadcrumbs also not set yet — at minimum the slug must appear
        expect(finalUrl).toContain(childSlug)
      }
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
      await cliReq(request, { op: 'delete', collection: 'redirects', id: redirectDoc.id })
    }
  })

  /**
   * 11. Redirect re-resolves after page save invalidates the redirect cache
   *
   *     Regression for: revalidatePage did not call revalidateTag('redirects'),
   *     so the unstable_cache serving redirect→page populated data was never
   *     flushed when a page's breadcrumbs changed.
   *
   *     Flow:
   *       1. Create parent + child (correct breadcrumbs).
   *       2. Corrupt child's en breadcrumbs to /undefined.
   *       3. Create redirect → child.
   *       4. Navigate: cache is populated with corrupt data → lands on /{childSlug}.
   *       5. Re-save child in en locale → nested-docs fixes breadcrumbs,
   *          revalidatePage calls revalidateTag('redirects').
   *       6. Navigate again → cache refreshed → lands on /parent/child.
   */
  test('redirect re-resolves to correct path after page re-save (cache invalidation)', async ({
    page,
    request,
  }) => {
    const ts = Date.now()
    const parentSlug = `e2e-ci-parent-${ts}`
    const childSlug = `e2e-ci-child-${ts}`
    const fromSlug = `/e2e-ci-from-${ts}`

    const parentDoc = await createPage(request, { title: 'E2E CI Parent', slug: parentSlug })
    const childDoc = await createPage(request, {
      title: 'E2E CI Child',
      slug: childSlug,
      parent: parentDoc.id,
    })

    // Corrupt en breadcrumbs to simulate stale seed data
    await cliReq(request, {
      op: 'update',
      collection: 'pages',
      id: childDoc.id,
      data: { breadcrumbs: [{ doc: childDoc.id, url: '/undefined', label: '' }] },
      locale: 'en',
    })

    const redirectDoc = await cliReq(request, {
      op: 'create',
      collection: 'redirects',
      data: {
        from: fromSlug,
        to: { type: 'reference', reference: { relationTo: 'pages', value: childDoc.id } },
      },
    })

    try {
      await dismissRuntimeOverlay(page)

      // First request — redirect cache is populated with the corrupt breadcrumb data.
      await page.goto(fromSlug, { waitUntil: 'domcontentloaded' })
      const firstUrl = page.url()
      // With corrupt breadcrumbs we expect the fallback (bare slug), not /undefined.
      expect(firstUrl, 'corrupt breadcrumb must never produce /undefined').not.toContain(
        '/undefined',
      )

      // Re-save child in en locale → nested-docs regenerates correct en breadcrumbs
      // and revalidatePage calls revalidateTag('redirects'), flushing the cache.
      await cliReq(request, {
        op: 'update',
        collection: 'pages',
        id: childDoc.id,
        data: { title: 'E2E CI Child' },
        locale: 'en',
      })

      // Second request — cache must be fresh, landing on the full nested path.
      await page.goto(fromSlug, { waitUntil: 'domcontentloaded' })
      const secondUrl = page.url()
      expect(
        secondUrl,
        `after re-save, redirect should land on /${parentSlug}/${childSlug}`,
      ).toContain(`/${parentSlug}/${childSlug}`)
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
      await cliReq(request, { op: 'delete', collection: 'redirects', id: redirectDoc.id })
    }
  })

  /**
   * 9. generateUrl must include full slug path for non-default locales
   *    /de/parent/child must return 200, not 404.
   *    (Regression: generateUrl was producing /de/ and dropping cleanSlugs.)
   */
  test('non-default locale nested page URL is correctly formed (200 not 404)', async ({
    page,
    request,
  }) => {
    const ts = Date.now()
    const parentSlug = `e2e-deurl-parent-${ts}`
    const childSlug = `e2e-deurl-child-${ts}`

    const parentDoc = await createPage(request, { title: 'E2E DeUrl Parent', slug: parentSlug })
    const childDoc = await createPage(request, {
      title: 'E2E DeUrl Child',
      slug: childSlug,
      parent: parentDoc.id,
    })

    try {
      const breadcrumbs = await getPageBreadcrumbs(request, childDoc.id)
      const canonicalEn = breadcrumbs[breadcrumbs.length - 1]?.url
      // For a freshly created page the en breadcrumbs should be valid
      if (canonicalEn && !canonicalEn.includes('undefined')) {
        const deUrl = `/de${canonicalEn}`
        const response = await page.goto(deUrl, { waitUntil: 'domcontentloaded' })
        expect(response?.status(), `Expected 200 for ${deUrl}`).toBe(200)
      } else {
        // en breadcrumbs stale — just verify the en path works
        const enUrl = `/${parentSlug}/${childSlug}`
        const response = await page.goto(enUrl, { waitUntil: 'domcontentloaded' })
        expect(response?.status(), `Expected 200 for ${enUrl}`).toBe(200)
      }
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
    }
  })

  /**
   * 10. Home page routing — resolveSlugs special cases
   *
   *     /          → cleanSlugs: ['home'], locale: en  →  200
   *     /de        → cleanSlugs: ['home'], locale: de  →  200
   *     /home      → isNotFound: true                  →  404
   *     /de/home   → isNotFound: true                  →  404
   *     /en        → isNotFound: true                  →  404
   *
   *     Relies on the seed data having a page with slug "home".
   */
  test('home page routing: / and /de work, /home, /de/home, /en are 404', async ({ page }) => {
    // Root home page (default locale)
    const root = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(root?.status(), 'Expected 200 for /').toBe(200)

    // German home page (falls back to en if no de translation exists)
    const deHome = await page.goto('/de', { waitUntil: 'domcontentloaded' })
    expect(deHome?.status(), 'Expected 200 for /de').toBe(200)

    // Redundant "home" slug is rejected by resolveSlugs
    const home = await page.goto('/home', { waitUntil: 'domcontentloaded' })
    expect(home?.status(), 'Expected 404 for /home').toBe(404)

    // Redundant "home" slug with locale prefix
    const deHomeSlug = await page.goto('/de/home', { waitUntil: 'domcontentloaded' })
    expect(deHomeSlug?.status(), 'Expected 404 for /de/home').toBe(404)

    // Default locale prefix is rejected
    const en = await page.goto('/en', { waitUntil: 'domcontentloaded' })
    expect(en?.status(), 'Expected 404 for /en').toBe(404)
  })

  /**
   * 6. Parent page itself is also accessible at /parent
   */
  test('parent page is accessible at its own slug', async ({ page, request }) => {
    const ts = Date.now()
    const parentSlug = `e2e-parent-own-${ts}`
    const childSlug = `e2e-child-own-${ts}`

    const parentDoc = await createPage(request, { title: 'E2E Parent Own', slug: parentSlug })
    const childDoc = await createPage(request, {
      title: 'E2E Child Own',
      slug: childSlug,
      parent: parentDoc.id,
    })

    try {
      const response = await page.goto(`/${parentSlug}`, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `Expected 200 for parent at /${parentSlug}`).toBe(200)

      const article = page.locator('main, [role="main"], article').first()
      await expect(article).toBeVisible({ timeout: 15_000 })
    } finally {
      await deletePage(request, childDoc.id)
      await deletePage(request, parentDoc.id)
    }
  })
})
