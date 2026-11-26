import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  'api::page.page.find',
  'api::page.page.findOne',
  'api::redirect.redirect.find',
  'api::redirect.redirect.findOne',
] as const;

async function ensurePublicRoutingPermissions(
  strapi: Core.Strapi
): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  for (const action of PUBLIC_READ_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action,
          role: publicRole.id,
        },
      });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }
}

async function ensurePage(
  strapi: Core.Strapi,
  input: {
    title: string;
    slug: string;
    fullPath: string;
    pageType:
      | 'home'
      | 'standard'
      | 'landing'
      | 'services_overview'
      | 'industries_overview'
      | 'case_studies_overview'
      | 'insights_overview'
      | 'contact'
      | 'legal';
    summary: string;
    body: string;
    parentDocumentId?: string;
    showBreadcrumbs: boolean;
    isIndexable: boolean;
    status: 'draft' | 'published';
    seo: {
      metaTitle: string;
      metaDescription: string;
      noIndex: boolean;
      noFollow: boolean;
      structuredDataType:
        | 'WebPage'
        | 'AboutPage'
        | 'ContactPage'
        | 'CollectionPage'
        | 'FAQPage';
    };
  }
): Promise<string> {
  const pageService = strapi.documents('api::page.page');
  const existing = await pageService.findMany({
    filters: { fullPath: input.fullPath },
    status: input.status,
  });

  if (existing.length > 0) {
    return existing[0].documentId;
  }

  const created = await pageService.create({
    status: input.status,
    data: {
      title: input.title,
      slug: input.slug,
      fullPath: input.fullPath,
      pageType: input.pageType,
      summary: input.summary,
      body: input.body,
      parent: input.parentDocumentId ?? null,
      showBreadcrumbs: input.showBreadcrumbs,
      isIndexable: input.isIndexable,
      seo: input.seo,
    },
  });

  return created.documentId;
}

async function ensureRedirect(
  strapi: Core.Strapi,
  input: {
    sourcePath: string;
    destinationPath: string;
    permanent: boolean;
    isActive: boolean;
    note: string;
  }
): Promise<void> {
  const redirectService = strapi.documents('api::redirect.redirect');
  const existing = await redirectService.findMany({
    filters: { sourcePath: input.sourcePath },
    status: 'published',
  });

  if (existing.length > 0) {
    return;
  }

  await redirectService.create({
    status: 'published',
    data: input,
  });
}

export async function seedRoutingFoundation(strapi: Core.Strapi): Promise<void> {
  await ensurePublicRoutingPermissions(strapi);

  await ensurePage(strapi, {
    title: 'NAVOSYS — Platform Foundation',
    slug: 'home',
    fullPath: '/',
    pageType: 'home',
    summary:
      'CMS-resolved root route active. Section library and homepage composition are scheduled for P06–P07.',
    body: 'This root page is resolved dynamically from Strapi via the Next.js catch-all resolver without hardcoded route files.',
    showBreadcrumbs: false,
    isIndexable: true,
    status: 'published',
    seo: {
      metaTitle: "NAVOSYS — Building What's Next.",
      metaDescription:
        'Enterprise technology services across Cloud & IT Solutions, AI & Intelligent Automation, Software Engineering, and Data & Analytics.',
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  const testParentDocId = await ensurePage(strapi, {
    title: 'P05 Routing Verification Parent',
    slug: 'p05-test',
    fullPath: '/p05-test',
    pageType: 'standard',
    summary:
      'CMS-managed parent route verifying catch-all dynamic resolution and SEO metadata.',
    body: 'Created in Strapi to verify dynamic routing without frontend code route additions.',
    showBreadcrumbs: true,
    isIndexable: true,
    status: 'published',
    seo: {
      metaTitle: 'P05 Routing Verification Parent | NAVOSYS',
      metaDescription:
        'Parent test page resolved dynamically by the NAVOSYS catch-all CMS router.',
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  await ensurePage(strapi, {
    title: 'P05 Nested Route Verification',
    slug: 'nested-page',
    fullPath: '/p05-test/nested-page',
    pageType: 'standard',
    summary:
      'Nested CMS page verifying multi-segment path resolution and breadcrumb hierarchy.',
    body: 'Resolved dynamically beneath /p05-test using parent hierarchy metadata.',
    parentDocumentId: testParentDocId,
    showBreadcrumbs: true,
    isIndexable: true,
    status: 'published',
    seo: {
      metaTitle: 'P05 Nested Route Verification | NAVOSYS',
      metaDescription:
        'Nested test page verifying multi-segment CMS routing and breadcrumbs.',
      noIndex: false,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  await ensurePage(strapi, {
    title: 'P05 Noindex Verification Page',
    slug: 'noindex-page',
    fullPath: '/p05-test/noindex-page',
    pageType: 'standard',
    summary:
      'Published CMS page marked non-indexable to verify robots noindex and sitemap exclusion.',
    body: 'This page resolves normally over HTTP while emitting noindex metadata and staying excluded from sitemap.xml.',
    parentDocumentId: testParentDocId,
    showBreadcrumbs: true,
    isIndexable: false,
    status: 'published',
    seo: {
      metaTitle: 'P05 Noindex Verification | NAVOSYS',
      metaDescription: 'Non-indexable CMS test route.',
      noIndex: true,
      noFollow: false,
      structuredDataType: 'WebPage',
    },
  });

  await ensurePage(strapi, {
    title: 'P05 Unpublished Draft Page',
    slug: 'draft-only',
    fullPath: '/p05-test/draft-only',
    pageType: 'standard',
    summary: 'Draft-only page excluded from public routes and sitemap.xml.',
    body: 'Visible only when authenticated preview mode is active.',
    parentDocumentId: testParentDocId,
    showBreadcrumbs: true,
    isIndexable: false,
    status: 'draft',
    seo: {
      metaTitle: 'P05 Draft Preview | NAVOSYS',
      metaDescription: 'Draft-only preview verification page.',
      noIndex: true,
      noFollow: true,
      structuredDataType: 'WebPage',
    },
  });

  await ensureRedirect(strapi, {
    sourcePath: '/p05-old-path',
    destinationPath: '/p05-test/nested-page',
    permanent: true,
    isActive: true,
    note: 'P05 CMS-managed redirect verification record',
  });
}
