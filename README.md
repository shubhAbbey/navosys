# NAVOSYS Website MVP

Technical repository for the NAVOSYS company website MVP, structured according to `NAVOSYS_MVP_Implementation_Pack/master/M0_MASTER_SPECIFICATION.md`.

## Architecture Overview

- **Frontend (`apps/web`):** Next.js App Router, TypeScript, Tailwind CSS (Server Components by default, minimal client-side JavaScript).
- **CMS (`cms/`):** Strapi 5 + PostgreSQL (scheduled for **P02**).
- **Infrastructure (`infrastructure/`):** Docker and deployment configurations (scheduled for later phases).
- **Documentation (`docs/`):** Architecture notes, phase reports, asset plans, and deployment guides.

## Current Phase Status

- **P01 — Repository, Project Initialization & Git Foundation:** Implemented (awaiting formal acceptance).
- Subsequent phases (P02–P19) are not yet started.

## Repository Structure

```text
.
├── apps/
│   └── web/
│       ├── app/            # Next.js App Router entrypoints
│       ├── components/     # layout, sections, forms, ui, seo (populated in P03+)
│       ├── lib/            # strapi, routes, content, seo, validation (populated in P02+)
│       ├── styles/         # Global Tailwind CSS stylesheet
│       ├── tests/          # Vitest + Testing Library suite
│       └── types/          # TypeScript CMS contracts (populated in P02+)
├── cms/                    # Reserved for Strapi 5 (P02)
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

## Local Setup (P01)

1. Install dependencies:
   ```bash
   npm --prefix apps/web install
   ```
2. Copy `.env.example` to `.env` (or `apps/web/.env.local`) as needed for local development. Never commit `.env` files or secrets.
3. Run verification scripts from the repository root:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```

## Git & Deployment Governance

- The project owner manually creates and connects the GitHub repository remote.
- Never commit secrets, API tokens, credentials, or production `.env` files.
- Work proceeds strictly one authorized phase at a time.
