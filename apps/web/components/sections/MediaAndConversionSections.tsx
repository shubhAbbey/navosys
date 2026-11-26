import {
  ButtonLink,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";
import {
  isAllowedVideoEmbedUrl,
  isSafeLinkUrl,
} from "@/lib/content/safe-rich-text";
import type {
  CtaBannerSectionData,
  FormPlaceholderSectionData,
  ImageGallerySectionData,
  VideoEmbedSectionData,
} from "@/types/cms";
import {
  CmsMediaImage,
  getSectionAnchorId,
  SectionCtaPair,
  SectionHeader,
} from "./section-utils";

export function ImageGallerySection({
  section,
}: {
  section: ImageGallerySectionData;
}) {
  const surface = section.surface ?? "ivory";
  const items = [...(section.items ?? [])]
    .filter((item) => Boolean(item.image?.url))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (items.length === 0) {
    return null;
  }

  const colClass =
    section.columns === "2"
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

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
        <div className={`mt-8 grid gap-6 ${colClass}`}>
          {items.map((item, idx) => (
            <figure key={idx} className="space-y-2">
              <CmsMediaImage
                media={item.image}
                altOverride={item.altOverride}
                fallbackAlt={item.caption || section.heading}
                className="aspect-16/10 w-full rounded-lg border border-border object-cover"
              />
              {item.caption ? (
                <figcaption className="text-xs text-navy-muted">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function VideoSection({ section }: { section: VideoEmbedSectionData }) {
  const hasAllowedEmbed = isAllowedVideoEmbedUrl(section.embedUrl);
  const hasVideoFile = Boolean(section.videoFile?.url);

  if (!hasAllowedEmbed && !hasVideoFile) {
    return null;
  }

  const surface = section.surface ?? "ivory";

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
          intro={section.caption}
          surface={surface}
        />
        <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-border bg-navy-deep">
          {hasAllowedEmbed && section.embedUrl ? (
            <iframe
              src={section.embedUrl}
              title={section.heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : section.videoFile?.url ? (
            <video
              controls
              preload="metadata"
              poster={section.posterImage?.url}
              className="h-full w-full"
            >
              <source src={section.videoFile.url} />
            </video>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export function CtaBannerSection({
  section,
}: {
  section: CtaBannerSectionData;
}) {
  const surface = section.surface ?? "navy";
  const isDark = surface === "navy";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
      data-cta-variant={section.variant ?? "banner"}
    >
      <Container size="default">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
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
            {section.body ? (
              <Text
                variant="lead"
                className={`mt-3 ${isDark ? "text-sand/90" : "text-navy-muted"}`}
              >
                {section.body}
              </Text>
            ) : null}
          </div>
          <div className="shrink-0">
            <SectionCtaPair
              primaryCta={section.primaryCta}
              secondaryCta={section.secondaryCta}
              surface={surface}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FormPlaceholderSection({
  section,
}: {
  section: FormPlaceholderSectionData;
}) {
  const surface = section.surface ?? "sand";
  const cardSurface = surface === "sand" ? "ivory" : surface === "ivory" ? "sand" : "navy";
  const route =
    section.targetRoute && isSafeLinkUrl(section.targetRoute)
      ? section.targetRoute
      : "/contact/get-quote";

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
      data-form-kind={section.formKind ?? "quote"}
    >
      <Container size="narrow">
        <Card surface={cardSurface}>
          <SectionHeader
            eyebrow={section.eyebrow}
            heading={section.heading}
            intro={section.intro}
            surface={cardSurface}
          />
          <div className="mt-6">
            <ButtonLink href={route} variant="primary">
              {section.ctaLabel || "Get a Quote"}
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
