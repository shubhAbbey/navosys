import Link from "next/link";
import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";
import { CmsMediaImage } from "@/components/sections/section-utils";
import type { CmsIndustrySummary } from "@/types/cms";

export interface IndustriesCatalogProps {
  industries: CmsIndustrySummary[];
}

export function IndustriesCatalog({ industries }: IndustriesCatalogProps) {
  return (
    <Section
      surface="sand"
      spacing="default"
      aria-labelledby="industries-catalog-heading"
    >
      <Container size="wide">
        <Text variant="eyebrow" className="text-teal-deep">
          Industries We Architect For
        </Text>
        <Heading as="h2" id="industries-catalog-heading" className="mt-2">
          Sector Capability Blueprints
        </Heading>
        <Text variant="muted" className="mt-3 max-w-2xl">
          Review technical challenges, architecture patterns, and security
          considerations tailored by operating sector.
        </Text>

        {industries.length === 0 ? (
          <Card surface="ivory" className="mt-8">
            <Text variant="muted">
              No published industries available right now. Check Strapi Admin or
              re-run verification after CMS seeding.
            </Text>
          </Card>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card
                key={industry.slug}
                surface="ivory"
                interactive
                className="flex flex-col justify-between"
              >
                <div>
                  {industry.featuredImage?.url ? (
                    <div className="mb-5 overflow-hidden rounded-md">
                      <CmsMediaImage
                        media={industry.featuredImage}
                        altOverride={industry.featuredImageAlt}
                        fallbackAlt={industry.title}
                        className="aspect-16/10 w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">Capability Blueprint</Badge>
                    {industry.isFeatured ? (
                      <Badge variant="gold">Highlighted</Badge>
                    ) : null}
                  </div>

                  <Heading as="h3" className="mt-3">
                    {industry.title}
                  </Heading>
                  <Text variant="muted" className="mt-2.5 text-sm">
                    {industry.summary}
                  </Text>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <Link
                    href={industry.fullPath}
                    className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                  >
                    Explore sector
                  </Link>
                  <Link
                    href={`/contact/get-quote?industry=${encodeURIComponent(industry.slug)}`}
                    className="text-xs font-medium text-navy-muted hover:text-navy hover:underline underline-offset-4"
                  >
                    Discuss scope
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
