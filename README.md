# tiny-stack

Minimal full-stack TypeScript starter: **Bun + Hono + Drizzle + Postgres** API and a **Vite + React** client.
One example resource (`users`: list + create), no styling, no auth, nothing to delete before you start.

```bash
bun create humanamburu/tiny-stack my-app
cd my-app
bun db:up       # Postgres 17 in Docker on localhost:5434
bun db:push     # create tables from api/src/schema.ts
bun dev         # api on :3000, web on :3001
```

Needs [Bun](https://bun.com) ≥ 1.3 and Docker.

## Layout

```
api/            Hono server + Drizzle schema         → api/README.md
  src/index.ts    routes
  src/schema.ts   tables + inferred types
web/            Vite + React client                  → web/README.md
  src/App.tsx     UI
docker-compose.yml   local Postgres
```

## Scripts (from the root)

| Script | What |
|---|---|
| `bun dev` | Run api and web in watch mode |
| `bun db:up` | Start Postgres (`docker compose down` to stop) |
| `bun db:push` | Sync tables with `api/src/schema.ts` |
| `bun db:studio` | Browse data in Drizzle Studio |
