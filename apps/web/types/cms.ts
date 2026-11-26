/**
 * Strapi 5 CMS contracts for P04–P05 (Global Settings, Navigation, Media, Pages, Redirects, SEO).
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

export type CmsStructuredDataType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage";

export interface CmsSeo {
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: CmsMedia | null;
  noIndex: boolean;
  noFollow: boolean;
  structuredDataType: CmsStructuredDataType;
}

export type CmsPageType =
  | "home"
  | "standard"
  | "landing"
  | "services_overview"
  | "industries_overview"
  | "case_studies_overview"
  | "insights_overview"
  | "contact"
  | "legal";

export interface CmsPageParentRef {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  fullPath: string;
  parent?: CmsPageParentRef | null;
}

export interface CmsPage {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  fullPath: string;
  pageType: CmsPageType;
  summary: string | null;
  body: string | null;
  parent: CmsPageParentRef | null;
  showBreadcrumbs: boolean;
  isIndexable: boolean;
  seo: CmsSeo | null;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface CmsRedirect {
  id?: number;
  documentId?: string;
  sourcePath: string;
  destinationPath: string;
  permanent: boolean;
  isActive: boolean;
  note?: string | null;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface RouteConflict {
  fullPath: string;
  count: number;
  sources: string[];
}
