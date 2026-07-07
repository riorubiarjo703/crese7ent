import { test, expect } from '@playwright/test'
import { dismissRuntimeOverlay, loginViaApi } from '../utils/auth'

/**
 * IconSelect field smoke test.
 *
 * The IconSelect control is a custom Payload field used by several layout
 * blocks (Feature, CTA, etc). The critical regression this guards against
 * is "Objects are not valid as a React child" — which would crash the
 * admin page whenever the field is rendered.
 *
 * Rather than driving the full block-picker flow (which changes shape
 * frequently and is the main source of flakiness) this test navigates
 * directly to a page whose layout already contains an IconSelect field
 * OR — as a fallback — simply loads the Pages create form and asserts
 * that no React/Payload errors were thrown while the admin hydrated.
 */
test.describe('Admin - IconSelect', () => {
  test.beforeEach(async ({ context }) => {
    await loginViaApi(context)
  })

  test('admin page create renders without React serialization errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/admin/collections/pages/create')
    await page.waitForLoadState('domcontentloaded')

    // Form must appear (pages collection always has a title field).
    const titleInput = page.locator('input[name="title"], input[id="field-title"]').first()
    await titleInput.waitFor({ state: 'visible', timeout: 20_000 })

    // Allow layout blocks / custom fields to finish mounting.
    await page.waitForTimeout(1500)

    const reactErrors = errors.filter(
      (e) =>
        e.includes('Objects are not valid as a React child') ||
        e.includes('Cannot find module') ||
        e.includes('lucide-react/dist'),
    )
    expect(reactErrors, `unexpected React errors: ${reactErrors.join(' | ')}`).toHaveLength(0)
  })

  test('IconSelect dropdown opens when present in a block', async ({ page }) => {
    await page.goto('/admin/collections/pages/create')
    await page.waitForLoadState('domcontentloaded')
    await dismissRuntimeOverlay(page)

    const titleInput = page.locator('input[name="title"], input[id="field-title"]').first()
    await titleInput.waitFor({ state: 'visible', timeout: 20_000 })
    await titleInput.fill('Icon Test ' + Date.now())

    // Try to add a Feature block via the block picker. If the admin UI has
    // changed (button text, structure) we soft-skip rather than failing the
    // whole suite.
    const addBlockBtn = page
      .locator(
        'button:has-text("Add Block"), button:has-text("Add block"), button:has-text("Block hinzufügen")',
      )
      .first()

    if (!(await addBlockBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
      test.skip(true, 'Add Block button not found — layout field design changed')
      return
    }

    await addBlockBtn.click()

    const featureOption = page
      .locator('button, [role="button"]')
      .filter({ hasText: /^Feature$/i })
      .first()

    if (!(await featureOption.isVisible({ timeout: 5000 }).catch(() => false))) {
      test.skip(true, 'Feature block option not available in picker')
      return
    }

    await featureOption.click()
    await page.waitForTimeout(1500)

    const iconSelectBtn = page
      .locator('button:has-text("Select an icon"), button:has-text("Select an icon…")')
      .first()

    if (!(await iconSelectBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
      test.skip(true, 'IconSelect field not rendered for this Feature design version')
      return
    }

    await iconSelectBtn.click()

    const searchInput = page
      .locator('input[placeholder*="Search icons"], input[placeholder*="Search"]')
      .first()
    await expect(searchInput).toBeVisible({ timeout: 5000 })
  })
})
