# web

Vite + React + TypeScript. UI lives in `src/App.tsx`.

## Run

```bash
bun dev          # http://localhost:3001
```

`vite.config.ts` proxies `/api/*` → `http://localhost:3000`, so call `fetch('/api/...')` with no host and no CORS setup.

## Types

Import row types straight from the API's Drizzle schema. It's a type-only import, so nothing from the server ends up in the bundle:

```ts
import type { User } from '../../api/src/schema'
```
