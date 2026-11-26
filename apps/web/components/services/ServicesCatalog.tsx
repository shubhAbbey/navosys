"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";
import { CmsMediaImage } from "@/components/sections/section-utils";
import {
  SERVICE_PILLAR_META,
  type CmsServiceSummary,
  type ServicePillar,
} from "@/types/cms";

export interface ServicesCatalogProps {
  services: CmsServiceSummary[];
}

function getPillarLabel(pillar: ServicePillar): string {
  return (
    SERVICE_PILLAR_META.find((item) => item.key === pillar)?.label ?? pillar
  );
}

function ServiceCard({
  service,
  cardSurface = "ivory",
}: {
  service: CmsServiceSummary;
  cardSurface?: "ivory" | "sand";
}) {
  return (
    <Card
      surface={cardSurface}
      interactive
      className="flex flex-col justify-between"
    >
      <div>
        {service.featuredImage?.url ? (
          <div className="mb-5 overflow-hidden rounded-md">
            <CmsMediaImage
              media={service.featuredImage}
              altOverride={service.featuredImageAlt}
              fallbackAlt={service.title}
              className="aspect-16/10 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{getPillarLabel(service.pillar)}</Badge>
          {service.isFeatured ? <Badge variant="gold">Featured</Badge> : null}
        </div>

        <Heading as="h3" className="mt-3">
          {service.title}
        </Heading>
        <Text variant="muted" className="mt-2.5 text-sm">
          {service.summary}
        </Text>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Link
          href={service.fullPath}
          className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
        >
          Explore service
        </Link>
        <Link
          href={`/contact/get-quote?service=${encodeURIComponent(service.slug)}`}
          className="text-xs font-medium text-navy-muted hover:text-navy hover:underline underline-offset-4"
        >
          Get a Quote
        </Link>
      </div>
    </Card>
  );
}

/**
 * Dynamic CMS-driven service catalog supporting featured highlights and pillar filtering.
 */
export function ServicesCatalog({ services }: ServicesCatalogProps) {
  const [selectedPillar, setSelectedPillar] = useState<"all" | ServicePillar>(
    "all"
  );

  const featuredServices = services.filter((service) => service.isFeatured);
  const filteredServices =
    selectedPillar === "all"
      ? services
      : services.filter((service) => service.pillar === selectedPillar);

  return (
    <>
      {featuredServices.length > 0 ? (
        <Section surface="sand" spacing="default" aria-labelledby="featured-services-heading">
          <Container size="wide">
            <Text variant="eyebrow" className="text-teal-deep">
              Highlighted Capabilities
            </Text>
            <Heading as="h2" id="featured-services-heading" className="mt-2">
              Featured Services
            </Heading>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={`featured-${service.slug}`}
                  service={service}
                  cardSurface="ivory"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section surface="ivory" spacing="default" aria-labelledby="all-services-heading">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Text variant="eyebrow" className="text-teal-deep">
                By Pillar
              </Text>
              <Heading as="h2" id="all-services-heading" className="mt-2">
                All Services
              </Heading>
            </div>

            <div
              role="group"
              aria-label="Filter services by pillar"
              className="flex flex-wrap gap-2"
            >
              <button
                type="button"
                aria-pressed={selectedPillar === "all"}
                onClick={() => setSelectedPillar("all")}
                className={`min-h-11 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  selectedPillar === "all"
                    ? "bg-navy text-canvas"
                    : "border border-border-strong bg-canvas text-navy hover:bg-sand"
                }`}
              >
                All Pillars ({services.length})
              </button>

              {SERVICE_PILLAR_META.map((pillar) => {
                const count = services.filter(
                  (service) => service.pillar === pillar.key
                ).length;
                const isSelected = selectedPillar === pillar.key;

                return (
                  <button
                    key={pillar.key}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPillar(pillar.key)}
                    className={`min-h-11 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                      isSelected
                        ? "bg-navy text-canvas"
                        : "border border-border-strong bg-canvas text-navy hover:bg-sand"
                    }`}
                  >
                    {pillar.shortLabel} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredServices.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  cardSurface="sand"
                />
              ))}
            </div>
          ) : (
            <Card surface="sand" className="mt-8">
              <Text variant="muted">
                No published services match this pillar yet. Publish service
                records in Strapi to populate this category automatically.
              </Text>
            </Card>
          )}
        </Container>
      </Section>
    </>
  );
}
