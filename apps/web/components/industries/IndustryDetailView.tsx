import Link from "next/link";
import { CardGridSection, CtaBannerSection, SectionRenderer } from "@/components/sections";
import { CmsMediaImage } from "@/components/sections/section-utils";
import { Breadcrumbs } from "@/components/seo";
import { Badge, ButtonLink, Card, Container, Heading, Section, Text } from "@/components/ui";
import { parseSafeRichText } from "@/lib/content/safe-rich-text";
import type { BreadcrumbItem, CmsIndustry } from "@/types/cms";

export interface IndustryDetailViewProps {
  industry: CmsIndustry;
}

export function IndustryDetailView({ industry }: IndustryDetailViewProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: industry.title, href: industry.fullPath },
  ];

  const primaryCta = industry.primaryCta ?? {
    label: "Get a Quote",
    url: `/contact/get-quote?industry=${encodeURIComponent(industry.slug)}`,
    variant: "primary" as const,
    isVisible: true,
  };

  const secondaryCta = industry.secondaryCta ?? {
    label: "Book a Consultation",
    url: `/contact/book-consultation?industry=${encodeURIComponent(industry.slug)}`,
    variant: "outline" as const,
    isVisible: true,
  };

  const overviewBlocks = industry.overview
    ? parseSafeRichText(industry.overview)
    : [];

  return (
    <>
      <Section surface="ivory" spacing="spacious">
        <Container size="wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className={industry.featuredImage?.url ? "lg:col-span-7" : "lg:col-span-9"}>
              <Badge variant="gold">Industry Capability Blueprint</Badge>
              <Heading as="h1" scale="display" className="mt-4">
                {industry.title}
              </Heading>
              <Text variant="lead" className="mt-4 text-navy-muted">
                {industry.summary}
              </Text>
              <Text variant="muted" className="mt-3 text-xs">
                Note: This overview describes NAVOSYS technical capabilities and architecture
                patterns rather than named client endorsements or past deployment guarantees.
              </Text>
              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCta.isVisible !== false ? (
                  <ButtonLink
                    href={primaryCta.url}
                    variant={primaryCta.variant || "primary"}
                  >
                    {primaryCta.label}
                  </ButtonLink>
                ) : null}
                {secondaryCta.isVisible !== false ? (
                  <ButtonLink
                    href={secondaryCta.url}
                    variant={secondaryCta.variant || "outline"}
                  >
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            {industry.featuredImage?.url ? (
              <div className="lg:col-span-5">
                <CmsMediaImage
                  media={industry.featuredImage}
                  altOverride={industry.featuredImageAlt}
                  fallbackAlt={industry.title}
                  className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {overviewBlocks.length > 0 ? (
        <Section surface="sand" spacing="compact">
          <Container size="default">
            <Heading as="h2">Sector Context</Heading>
            <div className="mt-4 space-y-4">
              {overviewBlocks.map((block, index) => (
                <Text key={index} className="leading-relaxed text-navy-muted">
                  {block.type === "paragraph"
                    ? block.text
                    : block.type === "list"
                      ? block.items.join(" · ")
                      : block.text}
                </Text>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {industry.keyChallenges.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Operational Friction",
            heading: "Typical Sector Challenges",
            gridKind: "features",
            columns: "2",
            surface: "ivory",
            spacing: "default",
            items: industry.keyChallenges,
          }}
        />
      ) : null}

      {industry.solutionPatterns.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Engineering Response",
            heading: "Recommended Architecture Patterns",
            gridKind: "features",
            columns: "2",
            surface: "sand",
            spacing: "default",
            items: industry.solutionPatterns,
          }}
        />
      ) : null}

      {industry.useCases.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Applicable Workflows",
            heading: "Representative Use Cases",
            gridKind: "features",
            columns: "2",
            surface: "ivory",
            spacing: "default",
            items: industry.useCases,
          }}
        />
      ) : null}

      {industry.complianceConsiderations.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Governance & Risk",
            heading: "Security & Compliance Posture",
            gridKind: "features",
            columns: "2",
            surface: "sand",
            spacing: "default",
            items: industry.complianceConsiderations,
          }}
        />
      ) : null}

      {industry.sections && industry.sections.length > 0 ? (
        <SectionRenderer sections={industry.sections} />
      ) : null}

      {industry.relatedServices.length > 0 ? (
        <Section surface="ivory" spacing="default" aria-labelledby="ind-related-services">
          <Container size="wide">
            <Text variant="eyebrow" className="text-teal-deep">
              Applicable Services
            </Text>
            <Heading as="h2" id="ind-related-services" className="mt-2">
              Relevant NAVOSYS Practices
            </Heading>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {industry.relatedServices.map((svc) => (
                <Card key={svc.slug} surface="sand" interactive className="flex flex-col justify-between">
                  <div>
                    <Heading as="h3">{svc.title}</Heading>
                    <Text variant="muted" className="mt-2 text-sm">
                      {svc.summary}
                    </Text>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      href={svc.fullPath}
                      className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                    >
                      View service
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {industry.relatedCaseStudies.length > 0 ? (
        <Section surface="sand" spacing="default" aria-labelledby="ind-related-cs">
          <Container size="wide">
            <Text variant="eyebrow" className="text-teal-deep">
              Reference Architectures
            </Text>
            <Heading as="h2" id="ind-related-cs" className="mt-2">
              Related Case Studies
            </Heading>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {industry.relatedCaseStudies.map((cs) => (
                <Card key={cs.slug} surface="ivory" interactive className="flex flex-col justify-between">
                  <div>
                    <Badge variant="gold">
                      {cs.isConceptual ? "Conceptual Example" : cs.categoryLabel}
                    </Badge>
                    <Heading as="h3" className="mt-3">
                      {cs.title}
                    </Heading>
                    <Text variant="muted" className="mt-2 text-sm">
                      {cs.summary}
                    </Text>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      href={cs.fullPath}
                      className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                    >
                      Read blueprint
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBannerSection
        section={{
          __component: "sections.cta-banner",
          eyebrow: "Plan With NAVOSYS",
          heading: `Explore ${industry.title} Architecture Solutions`,
          body: "Request a scoped consultation or project estimate aligned to your sector requirements.",
          primaryCta,
          secondaryCta,
          surface: "navy",
          spacing: "default",
        }}
      />
    </>
  );
}
