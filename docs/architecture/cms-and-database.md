# Strapi 5 CMS & PostgreSQL Foundation (P02)

This document describes the local development, configuration, media upload persistence, and security baseline for the NAVOSYS Strapi 5 CMS (`cms/`) and PostgreSQL (`infrastructure/docker/docker-compose.yml`).

## Architecture

- **CMS:** Strapi `5.64.0` (TypeScript) running at `http://localhost:1337` (admin panel at `/admin`).
- **Database:** PostgreSQL 16 (`postgres:16-alpine`) via Docker Compose project `navosys`, bound strictly to `127.0.0.1:${POSTGRES_HOST_PORT:-5434}:5432` with persistent named volume `navosys_postgres_data`.
  - *Note on default host port `5434`:* Bound to `127.0.0.1:5434` by default so it is never publicly exposed and avoids colliding with existing PostgreSQL services on `5432`/`5433`. Override via `POSTGRES_HOST_PORT` / `DATABASE_PORT` in local `.env` if desired.
- **Media Persistence:** Uploaded assets are stored locally in `cms/public/uploads/` (gitignored except `.gitkeep`) with metadata persisted in PostgreSQL (`files` table).

## Setup & Local Development

1. **Configure environment variables:**
   - Copy `cms/.env.example` to `cms/.env` and populate strong unique secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `DATABASE_PASSWORD`). Never commit `.env` files.
2. **Start PostgreSQL:**
   ```bash
   npm run db:up
   ```
   Wait until `navosys-postgres` reports `(healthy)`.
3. **Install CMS dependencies (first time):**
   ```bash
   npm --prefix cms install
   ```
4. **Build admin & run Strapi in development mode:**
   ```bash
   npm run cms:build
   npm run cms:dev
   ```
5. **Create initial Super Admin:**
   - Open `http://localhost:1337/admin` in your browser and register the first local administrator account (stored in PostgreSQL `admin_users`).
6. **Stop PostgreSQL (data persists in `navosys_postgres_data`):**
   ```bash
   npm run db:down
   ```

## Security Baseline

- PostgreSQL binds only to `127.0.0.1` (loopback), never `0.0.0.0`.
- Strapi `cms/config/plugins.ts` enforces upload MIME allowlists (`allowedTypes`) and blocks SVG/executable uploads (`deniedTypes`), and sets `httpOnly: true` for `users-permissions` sessions.
- API tokens (`STRAPI_API_TOKEN`) must remain server-only in `apps/web` (`STRAPI_*`, never `NEXT_PUBLIC_*`).
- Production deployment, Nginx reverse proxy, HTTPS, and backup/restore procedures are documented in later phases (`P19`).
