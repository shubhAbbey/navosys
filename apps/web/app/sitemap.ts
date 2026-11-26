import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/lib/seo/metadata";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import { getAllPublishedPages } from "@/lib/strapi/pages";
import { getAllPublishedServices } from "@/lib/strapi/services";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [layout, pages, services] = await Promise.all([
    getGlobalLayoutData(),
    getAllPublishedPages(),
    getAllPublishedServices(),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.isIndexable && !page.seo?.noIndex)
    .map((page) => ({
      url: buildCanonicalUrl(page.fullPath, layout.global),
      ...(page.updatedAt ? { lastModified: new Date(page.updatedAt) } : {}),
      changeFrequency: page.fullPath === "/" ? "weekly" : "monthly",
      priority: page.fullPath === "/" ? 1.0 : 0.7,
    }));

  const existingUrls = new Set(pageEntries.map((entry) => entry.url));

  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((service) => service.isIndexable)
    .map((service) => ({
      url: buildCanonicalUrl(service.fullPath, layout.global),
      ...(service.updatedAt
        ? { lastModified: new Date(service.updatedAt) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: service.isFeatured ? 0.85 : 0.75,
    }))
    .filter((entry) => !existingUrls.has(entry.url));

  return [...pageEntries, ...serviceEntries];
}
