import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  CaseStudiesCatalog,
  CaseStudyDetailView,
} from "@/components/case-studies";
import { IndustriesCatalog, IndustryDetailView } from "@/components/industries";
import { SectionRenderer } from "@/components/sections";
import { Breadcrumbs, StructuredData } from "@/components/seo";
import { ServiceDetailView, ServicesCatalog } from "@/components/services";
import {
  Alert,
  Badge,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";
import {
  buildPageMetadata,
  buildPageStructuredData,
} from "@/lib/seo/metadata";
import {
  buildBreadcrumbs,
  detectRouteConflicts,
  isSafeInternalPath,
  pathToSlugArray,
  slugArrayToPath,
} from "@/lib/routes/normalize";
import {
  getAllPublishedCaseStudies,
  getPublishedCaseStudyByPath,
} from "@/lib/strapi/case-studies";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import {
  getAllPublishedIndustries,
  getPublishedIndustryByPath,
} from "@/lib/strapi/industries";
import {
  getAllPublishedPages,
  getPublishedPageByPath,
  getRedirectByPath,
} from "@/lib/strapi/pages";
import {
  getAllPublishedServices,
  getPublishedServiceByPath,
} from "@/lib/strapi/services";
import type { BreadcrumbItem, CmsPage } from "@/types/cms";

export const revalidate = 60;

interface CatchAllPageProps {
  params: Promise<{ slug?: string[] }>;
}

async function isDraftPreviewEnabled(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export async function generateStaticParams(): Promise<
  Array<{ slug?: string[] }>
> {
  const [pages, services, industries, caseStudies] = await Promise.all([
    getAllPublishedPages(),
    getAllPublishedServices(),
    getAllPublishedIndustries(),
    getAllPublishedCaseStudies(),
  ]);

  const combined = [
    ...pages.map((p) => ({ fullPath: p.fullPath, documentId: p.documentId })),
    ...services.map((s) => ({ fullPath: s.fullPath, documentId: s.documentId })),
    ...industries.map((i) => ({ fullPath: i.fullPath, documentId: i.documentId })),
    ...caseStudies.map((c) => ({ fullPath: c.fullPath, documentId: c.documentId })),
  ];
  const conflicts = new Set(
    detectRouteConflicts(combined).map((conflict) => conflict.fullPath)
  );

  const uniquePaths = Array.from(
    new Set(combined.map((item) => item.fullPath))
  ).filter((fullPath) => !conflicts.has(fullPath));

  return uniquePaths.map((fullPath) => {
    const segments = pathToSlugArray(fullPath);
    return segments.length === 0 ? {} : { slug: segments };
  });
}

export async function generateMetadata({
  params,
}: CatchAllPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const normalizedPath = slugArrayToPath(resolvedParams.slug);
  const preview = await isDraftPreviewEnabled();

  const [layout, pageResult] = await Promise.all([
    getGlobalLayoutData(),
    getPublishedPageByPath(normalizedPath, { preview }),
  ]);

  if (pageResult.page) {
    return buildPageMetadata(pageResult.page, layout.global);
  }

  if (normalizedPath.startsWith("/services/")) {
    const service = await getPublishedServiceByPath(normalizedPath, {
      preview,
    });
    if (service) {
      return buildPageMetadata(service, layout.global);
    }
  }

  if (normalizedPath.startsWith("/industries/")) {
    const industry = await getPublishedIndustryByPath(normalizedPath, {
      preview,
    });
    if (industry) {
      return buildPageMetadata(industry, layout.global);
    }
  }

  if (normalizedPath.startsWith("/case-studies/")) {
    const caseStudy = await getPublishedCaseStudyByPath(normalizedPath, {
      preview,
    });
    if (caseStudy) {
      return buildPageMetadata(caseStudy, layout.global);
    }
  }

  return {
    title: layout.global.defaultSeoTitle || "NAVOSYS — Technical Foundation",
    description:
      layout.global.defaultSeoDescription ||
      "NAVOSYS enterprise technology services platform.",
  };
}

function renderOverviewWithCatalog(
  page: CmsPage,
  breadcrumbs: BreadcrumbItem[],
  structuredData: Record<string, unknown>,
  catalog: ReactNode
) {
  const sortedSections = [...(page.sections ?? [])]
    .filter((section) => section.isVisible !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const topSections = sortedSections.filter((s) => (s.sortOrder ?? 0) < 50);
  const bottomSections = sortedSections.filter((s) => (s.sortOrder ?? 0) >= 50);

  return (
    <main id="main-content" className="bg-canvas text-navy">
      <StructuredData data={structuredData} />
      {page.showBreadcrumbs && breadcrumbs.length > 1 ? (
        <div className="bg-canvas pt-6">
          <Container size="wide">
            <Breadcrumbs items={breadcrumbs} />
          </Container>
        </div>
      ) : null}
      <SectionRenderer sections={topSections} />
      {catalog}
      <SectionRenderer sections={bottomSections} />
    </main>
  );
}

export default async function CmsCatchAllPage({ params }: CatchAllPageProps) {
  const resolvedParams = await params;
  const normalizedPath = slugArrayToPath(resolvedParams.slug);
  const preview = await isDraftPreviewEnabled();

  const redirectRecord = await getRedirectByPath(normalizedPath);
  if (redirectRecord) {
    const target = redirectRecord.destinationPath;
    if (isSafeInternalPath(target) || /^https?:\/\//i.test(target)) {
      if (redirectRecord.permanent) {
        permanentRedirect(target);
      }
      redirect(target);
    }
  }

  const [layout, pageResult] = await Promise.all([
    getGlobalLayoutData(),
    getPublishedPageByPath(normalizedPath, { preview }),
  ]);

  if (pageResult.conflict) {
    return (
      <main id="main-content" className="bg-canvas text-navy">
        <Section surface="ivory" spacing="spacious">
          <Container size="narrow">
            <Alert variant="error" title="Route conflict detected">
              Multiple CMS records resolve to <code>{normalizedPath}</code>.
              Resolve the duplicate path in Strapi Admin.
            </Alert>
          </Container>
        </Section>
      </main>
    );
  }

  if (!pageResult.page) {
    if (normalizedPath.startsWith("/services/")) {
      const service = await getPublishedServiceByPath(normalizedPath, {
        preview,
      });
      if (service) {
        const serviceStructuredData = buildPageStructuredData(
          service,
          layout.global,
          [
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: service.fullPath },
          ]
        );
        return (
          <main id="main-content" className="bg-canvas text-navy">
            <StructuredData data={serviceStructuredData} />
            <ServiceDetailView service={service} />
          </main>
        );
      }
    }

    if (normalizedPath.startsWith("/industries/")) {
      const industry = await getPublishedIndustryByPath(normalizedPath, {
        preview,
      });
      if (industry) {
        const industryStructuredData = buildPageStructuredData(
          industry,
          layout.global,
          [
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: industry.title, href: industry.fullPath },
          ]
        );
        return (
          <main id="main-content" className="bg-canvas text-navy">
            <StructuredData data={industryStructuredData} />
            <IndustryDetailView industry={industry} />
          </main>
        );
      }
    }

    if (normalizedPath.startsWith("/case-studies/")) {
      const caseStudy = await getPublishedCaseStudyByPath(normalizedPath, {
        preview,
      });
      if (caseStudy) {
        const caseStudyStructuredData = buildPageStructuredData(
          caseStudy,
          layout.global,
          [
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies" },
            { label: caseStudy.title, href: caseStudy.fullPath },
          ]
        );
        return (
          <main id="main-content" className="bg-canvas text-navy">
            <StructuredData data={caseStudyStructuredData} />
            <CaseStudyDetailView caseStudy={caseStudy} />
          </main>
        );
      }
    }

    if (normalizedPath === "/" && pageResult.source === "offline") {
      return (
        <main id="main-content" className="bg-canvas text-navy">
          <Section
            surface="ivory"
            spacing="spacious"
            aria-labelledby="foundation-heading"
            className="flex min-h-[65vh] items-center"
          >
            <Container size="narrow">
              <Card surface="sand">
                <Badge variant="gold">
                  Phase 08 — Dynamic Services Ready
                </Badge>
                <Heading as="h1" id="foundation-heading" className="mt-4">
                  NAVOSYS Web Workspace Initialized
                </Heading>
                <Text variant="lead" className="mt-4 text-navy-muted">
                  Catch-all CMS routing, SEO metadata, and dynamic service
                  discovery are active. Connect Strapi CMS to render published
                  CMS pages and services.
                </Text>
              </Card>
            </Container>
          </Section>
        </main>
      );
    }

    notFound();
  }

  const { page } = pageResult;
  const breadcrumbs = buildBreadcrumbs(page);
  const structuredData = buildPageStructuredData(
    page,
    layout.global,
    breadcrumbs
  );
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;

  if (page.pageType === "services_overview") {
    const services = await getAllPublishedServices();
    return renderOverviewWithCatalog(
      page,
      breadcrumbs,
      structuredData,
      <ServicesCatalog services={services} />
    );
  }

  if (page.pageType === "industries_overview") {
    const industries = await getAllPublishedIndustries();
    return renderOverviewWithCatalog(
      page,
      breadcrumbs,
      structuredData,
      <IndustriesCatalog industries={industries} />
    );
  }

  if (page.pageType === "case_studies_overview") {
    const caseStudies = await getAllPublishedCaseStudies();
    return renderOverviewWithCatalog(
      page,
      breadcrumbs,
      structuredData,
      <CaseStudiesCatalog caseStudies={caseStudies} />
    );
  }

  return (
    <main id="main-content" className="bg-canvas text-navy">
      <StructuredData data={structuredData} />

      {preview ||
      (page.showBreadcrumbs && breadcrumbs.length > 1 && hasSections) ? (
        <div className="bg-canvas pt-6">
          <Container size="wide">
            {preview ? (
              <Alert
                variant="warning"
                title="Preview mode active"
                className="mb-4"
              >
                Viewing CMS content in preview mode.{" "}
                <a
                  href={`/api/preview?exit=true&path=${encodeURIComponent(normalizedPath)}`}
                  className="font-semibold underline underline-offset-4"
                >
                  Exit preview
                </a>
              </Alert>
            ) : null}
            {page.showBreadcrumbs && breadcrumbs.length > 1 && hasSections ? (
              <Breadcrumbs items={breadcrumbs} />
            ) : null}
          </Container>
        </div>
      ) : null}

      {hasSections ? (
        <SectionRenderer sections={page.sections} />
      ) : (
        <Section
          surface="ivory"
          spacing="default"
          aria-labelledby="page-heading"
          className="min-h-[65vh]"
        >
          <Container size="default">
            {page.showBreadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}

            <Card surface="sand">
              <Badge variant="neutral">{page.pageType}</Badge>
              <Heading as="h1" id="page-heading" className="mt-4">
                {page.title}
              </Heading>
              {page.summary ? (
                <Text variant="lead" className="mt-4 text-navy-muted">
                  {page.summary}
                </Text>
              ) : null}
              {page.body ? (
                <Text className="mt-4 text-navy">{page.body}</Text>
              ) : null}
            </Card>
          </Container>
        </Section>
      )}
    </main>
  );
}
