# Dynamic Routing, Page Resolver & SEO Foundation (P05)

## Catch-All Routing Architecture

- **Single Catch-All Route:** `apps/web/app/[[...slug]]/page.tsx` handles root (`/`), top-level (`/p05-test`), and nested (`/p05-test/nested-page`) routes without individual hardcoded page files.
- **Path Normalization (`apps/web/lib/routes/normalize.ts`):** Normalizes slashes, lowercases path segments, strips query/hash fragments, rejects `..` traversal, and blocks reserved prefixes (`/api`, `/_next`, `/admin`).
- **Route Conflict Handling:** Strapi `page` enforces unique `fullPath` + `beforeCreate`/`beforeUpdate` normalization/reserved-prefix validation (`cms/src/api/page/content-types/page/lifecycles.ts`), and `detectRouteConflicts()` guards `getAllPublishedPages()` / `getPublishedPageByPath()` against duplicate paths.
- **Redirects:** Strapi `redirect` collection (`sourcePath`, `destinationPath`, `permanent`, `isActive`) is checked before page resolution, issuing `permanentRedirect()` (308) or `redirect()` (307) safely.

## SEO, Sitemap & Robots

- **Metadata (`apps/web/lib/seo/metadata.ts`):** Generates dynamic `title`, `description`, `alternates.canonical`, `robots` (`index`/`follow`), `openGraph`, and `twitter` metadata from Strapi `shared.seo` + `global-setting` fallbacks.
- **Structured Data (`apps/web/components/seo/StructuredData.tsx`):** Emits XSS-safe JSON-LD (`WebPage` / `BreadcrumbList`).
- **Sitemap (`apps/web/app/sitemap.ts`):** Includes only `published` and `isIndexable && !seo.noIndex` pages.
- **Robots (`apps/web/app/robots.ts`):** Allows `/` while disallowing `/api/` and publishing `sitemap.xml`.

## Preview & Cache Revalidation Security

- **Preview (`GET /api/preview`):** Requires constant-time verified `STRAPI_PREVIEW_SECRET`, rejects external/protocol-relative open redirects (`//...`), enables Next.js `draftMode()`, and queries Strapi draft state only when server-only `STRAPI_API_TOKEN` is configured.
- **Revalidation (`POST /api/revalidate`):** Requires constant-time verified `STRAPI_REVALIDATE_SECRET` (`x-revalidate-secret` header or Bearer token) and restricts revalidation to allowlisted tags (`global-setting`, `navigation-menu`, `pages`, `redirects`, `page:/...`) and safe internal paths.
