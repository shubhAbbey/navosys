import type { CmsMedia, CmsPageSection, CmsSeo } from "@/types/cms";
import { resolveStrapiMediaUrl } from "@/lib/strapi/client";

export function normalizeMedia(
  media: CmsMedia | null | undefined
): CmsMedia | null {
  if (!media?.url) {
    return null;
  }
  const resolved = resolveStrapiMediaUrl(media.url);
  if (!resolved) {
    return null;
  }
  return { ...media, url: resolved };
}

export function normalizeSeo(seo: CmsSeo | null | undefined): CmsSeo | null {
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

export function normalizeSections(
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

export function buildSectionsPopulateQuery(
  uids: readonly string[] = STANDARD_SECTION_UIDS
): string {
  const parts = uids.map(
    (uid) => `populate[sections][on][${uid}][populate]=*`
  );
  parts.push(
    "populate[sections][on][sections.image-gallery][populate][items][populate]=image",
    "populate[sections][on][sections.logo-grid][populate][items][populate]=logo",
    "populate[sections][on][sections.team-grid][populate][members][populate]=photo"
  );
  return parts.join("&");
}
