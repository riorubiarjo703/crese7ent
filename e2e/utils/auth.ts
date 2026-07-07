import type { BrowserContext, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { TEST_ADMIN } from './constants'

const port = Number(process.env.PLAYWRIGHT_PORT || '3000')
export const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`

/**
 * Matches any URL inside the authenticated admin area. Excludes the public
 * `/admin/login`, `/admin/forgot` and `/admin/create-first-user` routes.
 */
export const ADMIN_URL_REGEX = /\/admin(?!\/(login|forgot|create-first-user))(?:\/|$|\?)/

/**
 * Log in via the Payload REST API and install the resulting JWT on the
 * browser context as a `payload-token` cookie. Every subsequent navigation
 * within the context is authenticated.
 *
 * This bypasses the admin login UI on purpose: driving the login form from
 * Playwright is flaky because the form re-hydrates after mount and values
 * written by `.fill()` occasionally land before event handlers are wired up.
 */
export async function loginViaApi(
  context: BrowserContext,
  {
    email = TEST_ADMIN.email,
    password = TEST_ADMIN.password,
  }: { email?: string; password?: string } = {},
): Promise<string> {
  const res = await context.request.post(`${BASE_URL}/api/users/login`, {
    headers: { 'Content-Type': 'application/json' },
    data: { email, password },
  })

  if (!res.ok()) {
    throw new Error(`Login failed (${res.status()}): ${await res.text()}`)
  }

  const { token } = (await res.json()) as { token?: string }
  if (!token) {
    throw new Error('Login response did not contain a token')
  }

  const url = new URL(BASE_URL)
  await context.addCookies([
    {
      name: 'payload-token',
      value: token,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
  ])

  return token
}

/**
 * Register a persistent Playwright locator handler that auto-dismisses the
 * Next.js / Turbopack runtime error overlay whenever it appears on the page.
 *
 * The overlay is caused by an HMR bug in dev mode:
 *   "Cannot assign to read only property 'payload' of object '#<Object>'"
 * It fires asynchronously during React hydration, AFTER domcontentloaded,
 * so a one-shot check is not reliable. addLocatorHandler fires automatically
 * before every Playwright action while the overlay is visible, unblocking
 * waitFor / fill / click calls throughout the test.
 *
 * Safe to call multiple times — Playwright de-duplicates handlers per locator.
 */
export async function dismissRuntimeOverlay(page: Page): Promise<void> {
  // The Turbopack HMR runtime error overlay only appears in dev mode.
  // In CI / prod builds this overlay never fires, and registering a reload
  // handler there risks interfering with legitimate admin dialogs.
  if (process.env.CI) return

  // The Next.js / Turbopack runtime error overlay fires asynchronously during
  // React hydration. It cannot be closed via keyboard (no close button, Escape
  // does not work). Reloading is the correct fix: the HMR race is
  // non-deterministic, so a fresh page load almost always succeeds.
  //
  // addLocatorHandler fires before any Playwright action when the overlay is
  // visible. { noWaitAfter: true } prevents deadlock when the reload causes
  // the locator to detach before the handler finishes.
  const overlay = page.getByRole('dialog', { name: /Runtime/i })
  await page.addLocatorHandler(
    overlay,
    async () => {
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 30_000 })
    },
    { noWaitAfter: true },
  )
}

export async function gotoAdminDashboard(page: Page): Promise<void> {
  // Deliberately navigate to a known-good subroute instead of /admin.
  // The Payload dashboard root renders `afterDashboard` components — in this
  // project that includes a BackupDashboard that talks to Vercel Blob, which
  // 403s in CI with the placeholder token and crashes the admin render with
  // "This page couldn't load". Collection subroutes do not render those
  // components, so they remain usable as an authenticated landing page.
  //
  // Admin routes can take a while on first compile under Turbopack, so we
  // give them generous timeouts. Steady-state this is <1s.
  await page.goto('/admin/collections/users', { timeout: 60_000 })
  await expect(page).toHaveURL(ADMIN_URL_REGEX, { timeout: 30_000 })
  // Dismiss any Turbopack HMR error overlay before waiting for the shell.
  await dismissRuntimeOverlay(page)
  await page
    .locator('nav.nav__wrap, nav.nav, aside[class*="nav"], a[href^="/admin/collections/"]')
    .first()
    .waitFor({ state: 'visible', timeout: 45_000 })
}

/**
 * Fail fast if the Next.js dev-mode runtime-error overlay is on screen.
 * Without this, tests that expect admin content silently wait for their
 * timeout while the real error sits in a dialog.
 */
export async function assertNoRuntimeError(page: Page): Promise<void> {
  const overlay = page.getByRole('dialog', { name: /Runtime/i })
  if (await overlay.isVisible({ timeout: 500 }).catch(() => false)) {
    const text = (await overlay.textContent()) ?? ''
    throw new Error(`Admin runtime error overlay is visible:\n${text.slice(0, 400).trim()}`)
  }
}
