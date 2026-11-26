# NAVOSYS Website — Master Specification (M0)
Version: 1.0
Status: Governing specification for all implementation phases

## Brand & Purpose
Brand: NAVOSYS. Preferred domain: navosys.in (domain purchase and legal clearance must be independently verified).
Positioning: Premium, modern technology services company.
Proposed tagline: Building What's Next.
Four service pillars:
1. Cloud & IT Solutions (migration, hybrid cloud, managed IT, infrastructure/DevOps, modernization)
2. AI & Intelligent Automation (AI agents, workflows, business automation, AI integration)
3. Software Engineering (web, mobile, enterprise applications, maintenance/support, modernization)
4. Data & Analytics (data engineering, BI, analytics, dashboards and visualization)

## Core Principles
- CMS-first: Strapi is the source of truth for public content, page composition, navigation, links, labels, CTAs, images, SEO, footer, services, industries, articles, case studies, FAQs, and configurable forms.
- No hardcoded content pages or navigation. Use a catch-all route and CMS route resolution.
- Frontend code contains rendering, design system, component logic, validation, security, and approved fallback/error UI—not editable marketing copy.
- Use approved finite reusable section types. CMS cannot execute arbitrary JS or unsafe HTML.
- Lightweight: Next.js App Router, TypeScript, Server Components by default, minimal dependencies, avoid Redux unless a justified requirement, no unnecessary client-side state or animation.
- Content must be credible. Never invent clients, testimonials, certifications, awards, partner logos, or performance metrics. Clearly label conceptual examples.
- Every image must be managed in Strapi; plan assets, generate or license appropriately, upload to CMS, add descriptive alt text and asset metadata. Never hardcode production image URLs.
- Responsive, accessible, SEO-ready and secure.

## Architecture
- Next.js App Router + TypeScript + Tailwind
- Strapi 5 CMS
- PostgreSQL
- Next.js server-side CMS API client
- Catch-all CMS route resolver
- Reusable section registry and Strapi Dynamic Zones
- Secure server-side inquiry API, separate from public content API
- Nginx/reverse proxy, HTTPS, deployment and backup documentation
- Development, staging and production environment separation

## Simple Repository Structure
navosys-website/
  apps/web/app (layout, home, catch-all route, API inquiry, not-found)
  apps/web/components/{layout,sections,forms,ui,seo}
  apps/web/lib/{strapi,routes,content,seo,validation}
  apps/web/types/cms.ts
  apps/web/styles/globals.css
  apps/web/tests
  cms/ (Strapi project)
  infrastructure/{docker,deployment}
  docs/{master-specification,phases,architecture,assets,deployment}
  scripts/
  .env.example, README.md, package.json, .gitignore

Keep the structure simple and adjust only with documented justification.

## CMS Content Types (evolve by phase)
- Global Settings (logo, favicon, contact, social, global defaults, banner, CTA settings)
- Navigation Menu / Navigation Item (nested, ordered, visibility, destination, CTA)
- Universal Page (title, slug/full path, page type, dynamic sections, parent, SEO, breadcrumbs, publish state, redirects/visibility)
- Service (title, slug, pillar/category, summary, descriptions, capabilities, benefits, deliverables, process, technologies, use cases, FAQ, related content, image, SEO, order, featured, status)
- Industry (title, slug, challenges, solutions, use cases, linked services, case studies/articles, FAQ, image, SEO, order, status)
- Article/Insight (title, slug, summary, body, author, categories, tags, featured image, dates, related content, SEO, publish status)
- Case Study / Conceptual Case (client disclosure permission, industry, challenge, solution, process, outcomes, technologies, services, images, SEO; conceptual examples must be clearly marked)
- FAQ, category, author, assets and form configuration as appropriate
- Lead form configuration, inquiry type/service options, conditional fields, confirmation text, notification configuration (secrets in environment only)
- SEO fields and redirects

## Dynamic Routing
- Catch-all route resolves published CMS records by normalized full path.
- Support root, nested, custom slugs, hierarchy, page types and published status.
- No individual hardcoded service/article/industry route files.
- Handle route conflicts, missing pages, redirects, breadcrumbs, canonical, sitemap, metadata, preview and cache revalidation.
- CMS-created page/service/industry/article/case study must render without frontend code changes when composed of approved section types.
- Use typed API responses and graceful failure states.

## Approved Section Library (implement as phased registry)
Hero, Split Hero, Image/Text, Rich Text, Feature Grid, Service Grid, Industry Grid, Blog Grid, Case Study Grid, Stats (only verified), CTA Banner, Process Steps, Timeline, FAQ/Accordion, Testimonials (verified only), approved logo grid, Technology Grid, Comparison Table, Tabs, Image Gallery, Video, Quote, Contact/Quote/Consultation Form, Newsletter, Team, Related Services, Related Articles, Breadcrumbs, Sticky CTA, Footer CTA.
Sections support CMS content, assets/alt, variants, visibility, ordering, CTA settings, responsive behavior. No arbitrary executable code.

