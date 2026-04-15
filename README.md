# Express + TypeScript + PostgreSQL (Raw SQL)

Professional Node.js API starter with:
- Express (REST API layer)
- TypeScript (strict mode)
- PostgreSQL using `pg` (raw SQL queries)
- ESLint + Prettier

## Quick Start

1. Install dependencies:
   - `npm install`
2. Create local environment file:
   - `cp .env.example .env`
3. Update `DATABASE_URL` in `.env`
4. Start development server:
   - `npm run dev`

If the database in `DATABASE_URL` does not exist, the app will try to create it automatically on startup.

## Scripts

- `npm run dev` - Start development server with watch mode
- `npm run build` - Compile TypeScript into `dist`
- `npm run start` - Run compiled app
- `npm run typecheck` - TypeScript checks without emit
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Check formatting with Prettier
- `npm run format:write` - Format files

## API Endpoints

- `GET /` - Welcome route
- `GET /api/v1/health` - Health check
- `GET /api/v1/users` - List users (raw SQL)
- `POST /api/v1/users` - Create user (raw SQL)

## Project Structure

```text
.
├── src
│   ├── app
│   │   ├── app.ts
│   │   └── routes.ts
│   ├── common
│   │   └── middlewares
│   │       ├── error-handler.ts
│   │       └── not-found.ts
│   ├── config
│   │   └── env.ts
│   ├── db
│   │   └── postgres.ts
│   ├── modules
│   │   └── health
│   │       ├── health.controller.ts
│   │       └── health.routes.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       └── users.routes.ts
│   └── server.ts
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```
