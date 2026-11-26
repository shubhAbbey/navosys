import type { Core } from '@strapi/strapi';

export async function seedSectionBuilderFixture(
  strapi: Core.Strapi
): Promise<void> {
  const pageService = strapi.documents('api::page.page');

  const existing = await pageService.findMany({
    filters: { fullPath: '/p06-section-builder-test' },
    status: 'published',
  });

  if (existing.length > 0) {
    return;
  }

  await pageService.create({
    status: 'published',
    data: {
      title: 'P06 Page Builder & Section Library Verification',
      slug: 'p06-section-builder-test',
      fullPath: '/p06-section-builder-test',
      pageType: 'standard',
      summary:
        'Dynamic Zone verification page exercising the P06 reusable section registry without hardcoded page code.',
      showBreadcrumbs: true,
      isIndexable: false,
      seo: {
        metaTitle: 'P06 Section Library Verification | NAVOSYS',
        metaDescription:
          'Technical verification fixture for Strapi Dynamic Zones and typed section rendering.',
        noIndex: true,
        noFollow: true,
        structuredDataType: 'WebPage',
      },
      sections: [
        {
          __component: 'sections.hero',
          eyebrow: 'P06 Verification Fixture',
          heading: 'CMS-Driven Dynamic Zone Section Registry',
          subheading:
            'Every section on this route is composed from Strapi Dynamic Zones with typed schemas, surface variants, visibility toggles, and deterministic ordering.',
          alignment: 'left',
          primaryCta: {
            label: 'Get a Quote',
            url: '/contact/get-quote',
            variant: 'primary',
            isVisible: true,
          },
          secondaryCta: {
            label: 'Book a Consultation',
            url: '/contact/book-consultation',
            variant: 'outline',
            isVisible: true,
          },
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 1,
        },
        {
          __component: 'sections.card-grid',
          eyebrow: 'Modular Architecture',
          heading: 'Reusable Section Capabilities',
          intro:
            'Typed section components enforce contrast, responsive grids, and safe content serialization.',
          gridKind: 'features',
          columns: '3',
          items: [
            {
              eyebrow: '01',
              title: 'Typed Dynamic Zones',
              description:
                'Discriminated TypeScript unions match Strapi component schemas 1-to-1.',
              order: 1,
            },
            {
              eyebrow: '02',
              title: 'Visibility & Ordering',
              description:
                'Editors can toggle section visibility and control sort order without code changes.',
              order: 2,
            },
            {
              eyebrow: '03',
              title: 'Safe Content Rendering',
              description:
                'No raw HTML or arbitrary script execution is permitted from CMS payloads.',
              order: 3,
            },
          ],
          surface: 'sand',
          spacing: 'default',
          isVisible: true,
          sortOrder: 2,
        },
        {
          __component: 'sections.process-steps',
          eyebrow: 'Structured Delivery',
          heading: 'Six-Stage Engineering Model',
          layout: 'steps',
          steps: [
            {
              stepNumber: '01',
              title: 'Discover',
              description: 'Assess architecture, constraints, and business priorities.',
              order: 1,
            },
            {
              stepNumber: '02',
              title: 'Architect',
              description: 'Design resilient, maintainable target systems.',
              order: 2,
            },
            {
              stepNumber: '03',
              title: 'Build & Deploy',
              description: 'Deliver tested software with repeatable automation.',
              order: 3,
            },
          ],
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 3,
        },
        {
          __component: 'sections.tabs',
          eyebrow: 'Interactive Primitive',
          heading: 'Accessible Tabbed Section',
          tabs: [
            {
              label: 'Server First',
              title: 'Server Components by Default',
              content:
                'Static and presentational sections render exclusively on the server to keep client bundles minimal.',
              highlights: 'Zero client JS for non-interactive sections\nFast first load',
              order: 1,
            },
            {
              label: 'Keyboard Ready',
              title: 'WAI-ARIA Tab Navigation',
              content:
                'Interactive tabs support ArrowLeft, ArrowRight, Home, and End keyboard controls.',
              highlights: 'Accessible focus management\nClear selected states',
              order: 2,
            },
          ],
          surface: 'sand',
          spacing: 'default',
          isVisible: true,
          sortOrder: 4,
        },
        {
          __component: 'sections.faq-accordion',
          eyebrow: 'Questions',
          heading: 'Section Library FAQ',
          allowMultiple: false,
          items: [
            {
              question: 'Can CMS editors reorder or hide sections?',
              answer:
                'Yes. Each section includes visibility and sort-order controls evaluated by the frontend registry.',
              order: 1,
            },
            {
              question: 'Are unverified stats or testimonials rendered?',
              answer:
                'No. Stats, testimonials, partner logos, and team entries require explicit verification/approval flags.',
              order: 2,
            },
          ],
          surface: 'ivory',
          spacing: 'default',
          isVisible: true,
          sortOrder: 5,
        },
        {
          __component: 'sections.cta-banner',
          eyebrow: 'Next Steps',
          heading: 'Ready to Compose Production Pages',
          body: 'Homepage, service pillars, industries, insights, and lead forms build on this section library.',
          variant: 'banner',
          primaryCta: {
            label: 'Get a Quote',
            url: '/contact/get-quote',
            variant: 'primary',
            isVisible: true,
          },
          secondaryCta: {
            label: 'Book a Consultation',
            url: '/contact/book-consultation',
            variant: 'outline',
            isVisible: true,
          },
          surface: 'navy',
          spacing: 'default',
          isVisible: true,
          sortOrder: 6,
        },
      ],
    },
  });
}
