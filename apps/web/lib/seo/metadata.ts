import type { Metadata } from "next";
import type { BreadcrumbItem, CmsPage, GlobalSettings } from "@/types/cms";
import { normalizePath } from "@/lib/routes/normalize";

export function getSiteBaseUrl(global?: Partial<GlobalSettings> | null): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const cmsUrl = global?.siteUrl?.trim();
  const raw = envUrl || cmsUrl || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function buildCanonicalUrl(
  fullPath: string,
  global?: Partial<GlobalSettings> | null,
  explicitCanonical?: string | null
): string {
  if (explicitCanonical && /^https?:\/\//i.test(explicitCanonical)) {
    return explicitCanonical;
  }
  const baseUrl = getSiteBaseUrl(global);
  const normalized = normalizePath(fullPath);
  return normalized === "/" ? `${baseUrl}/` : `${baseUrl}${normalized}`;
}

export function buildPageMetadata(
  page: CmsPage,
  global: GlobalSettings
): Metadata {
  const title =
    page.seo?.metaTitle ||
    `${page.title} | ${global.siteName || "NAVOSYS"}`;
  const description =
    page.seo?.metaDescription ||
    page.summary ||
    global.defaultSeoDescription ||
    "Enterprise technology services across Cloud, AI, Software Engineering, and Data Analytics.";

  const canonical = buildCanonicalUrl(
    page.fullPath,
    global,
    page.seo?.canonicalUrl
  );

  const ogTitle = page.seo?.ogTitle || title;
  const ogDescription = page.seo?.ogDescription || description;
  const ogImageUrl = page.seo?.ogImage?.url;

  const allowIndex = page.isIndexable && !page.seo?.noIndex;
  const allowFollow = !page.seo?.noFollow;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: allowIndex,
      follow: allowFollow,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: global.siteName || "NAVOSYS",
      type: "website",
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                ...(page.seo?.ogImage?.width
                  ? { width: page.seo.ogImage.width }
                  : {}),
                ...(page.seo?.ogImage?.height
                  ? { height: page.seo.ogImage.height }
                  : {}),
                alt: page.seo?.ogImage?.alternativeText || page.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export function buildPageStructuredData(
  page: CmsPage,
  global: GlobalSettings,
  breadcrumbs: BreadcrumbItem[]
): Record<string, unknown> {
  const canonical = buildCanonicalUrl(
    page.fullPath,
    global,
    page.seo?.canonicalUrl
  );
  const baseUrl = getSiteBaseUrl(global);

  const graph: Record<string, unknown>[] = [
    {
      "@type": page.seo?.structuredDataType || "WebPage",
      "@id": canonical,
      url: canonical,
      name: page.seo?.metaTitle || page.title,
      description:
        page.seo?.metaDescription ||
        page.summary ||
        global.defaultSeoDescription ||
        undefined,
      isPartOf: {
        "@type": "WebSite",
        name: global.siteName || "NAVOSYS",
        url: baseUrl,
      },
    },
  ];

  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: buildCanonicalUrl(crumb.href, global),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
