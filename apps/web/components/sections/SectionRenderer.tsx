import type { CmsPageSection } from "@/types/cms";
import {
  CardGridSection,
  ComparisonTableSection,
  ProcessStepsSection,
  RichTextSection,
} from "./ContentSections";
import {
  LogoGridSection,
  QuoteBlockSection,
  StatsSection,
  TeamGridSection,
  TestimonialsSection,
} from "./CredibilitySections";
import { FaqAccordionSection } from "./FaqAccordionInteractive";
import {
  HeroSection,
  ImageTextSection,
  SplitHeroSection,
} from "./HeroSections";
import {
  CtaBannerSection,
  FormPlaceholderSection,
  ImageGallerySection,
  VideoSection,
} from "./MediaAndConversionSections";
import { TabsSection } from "./TabsInteractive";

function renderSection(section: CmsPageSection) {
  switch (section.__component) {
    case "sections.hero":
      return <HeroSection section={section} />;
    case "sections.split-hero":
      return <SplitHeroSection section={section} />;
    case "sections.image-text":
      return <ImageTextSection section={section} />;
    case "sections.rich-text":
      return <RichTextSection section={section} />;
    case "sections.card-grid":
      return <CardGridSection section={section} />;
    case "sections.stats":
      return <StatsSection section={section} />;
    case "sections.cta-banner":
      return <CtaBannerSection section={section} />;
    case "sections.process-steps":
      return <ProcessStepsSection section={section} />;
    case "sections.faq-accordion":
      return <FaqAccordionSection section={section} />;
    case "sections.tabs":
      return <TabsSection section={section} />;
    case "sections.comparison-table":
      return <ComparisonTableSection section={section} />;
    case "sections.image-gallery":
      return <ImageGallerySection section={section} />;
    case "sections.quote-block":
      return <QuoteBlockSection section={section} />;
    case "sections.testimonials":
      return <TestimonialsSection section={section} />;
    case "sections.logo-grid":
      return <LogoGridSection section={section} />;
    case "sections.video-embed":
      return <VideoSection section={section} />;
    case "sections.form-placeholder":
      return <FormPlaceholderSection section={section} />;
    case "sections.team-grid":
      return <TeamGridSection section={section} />;
    default:
      return null;
  }
}

export interface SectionRendererProps {
  sections: CmsPageSection[] | undefined;
}

/**
 * Typed Dynamic Zone section registry: filters hidden sections, orders deterministically,
 * and dispatches only approved finite section components.
 */
export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  const orderedVisible = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.isVisible !== false)
    .sort((a, b) => {
      const orderDiff = (a.section.sortOrder ?? 0) - (b.section.sortOrder ?? 0);
      return orderDiff !== 0 ? orderDiff : a.index - b.index;
    });

  return (
    <>
      {orderedVisible.map(({ section, index }) => (
        <div
          key={`${section.__component}-${section.id ?? index}`}
          data-section-component={section.__component}
        >
          {renderSection(section)}
        </div>
      ))}
    </>
  );
}
