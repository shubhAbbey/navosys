import { Container, Heading, Section, Text } from "@/components/ui";
import type {
  HeroSectionData,
  ImageTextSectionData,
  SplitHeroSectionData,
} from "@/types/cms";
import {
  CmsMediaImage,
  getSectionAnchorId,
  SectionCtaPair,
} from "./section-utils";

export function HeroSection({ section }: { section: HeroSectionData }) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const isCentered = section.alignment === "center";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "spacious"}
    >
      <Container size="default">
        <div
          className={
            isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
          }
        >
          {section.eyebrow ? (
            <Text
              variant="eyebrow"
              className={isDark ? "text-gold" : "text-teal-deep"}
            >
              {section.eyebrow}
            </Text>
          ) : null}
          <Heading
            as="h1"
            scale="display"
            className={section.eyebrow ? "mt-3" : ""}
          >
            {section.heading}
          </Heading>
          {section.subheading ? (
            <Text
              variant="lead"
              className={`mt-4 ${isDark ? "text-sand/90" : "text-navy-muted"}`}
            >
              {section.subheading}
            </Text>
          ) : null}
          <SectionCtaPair
            primaryCta={section.primaryCta}
            secondaryCta={section.secondaryCta}
            surface={surface}
            centered={isCentered}
          />
        </div>

        {section.media?.url ? (
          <div className="mt-10 overflow-hidden rounded-lg">
            <CmsMediaImage
              media={section.media}
              altOverride={section.mediaAlt}
              fallbackAlt={section.heading}
            />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export function SplitHeroSection({
  section,
}: {
  section: SplitHeroSectionData;
}) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const mediaFirst = section.mediaPosition === "left";
  const highlightList = (section.highlights ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div
            className={`lg:col-span-7 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}
          >
            {section.eyebrow ? (
              <Text
                variant="eyebrow"
                className={isDark ? "text-gold" : "text-teal-deep"}
              >
                {section.eyebrow}
              </Text>
            ) : null}
            <Heading
              as="h1"
              scale="display"
              className={section.eyebrow ? "mt-3" : ""}
            >
              {section.heading}
            </Heading>
            {section.subheading ? (
              <Text
                variant="lead"
                className={`mt-4 ${isDark ? "text-sand/90" : "text-navy-muted"}`}
              >
                {section.subheading}
              </Text>
            ) : null}
            {highlightList.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm">
                {highlightList.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        isDark ? "bg-gold" : "bg-teal-deep"
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <SectionCtaPair
              primaryCta={section.primaryCta}
              secondaryCta={section.secondaryCta}
              surface={surface}
            />
          </div>

          {section.media?.url ? (
            <div
              className={`lg:col-span-5 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}
            >
              <CmsMediaImage
                media={section.media}
                altOverride={section.mediaAlt}
                fallbackAlt={section.heading}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export function ImageTextSection({
  section,
}: {
  section: ImageTextSectionData;
}) {
  const surface = section.surface ?? "sand";
  const isDark = surface === "navy";
  const mediaFirst = section.mediaPosition === "left";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div
            className={`lg:col-span-6 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}
          >
            {section.eyebrow ? (
              <Text
                variant="eyebrow"
                className={isDark ? "text-gold" : "text-teal-deep"}
              >
                {section.eyebrow}
              </Text>
            ) : null}
            <Heading as="h2" className={section.eyebrow ? "mt-2" : ""}>
              {section.heading}
            </Heading>
            <Text
              className={`mt-4 whitespace-pre-line ${
                isDark ? "text-sand/90" : "text-navy-muted"
              }`}
            >
              {section.body}
            </Text>
            <SectionCtaPair primaryCta={section.cta} surface={surface} />
          </div>

          {section.media?.url ? (
            <div
              className={`lg:col-span-6 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}
            >
              <CmsMediaImage
                media={section.media}
                altOverride={section.mediaAlt}
                fallbackAlt={section.heading}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
