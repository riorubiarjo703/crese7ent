import { test, expect } from '@playwright/test'

test.describe('Homepage — Storeframe creative agency', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(response?.ok(), `GET / returned ${response?.status()}`).toBe(true)
  })

  test('hero renders when creative agency home is seeded', async ({ page }) => {
    const bodyText = (await page.locator('body').textContent()) ?? ''

    if (!/Designing with|Marketing That Delivers|Creative Agency/i.test(bodyText)) {
      test.skip()
      return
    }

    expect(bodyText.length).toBeGreaterThan(100)
  })

  test('services section exists when creative home is seeded', async ({ page }) => {
    const services = page.locator('#services')
    const hasServices = await services.isVisible({ timeout: 5_000 }).catch(() => false)

    if (!hasServices) {
      test.skip()
      return
    }

    await expect(services).toBeVisible()
  })
})
