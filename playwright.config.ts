import { defineConfig, devices } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local into process.env so global-setup / tests can access
// things like ADMIN_CLI_SECRET without requiring the dotenv package.
// The Next dev server already reads .env.local on its own.
function loadEnvFile(filename: string): void {
  const p = path.join(__dirname, filename)
  if (!fs.existsSync(p)) return
  const content = fs.readFileSync(p, 'utf8')
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const isCI = !!process.env.CI
const port = Number(process.env.PLAYWRIGHT_PORT || '3000')
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`

const webServerCommand = isCI
  ? `node_modules/.bin/next start -p ${port}`
  : `node_modules/.bin/next dev --turbopack -p ${port}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  // Individual test timeout. Admin pages can take 30s+ to compile on a
  // cold Turbopack dev server; steady-state this is <5s.
  timeout: 90_000,
  expect: {
    // Default `expect()` timeout. Mirrors the per-test timeout so assertions
    // do not starve the test of time when Turbopack is compiling.
    timeout: 15_000,
  },
  reporter: isCI
    ? [
        ['github'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'playwright-report/results.json' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'playwright-report/results.json' }],
      ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: webServerCommand,
    // Always probe the lightweight /next/health endpoint so the reuse
    // check works reliably even while the app's root route is still
    // compiling under Turbopack on a cold boot.
    url: `http://localhost:${port}/next/health`,
    reuseExistingServer: !isCI,
    timeout: 240_000,
  },
  globalSetup: path.join(__dirname, 'e2e', 'setup', 'global-setup.ts'),
  globalTeardown: path.join(__dirname, 'e2e', 'setup', 'global-teardown.ts'),
})
