import { test, expect } from '@playwright/test'

test.describe('Icon server component (frontend rendering)', () => {
  test('lucide icons are server-rendered as SVG in the initial HTML', async ({ page }) => {
    // Visit the homepage which contains lucide icons (Globe, Menu, Search, etc.)
    const response = await page.goto('/')
    expect(response?.ok(), 'Homepage should return 200').toBeTruthy()

    const html = (await response?.text()) || ''

    // Icons should be embedded as <svg> elements with class="lucide ..." directly in the HTML.
    // This proves they are server-rendered (not hydrated on the client).
    const lucideMatches = html.match(/class="lucide [^"]*"/g) || []
    expect(
      lucideMatches.length,
      'Initial HTML should contain server-rendered lucide SVGs',
    ).toBeGreaterThan(0)

    // Verify at least one SVG is visible in the rendered page
    const iconSvg = page.locator('svg.lucide').first()
    await expect(iconSvg).toBeVisible({ timeout: 10_000 })
    await expect(iconSvg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  test('resolved icon payload is not visible in rendered UI', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.ok(), 'Homepage should return 200').toBeTruthy()

    await expect(
      page.getByText('__PAYBLOCKS_RESOLVED_ICON__'),
      'Resolved icon payload markers must not be visible to users in rendered UI',
    ).toHaveCount(0)

    await expect(page.locator('svg.lucide').first()).toBeVisible({ timeout: 10_000 })
  })

  test('does not ship the full lucide-react library to the client', async ({ page }) => {
    const jsChunks: { url: string; body: string }[] = []

    // Intercept all JS responses loaded by the page
    page.on('response', async (response) => {
      const url = response.url()
      const ct = response.headers()['content-type'] || ''
      if (
        (url.endsWith('.js') || url.includes('.js?') || ct.includes('javascript')) &&
        !url.includes('/admin/')
      ) {
        try {
          const body = await response.text()
          jsChunks.push({ url, body })
        } catch {
          // response body may be unavailable for redirects, etc.
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // The full lucide-react barrel export contains 1 500+ createLucideIcon calls.
    // Individual named imports from other client components (LanguageSwitcher, navbar,
    // feature blocks, etc.) are expected and typically total < 200.
    // The Icon server component should contribute ZERO to the client bundle.
    // Also guard against react-icons barrels (fa/bi/si/fc) leaking — each family
    // uses GenIcon() factory calls and can balloon a single chunk to 400+ KB
    // if Next's optimizePackageImports isn't applied.
    for (const chunk of jsChunks) {
      const pathname = new URL(chunk.url).pathname
      const sizeKB = Buffer.byteLength(chunk.body) / 1024

      const lucideCount = (chunk.body.match(/createLucideIcon/g) || []).length
      expect(
        lucideCount,
        `JS chunk ${pathname} has ${lucideCount} createLucideIcon calls — the full lucide-react library may have leaked into the client bundle`,
      ).toBeLessThan(200)

      const genIconCount = (chunk.body.match(/GenIcon\(/g) || []).length
      expect(
        genIconCount,
        `JS chunk ${pathname} has ${genIconCount} GenIcon calls — a react-icons barrel may have leaked`,
      ).toBeLessThan(100)

      // Any chunk whose URL advertises an icon library should stay small.
      if (/react-icons|lucide-react/.test(pathname)) {
        expect(
          sizeKB,
          `Icon-library chunk ${pathname} is ${sizeKB.toFixed(0)} KB — a full barrel may have been bundled`,
        ).toBeLessThan(50)
      }
    }

    // Count total icon-factory calls across ALL client JS.
    const totalLucide = jsChunks.reduce(
      (sum, c) => sum + (c.body.match(/createLucideIcon/g) || []).length,
      0,
    )
    const totalGenIcon = jsChunks.reduce(
      (sum, c) => sum + (c.body.match(/GenIcon\(/g) || []).length,
      0,
    )

    expect(
      totalLucide,
      `Client JS has ${totalLucide} total createLucideIcon calls — the full lucide-react barrel (1 500+) may have leaked`,
    ).toBeLessThan(200)

    expect(
      totalGenIcon,
      `Client JS has ${totalGenIcon} total GenIcon calls — a react-icons barrel (1 000+ per family) may have leaked`,
    ).toBeLessThan(100)
  })
})
