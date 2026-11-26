import type { CmsIndustry, CmsIndustrySummary } from "@/types/cms";
import { fetchStrapi } from "@/lib/strapi/client";
import {
  buildSectionsPopulateQuery,
  normalizeMedia,
  normalizeSections,
  normalizeSeo,
} from "@/lib/strapi/normalizers";
import { normalizePath } from "@/lib/routes/normalize";

interface StrapiCollectionResponse<T> {
  data: T[];
}

const INDUSTRY_SECTION_UIDS = [
  "sections.rich-text",
  "sections.card-grid",
  "sections.cta-banner",
  "sections.process-steps",
  "sections.faq-accordion",
  "sections.comparison-table",
  "sections.tabs",
  "sections.image-text",
] as const;

const INDUSTRY_DETAIL_POPULATE = [
  "populate[featuredImage]=true",
  "populate[keyChallenges]=true",
  "populate[solutionPatterns]=true",
  "populate[useCases]=true",
  "populate[complianceConsiderations]=true",
  "populate[relatedServices][populate]=featuredImage",
  "populate[relatedCaseStudies][populate]=featuredImage",
  "populate[primaryCta]=true",
  "populate[secondaryCta]=true",
  "populate[seo][populate]=ogImage",
  buildSectionsPopulateQuery(INDUSTRY_SECTION_UIDS),
].join("&");

export function normalizeIndustrySummary(
  raw: CmsIndustrySummary
): CmsIndustrySummary {
  const slug = raw.slug.trim().toLowerCase();
  const fullPath = raw.fullPath
    ? normalizePath(raw.fullPath)
    : `/industries/${slug}`;
  return {
    ...raw,
    slug,
    fullPath,
    featuredImage: normalizeMedia(raw.featuredImage),
    order: raw.order ?? 0,
    isFeatured: Boolean(raw.isFeatured),
    isIndexable: raw.isIndexable !== false,
  };
}

function normalizeIndustry(raw: CmsIndustry): CmsIndustry {
  const base = normalizeIndustrySummary(raw);
  return {
    ...base,
    overview: raw.overview ?? null,
    keyChallenges: Array.isArray(raw.keyChallenges) ? raw.keyChallenges : [],
    solutionPatterns: Array.isArray(raw.solutionPatterns)
      ? raw.solutionPatterns
      : [],
    useCases: Array.isArray(raw.useCases) ? raw.useCases : [],
    complianceConsiderations: Array.isArray(raw.complianceConsiderations)
      ? raw.complianceConsiderations
      : [],
    relatedServices: Array.isArray(raw.relatedServices)
      ? raw.relatedServices.map((service) => ({
          ...service,
          fullPath: normalizePath(
            service.fullPath || `/services/${service.slug}`
          ),
          featuredImage: normalizeMedia(service.featuredImage),
          isIndexable: service.isIndexable !== false,
        }))
      : [],
    relatedCaseStudies: Array.isArray(raw.relatedCaseStudies)
      ? raw.relatedCaseStudies.map((cs) => ({
          ...cs,
          fullPath: normalizePath(cs.fullPath || `/case-studies/${cs.slug}`),
          isConceptual: cs.isConceptual !== false,
          featuredImage: normalizeMedia(cs.featuredImage),
          isIndexable: cs.isIndexable !== false,
        }))
      : [],
    primaryCta: raw.primaryCta ?? null,
    secondaryCta: raw.secondaryCta ?? null,
    seo: normalizeSeo(raw.seo),
    sections: normalizeSections(raw.sections),
  };
}

export async function getAllPublishedIndustries(): Promise<
  CmsIndustrySummary[]
> {
  const response = await fetchStrapi<
    StrapiCollectionResponse<CmsIndustrySummary>
  >(
    "/api/industries?populate[featuredImage]=true&sort[0]=order:asc&sort[1]=title:asc&pagination[pageSize]=100",
    {
      tags: ["industries"],
      revalidate: 60,
    }
  );

  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  return response.data.map(normalizeIndustrySummary).sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    return orderDiff !== 0 ? orderDiff : a.title.localeCompare(b.title);
  });
}

export async function getPublishedIndustryByPath(
  fullPath: string,
  options: { preview?: boolean } = {}
): Promise<CmsIndustry | null> {
  const normalized = normalizePath(fullPath);
  if (!normalized.startsWith("/industries/")) {
    return null;
  }

  const encodedPath = encodeURIComponent(normalized);
  const canQueryDraft =
    Boolean(options.preview) && Boolean(process.env.STRAPI_API_TOKEN?.trim());
  const statusParam = canQueryDraft ? "&status=draft" : "";

  const query = `/api/industries?filters[fullPath][$eq]=${encodedPath}&${INDUSTRY_DETAIL_POPULATE}${statusParam}`;
  const response = await fetchStrapi<StrapiCollectionResponse<CmsIndustry>>(
    query,
    {
      tags: ["industries", `industry:${normalized}`],
      ...(options.preview ? { cache: "no-store" } : { revalidate: 60 }),
    }
  );

  if (!response || !Array.isArray(response.data) || response.data.length === 0) {
    return null;
  }

  return normalizeIndustry(response.data[0]);
}
