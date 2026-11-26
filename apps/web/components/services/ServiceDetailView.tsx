import Link from "next/link";
import {
  CardGridSection,
  CtaBannerSection,
  FaqAccordionSection,
  ProcessStepsSection,
  SectionRenderer,
} from "@/components/sections";
import { CmsMediaImage } from "@/components/sections/section-utils";
import { Breadcrumbs } from "@/components/seo";
import {
  Badge,
  ButtonLink,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";
import { parseSafeRichText } from "@/lib/content/safe-rich-text";
import {
  SERVICE_PILLAR_META,
  type BreadcrumbItem,
  type CmsService,
} from "@/types/cms";

export interface ServiceDetailViewProps {
  service: CmsService;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const pillarMeta = SERVICE_PILLAR_META.find(
    (item) => item.key === service.pillar
  );
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title, href: service.fullPath },
  ];

  const primaryCta = service.primaryCta ?? {
    label: "Get a Quote",
    url: `/contact/get-quote?service=${encodeURIComponent(service.slug)}`,
    variant: "primary" as const,
    isVisible: true,
  };

  const secondaryCta = service.secondaryCta ?? {
    label: "Book a Consultation",
    url: `/contact/book-consultation?service=${encodeURIComponent(service.slug)}`,
    variant: "outline" as const,
    isVisible: true,
  };

  const descriptionBlocks = service.description
    ? parseSafeRichText(service.description)
    : [];

  return (
    <>
      <Section surface="ivory" spacing="spacious">
        <Container size="wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className={service.featuredImage?.url ? "lg:col-span-7" : "lg:col-span-9"}>
              <Badge variant="gold">
                {pillarMeta?.label ?? service.pillar}
              </Badge>
              <Heading as="h1" scale="display" className="mt-4">
                {service.title}
              </Heading>
              <Text variant="lead" className="mt-4 text-navy-muted">
                {service.summary}
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

            {service.featuredImage?.url ? (
              <div className="lg:col-span-5">
                <CmsMediaImage
                  media={service.featuredImage}
                  altOverride={service.featuredImageAlt}
                  fallbackAlt={service.title}
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {descriptionBlocks.length > 0 ? (
        <Section surface="sand" spacing="default">
          <Container size="narrow">
            <Heading as="h2">Overview</Heading>
            <div className="mt-5 space-y-4">
              {descriptionBlocks.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <Heading
                      key={index}
                      as={block.level === 2 ? "h2" : "h3"}
                      className="pt-2"
                    >
                      {block.text}
                    </Heading>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="list-disc space-y-2 pl-5 text-navy-muted"
                    >
                      {block.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <Text key={index} className="text-navy-muted">
                    {block.text}
                  </Text>
                );
              })}
            </div>
          </Container>
        </Section>
      ) : null}

      {service.capabilities.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Capabilities",
            heading: "What This Service Covers",
            gridKind: "features",
            columns: "2",
            items: service.capabilities,
            surface: "ivory",
            spacing: "default",
          }}
        />
      ) : null}

      {service.benefits.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Outcomes",
            heading: "Operational Benefits",
            gridKind: "features",
            columns: "3",
            items: service.benefits,
            surface: "sand",
            spacing: "default",
          }}
        />
      ) : null}

      {service.deliverables.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Deliverables",
            heading: "Tangible Artifacts & Handoff",
            gridKind: "features",
            columns: "3",
            items: service.deliverables,
            surface: "ivory",
            spacing: "default",
          }}
        />
      ) : null}

      {service.processSteps.length > 0 ? (
        <ProcessStepsSection
          section={{
            __component: "sections.process-steps",
            eyebrow: "Delivery Flow",
            heading: "Execution Process",
            layout: "steps",
            steps: service.processSteps,
            surface: "sand",
            spacing: "default",
          }}
        />
      ) : null}

      {service.useCases.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Applications",
            heading: "Representative Use Cases",
            gridKind: "features",
            columns: "2",
            items: service.useCases,
            surface: "ivory",
            spacing: "default",
          }}
        />
      ) : null}

      {service.technologies.length > 0 ? (
        <CardGridSection
          section={{
            __component: "sections.card-grid",
            eyebrow: "Ecosystem",
            heading: "Technologies & Practices",
            gridKind: "technologies",
            columns: "4",
            items: service.technologies,
            surface: "sand",
            spacing: "compact",
          }}
        />
      ) : null}

      {service.faqs.length > 0 ? (
        <FaqAccordionSection
          section={{
            __component: "sections.faq-accordion",
            eyebrow: "FAQ",
            heading: "Frequently Asked Questions",
            items: service.faqs,
            surface: "ivory",
            spacing: "default",
          }}
        />
      ) : null}

      {service.sections && service.sections.length > 0 ? (
        <SectionRenderer sections={service.sections} />
      ) : null}

      {service.relatedServices.length > 0 ? (
        <Section surface="sand" spacing="default">
          <Container size="wide">
            <Text variant="eyebrow" className="text-teal-deep">
              Related Capabilities
            </Text>
            <Heading as="h2" className="mt-2">
              Complementary Services
            </Heading>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((rel) => (
                <div
                  key={rel.slug}
                  className="rounded-lg border border-border bg-canvas p-6"
                >
                  <Heading as="h3">{rel.title}</Heading>
                  <Text variant="muted" className="mt-2 text-sm">
                    {rel.summary}
                  </Text>
                  <div className="mt-4">
                    <Link
                      href={rel.fullPath}
                      className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                    >
                      Explore service
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBannerSection
        section={{
          __component: "sections.cta-banner",
          eyebrow: "Next Steps",
          heading: `Discuss ${service.title} With NAVOSYS`,
          body: "Share your project scope for a tailored estimate or schedule an engineering consultation.",
          variant: "footer_cta",
          primaryCta,
          secondaryCta,
          surface: "navy",
          spacing: "default",
        }}
      />
    </>
  );
}
