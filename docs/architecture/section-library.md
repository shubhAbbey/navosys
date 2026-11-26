# CMS Page Builder & Reusable Section Library (P06)

## Strapi Dynamic Zone Architecture

Universal `page` records in Strapi (`cms/src/api/page/content-types/page/schema.json`) compose arbitrary layouts from 18 approved Dynamic Zone section components under `cms/src/components/sections/`:

- `sections.hero`, `sections.split-hero`, `sections.image-text`, `sections.rich-text`
- `sections.card-grid` (covers Feature, Service, Industry, Blog/Insights, Case Study, Technology, Related Services, and Related Articles grids via `gridKind`)
- `sections.stats` (verified-only enforcement)
- `sections.cta-banner` (banner and footer conversion variants)
- `sections.process-steps` (process grid and timeline variants)
- `sections.faq-accordion`, `sections.tabs`, `sections.comparison-table`
- `sections.image-gallery`, `sections.video-embed`
- `sections.quote-block`, `sections.testimonials` (verified-only), `sections.logo-grid` (approved-only), `sections.team-grid` (approved-only)
- `sections.form-placeholder` (conversion hook upgraded in P17)

Every section supports `anchorId`, `surface` (`ivory` | `sand` | `navy`), `spacing` (`compact` | `default` | `spacious`), `isVisible`, and `sortOrder`.

## Frontend Section Registry & Security

- **Registry (`apps/web/components/sections/SectionRenderer.tsx`):** Filters hidden sections, sorts deterministically by `sortOrder`, and dispatches only known typed components.
- **No Arbitrary Executable Content:** `RichTextSection` parses controlled headings/paragraphs/lists via `parseSafeRichText()` without `dangerouslySetInnerHTML`, CTA links are validated by `isSafeLinkUrl()`, and `VideoSection` restricts external embeds to explicit HTTPS YouTube/Vimeo embed origins.
- **Credibility Enforcement:** `StatsSection`, `TestimonialsSection`, `LogoGridSection`, and `TeamGridSection` drop items lacking `isVerified: true` / `isApproved: true`.
- **Minimal Client JS:** Only `FaqAccordionInteractive` and `TabsInteractive` use `"use client"`.
