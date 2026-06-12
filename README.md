# SchemeSathi

SchemeSathi is a multilingual welfare-scheme discovery app with a React/Vite frontend, Express API, Prisma data model, eligibility matching, and a lightweight chat assistant.

## Project Layout

- `frontend/` - React app for scheme search, chat, eligibility checks, and impact estimation.
- `backend/` - Express API with auth, schemes, eligibility, chat, and admin analytics routes.
- `prisma/` - Prisma schema and seed data.
- `docker/` - Dockerfiles, Compose stack, and Nginx config.
- `docs/` - Project documentation and planning artifacts.
- `tests/` - Backend and frontend test placeholders.

## Quick Start

1. Copy `backend/.env.example` to `backend/.env` and update secrets if needed.
2. Run `npm run install:all`.
3. Start PostgreSQL locally or run `npm run docker:up`.
4. Run `npm run prisma:generate` and `npm run prisma:migrate`.
5. Run `npm run dev`.

Frontend: `http://localhost:5173`
Backend health: `http://localhost:4000/api/health`
