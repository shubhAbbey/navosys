/**
 * Strapi 5 CMS contracts for P04+ (Global Settings, Navigation, and Media).
 */
export type CmsPublishStatus = "draft" | "published";

export interface CmsMedia {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText: string | null;
  caption?: string | null;
  width: number | null;
  height: number | null;
  mime?: string | null;
}

export interface CmsLink {
  id?: number;
  label: string;
  url: string;
  isExternal: boolean;
  openInNewTab: boolean;
}

export type CmsCtaVariant = "primary" | "secondary" | "outline" | "ghost";

export interface CmsCta {
  id?: number;
  label: string;
  url: string;
  variant: CmsCtaVariant;
  isVisible: boolean;
}

export interface CmsAnnouncement {
  enabled: boolean;
  text: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  dismissible: boolean;
}

export type CmsSocialPlatform =
  | "linkedin"
  | "github"
  | "x"
  | "youtube"
  | "email";

export interface CmsSocialLink {
  id?: number;
  platform: CmsSocialPlatform;
  label: string;
  url: string;
  order: number;
}

export interface CmsNavChildItem {
  id?: number;
  label: string;
  url: string;
  description: string | null;
  order: number;
  isVisible: boolean;
  isExternal: boolean;
}

export interface CmsNavItem {
  id?: number;
  label: string;
  url: string;
  order: number;
  isVisible: boolean;
  isExternal: boolean;
  children: CmsNavChildItem[];
}

export interface CmsFooterColumn {
  id?: number;
  title: string;
  order: number;
  isVisible: boolean;
  links: CmsLink[];
}

export interface GlobalSettings {
  siteName: string;
  tagline: string | null;
  siteUrl: string | null;
  logoLight: CmsMedia | null;
  logoDark: CmsMedia | null;
  favicon: CmsMedia | null;
  announcement: CmsAnnouncement | null;
  primaryCta: CmsCta | null;
  secondaryCta: CmsCta | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactLocation: string | null;
  footerSummary: string | null;
  copyrightText: string | null;
  socialLinks: CmsSocialLink[];
  legalLinks: CmsLink[];
  defaultSeoTitle: string | null;
  defaultSeoDescription: string | null;
}

export interface NavigationMenu {
  key: string;
  title: string;
  items: CmsNavItem[];
  footerColumns: CmsFooterColumn[];
}

export interface SiteLayoutData {
  global: GlobalSettings;
  headerNav: CmsNavItem[];
  footerColumns: CmsFooterColumn[];
  source: "cms" | "fallback";
}
