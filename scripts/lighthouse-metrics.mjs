/**
 * Core Web Vitals + category heuristics via Playwright (dev server).
 * Run: node scripts/lighthouse-metrics.mjs
 */
import { chromium, devices } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../lighthouse-reports')
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

fs.mkdirSync(outDir, { recursive: true })

async function audit(deviceLabel, contextOptions) {
  const browser = await chromium.launch()
  const context = await browser.newContext(contextOptions)
  const page = await context.newPage()

  const start = Date.now()
  await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 180_000 })
  const loadMs = Date.now() - start

  const metrics = await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 500))

    const nav = performance.getEntriesByType('navigation')[0]
    const paints = Object.fromEntries(
      performance.getEntriesByType('paint').map((e) => [e.name, Math.round(e.startTime)]),
    )
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
    const lcp = lcpEntries.length
      ? Math.round(lcpEntries[lcpEntries.length - 1].startTime)
      : null

    let cls = 0
    for (const entry of performance.getEntriesByType('layout-shift')) {
      if (!entry.hadRecentInput) cls += entry.value
    }

    const imagesMissingAlt = document.querySelectorAll('img:not([alt])').length
    const h1Count = document.querySelectorAll('h1').length
    const hasMetaDescription = Boolean(document.querySelector('meta[name="description"]'))
    const hasViewport = Boolean(document.querySelector('meta[name="viewport"]'))
    const docTitle = document.title

    return {
      ttfb: nav ? Math.round(nav.responseStart) : null,
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
      fcp: paints['first-contentful-paint'] ?? null,
      lcp,
      cls: Math.round(cls * 1000) / 1000,
      imagesMissingAlt,
      h1Count,
      hasMetaDescription,
      hasViewport,
      docTitle,
      transferSize: nav?.transferSize ?? null,
    }
  })

  await browser.close()

  const scores = {
    performance: scorePerformance(metrics),
    accessibility: scoreA11y(metrics),
    seo: scoreSeo(metrics),
    bestPractices: scoreBestPractices(metrics),
  }

  return { device: deviceLabel, loadMs, metrics, scores }
}

function scorePerformance(m) {
  let score = 100
  if (m.lcp != null) {
    if (m.lcp > 4000) score -= 40
    else if (m.lcp > 2500) score -= 25
    else if (m.lcp > 1800) score -= 10
  }
  if (m.fcp != null) {
    if (m.fcp > 3000) score -= 15
    else if (m.fcp > 1800) score -= 8
  }
  if (m.cls > 0.25) score -= 30
  else if (m.cls > 0.1) score -= 15
  if (m.ttfb != null && m.ttfb > 800) score -= 10
  return Math.max(0, score)
}

function scoreA11y(m) {
  let score = 100
  if (m.imagesMissingAlt > 0) score -= Math.min(30, m.imagesMissingAlt * 10)
  if (m.h1Count !== 1) score -= 15
  return Math.max(0, score)
}

function scoreSeo(m) {
  let score = 100
  if (!m.hasMetaDescription) score -= 25
  if (!m.hasViewport) score -= 25
  if (!m.docTitle || m.docTitle.length < 10) score -= 15
  return Math.max(0, score)
}

function scoreBestPractices(m) {
  let score = 100
  if (m.imagesMissingAlt > 0) score -= 10
  return Math.max(0, score)
}

const results = await Promise.all([
  audit('desktop', { viewport: { width: 1350, height: 940 } }),
  audit('mobile', devices['iPhone 14']),
])

const report = {
  generatedAt: new Date().toISOString(),
  url: baseURL,
  note: 'Playwright CWV snapshot on dev server — not a full Lighthouse run (CLI blocked by arm64 Node).',
  results,
}

fs.writeFileSync(path.join(outDir, 'metrics.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
