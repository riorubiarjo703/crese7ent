import { test, expect } from '@playwright/test'
import { TEST_ADMIN } from '../utils/constants'
import { ADMIN_URL_REGEX, loginViaApi } from '../utils/auth'

/**
 * Authentication tests
 *
 * These tests exercise both the Payload admin UI login form AND the REST
 * login API, so that both integration paths are covered.
 */
test.describe('Authentication', () => {
  test.describe('Admin UI login', () => {
    test('login page renders the expected form fields', async ({ page }) => {
      await page.goto('/admin/login')

      await expect(page.locator('input[name="email"]').first()).toBeVisible()
      await expect(page.locator('input[name="password"]').first()).toBeVisible()
      await expect(page.locator('button[type="submit"]').first()).toBeVisible()
    })

    test('rejects invalid credentials without navigating away', async ({ page }) => {
      await page.goto('/admin/login')

      // Wait for the form to be hydrated and actually interactive. Fill would
      // otherwise occasionally write into an un-wired input that gets cleared.
      const emailInput = page.locator('input[name="email"]').first()
      const passwordInput = page.locator('input[name="password"]').first()
      await emailInput.waitFor({ state: 'visible' })
      await passwordInput.waitFor({ state: 'visible' })

      await emailInput.fill('wrong@example.com')
      await passwordInput.fill('definitely-wrong-password')

      await page.locator('button[type="submit"]').first().click()

      // Payload shows a toast / error with text matching these keywords.
      const error = page.locator('text=/invalid|incorrect|not found|failed/i').first()
      await expect(error).toBeVisible({ timeout: 10_000 })

      // And we should still be on the login page.
      await expect(page).toHaveURL(/\/admin\/login/)
    })

    test('logs in with valid credentials and lands on the dashboard', async ({ page }) => {
      await page.goto('/admin/login')

      const emailInput = page.locator('input[name="email"]').first()
      const passwordInput = page.locator('input[name="password"]').first()
      await emailInput.waitFor({ state: 'visible' })
      await passwordInput.waitFor({ state: 'visible' })

      await emailInput.fill(TEST_ADMIN.email)
      await passwordInput.fill(TEST_ADMIN.password)
      await page.locator('button[type="submit"]').first().click()

      // The URL must change to something under /admin that is NOT /admin/login.
      // We intentionally do not assert the nav shell here: the /admin dashboard
      // root renders afterDashboard components (BackupDashboard) that crash in
      // CI against a placeholder Vercel Blob token. A successful URL change is
      // sufficient proof that authentication completed.
      await expect(page).toHaveURL(ADMIN_URL_REGEX, { timeout: 20_000 })
    })
  })

  test.describe('REST API login', () => {
    test('returns a JWT for valid credentials', async ({ request }) => {
      const res = await request.post('/api/users/login', {
        data: { email: TEST_ADMIN.email, password: TEST_ADMIN.password },
      })
      expect(res.ok()).toBe(true)
      const body = (await res.json()) as { token?: string; user?: { email?: string } }
      expect(body.token, 'login response must include a JWT').toBeTruthy()
      expect(body.user?.email).toBe(TEST_ADMIN.email)
    })

    test('rejects invalid credentials with 401', async ({ request }) => {
      const res = await request.post('/api/users/login', {
        data: { email: TEST_ADMIN.email, password: 'not-the-right-password' },
      })
      expect(res.status()).toBe(401)
    })
  })

  test.describe('Session cookie login', () => {
    test('installing the cookie grants access to the admin dashboard', async ({
      page,
      context,
    }) => {
      await loginViaApi(context)
      // Avoid /admin root which renders afterDashboard components that crash
      // against the placeholder Vercel Blob token in CI. Any collection page
      // will redirect an unauthenticated user to /admin/login, so landing on
      // it while remaining authenticated proves the cookie works.
      await page.goto('/admin/collections/users')
      await expect(page).toHaveURL(ADMIN_URL_REGEX)
    })
  })
})
