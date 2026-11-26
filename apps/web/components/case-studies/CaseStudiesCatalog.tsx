"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";
import { CmsMediaImage } from "@/components/sections/section-utils";
import type { CmsCaseStudySummary } from "@/types/cms";

export interface CaseStudiesCatalogProps {
  caseStudies: CmsCaseStudySummary[];
}

export function CaseStudiesCatalog({ caseStudies }: CaseStudiesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          caseStudies
            .map((item) => item.categoryLabel)
            .filter((label) => Boolean(label))
        )
      ),
    [caseStudies]
  );

  const visibleStudies =
    selectedCategory === "all"
      ? caseStudies
      : caseStudies.filter((item) => item.categoryLabel === selectedCategory);

  return (
    <Section
      surface="sand"
      spacing="default"
      aria-labelledby="case-studies-catalog-heading"
    >
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Text variant="eyebrow" className="text-teal-deep">
              Portfolio & Blueprints
            </Text>
            <Heading as="h2" id="case-studies-catalog-heading" className="mt-2">
              Reference Architecture Case Studies
            </Heading>
          </div>

          {categories.length > 1 ? (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter case studies by practice category"
            >
              <button
                type="button"
                aria-pressed={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedCategory === "all"
                    ? "border-navy bg-navy text-canvas"
                    : "border-border bg-canvas text-navy hover:bg-sand"
                }`}
              >
                All ({caseStudies.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    selectedCategory === category
                      ? "border-navy bg-navy text-canvas"
                      : "border-border bg-canvas text-navy hover:bg-sand"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {visibleStudies.length === 0 ? (
          <Card surface="ivory" className="mt-8">
            <Text variant="muted">
              No case studies match this filter yet.
            </Text>
          </Card>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleStudies.map((study) => (
              <Card
                key={study.slug}
                surface="ivory"
                interactive
                className="flex flex-col justify-between"
              >
                <div>
                  {study.featuredImage?.url ? (
                    <div className="mb-5 overflow-hidden rounded-md">
                      <CmsMediaImage
                        media={study.featuredImage}
                        altOverride={study.featuredImageAlt}
                        fallbackAlt={study.title}
                        className="aspect-16/10 w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{study.categoryLabel}</Badge>
                    {study.isConceptual ? (
                      <Badge variant="gold">Conceptual Example</Badge>
                    ) : null}
                  </div>

                  <Heading as="h3" className="mt-3">
                    {study.title}
                  </Heading>
                  <Text variant="muted" className="mt-2.5 text-sm">
                    {study.summary}
                  </Text>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <Link
                    href={study.fullPath}
                    className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
                  >
                    Read case study
                  </Link>
                  <Link
                    href={`/contact/get-quote?caseStudy=${encodeURIComponent(study.slug)}`}
                    className="text-xs font-medium text-navy-muted hover:text-navy hover:underline underline-offset-4"
                  >
                    Request similar scope
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
