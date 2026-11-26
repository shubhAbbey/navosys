import type {
  CmsFooterColumn,
  CmsMedia,
  CmsNavItem,
  CmsSocialLink,
  GlobalSettings,
  NavigationMenu,
  SiteLayoutData,
} from "@/types/cms";
import { fetchStrapi, resolveStrapiMediaUrl } from "./client";

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiCollectionResponse<T> {
  data: T[];
}

const FALLBACK_GLOBAL_SETTINGS: GlobalSettings = {
  siteName: "NAVOSYS",
  tagline: "Building What's Next.",
  siteUrl: null,
  logoLight: null,
  logoDark: null,
  favicon: null,
  announcement: null,
  primaryCta: {
    label: "Get a Quote",
    url: "/contact/get-quote",
    variant: "primary",
    isVisible: true,
  },
  secondaryCta: {
    label: "Book a Consultation",
    url: "/contact/book-consultation",
    variant: "outline",
    isVisible: true,
  },
  contactEmail: null,
  contactPhone: null,
  contactLocation: null,
  footerSummary: null,
  copyrightText: "© 2026 NAVOSYS. All rights reserved.",
  socialLinks: [],
  legalLinks: [
    {
      label: "Privacy Policy",
      url: "/privacy",
      isExternal: false,
      openInNewTab: false,
    },
    {
      label: "Terms of Service",
      url: "/terms",
      isExternal: false,
      openInNewTab: false,
    },
  ],
  defaultSeoTitle: "NAVOSYS — Technical Foundation",
  defaultSeoDescription:
    "Phase 04 Strapi-backed global settings, navigation, and footer shell.",
};

function normalizeMedia(media: CmsMedia | null | undefined): CmsMedia | null {
  if (!media?.url) {
    return null;
  }
  const resolved = resolveStrapiMediaUrl(media.url);
  if (!resolved) {
    return null;
  }
  return {
    ...media,
    url: resolved,
  };
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function normalizeNavItems(items: CmsNavItem[] | undefined): CmsNavItem[] {
  if (!Array.isArray(items)) {
    return [];
  }
  return sortByOrder(items)
    .filter((item) => item.isVisible !== false)
    .map((item) => ({
      ...item,
      children: Array.isArray(item.children)
        ? sortByOrder(item.children).filter(
            (child) => child.isVisible !== false
          )
        : [],
    }));
}

function normalizeFooterColumns(
  columns: CmsFooterColumn[] | undefined
): CmsFooterColumn[] {
  if (!Array.isArray(columns)) {
    return [];
  }
  return sortByOrder(columns)
    .filter((column) => column.isVisible !== false)
    .map((column) => ({
      ...column,
      links: Array.isArray(column.links) ? column.links : [],
    }));
}

function normalizeSocialLinks(
  links: CmsSocialLink[] | undefined
): CmsSocialLink[] {
  if (!Array.isArray(links)) {
    return [];
  }
  return sortByOrder(links);
}

export function normalizeGlobalSettings(
  raw: Partial<GlobalSettings> | null | undefined
): GlobalSettings {
  if (!raw) {
    return FALLBACK_GLOBAL_SETTINGS;
  }

  return {
    siteName: raw.siteName || FALLBACK_GLOBAL_SETTINGS.siteName,
    tagline: raw.tagline ?? FALLBACK_GLOBAL_SETTINGS.tagline,
    siteUrl: raw.siteUrl ?? null,
    logoLight: normalizeMedia(raw.logoLight),
    logoDark: normalizeMedia(raw.logoDark),
    favicon: normalizeMedia(raw.favicon),
    announcement: raw.announcement ?? null,
    primaryCta: raw.primaryCta ?? FALLBACK_GLOBAL_SETTINGS.primaryCta,
    secondaryCta: raw.secondaryCta ?? FALLBACK_GLOBAL_SETTINGS.secondaryCta,
    contactEmail: raw.contactEmail ?? null,
    contactPhone: raw.contactPhone ?? null,
    contactLocation: raw.contactLocation ?? null,
    footerSummary: raw.footerSummary ?? null,
    copyrightText:
      raw.copyrightText || FALLBACK_GLOBAL_SETTINGS.copyrightText,
    socialLinks: normalizeSocialLinks(raw.socialLinks),
    legalLinks: Array.isArray(raw.legalLinks)
      ? raw.legalLinks
      : FALLBACK_GLOBAL_SETTINGS.legalLinks,
    defaultSeoTitle:
      raw.defaultSeoTitle ?? FALLBACK_GLOBAL_SETTINGS.defaultSeoTitle,
    defaultSeoDescription:
      raw.defaultSeoDescription ??
      FALLBACK_GLOBAL_SETTINGS.defaultSeoDescription,
  };
}

const GLOBAL_SETTING_QUERY =
  "/api/global-setting?populate[logoLight]=true&populate[logoDark]=true&populate[favicon]=true&populate[announcement]=true&populate[primaryCta]=true&populate[secondaryCta]=true&populate[socialLinks]=true&populate[legalLinks]=true";

const NAVIGATION_MENUS_QUERY =
  "/api/navigation-menus?populate[items][populate]=children&populate[footerColumns][populate]=links";

export async function getGlobalLayoutData(): Promise<SiteLayoutData> {
  const [globalResponse, menusResponse] = await Promise.all([
    fetchStrapi<StrapiSingleResponse<GlobalSettings>>(GLOBAL_SETTING_QUERY, {
      tags: ["global-setting"],
    }),
    fetchStrapi<StrapiCollectionResponse<NavigationMenu>>(
      NAVIGATION_MENUS_QUERY,
      {
        tags: ["navigation-menu"],
      }
    ),
  ]);

  const hasCmsGlobal = Boolean(globalResponse?.data);
  const menus = Array.isArray(menusResponse?.data) ? menusResponse.data : [];

  const headerMenu = menus.find((menu) => menu.key === "header");
  const footerMenu = menus.find((menu) => menu.key === "footer");

  return {
    global: normalizeGlobalSettings(globalResponse?.data),
    headerNav: normalizeNavItems(headerMenu?.items),
    footerColumns: normalizeFooterColumns(footerMenu?.footerColumns),
    source: hasCmsGlobal || menus.length > 0 ? "cms" : "fallback",
  };
}
