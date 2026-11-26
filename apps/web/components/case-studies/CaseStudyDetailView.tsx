import Link from "next/link";
import { CardGridSection, CtaBannerSection, SectionRenderer } from "@/components/sections";
import { CmsMediaImage } from "@/components/sections/section-utils";
import { Breadcrumbs } from "@/components/seo";
import { Badge, ButtonLink, Card, Container, Heading, Section, Text } from "@/components/ui";
import { parseSafeRichText } from "@/lib/content/safe-rich-text";
import type { BreadcrumbItem, CmsCaseStudy } from "@/types/cms";

export interface CaseStudyDetailViewProps {
  caseStudy: CmsCaseStudy;
}

export function CaseStudyDetailView({ caseStudy }: CaseStudyDetailViewProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: caseStudy.title, href: caseStudy.fullPath },
  ];

  const primaryCta = caseStudy.primaryCta ?? {
    label: "Get a Quote",
    url: `/contact/get-quote?caseStudy=${encodeURIComponent(caseStudy.slug)}`,
    variant: "primary" as const,
    isVisible: true,
  };

  const secondaryCta = caseStudy.secondaryCta ?? {
    label: "Book a Consultation",
    url: "/contact/book-consultation",
    variant: "outline" as const,
    isVisible: true,
  };

  const approachBlocks = caseStudy.approach
    ? parseSafeRichText(caseStudy.approach)
    : [];

  return (
    <>
      <Section surface="ivory" spacing="spacious">
        <Container size="wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className={caseStudy.featuredImage?.url ? "lg:col-span-7" : "lg:col-span-9"}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">{caseStudy.categoryLabel}</Badge>
                {caseStudy.isConceptual ? (
                  <Badge variant="gold">Conceptual Reference Architecture</Badge>
                ) : null}
              </div>

              <Heading as="h1" scale="display" className="mt-4">
                {caseStudy.title}
              </Heading>
              <Text variant="lead" className="mt-4 text-navy-muted">
                {caseStudy.summary}
              </Text>
              {caseStudy.isConceptual ? (
                <Text variant="muted" className="mt-3 text-xs">
                  Transparency Notice: This study illustrates a conceptual reference architecture
                  without claiming named third-party client deployments or fabricated numerical ROI.
                </Text>
              ) : null}

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

            {caseStudy.featuredImage?.url ? (
              <div className="lg:col-span-5">
                <CmsMediaImage
                  media={caseStudy.featuredImage}
                  altOverride={caseStudy.featuredImageAlt}
                  fallbackAlt={caseStudy.title}
                  className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section surface="sand" spacing="default">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card surface="ivory">
              <Text variant="eyebrow" className="text-teal-deep">
                01 · Challenge
              </Text>
              <Heading as="h2" className="mt-2">
                Problem Context
              </Heading>
              <Text className="mt-3 leading-relaxed text-navy-muted">
                {caseStudy.challenge}
              </Text>
            </Card>
            <Card surface="ivory">
              <Text variant="eyebrow" className="text-teal-deep">
                02 · Solution
              </Text>
              <Heading as="h2" className="mt-2">
                Architectural Response
              </Heading>
              <Text className="mt-3 leading-relaxed text-navy-muted">
                {caseStudy.solution}
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      {approachBlocks.length > 0 ? (
        <Section surface="ivory" spacing="compact">
          <Container size="default">
            <Text variant="eyebrow" className="text-teal-deep">
              03 · Approach
            </Text>
            <Heading as="h2" className="mt-2">
              Delivery Sequence
            </Heading>
            <div className="mt-4 space-y-4">
              {approachBlocks.map((block, index) => (
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

      {caseStudy.architectureHighlights.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Technical Architecture",
            heading: "Key Implementation Highlights",
            gridKind: "features",
            columns: "3",
            surface: "sand",
            spacing: "default",
            items: caseStudy.architectureHighlights,
          }}
        />
      ) : null}

      {caseStudy.outcomes.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Structural Value",
            heading: "Intended Operational Outcomes",
            gridKind: "features",
            columns: "2",
            surface: "ivory",
            spacing: "default",
            items: caseStudy.outcomes,
          }}
        />
      ) : null}

      {caseStudy.technologies.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Stack",
            heading: "Technologies & Foundations",
            gridKind: "technologies",
            columns: "4",
            surface: "sand",
            spacing: "compact",
            items: caseStudy.technologies,
          }}
        />
      ) : null}

      {caseStudy.sections && caseStudy.sections.length > 0 ? (
        <SectionRenderer sections={caseStudy.sections} />
      ) : null}

      {(caseStudy.relatedServices.length > 0 ||
        caseStudy.relatedIndustries.length > 0) && (
        <Section surface="ivory" spacing="default" aria-labelledby="cs-related-links">
          <Container size="wide">
            <Text variant="eyebrow" className="text-teal-deep">
              Connected Capabilities
            </Text>
            <Heading as="h2" id="cs-related-links" className="mt-2">
              Related Services & Industries
            </Heading>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {caseStudy.relatedServices.map((svc) => (
                <Card key={`svc-${svc.slug}`} surface="sand" interactive className="flex flex-col justify-between">
                  <div>
                    <Badge variant="neutral">Service</Badge>
                    <Heading as="h3" className="mt-2">
                      {svc.title}
                    </Heading>
                    <Text variant="muted" className="mt-2 text-sm">
                      {svc.summary}
                    </Text>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      href={svc.fullPath}
                      className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                    >
                      Explore service
                    </Link>
                  </div>
                </Card>
              ))}
              {caseStudy.relatedIndustries.map((ind) => (
                <Card key={`ind-${ind.slug}`} surface="sand" interactive className="flex flex-col justify-between">
                  <div>
                    <Badge variant="gold">Industry</Badge>
                    <Heading as="h3" className="mt-2">
                      {ind.title}
                    </Heading>
                    <Text variant="muted" className="mt-2 text-sm">
                      {ind.summary}
                    </Text>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      href={ind.fullPath}
                      className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                    >
                      Explore industry
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBannerSection
        section={{
          __component: "sections.cta-banner",
          eyebrow: "Apply This Architecture",
          heading: "Need a Similar System Tailored for Your Organization?",
          body: "Review your operational context and constraints with our engineering team.",
          primaryCta,
          secondaryCta,
          surface: "navy",
          spacing: "default",
        }}
      />
    </>
  );
}
