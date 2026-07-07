/**
 * Deterministic credentials used across the Playwright e2e suite.
 *
 * The credentials can be overridden per-environment (useful for CI or when
 * running against a remote server) via the `TEST_ADMIN_EMAIL` /
 * `TEST_ADMIN_PASSWORD` etc. env vars.
 */
export const TEST_ADMIN = {
  email: process.env.TEST_ADMIN_EMAIL || 'admin@example.com',
  password: process.env.TEST_ADMIN_PASSWORD || 'AdminPassword123!',
  name: process.env.TEST_ADMIN_NAME || 'Test Admin',
} as const

export const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'test@example.com',
  password: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
  name: process.env.TEST_USER_NAME || 'Test User',
} as const
