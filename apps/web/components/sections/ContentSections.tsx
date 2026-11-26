import Link from "next/link";
import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";
import { isSafeLinkUrl, parseSafeRichText } from "@/lib/content/safe-rich-text";
import type {
  CardGridSectionData,
  ComparisonTableSectionData,
  ProcessStepsSectionData,
  RichTextSectionData,
} from "@/types/cms";
import {
  getSectionAnchorId,
  SectionCtaPair,
  SectionHeader,
} from "./section-utils";

export function RichTextSection({ section }: { section: RichTextSectionData }) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const blocks = parseSafeRichText(section.content);

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size={section.maxWidth === "default" ? "default" : "narrow"}>
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          surface={surface}
        />
        <div className={`space-y-4 ${section.heading ? "mt-6" : ""}`}>
          {blocks.map((block, index) => {
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
                  className={`list-disc space-y-2 pl-5 ${
                    isDark ? "text-sand/90" : "text-navy-muted"
                  }`}
                >
                  {block.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <Text
                key={index}
                className={isDark ? "text-sand/90" : "text-navy-muted"}
              >
                {block.text}
              </Text>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

const GRID_COLUMN_CLASSES = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function CardGridSection({ section }: { section: CardGridSectionData }) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const cardSurface = surface === "ivory" ? "sand" : surface === "sand" ? "ivory" : "navy";
  const items = [...(section.items ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const cols = GRID_COLUMN_CLASSES[section.columns ?? "3"];

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
      data-grid-kind={section.gridKind ?? "features"}
    >
      <Container size="wide">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        {items.length > 0 ? (
          <div className={`mt-10 grid gap-6 ${cols}`}>
            {items.map((item, idx) => (
              <Card
                key={`${item.title}-${idx}`}
                surface={cardSurface}
                interactive={Boolean(item.href)}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {item.eyebrow ? (
                      <Text
                        variant="eyebrow"
                        className={isDark ? "text-gold" : "text-teal-deep"}
                      >
                        {item.eyebrow}
                      </Text>
                    ) : null}
                    {item.badge ? (
                      <Badge variant={isDark ? "gold" : "neutral"}>
                        {item.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <Heading
                    as="h3"
                    className={item.eyebrow || item.badge ? "mt-3" : ""}
                  >
                    {item.title}
                  </Heading>
                  {item.description ? (
                    <Text
                      variant={isDark ? "body" : "muted"}
                      className={`mt-2.5 text-sm ${isDark ? "text-sand/90" : ""}`}
                    >
                      {item.description}
                    </Text>
                  ) : null}
                </div>

                {item.href && isSafeLinkUrl(item.href) ? (
                  <div className="mt-5">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center text-sm font-semibold underline underline-offset-4 ${
                        isDark
                          ? "text-gold hover:text-canvas"
                          : "text-teal-deep hover:text-navy"
                      }`}
                    >
                      {item.ctaLabel || "Learn more"}
                    </Link>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        ) : null}

        <SectionCtaPair primaryCta={section.cta} surface={surface} />
      </Container>
    </Section>
  );
}

export function ProcessStepsSection({
  section,
}: {
  section: ProcessStepsSectionData;
}) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const isTimeline = section.layout === "timeline";
  const steps = [...(section.steps ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="wide">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        {steps.length > 0 ? (
          <ol
            className={
              isTimeline
                ? "mt-10 space-y-6 border-l-2 border-gold pl-6"
                : "mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            }
          >
            {steps.map((step, idx) => (
              <li
                key={`${step.title}-${idx}`}
                className={`rounded-lg border p-6 ${
                  isDark
                    ? "border-[#3A4F68] bg-navy-deep/40"
                    : surface === "sand"
                      ? "border-border bg-canvas"
                      : "border-border bg-sand"
                }`}
              >
                <span
                  className={`text-xs font-semibold tracking-wider uppercase ${
                    isDark ? "text-gold" : "text-teal-deep"
                  }`}
                >
                  {step.stepNumber || `Step ${idx + 1}`}
                </span>
                <Heading as="h3" className="mt-2">
                  {step.title}
                </Heading>
                {step.description ? (
                  <Text
                    className={`mt-2 text-sm ${
                      isDark ? "text-sand/90" : "text-navy-muted"
                    }`}
                  >
                    {step.description}
                  </Text>
                ) : null}
                {step.deliverable ? (
                  <p
                    className={`mt-3 text-xs font-medium ${
                      isDark ? "text-gold" : "text-navy"
                    }`}
                  >
                    Deliverable: {step.deliverable}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </Section>
  );
}

export function ComparisonTableSection({
  section,
}: {
  section: ComparisonTableSectionData;
}) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const rows = [...(section.rows ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="default">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead
              className={
                isDark
                  ? "bg-navy-deep text-canvas"
                  : "bg-sand text-navy"
              }
            >
              <tr>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Capability
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  {section.primaryColumnLabel}
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  {section.secondaryColumnLabel}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, idx) => (
                <tr
                  key={`${row.feature}-${idx}`}
                  className={
                    row.highlight
                      ? isDark
                        ? "bg-navy-deep/50"
                        : "bg-sand/50"
                      : ""
                  }
                >
                  <th scope="row" className="px-4 py-3.5 font-medium">
                    {row.feature}
                  </th>
                  <td className="px-4 py-3.5">{row.primaryValue}</td>
                  <td className="px-4 py-3.5">{row.secondaryValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
