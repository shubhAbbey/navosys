import type { CmsCaseStudy, CmsCaseStudySummary } from "@/types/cms";
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

const CASE_STUDY_SECTION_UIDS = [
  "sections.rich-text",
  "sections.card-grid",
  "sections.cta-banner",
  "sections.process-steps",
  "sections.faq-accordion",
  "sections.comparison-table",
  "sections.tabs",
  "sections.image-text",
] as const;

const CASE_STUDY_DETAIL_POPULATE = [
  "populate[featuredImage]=true",
  "populate[architectureHighlights]=true",
  "populate[outcomes]=true",
  "populate[technologies]=true",
  "populate[relatedServices][populate]=featuredImage",
  "populate[relatedIndustries][populate]=featuredImage",
  "populate[primaryCta]=true",
  "populate[secondaryCta]=true",
  "populate[seo][populate]=ogImage",
  buildSectionsPopulateQuery(CASE_STUDY_SECTION_UIDS),
].join("&");

export function normalizeCaseStudySummary(
  raw: CmsCaseStudySummary
): CmsCaseStudySummary {
  const slug = raw.slug.trim().toLowerCase();
  const fullPath = raw.fullPath
    ? normalizePath(raw.fullPath)
    : `/case-studies/${slug}`;
  return {
    ...raw,
    slug,
    fullPath,
    isConceptual: raw.isConceptual !== false,
    categoryLabel: raw.categoryLabel || "Architecture Study",
    featuredImage: normalizeMedia(raw.featuredImage),
    order: raw.order ?? 0,
    isFeatured: Boolean(raw.isFeatured),
    isIndexable: raw.isIndexable !== false,
  };
}

function normalizeCaseStudy(raw: CmsCaseStudy): CmsCaseStudy {
  const base = normalizeCaseStudySummary(raw);
  return {
    ...base,
    challenge: raw.challenge ?? "",
    solution: raw.solution ?? "",
    approach: raw.approach ?? null,
    architectureHighlights: Array.isArray(raw.architectureHighlights)
      ? raw.architectureHighlights
      : [],
    outcomes: Array.isArray(raw.outcomes) ? raw.outcomes : [],
    technologies: Array.isArray(raw.technologies) ? raw.technologies : [],
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
    relatedIndustries: Array.isArray(raw.relatedIndustries)
      ? raw.relatedIndustries.map((ind) => ({
          ...ind,
          fullPath: normalizePath(ind.fullPath || `/industries/${ind.slug}`),
          featuredImage: normalizeMedia(ind.featuredImage),
          isIndexable: ind.isIndexable !== false,
        }))
      : [],
    primaryCta: raw.primaryCta ?? null,
    secondaryCta: raw.secondaryCta ?? null,
    seo: normalizeSeo(raw.seo),
    sections: normalizeSections(raw.sections),
  };
}

export async function getAllPublishedCaseStudies(): Promise<
  CmsCaseStudySummary[]
> {
  const response = await fetchStrapi<
    StrapiCollectionResponse<CmsCaseStudySummary>
  >(
    "/api/case-studies?populate[featuredImage]=true&sort[0]=order:asc&sort[1]=title:asc&pagination[pageSize]=100",
    {
      tags: ["case-studies"],
      revalidate: 60,
    }
  );

  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  return response.data.map(normalizeCaseStudySummary).sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    return orderDiff !== 0 ? orderDiff : a.title.localeCompare(b.title);
  });
}

export async function getPublishedCaseStudyByPath(
  fullPath: string,
  options: { preview?: boolean } = {}
): Promise<CmsCaseStudy | null> {
  const normalized = normalizePath(fullPath);
  if (!normalized.startsWith("/case-studies/")) {
    return null;
  }

  const encodedPath = encodeURIComponent(normalized);
  const canQueryDraft =
    Boolean(options.preview) && Boolean(process.env.STRAPI_API_TOKEN?.trim());
  const statusParam = canQueryDraft ? "&status=draft" : "";

  const query = `/api/case-studies?filters[fullPath][$eq]=${encodedPath}&${CASE_STUDY_DETAIL_POPULATE}${statusParam}`;
  const response = await fetchStrapi<StrapiCollectionResponse<CmsCaseStudy>>(
    query,
    {
      tags: ["case-studies", `case-study:${normalized}`],
      ...(options.preview ? { cache: "no-store" } : { revalidate: 60 }),
    }
  );

  if (!response || !Array.isArray(response.data) || response.data.length === 0) {
    return null;
  }

  return normalizeCaseStudy(response.data[0]);
}
