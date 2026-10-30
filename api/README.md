# api

Hono on Bun + Drizzle + Postgres. Routes live in `src/index.ts`, tables in `src/schema.ts`.

## Run

```bash
bun dev              # http://localhost:3000, restarts on save
bun run db:push      # sync DB tables with src/schema.ts (no migration files)
bun run db:studio    # browse data at https://local.drizzle.studio
```

Connects to the docker-compose Postgres (`postgres://postgres@localhost:5434/app`) by default.
Point it elsewhere with `DATABASE_URL` in `api/.env`.

## Adding an entity

1. Add a table and its inferred types to `src/schema.ts`.
2. `bun run db:push`
3. Add routes to `src/index.ts`.

## Drizzle cheat sheet

```ts
import { and, count, desc, eq, gt, ilike, sql } from 'drizzle-orm'
```

| What | Code | Docs |
|---|---|---|
| by id | `db.select().from(t).where(eq(t.id, 1))` | [select](https://orm.drizzle.team/docs/select) |
| AND / comparisons | `.where(and(eq(t.a, 1), gt(t.b, 2)))` | [operators](https://orm.drizzle.team/docs/operators) |
| search | `` .where(ilike(t.name, `%${q}%`)) `` | [operators](https://orm.drizzle.team/docs/operators#ilike) |
| sort + paging | `.orderBy(desc(t.id)).limit(20).offset(40)` | [select](https://orm.drizzle.team/docs/select#limit--offset) |
| count | `db.select({ n: count() }).from(t)` | [count](https://orm.drizzle.team/docs/select#aggregations) |
| insert | `db.insert(t).values({ ... }).returning()` | [insert](https://orm.drizzle.team/docs/insert) |
| update | `db.update(t).set({ ... }).where(eq(t.id, 1)).returning()` | [update](https://orm.drizzle.team/docs/update) |
| atomic increment | `` db.update(t).set({ n: sql`${t.n} + 1` }) `` | [sql template](https://orm.drizzle.team/docs/sql) |
| delete | `db.delete(t).where(eq(t.id, 1)).returning()` | [delete](https://orm.drizzle.team/docs/delete) |
| join | `db.select().from(a).leftJoin(b, eq(a.bId, b.id))` | [joins](https://orm.drizzle.team/docs/joins) |
| transaction | `db.transaction(async (tx) => { ... })` | [transactions](https://orm.drizzle.team/docs/transactions) |

Schema (`drizzle-orm/pg-core`):

- Column types: `integer`, `varchar`, `text`, `boolean`, `timestamp`, `jsonb`. See [pg column types](https://orm.drizzle.team/docs/column-types/pg).
- Modifiers: `.primaryKey()`, `.generatedAlwaysAsIdentity()`, `.notNull()`, `.unique()`, `.default(x)`, `.defaultNow()`. See [indexes & constraints](https://orm.drizzle.team/docs/indexes-constraints).
- Foreign key: `.references(() => other.id)`. See [relations](https://orm.drizzle.team/docs/relations).
- Types: `typeof t.$inferSelect` (row), `typeof t.$inferInsert` (insert payload). See [type inference](https://orm.drizzle.team/docs/goodies#type-api).
- drizzle-kit: [push](https://orm.drizzle.team/docs/drizzle-kit-push) · [generate](https://orm.drizzle.team/docs/drizzle-kit-generate) · [studio](https://orm.drizzle.team/docs/drizzle-kit-studio) · [Bun SQL driver](https://orm.drizzle.team/docs/connect-bun-sql)

## Hono cheat sheet

| What | Code | Docs |
|---|---|---|
| route | `app.get('/api/items/:id', async (c) => ...)` | [routing](https://hono.dev/docs/api/routing) |
| JSON body | `await c.req.json()` | [request](https://hono.dev/docs/api/request#json) |
| path param | `c.req.param('id')` | [request](https://hono.dev/docs/api/request#param) |
| query param | `c.req.query('q')` | [request](https://hono.dev/docs/api/request#query) |
| JSON response | `c.json(data, 201)` | [context](https://hono.dev/docs/api/context#json) |
| 404 | `c.notFound()` | [context](https://hono.dev/docs/api/context#notfound) |
| middleware | `app.use(logger())` | [logger](https://hono.dev/docs/middleware/builtin/logger) · [middleware](https://hono.dev/docs/guides/middleware) |
| error handler | `app.onError((err, c) => c.json({ error: '...' }, 500))` | [app](https://hono.dev/docs/api/hono#error-handling) |
| validation | `zValidator('json', schema)` | [validation](https://hono.dev/docs/guides/validation) |
| streaming / SSE | `streamSSE(c, async (stream) => ...)` | [streaming](https://hono.dev/docs/helpers/streaming) |
