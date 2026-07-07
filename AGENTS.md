# AGENTS.md

Payblocks is a **PayloadCMS 3 website template/builder** combining a headless CMS with a rich block-based layout system. The stack is Next.js 15 (App Router) + React 19 + TypeScript + TailwindCSS v4 + shadcn/ui, backed by MongoDB. The MongoDB backup/restore plugin lives in its own repo at `@trieb.work/payload-plugin-backup-mongodb` (https://github.com/trieb-work/payload-plugin-backup-mongodb); locally it is consumed via a `link:` dependency to `../payload-plugin-backup-mongodb`.

---

## Repository Layout

```
/                             # Next.js + PayloadCMS root app
├── src/
│   ├── app/
│   │   ├── (frontend)/       # Public-facing Next.js routes
│   │   │   ├── [[...slugs]]/ # Catch-all page renderer
│   │   │   └── next/         # App routes (preview, og, exit-preview); Mongo backups via Payload `/api/backup-mongodb/*`
│   │   └── (payload)/        # Payload admin panel (Next.js route group)
│   ├── blocks/               # Layout builder blocks (Feature, CTA, Gallery, FAQ, …)
│   ├── collections/          # Payload collections: Pages, Posts, Media, Categories, Users, Roles
│   ├── globals/              # Payload globals: Header, Footer, ThemeConfig, PageConfig
│   ├── plugins/              # Thin plugin wrappers safe for jiti (see Architecture Notes)
│   ├── utilities/            # Shared helpers (cn, checkPermission, generateMeta, etc.)
│   ├── components/           # Shared React components (AdminDashboard, etc.)
│   ├── access/               # Payload access control functions
│   ├── hooks/                # Payload collection hooks
│   ├── fields/               # Custom Payload field definitions
│   ├── payload.config.ts     # Main Payload config — the central entry point
│   └── payload-types.ts      # AUTO-GENERATED — never edit by hand
└── (no workspace packages — the backup plugin now lives in a separate repo)
```

---

## Setup

```bash
# Install all workspace dependencies
pnpm install

# Copy env template and fill in required vars
cp .env.example .env   # if it exists, otherwise set vars manually

# Start dev server (Turbopack)
pnpm dev
```

### Required Environment Variables

| Variable                    | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| `MONGODB_URI`               | MongoDB connection string                              |
| `PAYLOAD_SECRET`            | Random secret for Payload JWT signing                  |
| `NEXT_PUBLIC_SERVER_URL`    | Public URL of the app (e.g. `http://localhost:3000`)   |
| `PAYLOAD_PUBLIC_SERVER_URL` | Same as above (used for CORS/CSRF)                     |
| `BLOB_READ_WRITE_TOKEN`     | Vercel Blob Storage read/write token (media + backups) |
| `RESEND_API_KEY`            | Resend email service API key                           |
| `EMAIL_FROM_ADDRESS`        | From address for outgoing emails                       |

### Optional Environment Variables

| Variable                     | Purpose                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `GOOGLE_LOGIN_CLIENT_ID`     | Enables Google OAuth login in admin                     |
| `GOOGLE_LOGIN_CLIENT_SECRET` | Google OAuth secret                                     |
| `ALLOWED_EMAIL_DOMAINS`      | Comma-separated list of allowed domains for Google auth |
| `BACKUPS_TO_KEEP`            | Number of cron backups to retain (default: `10`)        |
| `ANALYZE`                    | Set to `true` to run Next.js bundle analyzer            |

---

## Key Commands

### Root app

```bash
pnpm dev                  # Next.js dev server (Turbopack)
pnpm build                # generate:types + Next.js production build
pnpm start                # Start production server
pnpm lint                 # ESLint
pnpm format               # Prettier write
pnpm format:check         # Prettier check (CI)
pnpm tsc                  # TypeScript type-check (no emit)
pnpm generate:types       # Regenerate src/payload-types.ts from collections
pnpm generate:importmap   # Regenerate Payload import map (needed after config changes)
```

### backup-mongodb plugin

The plugin now lives in its own repo at `../payload-plugin-backup-mongodb` (package name `@trieb.work/payload-plugin-backup-mongodb`). Run tests and build from that repo:

```bash
cd ../payload-plugin-backup-mongodb
pnpm test          # vitest run
pnpm dev           # runs the plugin's embedded Payload dev app
pnpm build         # produces dist/ consumed by this app via link:
```

After any changes in the plugin repo, re-run `pnpm install` here (or `pnpm rebuild @trieb.work/payload-plugin-backup-mongodb`) so the linked `dist/` is refreshed.

---

## Code Style

- **Formatter:** Prettier — single quotes, no semicolons, trailing commas, 100-char print width, `prettier-plugin-tailwindcss` for class sorting.
- **Linter:** ESLint with `@payloadcms/eslint-config` + `eslint-plugin-unused-imports`.
- **TypeScript:** `strict: false`, `strictNullChecks: true`. The tsconfig uses `moduleResolution: "bundler"`.
- **Path aliases:** `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`.
- **ESM:** Root package uses `"type": "module"`.
- Always run `pnpm format` and `pnpm lint` before committing.

---

## Architecture Notes — Backup Plugin

### jiti / Payload CLI constraint

Payload's CLI (`payload generate:types`, `payload generate:importmap`) runs TypeScript via **jiti**, which **does not transpile `node_modules`**. The extracted `@trieb.work/payload-plugin-backup-mongodb` therefore ships a pre-built ESM `dist/` (generated by SWC + `tsc`) and its `package.json` `exports` point at the built output. The local wrapper in `src/plugins/backupPlugin.ts` imports from the package's main entry and adds Payblocks-specific defaults (admin access check, seed demo URL).

### Admin styles

Import the precompiled dashboard stylesheet once in the Payload admin layout (e.g. `src/app/(payload)/layout.tsx`):
`import '@trieb.work/payload-plugin-backup-mongodb/styles.css'`. This replaces the old `transpilePackages` requirement (which existed only to let Next process SCSS imported from `node_modules`).

### BackupDashboard registration

`BackupDashboard` is a server component exposed via the plugin's `./rsc` sub-path export (`@trieb.work/payload-plugin-backup-mongodb/rsc#BackupDashboard`). The plugin registers it into `afterDashboard` automatically during config merging, so no manual registration is required in `payload.config.ts`.

### Package sub-path exports

```
@trieb.work/payload-plugin-backup-mongodb        → dist/index.js (core functions + plugin)
@trieb.work/payload-plugin-backup-mongodb/client → dist/exports/client.js
@trieb.work/payload-plugin-backup-mongodb/rsc    → dist/exports/rsc.js (BackupDashboard server component)
@trieb.work/payload-plugin-backup-mongodb/styles.css → dist/backup-dashboard.css (import once in admin layout)
```

---

## Admin CLI — Direct Payload Data Access

A localhost-only API route at `POST /next/admin/cli` gives AI agents (and developers) direct admin-level access to **all** Payload collections via the Local API. Use this to inspect, create, update, or delete any content without needing browser access or user credentials.

**File**: `src/app/(frontend)/next/admin/cli/route.ts`

**Note**: The route lives under `(frontend)/next/` — NOT under `app/api/` — because Payload's own `(payload)/api/[...slug]` catch-all intercepts every `/api/*` path before Next.js can handle it. There is no route at `/api/admin/cli`.

**Security**: Localhost-only + `ADMIN_CLI_SECRET` env var. Never deployed to production.

### Available Operations

| Operation      | Required Fields                      | Description                                               |
| -------------- | ------------------------------------ | --------------------------------------------------------- |
| `collections`  | —                                    | List all collection slugs                                 |
| `find`         | `collection`                         | Query docs with `where`, `limit`, `page`, `sort`, `depth` |
| `findByID`     | `collection`, `id`                   | Get a single document                                     |
| `create`       | `collection`, `data`                 | Create a new document                                     |
| `update`       | `collection`, `id`, `data`           | Update an existing document                               |
| `delete`       | `collection`, `id`                   | Delete a document                                         |
| `count`        | `collection`                         | Count documents matching an optional `where` filter       |
| `schema`       | `collection`                         | Get full collection config/fields (great for discovery)   |
| `findGlobal`   | `collection` (= global slug)         | Read a Payload global document                            |
| `updateGlobal` | `collection` (= global slug), `data` | Update a Payload global document                          |

### Quick Reference Examples

```bash
# List all collections
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"collections"}'

# Count documents in a collection
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"count","collection":"pages"}'

# Find with where clause, sorting, and pagination
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"find","collection":"posts","where":{"_status":{"equals":"published"}},"sort":"-createdAt","limit":5,"depth":0}'

# Get a single document by ID (depth:1 populates relationships)
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"findByID","collection":"pages","id":"<id>","depth":1}'

# Create a new document (with optional locale)
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"create","collection":"posts","data":{"title":"Test Post"},"locale":"en"}'

# Update a document
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"update","collection":"posts","id":"<id>","data":{"title":"Updated Title"}}'

# Delete a document
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"delete","collection":"posts","id":"<id>"}'


# Read a global
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"findGlobal","collection":"header"}'

# Update a global
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_CLI_SECRET>" \
  -d '{"op":"updateGlobal","collection":"footer","data":{"someField":"value"}}'
```

### Tips for Agents

- **Authorization:** Pass your `ADMIN_CLI_SECRET` in the `Authorization: Bearer <secret>` header.
- **Multilingual Content:** Pass `"locale": "de"` (or `"en"`) in your JSON payload to read/write specific translations. You can also pass `"fallbackLocale": false`.
- **Safety Limits:** For memory protection, `limit` is capped at **100** and `depth` is capped at **3**.
- **Use `depth:0`** for fast bulk reads — returns relationship IDs only, no population.
- **Use `depth:1`** to see populated relationship data inline.
- **Invalid enum values fail silently** — always check the collection schema for valid `select` options before writing.
- **All operations use `overrideAccess: true`** — no user/tenant restrictions apply.
- **Pipe through `python3 -m json.tool`** for readable output, or use `python3 -c` for field extraction.

---

## Adding a New Layout Block

Every block follows the same pattern:

1. Create `src/blocks/<BlockName>/` with:
   - `config.ts` — Payload field config (the block schema, exported as `<BlockName>Block`)
   - `Component.tsx` — React server component receiving typed props + `publicContext`
   - (Optional) `Component.client.tsx` — client component if interactivity is needed

2. Register the block config in the `layout` field of `src/collections/Pages/index.ts` (inside the `blocks` array of the `layout` field).

3. Import and register the component in `src/blocks/RenderBlocks.tsx`:

   ```ts
   import { MyNewBlock } from './MyNewBlock/Component'
   // …
   const blockComponents = {
     // …
     mynewblock: MyNewBlock,
   }
   ```

4. Run `pnpm generate:types` and `pnpm generate:importmap` after any Payload config change.

**Important:** Tailwind dynamic class names used in `RenderBlocks.tsx` (e.g. `bg-primary`) must be enumerated via `switch`/`case` — Tailwind's compiler scans source statically and won't pick up runtime string interpolation.

---

## Payload Config Conventions

- **Collections:** `Pages, Posts, Media, Categories, Users, Roles` — all defined in `src/collections/`.
- **Globals:** `Header, Footer, ThemeConfig, PageConfig` — defined in `src/globals/`.
- **`payload-types.ts`** is auto-generated. **Never edit it manually.** Regenerate with `pnpm generate:types`.
- After any change to `payload.config.ts`, a collection config, or a global config, run `pnpm generate:importmap`.
- Access control functions live in `src/access/` and `src/utilities/checkPermission.ts`.
- Roles and permissions use `hasPermission(permissionKey)` from `src/utilities/checkPermission.ts`.

---

## Testing

There are no tests for the Next.js app itself. The backup plugin's Vitest suite lives in its own repo at `../payload-plugin-backup-mongodb/tests/` — run `pnpm test` there after plugin changes.

---

## Backup & Restore API

```ts
import {
  createBackup, // createBackup(payload, { cron?, includeMedia?, backupsToKeep?, taskId? })
  restoreBackup, // restoreBackup(payload, downloadUrl, blacklist?, mergeData?)
  listBackups, // listBackups(payload, { blobToken? }) — token from settings + env like createBackup
  restoreSeedMedia, // restoreSeedMedia() → string[]  (seeds public/seed/media/ to blob/public)
} from '@trieb.work/payload-plugin-backup-mongodb'
```

- Backups are stored in Vercel Blob Storage under the `backups/` prefix.
- Blob names follow the pattern: `backups/<type>---<db>---<host>---<timestamp>.<ext>`.
- `.json` backups contain only MongoDB collections; `.tar.gz` backups include media files too.
- Restore supports both formats. Collections can be blacklisted; `mergeData: true` upserts instead of replacing.

---

## Releases & Changesets

- **Every PR to `main` must include a changeset** (enforced by the `validate-changesets` CI workflow). Label the PR `no-changeset` to skip the check for chore-only commits.
- Create a changeset: `pnpm changeset` (follow the interactive prompts).
- Release CI (`release.yml`) runs on `main` push, creates a GitHub Release + ZIP artifact when the version in `package.json` changes.
- Do **not** manually edit `CHANGELOG.md` — changesets maintain it.

---

## CI Workflows

| Workflow                  | Trigger       | Purpose                                     |
| ------------------------- | ------------- | ------------------------------------------- |
| `validate-changesets.yml` | PR → `main`   | Ensures a `.changeset/*.md` file is present |
| `release.yml`             | Push → `main` | Creates changeset PR and GitHub Release     |
| `cleanup-demo.yml`        | Scheduled     | Cleans up demo environment                  |

---

## Common Pitfalls

- **Always import the backup plugin via the local wrapper** `@/plugins/backupPlugin`. Do not import `@trieb.work/payload-plugin-backup-mongodb` directly in `payload.config.ts`.
- **The linked plugin must be built.** `@trieb.work/payload-plugin-backup-mongodb` runs `pnpm build` as a `prepare` script, so `pnpm install` in this repo produces its `dist/`. If you hack on the plugin, re-run `pnpm build` there (or `pnpm install` here) to refresh the linked bundle.
- **Tailwind dynamic classes**: always use explicit `switch/case` in `RenderBlocks.tsx`; string interpolation is not picked up by the compiler.
- **After changing any Payload config**, always run both `pnpm generate:types` AND `pnpm generate:importmap`.
- **Node requirement**: `^18.20.2 || ^20.9.0 || ^22.0.0 || ^23.6.0 || ^24.6.0`.
