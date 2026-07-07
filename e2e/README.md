# End-to-end tests (Playwright)

Playwright-based browser and API tests for the Payblocks application.

## Layout

```
e2e/
├── setup/
│   ├── global-setup.ts     # Waits for the server, upserts the e2e admin + user
│   └── global-teardown.ts  # No-op (DB persists locally, ephemeral in CI)
├── tests/
│   ├── admin.spec.ts          # Payload admin panel smoke tests
│   ├── api.spec.ts            # REST API smoke tests (no browser)
│   ├── auth.spec.ts           # UI + API + cookie login flows
│   ├── icon-rendering.spec.ts # Frontend lucide-icon rendering + bundle checks
│   ├── icon-select.spec.ts    # IconSelect admin field regressions
│   └── navbar.spec.ts         # Frontend header/footer smoke tests
└── utils/
    ├── auth.ts         # loginViaApi + admin URL helpers
    └── constants.ts    # TEST_ADMIN / TEST_USER credentials
```

## Seeding

`global-setup.ts` calls the dev-only `POST /next/e2e-setup` route (guarded by
the `ADMIN_CLI_SECRET` env var) which uses Payload's Local API to idempotently
upsert:

| Role   | Email               | Password            |
| ------ | ------------------- | ------------------- |
| admin  | `admin@example.com` | `AdminPassword123!` |
| editor | `test@example.com`  | `TestPassword123!`  |

All credentials can be overridden via `TEST_ADMIN_EMAIL` /
`TEST_ADMIN_PASSWORD` / `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` env vars.

Unlike Payload's built-in `first-register` endpoint, this works even when
the database already contains unrelated users (the common dev scenario).

## Required environment

Set in `.env.local` (or in the CI environment):

```dotenv
ADMIN_CLI_SECRET="some-long-random-string"
```

CI-only / `next start` only:

```dotenv
# Required when the server runs in production mode (next start forces NODE_ENV=production).
# Not needed for local `pnpm dev`.
E2E_TEST=true
```

Optional overrides:

```dotenv
PLAYWRIGHT_BASE_URL=http://localhost:3000
TEST_ADMIN_EMAIL=admin@example.com
TEST_ADMIN_PASSWORD=AdminPassword123!
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPassword123!
```

`playwright.config.ts` loads `.env.local` automatically before spawning the
test runner.

## Running tests

```bash
# Full suite (re-uses a running `pnpm dev` server locally)
pnpm test:e2e

# Interactive UI mode
pnpm test:e2e:ui

# Headed browser
pnpm test:e2e:headed

# Single file
pnpm exec playwright test e2e/tests/auth.spec.ts

# Single test by title
pnpm exec playwright test -g "logs in with valid credentials"
```

## Writing new tests

- Authenticate with `loginViaApi(context)` rather than driving the admin
  login form — the form occasionally rejects input written before React
  finishes hydrating.
- Use `assertNoRuntimeError(page)` right after navigating to an admin page
  so the Next dev-mode error overlay surfaces fast instead of waiting for
  a 15s element timeout.
- Check URLs with `ADMIN_URL_REGEX`; a naive `/\/admin/` pattern matches
  `/admin/login` and hides broken logins.
- For content that varies per seed state (hero copy, nav links, …) assert
  structural expectations (landmark exists, at least one heading, …)
  rather than specific text.

### Minimal example

```ts
import { test, expect } from '@playwright/test'
import { loginViaApi, ADMIN_URL_REGEX, assertNoRuntimeError } from '../utils/auth'

test('admin can open the pages collection', async ({ page, context }) => {
  await loginViaApi(context)
  await page.goto('/admin/collections/pages')
  await expect(page).toHaveURL(ADMIN_URL_REGEX)
  await assertNoRuntimeError(page)
})
```

## Troubleshooting

**`ADMIN_CLI_SECRET is not set`** — add it to `.env.local`.

**`/next/e2e-setup failed (500)`** — the dev server is up but cannot reach
MongoDB (Turbopack occasionally caches a stale DNS resolution). Restart
`pnpm dev`.

**Admin runtime-error overlay** — surfaced by `assertNoRuntimeError`; this
is a real application bug, not a test flake. Reproduce manually by
visiting the URL in the test failure.

**`EADDRINUSE :::3000`** — Playwright tried to start a second dev server
while one was already running. Kill the old one (`lsof -ti:3000 | xargs
kill -9`) or let Playwright reuse it (the config does so automatically
outside CI).
