# NAVOSYS Website MVP

Technical repository for the NAVOSYS company website MVP, structured according to `NAVOSYS_MVP_Implementation_Pack/master/M0_MASTER_SPECIFICATION.md`.

## Architecture Overview

- **Frontend (`apps/web`):** Next.js App Router, TypeScript, Tailwind CSS (Server Components by default, minimal client-side JavaScript).
- **CMS (`cms/`):** Strapi 5 (`5.64.0`, TypeScript) backed by PostgreSQL 16.
- **Infrastructure (`infrastructure/`):** Docker Compose for local PostgreSQL (`127.0.0.1:5434` by default) and deployment configs in later phases.
- **Documentation (`docs/`):** Architecture notes, phase reports, asset plans, and deployment guides.

## Current Phase Status

- **P01 — Repository, Project Initialization & Git Foundation:** Implemented (awaiting formal acceptance).
- **P02 — Strapi CMS & PostgreSQL Foundation:** Implemented (awaiting formal acceptance).
- **P03 — Design System & Lightweight UI Foundation:** Implemented (awaiting formal acceptance).
- Subsequent phases (P04–P19) are not yet started.

## Repository Structure

```text
.
├── apps/
│   └── web/
│       ├── app/            # Next.js App Router entrypoints
│       ├── components/     # ui (P03), layout/sections/forms/seo (P04+)
│       ├── lib/            # design tokens (P03), strapi/routes/content/seo/validation (P04+)
│       ├── styles/         # Global Tailwind CSS stylesheet & NAVOSYS theme tokens
│       ├── tests/          # Vitest + Testing Library suite
│       └── types/          # TypeScript CMS contracts (populated in P04+)
├── cms/                    # Strapi 5 CMS (TypeScript + PostgreSQL)
├── docs/
│   ├── architecture/
│   ├── assets/
│   ├── deployment/
│   ├── master-specification/
│   └── phases/
├── infrastructure/
│   ├── deployment/
│   └── docker/
├── scripts/
├── .env.example
├── .gitignore
└── package.json
```

## Local Setup

1. Install web and CMS dependencies:
   ```bash
   npm --prefix apps/web install
   npm --prefix cms install
   ```
2. Copy `.env.example` to `.env` (or `apps/web/.env.local`) and `cms/.env.example` to `cms/.env` with strong local secrets. Never commit `.env` files or secrets.
3. Start PostgreSQL and Strapi 5:
   ```bash
   npm run db:up
   npm run cms:dev
   ```
4. Verify the frontend workspace:
   ```bash
   npm run verify
   ```
5. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Git & Deployment Governance

- The project owner manually creates and connects the GitHub repository remote.
- Never commit secrets, API tokens, credentials, or production `.env` files.
- Work proceeds strictly one authorized phase at a time.
