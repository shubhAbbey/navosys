import type { CmsService, CmsServiceSummary } from "@/types/cms";
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

function normalizeServiceSummary(raw: CmsServiceSummary): CmsServiceSummary {
  const slug = raw.slug.trim().toLowerCase();
  const fullPath = raw.fullPath
    ? normalizePath(raw.fullPath)
    : `/services/${slug}`;
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

function normalizeService(raw: CmsService): CmsService {
  const base = normalizeServiceSummary(raw);
  return {
    ...base,
    description: raw.description ?? null,
    capabilities: Array.isArray(raw.capabilities) ? raw.capabilities : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    deliverables: Array.isArray(raw.deliverables) ? raw.deliverables : [],
    processSteps: Array.isArray(raw.processSteps) ? raw.processSteps : [],
    technologies: Array.isArray(raw.technologies) ? raw.technologies : [],
    useCases: Array.isArray(raw.useCases) ? raw.useCases : [],
    faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
    relatedServices: Array.isArray(raw.relatedServices)
      ? raw.relatedServices.map(normalizeServiceSummary)
      : [],
    primaryCta: raw.primaryCta ?? null,
    secondaryCta: raw.secondaryCta ?? null,
    seo: normalizeSeo(raw.seo),
    sections: normalizeSections(raw.sections),
  };
}

const SERVICE_SECTION_UIDS = [
  "sections.rich-text",
  "sections.card-grid",
  "sections.cta-banner",
  "sections.process-steps",
  "sections.faq-accordion",
  "sections.comparison-table",
  "sections.tabs",
  "sections.image-text",
] as const;

const SERVICE_DETAIL_POPULATE = [
  "populate[featuredImage]=true",
  "populate[capabilities]=true",
  "populate[benefits]=true",
  "populate[deliverables]=true",
  "populate[processSteps]=true",
  "populate[technologies]=true",
  "populate[useCases]=true",
  "populate[faqs]=true",
  "populate[relatedServices][populate]=featuredImage",
  "populate[primaryCta]=true",
  "populate[secondaryCta]=true",
  "populate[seo][populate]=ogImage",
  buildSectionsPopulateQuery(SERVICE_SECTION_UIDS),
].join("&");

export async function getAllPublishedServices(): Promise<CmsServiceSummary[]> {
  const response = await fetchStrapi<StrapiCollectionResponse<CmsServiceSummary>>(
    "/api/services?populate[featuredImage]=true&sort[0]=order:asc&sort[1]=title:asc&pagination[pageSize]=100",
    {
      tags: ["services"],
      revalidate: 60,
    }
  );

  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  return response.data.map(normalizeServiceSummary).sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    return orderDiff !== 0 ? orderDiff : a.title.localeCompare(b.title);
  });
}

export async function getPublishedServiceByPath(
  fullPath: string,
  options: { preview?: boolean } = {}
): Promise<CmsService | null> {
  const normalized = normalizePath(fullPath);
  if (!normalized.startsWith("/services/")) {
    return null;
  }

  const encodedPath = encodeURIComponent(normalized);
  const canQueryDraft =
    Boolean(options.preview) && Boolean(process.env.STRAPI_API_TOKEN?.trim());
  const statusParam = canQueryDraft ? "&status=draft" : "";

  const query = `/api/services?filters[fullPath][$eq]=${encodedPath}&${SERVICE_DETAIL_POPULATE}${statusParam}`;
  const response = await fetchStrapi<StrapiCollectionResponse<CmsService>>(
    query,
    {
      tags: ["services", `service:${normalized}`],
      ...(options.preview ? { cache: "no-store" } : { revalidate: 60 }),
    }
  );

  if (!response || !Array.isArray(response.data)) {
    return null;
  }

  if (response.data.length === 0) {
    return null;
  }

  return normalizeService(response.data[0]);
}
