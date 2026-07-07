import { TEST_ADMIN, TEST_USER } from '../utils/constants'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const port = Number(process.env.PLAYWRIGHT_PORT || '3000')
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`

/** Poll `/next/health` until the server is up or the timeout elapses. */
async function waitForServerReady(timeoutMs = 120_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  let lastError: unknown
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE_URL}/next/health`)
      if (res.ok) return
      lastError = `HTTP ${res.status}`
    } catch (err) {
      lastError = err
    }
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Server at ${BASE_URL} did not become ready: ${String(lastError)}`)
}

async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.ok
}

/**
 * Global setup for the Playwright e2e suite.
 *
 *  1. Wait for the Next server to be reachable.
 *  2. Call the dev-only `/next/e2e-setup` route (gated by `ADMIN_CLI_SECRET`)
 *     to idempotently upsert a deterministic admin + regular test user via
 *     Payload's Local API. This works even when the database already has
 *     other users, which would make `/api/users/first-register` return 403.
 *  3. Verify that login works for the seeded admin.
 */
async function globalSetup(): Promise<void> {
  console.log(`[e2e] Waiting for ${BASE_URL} ...`)
  await waitForServerReady()

  const secret = process.env.ADMIN_CLI_SECRET
  if (!secret) {
    throw new Error(
      'ADMIN_CLI_SECRET is not set. Add it to .env.local so global-setup can ' +
        'bootstrap the test admin via /next/e2e-setup.',
    )
  }

  console.log('[e2e] Upserting test admin via /next/e2e-setup ...')
  const setupRes = await fetch(`${BASE_URL}/next/e2e-setup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      admin: { email: TEST_ADMIN.email, password: TEST_ADMIN.password, name: TEST_ADMIN.name },
      user: { email: TEST_USER.email, password: TEST_USER.password, name: TEST_USER.name },
    }),
  })

  if (!setupRes.ok) {
    const text = await setupRes.text()
    throw new Error(`/next/e2e-setup failed (${setupRes.status}): ${text}`)
  }

  if (!(await login(TEST_ADMIN.email, TEST_ADMIN.password))) {
    throw new Error('Test admin was seeded but login still fails.')
  }

  if (process.env.CI) {
    console.log('[e2e] Seeding Orisa demo pages for CI …')
    execSync('pnpm seed:orisa-creative-agency', {
      stdio: 'inherit',
      cwd: repoRoot,
      env: process.env,
    })
    execSync('pnpm seed:orisa-marketing-agency', {
      stdio: 'inherit',
      cwd: repoRoot,
      env: process.env,
    })
    execSync('pnpm seed:orisa-about-01', {
      stdio: 'inherit',
      cwd: repoRoot,
      env: process.env,
    })
    execSync('pnpm seed:orisa-contact-01', {
      stdio: 'inherit',
      cwd: repoRoot,
      env: process.env,
    })
    execSync('pnpm seed:storeframe-bundles', {
      stdio: 'inherit',
      cwd: repoRoot,
      env: process.env,
    })
  }

  console.log('[e2e] Test admin seeded and login verified')
}

export default globalSetup