## Lead Generation — pervasive, not optional
- Primary CTA: Get a Quote. Secondary CTA: Book a Consultation. Additional contextual CTA: Discuss a Project / Request Assessment.
- CMS-configured CTAs in header, homepage, service/industry/article/case study pages, reusable page sections and footer; placement rules documented. Do not add inappropriate quote CTA to careers/legal pages.
- Subtle sticky/floating CTA or mobile bottom CTA, configurable and dismissible, never obstruct content or accessibility.
- Dedicated routes: /contact/get-quote, /contact/book-consultation, /contact/request-assessment, plus /contact. Routes themselves resolve through CMS page records/approved templates.
- Quote form fields: name, business email, company (optional), phone (optional), country (optional), service (dynamic), description, timeframe (optional), budget (optional), preferred contact (optional), consent as applicable.
- Consultation form: name, email, company, interest (CMS-driven), discussion summary, consultation preference, optional timezone, consent.
- Assessment forms/types configurable through CMS (cloud readiness, AI automation, modernization, data assessment, etc.).
- Prefill service/inquiry type from validated query parameters; no trusting arbitrary values.
- Server validation, rate limiting, spam prevention, consent, safe storage, notifications, confirmation/error states.
- Do not expose submitted leads through public Strapi API. Use secure server endpoint and restricted storage/collection or separate table. Schema should be CRM-ready.
- Attribution capture: landing page, referrer, first/last landing page (policy-defined), UTM source/medium/campaign/content/term, service, form ID, inquiry type, timestamp. Respect privacy/consent requirements.
- MVP stores submissions securely and sends notification. CRM pipeline/dashboard can be future scope; schema should accommodate statuses.

## Initial Industries (CMS records, not promises of expertise)
Financial Services, Healthcare, Retail & eCommerce, Logistics & Supply Chain, Manufacturing, Professional Services. Pages describe potential challenges/use cases and relevant solutions, not fabricated experience. Add/remove in CMS.

## Initial Sitemap
Home; Services overview; Cloud & IT; Cloud Migration; Hybrid Cloud; Managed IT; Infrastructure & DevOps; IT Modernization; AI & Automation; AI Agents; Business Automation; AI Integration; Software Engineering; Web Development; Mobile App Development; Enterprise Applications; Software Maintenance; Application Modernization; Data & Analytics; Data Engineering; Business Intelligence; Data Visualization; About; Approach; Industries listing/dynamic detail; Case Studies listing/dynamic detail; Insights listing/dynamic article; Contact; Get a Quote; Book Consultation; Request Assessment; Careers and dynamic career records if included; FAQ; Privacy; Terms; Cookie Policy; 404.
Initial routes are CMS records and are not hardcoded page implementations.

## Design & UX
Premium, minimal, modern enterprise technology. Proposed palette (not final until P03): deep navy #101A2C, white/off-white #F8FAFC, slate #64748B, teal accent #0D9488. Avoid clutter, excessive gradients, generic robot imagery and overdesign. Responsive, readable, consistent spacing, subtle motion, reduced-motion support, accessible focus and contrast.

## Image Workflow
For each phase, provide an asset plan: asset name, page/section, subject, composition, aspect ratio, style, placement, alt text, license/attribution if relevant. Generate original images or use appropriately licensed assets; upload and link via Strapi. Do not use random stock imagery or fabricated business evidence.

## SEO
CMS-managed title, meta description, canonical, OG title/description/image, social metadata, index/noindex, structured data where appropriate, breadcrumb, sitemap, redirects and slug-change handling. Sitemap includes only published/indexable records.

## Performance
Server Components by default; client components only for interaction. Optimize images, fonts, cache CMS data, use revalidation, reduce JS, avoid layout shifts and unnecessary scripts. Measure Core Web Vitals; don't claim results without evidence.

## Accessibility
Aim for WCAG 2.2 AA where practical: semantic headings/HTML, keyboard navigation, visible focus, accessible forms, alt text, accessible dropdowns/accordions, reduced motion.

## Security
Secrets only in environment variables; never commit secrets. Restrict CMS permissions; public API only for published content. Validate/sanitize input/output; protect inquiry endpoint; rate limit and spam protect; security headers; secure preview/webhooks; audit dependencies; no privileged token in browser; DB not publicly exposed.

## Deployment
Document development/staging/production. Suggested domains (subject to configuration): navosys.in, cms.navosys.in, staging.navosys.in, staging-cms.navosys.in. Deploy with Git, CI checks, staging verification, approved production release, health checks, monitoring/logging, backups and rollback. Nginx/reverse proxy, HTTPS, persistent DB/media, backup/restore procedures.

## Git & Phase Protocol
User creates GitHub repository manually and connects project/remote. Anti-Gravity may initialize project and prepare Git commits/pushes only after remote connection and user authorization/configuration. Do not create GitHub account/repository on behalf of user. Never commit secrets. Each phase:
1 Read M0 and phase.
2 Inspect current repository and status.
3 Plan.
4 Implement within scope.
5 Add/update CMS schemas and content.
6 Asset plan/generation/import as required.
7 Test, lint, typecheck, build and relevant E2E.
8 Review responsive/accessibility/security.
9 Update docs and phase report.
10 Commit and push if remote configured and authorized.
Do not start next phase automatically unless the phase instruction or user authorizes it.

## Phase Report
Report phase/status, objective, summary, files, schema/content/assets, tests and results, build, responsive/accessibility/security review, deployment, commit/push status, known issues, acceptance checklist, and status (IMPLEMENTED/FAILED/AWAITING ACCEPTANCE). Acceptance is distinct from implementation.
