import type {
  CmsMedia,
  CmsPage,
  CmsPageSection,
  CmsRedirect,
  CmsSeo,
} from "@/types/cms";
import { fetchStrapi, resolveStrapiMediaUrl } from "@/lib/strapi/client";
import { detectRouteConflicts, normalizePath } from "@/lib/routes/normalize";

interface StrapiCollectionResponse<T> {
  data: T[];
}

function normalizeMedia(media: CmsMedia | null | undefined): CmsMedia | null {
  if (!media?.url) {
    return null;
  }
  const resolved = resolveStrapiMediaUrl(media.url);
  if (!resolved) {
    return null;
  }
  return { ...media, url: resolved };
}

function normalizeSeo(seo: CmsSeo | null | undefined): CmsSeo | null {
  if (!seo) {
    return null;
  }
  const rawImage = seo.ogImage as CmsMedia | null | undefined;
  return {
    metaTitle: seo.metaTitle ?? null,
    metaDescription: seo.metaDescription ?? null,
    canonicalUrl: seo.canonicalUrl ?? null,
    ogTitle: seo.ogTitle ?? null,
    ogDescription: seo.ogDescription ?? null,
    ogImage: normalizeMedia(rawImage),
    noIndex: Boolean(seo.noIndex),
    noFollow: Boolean(seo.noFollow),
    structuredDataType: seo.structuredDataType || "WebPage",
  };
}

function normalizeSections(
  sections: CmsPageSection[] | undefined
): CmsPageSection[] {
  if (!Array.isArray(sections)) {
    return [];
  }

  return sections.map((section) => {
    if ("media" in section && section.media) {
      return { ...section, media: normalizeMedia(section.media) };
    }
    if (section.__component === "sections.image-gallery" && section.items) {
      return {
        ...section,
        items: section.items.map((item) => ({
          ...item,
          image: normalizeMedia(item.image),
        })),
      };
    }
    if (section.__component === "sections.logo-grid" && section.items) {
      return {
        ...section,
        items: section.items.map((item) => ({
          ...item,
          logo: normalizeMedia(item.logo),
        })),
      };
    }
    if (section.__component === "sections.team-grid" && section.members) {
      return {
        ...section,
        members: section.members.map((member) => ({
          ...member,
          photo: normalizeMedia(member.photo),
        })),
      };
    }
    if (section.__component === "sections.video-embed") {
      return {
        ...section,
        videoFile: normalizeMedia(section.videoFile),
        posterImage: normalizeMedia(section.posterImage),
      };
    }
    return section;
  });
}

function normalizePage(raw: CmsPage): CmsPage {
  return {
    ...raw,
    fullPath: normalizePath(raw.fullPath),
    summary: raw.summary ?? null,
    body: raw.body ?? null,
    parent: raw.parent ?? null,
    showBreadcrumbs: raw.showBreadcrumbs !== false,
    isIndexable: raw.isIndexable !== false,
    seo: normalizeSeo(raw.seo),
    sections: normalizeSections(raw.sections),
  };
}

const STANDARD_SECTION_UIDS = [
  "sections.hero",
  "sections.split-hero",
  "sections.image-text",
  "sections.rich-text",
  "sections.card-grid",
  "sections.stats",
  "sections.cta-banner",
  "sections.process-steps",
  "sections.faq-accordion",
  "sections.tabs",
  "sections.comparison-table",
  "sections.quote-block",
  "sections.testimonials",
  "sections.video-embed",
  "sections.form-placeholder",
] as const;

function buildSectionsPopulateQuery(): string {
  const parts = STANDARD_SECTION_UIDS.map(
    (uid) => `populate[sections][on][${uid}][populate]=*`
  );
  parts.push(
    "populate[sections][on][sections.image-gallery][populate][items][populate]=image",
    "populate[sections][on][sections.logo-grid][populate][items][populate]=logo",
    "populate[sections][on][sections.team-grid][populate][members][populate]=photo"
  );
  return parts.join("&");
}

const PAGE_POPULATE_QUERY = [
  "populate[seo][populate]=ogImage",
  "populate[parent][populate]=parent",
  buildSectionsPopulateQuery(),
].join("&");

const PAGE_LIST_POPULATE_QUERY =
  "populate[seo][populate]=ogImage&populate[parent][populate]=parent";

export interface ResolvePageResult {
  page: CmsPage | null;
  source: "cms" | "offline";
  conflict: boolean;
}

export async function getPublishedPageByPath(
  fullPath: string,
  options: { preview?: boolean } = {}
): Promise<ResolvePageResult> {
  const normalized = normalizePath(fullPath);
  const encodedPath = encodeURIComponent(normalized);

  const canQueryDraft =
    Boolean(options.preview) && Boolean(process.env.STRAPI_API_TOKEN?.trim());

  const statusParam = canQueryDraft ? "&status=draft" : "";
  const query = `/api/pages?filters[fullPath][$eq]=${encodedPath}&${PAGE_POPULATE_QUERY}${statusParam}`;

  const response = await fetchStrapi<StrapiCollectionResponse<CmsPage>>(query, {
    tags: ["pages", `page:${normalized}`],
    ...(options.preview ? { cache: "no-store" } : { revalidate: 60 }),
  });

  if (!response) {
    return { page: null, source: "offline", conflict: false };
  }

  let items = Array.isArray(response.data) ? response.data : [];

  if (canQueryDraft && items.length === 0) {
    const publishedRes = await fetchStrapi<StrapiCollectionResponse<CmsPage>>(
      `/api/pages?filters[fullPath][$eq]=${encodedPath}&${PAGE_POPULATE_QUERY}`,
      { cache: "no-store" }
    );
    items = Array.isArray(publishedRes?.data) ? publishedRes.data : [];
  }

  if (items.length === 0) {
    return { page: null, source: "cms", conflict: false };
  }

  if (items.length > 1) {
    return { page: null, source: "cms", conflict: true };
  }

  return {
    page: normalizePage(items[0]),
    source: "cms",
    conflict: false,
  };
}

export async function getAllPublishedPages(): Promise<CmsPage[]> {
  const response = await fetchStrapi<StrapiCollectionResponse<CmsPage>>(
    `/api/pages?${PAGE_LIST_POPULATE_QUERY}&pagination[pageSize]=100`,
    {
      tags: ["pages"],
      revalidate: 60,
    }
  );

  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  const normalized = response.data.map(normalizePage);
  const conflicts = detectRouteConflicts(normalized);
  if (conflicts.length > 0) {
    const conflictedPaths = new Set(conflicts.map((c) => c.fullPath));
    return normalized.filter((page) => !conflictedPaths.has(page.fullPath));
  }

  return normalized;
}

export async function getRedirectByPath(
  sourcePath: string
): Promise<CmsRedirect | null> {
  const normalized = normalizePath(sourcePath);
  const encodedPath = encodeURIComponent(normalized);

  const response = await fetchStrapi<StrapiCollectionResponse<CmsRedirect>>(
    `/api/redirects?filters[sourcePath][$eq]=${encodedPath}&filters[isActive][$eq]=true`,
    {
      tags: ["redirects"],
      revalidate: 60,
    }
  );

  if (!response || !Array.isArray(response.data) || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}
