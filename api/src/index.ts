import { drizzle } from 'drizzle-orm/bun-sql'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { usersTable } from './schema'

const db = drizzle(process.env.DATABASE_URL ?? 'postgres://postgres@localhost:5434/app')

const app = new Hono()

app.use(logger())

app.get('/api/users', async (c) => {
  return c.json(await db.select().from(usersTable))
})

app.post('/api/users', async (c) => {
  const [user] = await db.insert(usersTable).values(await c.req.json()).returning()
  return c.json(user, 201)
})

export default app
