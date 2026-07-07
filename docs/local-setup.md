# Local development setup

MongoDB via Docker; Next.js runs on the host.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose)
- Node.js `^18.20.2 || ^20.9.0 || ^22.0.0` (see `package.json`)
- [pnpm](https://pnpm.io/)

## 1. Environment

```bash
cp .env.example .env
```

Edit `.env` if needed. Defaults target `mongodb://127.0.0.1:27017/payblocks`.

## 2. Start MongoDB

```bash
docker compose up -d mongo
docker compose ps
```

Wait until `mongo` is healthy (`docker compose ps` shows healthy).

## 3. Install and run the app

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin (create the first user on first visit)

## 4. Optional — seed Storeframe demo (Orisa theme)

After blocks are registered, seed globals and the creative agency homepage:

```bash
pnpm seed:orisa-globals
pnpm seed:orisa-creative-agency
```

Then open http://localhost:3000 — you should see the Storeframe creative agency homepage.

To remove old demo bundles (Bucks Sauce, Business Outcomes, Corporate Homepage):

```bash
pnpm purge:legacy-demos
```

## 5. Optional — seed demo content (full Payblocks demo)

In the admin dashboard, use **Seed DB** if shown (requires `MONGODB_URI` and empty/minimal database).

## 6. Stop MongoDB

```bash
docker compose down
```

Data persists in the `mongo_data` volume. To wipe the database:

```bash
docker compose down -v
```

## Admin CLI (localhost)

```bash
curl -s -X POST http://localhost:3000/next/admin/cli \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_CLI_SECRET" \
  -d '{"op":"collections"}'
```

Use the value of `ADMIN_CLI_SECRET` from your `.env`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ECONNREFUSED 127.0.0.1:27017` | Run `docker compose up -d mongo` |
| Port 27017 in use | Stop other Mongo instances or change the host port in `docker-compose.yml` |
| Media uploads | Optional `BLOB_READ_WRITE_TOKEN`; without it, files may use local `public/` storage |
