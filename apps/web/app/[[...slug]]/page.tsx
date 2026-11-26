import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { SectionRenderer } from "@/components/sections";
import { Breadcrumbs, StructuredData } from "@/components/seo";
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
  isSafeInternalPath,
  pathToSlugArray,
  slugArrayToPath,
} from "@/lib/routes/normalize";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import {
  getAllPublishedPages,
  getPublishedPageByPath,
  getRedirectByPath,
} from "@/lib/strapi/pages";

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
  const pages = await getAllPublishedPages();
  return pages.map((page) => {
    const segments = pathToSlugArray(page.fullPath);
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

  if (!pageResult.page) {
    return {
      title: layout.global.defaultSeoTitle || "NAVOSYS — Technical Foundation",
      description:
        layout.global.defaultSeoDescription ||
        "NAVOSYS enterprise technology services platform.",
    };
  }

  return buildPageMetadata(pageResult.page, layout.global);
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
                  Phase 06 — Section Library Ready
                </Badge>
                <Heading as="h1" id="foundation-heading" className="mt-4">
                  NAVOSYS Web Workspace Initialized
                </Heading>
                <Text variant="lead" className="mt-4 text-navy-muted">
                  Catch-all CMS routing, SEO metadata, and the reusable Dynamic
                  Zone section registry are active. Connect Strapi CMS to render
                  composed CMS pages.
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

  return (
    <main id="main-content" className="bg-canvas text-navy">
      <StructuredData data={structuredData} />

      {preview || (page.showBreadcrumbs && breadcrumbs.length > 1 && hasSections) ? (
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
