import { test, expect } from '@playwright/test'

/**
 * Orisa theme smoke tests.
 *
 * When CI runs, global-setup seeds Orisa Creative + Marketing bundles.
 * Locally, tests skip if Orisa content is not present.
 */
async function isOrisaHome(page: import('@playwright/test').Page): Promise<boolean> {
  const bodyText = (await page.locator('body').textContent()) ?? ''
  return /Creative Agency|Orisa Studio|scroll-pinned services/i.test(bodyText)
}

test.describe('Orisa — Creative Agency (home)', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(response?.ok(), `GET / returned ${response?.status()}`).toBe(true)
  })

  test('renders hero and services section when Orisa is seeded', async ({ page }) => {
    if (!(await isOrisaHome(page))) {
      test.skip()
      return
    }

    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 })
    await expect(page.locator('#services')).toBeVisible({ timeout: 15_000 })
  })

  test('footer landmark is present', async ({ page }) => {
    await expect(page.locator('footer').first()).toBeVisible({ timeout: 15_000 })
  })
})

test.describe('Orisa — Marketing Agency', () => {
  test('marketing page renders hero and services when seeded', async ({ page }) => {
    const response = await page.goto('/orisa-marketing', { waitUntil: 'domcontentloaded' })

    if (response?.status() === 404) {
      test.skip()
      return
    }

    expect(response?.ok(), `GET /orisa-marketing returned ${response?.status()}`).toBe(true)

    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 })
    await expect(page.locator('#services')).toBeVisible({ timeout: 15_000 })
  })
})

test.describe('Orisa — About page', () => {
  test('about page renders intro when seeded', async ({ page }) => {
    const response = await page.goto('/about', { waitUntil: 'domcontentloaded' })

    if (response?.status() === 404) {
      test.skip()
      return
    }

    expect(response?.ok(), `GET /about returned ${response?.status()}`).toBe(true)

    const bodyText = (await page.locator('body').textContent()) ?? ''
    if (!/creative digital agency|Behind the Visionaries/i.test(bodyText)) {
      test.skip()
      return
    }

    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15_000 })
  })
})

test.describe('Orisa — Contact page', () => {
  test('contact page renders hero and form when seeded', async ({ page }) => {
    const response = await page.goto('/contact', { waitUntil: 'domcontentloaded' })

    if (response?.status() === 404) {
      test.skip()
      return
    }

    expect(response?.ok(), `GET /contact returned ${response?.status()}`).toBe(true)

    const bodyText = (await page.locator('body').textContent()) ?? ''
    if (!/Get in touch|hello@orisa.com/i.test(bodyText)) {
      test.skip()
      return
    }

    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 })
    await expect(page.locator('form').first()).toBeVisible({ timeout: 15_000 })
  })
})
