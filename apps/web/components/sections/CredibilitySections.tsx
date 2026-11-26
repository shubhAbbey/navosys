import { Card, Container, Section, Text } from "@/components/ui";
import { isSafeLinkUrl } from "@/lib/content/safe-rich-text";
import type {
  LogoGridSectionData,
  QuoteBlockSectionData,
  StatsSectionData,
  TeamGridSectionData,
  TestimonialsSectionData,
} from "@/types/cms";
import {
  CmsMediaImage,
  getSectionAnchorId,
  SectionHeader,
} from "./section-utils";

/**
 * Renders only explicitly verified metrics (never fabricated/placeholder stats).
 */
export function StatsSection({ section }: { section: StatsSectionData }) {
  const verifiedItems = (section.items ?? [])
    .filter((item) => item.isVerified === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (verifiedItems.length === 0) {
    return null;
  }

  const surface = section.surface ?? "sand";
  const isDark = surface === "navy";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "compact"}
    >
      <Container size="wide">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {verifiedItems.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className={`rounded-lg border p-6 ${
                isDark
                  ? "border-[#3A4F68] bg-navy-deep/40"
                  : "border-border bg-canvas"
              }`}
            >
              <dt
                className={`text-sm font-medium ${
                  isDark ? "text-sand/90" : "text-navy-muted"
                }`}
              >
                {item.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">
                {item.value}
              </dd>
              {item.context ? (
                <p
                  className={`mt-2 text-xs ${
                    isDark ? "text-sand/80" : "text-navy-muted"
                  }`}
                >
                  {item.context}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export function QuoteBlockSection({
  section,
}: {
  section: QuoteBlockSectionData;
}) {
  if (section.variant === "testimonial" && section.isVerified !== true) {
    return null;
  }

  const surface = section.surface ?? "sand";
  const isDark = surface === "navy";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "compact"}
    >
      <Container size="narrow">
        <figure className="border-l-4 border-gold pl-6">
          <blockquote className="text-xl leading-relaxed font-medium sm:text-2xl">
            “{section.quote}”
          </blockquote>
          {section.attribution ? (
            <figcaption
              className={`mt-4 text-sm ${
                isDark ? "text-sand/90" : "text-navy-muted"
              }`}
            >
              <span className="font-semibold">{section.attribution}</span>
              {section.role ? <span> — {section.role}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      </Container>
    </Section>
  );
}

/**
 * Renders only explicitly verified testimonials.
 */
export function TestimonialsSection({
  section,
}: {
  section: TestimonialsSectionData;
}) {
  const verified = (section.items ?? [])
    .filter((item) => item.isVerified === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (verified.length === 0) {
    return null;
  }

  const surface = section.surface ?? "sand";
  const cardSurface = surface === "sand" ? "ivory" : surface === "ivory" ? "sand" : "navy";

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
          surface={surface}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {verified.map((item, idx) => (
            <Card key={`${item.authorName ?? "quote"}-${idx}`} surface={cardSurface}>
              <blockquote className="text-base leading-relaxed">
                “{item.quote}”
              </blockquote>
              {item.authorName || item.organization ? (
                <Text variant="muted" className="mt-4 text-xs font-medium">
                  {[item.authorName, item.authorRole, item.organization]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/**
 * Renders only approved partner/technology logos.
 */
export function LogoGridSection({ section }: { section: LogoGridSectionData }) {
  const approved = (section.items ?? [])
    .filter((item) => item.isApproved === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (approved.length === 0) {
    return null;
  }

  const surface = section.surface ?? "ivory";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "compact"}
    >
      <Container size="wide">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          surface={surface}
        />
        <ul className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {approved.map((item, idx) => {
            const content = item.logo?.url ? (
              <CmsMediaImage
                media={item.logo}
                altOverride={item.altText}
                fallbackAlt={item.name}
                className="mx-auto max-h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-sm font-semibold">{item.name}</span>
            );

            return (
              <li
                key={`${item.name}-${idx}`}
                className="flex min-h-16 items-center justify-center rounded-md border border-border p-4"
              >
                {item.url && isSafeLinkUrl(item.url) ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Renders only approved team records (no fabricated team portrayal).
 */
export function TeamGridSection({ section }: { section: TeamGridSectionData }) {
  const approved = (section.members ?? [])
    .filter((member) => member.isApproved === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (approved.length === 0) {
    return null;
  }

  const surface = section.surface ?? "ivory";
  const cardSurface = surface === "ivory" ? "sand" : surface === "sand" ? "ivory" : "navy";

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
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approved.map((member, idx) => (
            <Card key={`${member.name}-${idx}`} surface={cardSurface}>
              {member.photo?.url ? (
                <div className="mb-4 overflow-hidden rounded-md">
                  <CmsMediaImage
                    media={member.photo}
                    fallbackAlt={`${member.name}, ${member.role}`}
                    className="aspect-4/3 w-full object-cover"
                  />
                </div>
              ) : null}
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-teal-deep">{member.role}</p>
              {member.bio ? (
                <Text variant="muted" className="mt-2.5 text-sm">
                  {member.bio}
                </Text>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
