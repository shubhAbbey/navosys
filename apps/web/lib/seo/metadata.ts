import type { Metadata } from "next";
import type { BreadcrumbItem, CmsSeo, GlobalSettings } from "@/types/cms";
import { normalizePath } from "@/lib/routes/normalize";

export interface SeoRecordLike {
  title: string;
  fullPath: string;
  summary: string | null;
  isIndexable: boolean;
  seo: CmsSeo | null;
}

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
  record: SeoRecordLike,
  global: GlobalSettings
): Metadata {
  const title =
    record.seo?.metaTitle ||
    `${record.title} | ${global.siteName || "NAVOSYS"}`;
  const description =
    record.seo?.metaDescription ||
    record.summary ||
    global.defaultSeoDescription ||
    "Enterprise technology services across Cloud, AI, Software Engineering, and Data Analytics.";

  const canonical = buildCanonicalUrl(
    record.fullPath,
    global,
    record.seo?.canonicalUrl
  );

  const ogTitle = record.seo?.ogTitle || title;
  const ogDescription = record.seo?.ogDescription || description;
  const ogImageUrl = record.seo?.ogImage?.url;

  const allowIndex = record.isIndexable && !record.seo?.noIndex;
  const allowFollow = !record.seo?.noFollow;

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
                ...(record.seo?.ogImage?.width
                  ? { width: record.seo.ogImage.width }
                  : {}),
                ...(record.seo?.ogImage?.height
                  ? { height: record.seo.ogImage.height }
                  : {}),
                alt: record.seo?.ogImage?.alternativeText || record.title,
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
  record: SeoRecordLike,
  global: GlobalSettings,
  breadcrumbs: BreadcrumbItem[]
): Record<string, unknown> {
  const canonical = buildCanonicalUrl(
    record.fullPath,
    global,
    record.seo?.canonicalUrl
  );
  const baseUrl = getSiteBaseUrl(global);

  const graph: Record<string, unknown>[] = [
    {
      "@type": record.seo?.structuredDataType || "WebPage",
      "@id": canonical,
      url: canonical,
      name: record.seo?.metaTitle || record.title,
      description:
        record.seo?.metaDescription ||
        record.summary ||
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
