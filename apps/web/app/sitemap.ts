import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/lib/seo/metadata";
import { getAllPublishedCaseStudies } from "@/lib/strapi/case-studies";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import { getAllPublishedIndustries } from "@/lib/strapi/industries";
import { getAllPublishedPages } from "@/lib/strapi/pages";
import { getAllPublishedServices } from "@/lib/strapi/services";

export const dynamic = "force-dynamic";

function mapCollectionEntries(
  items: Array<{
    fullPath: string;
    updatedAt?: string;
    isIndexable: boolean;
    isFeatured: boolean;
  }>,
  global: Awaited<ReturnType<typeof getGlobalLayoutData>>["global"],
  existingUrls: Set<string>
): MetadataRoute.Sitemap {
  return items
    .filter((item) => item.isIndexable)
    .map((item) => {
      const url = buildCanonicalUrl(item.fullPath, global);
      existingUrls.add(url);
      return {
        url,
        ...(item.updatedAt ? { lastModified: new Date(item.updatedAt) } : {}),
        changeFrequency: "monthly" as const,
        priority: item.isFeatured ? 0.85 : 0.75,
      };
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [layout, pages, services, industries, caseStudies] = await Promise.all([
    getGlobalLayoutData(),
    getAllPublishedPages(),
    getAllPublishedServices(),
    getAllPublishedIndustries(),
    getAllPublishedCaseStudies(),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.isIndexable && !page.seo?.noIndex)
    .map((page) => ({
      url: buildCanonicalUrl(page.fullPath, layout.global),
      ...(page.updatedAt ? { lastModified: new Date(page.updatedAt) } : {}),
      changeFrequency: page.fullPath === "/" ? "weekly" : "monthly",
      priority: page.fullPath === "/" ? 1.0 : 0.7,
    }));

  const seenUrls = new Set(pageEntries.map((entry) => entry.url));

  const dedupeAndCollect = (
    items: Array<{
      fullPath: string;
      updatedAt?: string;
      isIndexable: boolean;
      isFeatured: boolean;
    }>
  ) => {
    const unvisited = items.filter(
      (item) => !seenUrls.has(buildCanonicalUrl(item.fullPath, layout.global))
    );
    return mapCollectionEntries(unvisited, layout.global, seenUrls);
  };

  return [
    ...pageEntries,
    ...dedupeAndCollect(services),
    ...dedupeAndCollect(industries),
    ...dedupeAndCollect(caseStudies),
  ];
}
