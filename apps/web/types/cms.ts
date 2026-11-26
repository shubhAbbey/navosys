/**
 * Strapi 5 CMS contracts for P04–P08 (Global Settings, Navigation, Media, Pages, Redirects, SEO, Sections, and Services).
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

export type CmsSectionSurface = "ivory" | "sand" | "navy";
export type CmsSectionSpacing = "compact" | "default" | "spacious";

export interface CmsSectionBase {
  id?: number;
  __component: string;
  anchorId?: string | null;
  surface?: CmsSectionSurface;
  spacing?: CmsSectionSpacing;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface CmsFeatureItem {
  id?: number;
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  badge?: string | null;
  href?: string | null;
  ctaLabel?: string | null;
  order?: number;
}

export interface CmsStepItem {
  id?: number;
  stepNumber?: string | null;
  title: string;
  description?: string | null;
  deliverable?: string | null;
  order?: number;
}

export interface CmsFaqItem {
  id?: number;
  question: string;
  answer: string;
  order?: number;
}

export interface CmsStatItem {
  id?: number;
  value: string;
  label: string;
  context?: string | null;
  isVerified: boolean;
  sourceNote?: string | null;
  order?: number;
}

export interface CmsTabItem {
  id?: number;
  label: string;
  title: string;
  content: string;
  highlights?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  order?: number;
}

export interface CmsGalleryItem {
  id?: number;
  image?: CmsMedia | null;
  altOverride?: string | null;
  caption?: string | null;
  order?: number;
}

export interface CmsComparisonRow {
  id?: number;
  feature: string;
  primaryValue: string;
  secondaryValue: string;
  highlight?: boolean;
  order?: number;
}

export interface CmsTestimonialItem {
  id?: number;
  quote: string;
  authorName?: string | null;
  authorRole?: string | null;
  organization?: string | null;
  isVerified: boolean;
  order?: number;
}

export interface CmsLogoItem {
  id?: number;
  name: string;
  logo?: CmsMedia | null;
  altText?: string | null;
  url?: string | null;
  isApproved: boolean;
  order?: number;
}

export interface CmsTeamMember {
  id?: number;
  name: string;
  role: string;
  bio?: string | null;
  photo?: CmsMedia | null;
  isApproved: boolean;
  order?: number;
}

export interface HeroSectionData extends CmsSectionBase {
  __component: "sections.hero";
  eyebrow?: string | null;
  heading: string;
  subheading?: string | null;
  alignment?: "left" | "center";
  primaryCta?: CmsCta | null;
  secondaryCta?: CmsCta | null;
  media?: CmsMedia | null;
  mediaAlt?: string | null;
}

export interface SplitHeroSectionData extends CmsSectionBase {
  __component: "sections.split-hero";
  eyebrow?: string | null;
  heading: string;
  subheading?: string | null;
  highlights?: string | null;
  mediaPosition?: "left" | "right";
  primaryCta?: CmsCta | null;
  secondaryCta?: CmsCta | null;
  media?: CmsMedia | null;
  mediaAlt?: string | null;
}

export interface ImageTextSectionData extends CmsSectionBase {
  __component: "sections.image-text";
  eyebrow?: string | null;
  heading: string;
  body: string;
  media?: CmsMedia | null;
  mediaAlt?: string | null;
  mediaPosition?: "left" | "right";
  cta?: CmsCta | null;
}

export interface RichTextSectionData extends CmsSectionBase {
  __component: "sections.rich-text";
  eyebrow?: string | null;
  heading?: string | null;
  content: string;
  maxWidth?: "narrow" | "default";
}

export type CmsGridKind =
  | "features"
  | "services"
  | "industries"
  | "insights"
  | "case_studies"
  | "technologies"
  | "related_services"
  | "related_articles";

export interface CardGridSectionData extends CmsSectionBase {
  __component: "sections.card-grid";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  gridKind?: CmsGridKind;
  columns?: "2" | "3" | "4";
  items?: CmsFeatureItem[];
  cta?: CmsCta | null;
}

export interface StatsSectionData extends CmsSectionBase {
  __component: "sections.stats";
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  items?: CmsStatItem[];
}

export interface CtaBannerSectionData extends CmsSectionBase {
  __component: "sections.cta-banner";
  eyebrow?: string | null;
  heading: string;
  body?: string | null;
  variant?: "banner" | "footer_cta";
  primaryCta?: CmsCta | null;
  secondaryCta?: CmsCta | null;
}

export interface ProcessStepsSectionData extends CmsSectionBase {
  __component: "sections.process-steps";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  layout?: "steps" | "timeline";
  steps?: CmsStepItem[];
}

export interface FaqAccordionSectionData extends CmsSectionBase {
  __component: "sections.faq-accordion";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  allowMultiple?: boolean;
  items?: CmsFaqItem[];
}

export interface TabsSectionData extends CmsSectionBase {
  __component: "sections.tabs";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  tabs?: CmsTabItem[];
}

export interface ComparisonTableSectionData extends CmsSectionBase {
  __component: "sections.comparison-table";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  primaryColumnLabel: string;
  secondaryColumnLabel: string;
  rows?: CmsComparisonRow[];
}

export interface ImageGallerySectionData extends CmsSectionBase {
  __component: "sections.image-gallery";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  columns?: "2" | "3";
  items?: CmsGalleryItem[];
}

export interface QuoteBlockSectionData extends CmsSectionBase {
  __component: "sections.quote-block";
  quote: string;
  attribution?: string | null;
  role?: string | null;
  variant?: "editorial" | "testimonial";
  isVerified?: boolean;
}

export interface TestimonialsSectionData extends CmsSectionBase {
  __component: "sections.testimonials";
  eyebrow?: string | null;
  heading: string;
  items?: CmsTestimonialItem[];
}

export interface LogoGridSectionData extends CmsSectionBase {
  __component: "sections.logo-grid";
  eyebrow?: string | null;
  heading?: string | null;
  items?: CmsLogoItem[];
}

export interface VideoEmbedSectionData extends CmsSectionBase {
  __component: "sections.video-embed";
  eyebrow?: string | null;
  heading: string;
  caption?: string | null;
  embedUrl?: string | null;
  videoFile?: CmsMedia | null;
  posterImage?: CmsMedia | null;
}

export interface FormPlaceholderSectionData extends CmsSectionBase {
  __component: "sections.form-placeholder";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  formKind?: "contact" | "quote" | "consultation" | "assessment" | "newsletter";
  targetRoute?: string | null;
  ctaLabel?: string | null;
}

export interface TeamGridSectionData extends CmsSectionBase {
  __component: "sections.team-grid";
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  members?: CmsTeamMember[];
}

export type CmsPageSection =
  | HeroSectionData
  | SplitHeroSectionData
  | ImageTextSectionData
  | RichTextSectionData
  | CardGridSectionData
  | StatsSectionData
  | CtaBannerSectionData
  | ProcessStepsSectionData
  | FaqAccordionSectionData
  | TabsSectionData
  | ComparisonTableSectionData
  | ImageGallerySectionData
  | QuoteBlockSectionData
  | TestimonialsSectionData
  | LogoGridSectionData
  | VideoEmbedSectionData
  | FormPlaceholderSectionData
  | TeamGridSectionData;

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
  sections?: CmsPageSection[];
  updatedAt?: string;
  publishedAt?: string | null;
}

export type ServicePillar =
  | "cloud-and-it"
  | "ai-and-automation"
  | "software-engineering"
  | "data-and-analytics";

export const SERVICE_PILLAR_META: ReadonlyArray<{
  key: ServicePillar;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: "cloud-and-it",
    label: "Cloud & IT Solutions",
    shortLabel: "Cloud & IT",
    description:
      "Migration, hybrid cloud, managed IT operations, infrastructure automation, and modernization.",
  },
  {
    key: "ai-and-automation",
    label: "AI & Intelligent Automation",
    shortLabel: "AI & Automation",
    description:
      "Governed AI agents, workflow orchestration, business automation, and system integration.",
  },
  {
    key: "software-engineering",
    label: "Software Engineering",
    shortLabel: "Software",
    description:
      "Web platforms, mobile apps, enterprise applications, maintenance, and modernization.",
  },
  {
    key: "data-and-analytics",
    label: "Data & Analytics",
    shortLabel: "Data & Analytics",
    description:
      "Data engineering pipelines, business intelligence, and operational visualization.",
  },
];

export interface CmsServiceSummary {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  fullPath: string;
  pillar: ServicePillar;
  summary: string;
  featuredImage: CmsMedia | null;
  featuredImageAlt?: string | null;
  order: number;
  isFeatured: boolean;
  isIndexable: boolean;
  updatedAt?: string;
}

export interface CmsService extends CmsServiceSummary {
  description: string | null;
  capabilities: CmsFeatureItem[];
  benefits: CmsFeatureItem[];
  deliverables: CmsFeatureItem[];
  processSteps: CmsStepItem[];
  technologies: CmsFeatureItem[];
  useCases: CmsFeatureItem[];
  faqs: CmsFaqItem[];
  relatedServices: CmsServiceSummary[];
  primaryCta: CmsCta | null;
  secondaryCta: CmsCta | null;
  seo: CmsSeo | null;
  sections?: CmsPageSection[];
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

export interface CmsIndustrySummary {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  fullPath: string;
  summary: string;
  featuredImage: CmsMedia | null;
  featuredImageAlt?: string | null;
  order: number;
  isFeatured: boolean;
  isIndexable: boolean;
  updatedAt?: string;
}

export interface CmsIndustry extends CmsIndustrySummary {
  overview: string | null;
  keyChallenges: CmsFeatureItem[];
  solutionPatterns: CmsFeatureItem[];
  useCases: CmsFeatureItem[];
  complianceConsiderations: CmsFeatureItem[];
  relatedServices: CmsServiceSummary[];
  relatedCaseStudies: CmsCaseStudySummary[];
  primaryCta: CmsCta | null;
  secondaryCta: CmsCta | null;
  seo: CmsSeo | null;
  sections?: CmsPageSection[];
}

export interface CmsCaseStudySummary {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  fullPath: string;
  isConceptual: boolean;
  categoryLabel: string;
  engagementType?: string | null;
  summary: string;
  featuredImage: CmsMedia | null;
  featuredImageAlt?: string | null;
  order: number;
  isFeatured: boolean;
  isIndexable: boolean;
  updatedAt?: string;
}

export interface CmsCaseStudy extends CmsCaseStudySummary {
  challenge: string;
  solution: string;
  approach: string | null;
  architectureHighlights: CmsFeatureItem[];
  outcomes: CmsFeatureItem[];
  technologies: CmsFeatureItem[];
  relatedServices: CmsServiceSummary[];
  relatedIndustries: CmsIndustrySummary[];
  primaryCta: CmsCta | null;
  secondaryCta: CmsCta | null;
  seo: CmsSeo | null;
  sections?: CmsPageSection[];
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
