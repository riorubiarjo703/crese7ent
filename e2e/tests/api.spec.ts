import { test, expect } from '@playwright/test'
import { TEST_ADMIN } from '../utils/constants'

/**
 * REST API smoke tests.
 *
 * These use Playwright's APIRequestContext (no browser) so they are very
 * fast and exercise the Payload/Next data layer end to end.
 */
test.describe('API - public', () => {
  test('GET /next/health returns ok', async ({ request }) => {
    const res = await request.get('/next/health')
    expect(res.ok()).toBe(true)
    expect((await res.text()).trim()).toBe('ok')
  })

  test('GET /api/pages returns a pages result set', async ({ request }) => {
    const res = await request.get('/api/pages?depth=0&limit=1')
    expect(res.ok(), `pages API returned ${res.status()}`).toBe(true)
    const body = (await res.json()) as { docs?: unknown[]; totalDocs?: number }
    expect(Array.isArray(body.docs)).toBe(true)
    expect(typeof body.totalDocs).toBe('number')
  })

  test('GET /api/posts returns a posts result set', async ({ request }) => {
    const res = await request.get('/api/posts?depth=0&limit=1')
    expect(res.ok(), `posts API returned ${res.status()}`).toBe(true)
    const body = (await res.json()) as { docs?: unknown[] }
    expect(Array.isArray(body.docs)).toBe(true)
  })

  test('GET /api/globals/header returns a header doc', async ({ request }) => {
    const res = await request.get('/api/globals/header?depth=0')
    expect(res.ok(), `header global returned ${res.status()}`).toBe(true)
  })

  test('GET /api/globals/footer returns a footer doc', async ({ request }) => {
    const res = await request.get('/api/globals/footer?depth=0')
    expect(res.ok(), `footer global returned ${res.status()}`).toBe(true)
  })
})

test.describe('API - authenticated', () => {
  test('admin can list users', async ({ request }) => {
    const loginRes = await request.post('/api/users/login', {
      data: { email: TEST_ADMIN.email, password: TEST_ADMIN.password },
    })
    expect(loginRes.ok()).toBe(true)
    const { token } = (await loginRes.json()) as { token: string }

    const res = await request.get('/api/users?limit=5', {
      headers: { Authorization: `JWT ${token}` },
    })
    expect(res.ok(), `users API returned ${res.status()}`).toBe(true)
    const body = (await res.json()) as { docs?: Array<{ email?: string }> }
    expect(Array.isArray(body.docs)).toBe(true)
    const emails = (body.docs ?? []).map((d) => d.email)
    expect(emails).toContain(TEST_ADMIN.email)
  })

  test('anonymous user cannot list users', async ({ request }) => {
    const res = await request.get('/api/users')
    // Payload access-control usually returns 403 (or 401) here, but either
    // way it must not return an array of users to anonymous callers.
    if (res.ok()) {
      const body = (await res.json()) as { docs?: unknown[] }
      expect((body.docs ?? []).length).toBe(0)
    } else {
      expect([401, 403]).toContain(res.status())
    }
  })
})
