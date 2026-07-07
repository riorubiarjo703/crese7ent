/**
 * Mobile layout audit — run: node scripts/mobile-layout-audit.mjs
 */
import { chromium, devices } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../lighthouse-reports/mobile-review')
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

const viewports = [
  { name: 'iphone-14', ...devices['iPhone 14'] },
  { name: 'iphone-se', ...devices['iPhone SE'] },
  { name: 'pixel-7', ...devices['Pixel 7'] },
]

fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const findings = []

for (const vp of viewports) {
  const context = await browser.newContext({ ...vp, reducedMotion: 'reduce' })
  const page = await context.newPage()

  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 120_000 })
  await page.waitForTimeout(1500)

  const audit = await page.evaluate(() => {
    const doc = document.documentElement
    const body = document.body
    const overflowX = Math.max(
      doc.scrollWidth - doc.clientWidth,
      (body?.scrollWidth ?? 0) - (body?.clientWidth ?? 0),
    )

    const smallTargets = [...document.querySelectorAll('a, button, [role="button"]')]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)
      })
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().slice(0, 40),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      }))

    const sections = ['#about', '#solutions'].map((id) => {
      const el = document.querySelector(id)
      if (!el) return { id, visible: false }
      const r = el.getBoundingClientRect()
      return { id, visible: r.width > 0 && r.height > 0, width: Math.round(r.width) }
    })

    const menuButton = document.querySelector('[aria-label="Open menu"]')

    return {
      overflowX,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      sections,
      menuButtonVisible: Boolean(menuButton?.getBoundingClientRect().width),
      smallTargets,
      title: document.title,
    }
  })

  findings.push({ device: vp.name, ...audit })

  await page.screenshot({ path: path.join(outDir, `${vp.name}-hero.png`) })
  await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true })

  await page.locator('#solutions').scrollIntoViewIfNeeded({ timeout: 15_000 }).catch(() => {})
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, `${vp.name}-solutions.png`) })

  await context.close()
}

await browser.close()

fs.writeFileSync(path.join(outDir, 'audit.json'), JSON.stringify(findings, null, 2))
console.log(JSON.stringify(findings, null, 2))
