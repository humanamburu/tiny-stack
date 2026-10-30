# tiny-stack

Minimal full-stack TypeScript starter: **Bun + Hono + Drizzle + Postgres** API and a **Vite + React** client.
One example resource (`users`: list + create), no styling, no auth, nothing to delete before you start.

```bash
bun create humanamburu/tiny-stack my-app
cd my-app
docker compose up -d --wait   # Postgres 17 on localhost:54329
bun db:push                   # create tables from api/src/schema.ts
bun dev                       # api on :3000, web on :3001
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
| `bun db:push` | Sync tables with `api/src/schema.ts` |
| `bun db:studio` | Browse data in Drizzle Studio |

## Database

Local Postgres 17 via Docker: `localhost:54329`, database `app`, user `postgres`, no password.
Data is kept in a Docker volume between restarts.

```bash
docker compose up -d --wait   # start (waits until it accepts connections)
docker compose stop           # stop, keep data
docker compose down -v        # remove container and data
```
