import type { CmsPage, CmsRedirect } from "@/types/cms";
import { fetchStrapi } from "@/lib/strapi/client";
import {
  buildSectionsPopulateQuery,
  normalizeSections,
  normalizeSeo,
} from "@/lib/strapi/normalizers";
import { detectRouteConflicts, normalizePath } from "@/lib/routes/normalize";

interface StrapiCollectionResponse<T> {
  data: T[];
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
