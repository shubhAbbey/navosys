import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/lib/seo/metadata";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import { getAllPublishedPages } from "@/lib/strapi/pages";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [layout, pages] = await Promise.all([
    getGlobalLayoutData(),
    getAllPublishedPages(),
  ]);

  return pages
    .filter((page) => page.isIndexable && !page.seo?.noIndex)
    .map((page) => ({
      url: buildCanonicalUrl(page.fullPath, layout.global),
      ...(page.updatedAt ? { lastModified: new Date(page.updatedAt) } : {}),
      changeFrequency: page.fullPath === "/" ? "weekly" : "monthly",
      priority: page.fullPath === "/" ? 1.0 : 0.7,
    }));
}
