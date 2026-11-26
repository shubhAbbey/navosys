import Image from "next/image";
import { ButtonLink, Heading, Text } from "@/components/ui";
import { isSafeLinkUrl } from "@/lib/content/safe-rich-text";
import { isLocalMediaUrl } from "@/lib/strapi/client";
import type {
  CmsCta,
  CmsMedia,
  CmsSectionBase,
  CmsSectionSurface,
} from "@/types/cms";

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  surface = "ivory",
  centered = false,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  surface?: CmsSectionSurface;
  centered?: boolean;
}) {
  if (!eyebrow && !heading && !intro) {
    return null;
  }

  const isDark = surface === "navy";
  const alignClass = centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={alignClass}>
      {eyebrow ? (
        <Text
          variant="eyebrow"
          className={isDark ? "text-gold" : "text-teal-deep"}
        >
          {eyebrow}
        </Text>
      ) : null}
      {heading ? (
        <Heading as="h2" className={eyebrow ? "mt-2" : ""}>
          {heading}
        </Heading>
      ) : null}
      {intro ? (
        <Text
          variant="lead"
          className={`mt-3 ${isDark ? "text-sand/90" : "text-navy-muted"}`}
        >
          {intro}
        </Text>
      ) : null}
    </div>
  );
}

function renderSingleCta(
  cta: CmsCta | null | undefined,
  surface: CmsSectionSurface,
  key: string
) {
  if (!cta || cta.isVisible === false || !isSafeLinkUrl(cta.url)) {
    return null;
  }

  const isDark = surface === "navy";
  const darkOverride =
    isDark && (cta.variant === "outline" || cta.variant === "ghost")
      ? "border-sand/70 text-canvas hover:bg-navy-deep hover:border-canvas"
      : "";

  return (
    <ButtonLink
      key={key}
      href={cta.url}
      variant={cta.variant || "primary"}
      className={darkOverride}
    >
      {cta.label}
    </ButtonLink>
  );
}

export function SectionCtaPair({
  primaryCta,
  secondaryCta,
  surface = "ivory",
  centered = false,
}: {
  primaryCta?: CmsCta | null;
  secondaryCta?: CmsCta | null;
  surface?: CmsSectionSurface;
  centered?: boolean;
}) {
  const first = renderSingleCta(primaryCta, surface, "primary");
  const second = renderSingleCta(secondaryCta, surface, "secondary");

  if (!first && !second) {
    return null;
  }

  return (
    <div
      className={`mt-6 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`.trim()}
    >
      {first}
      {second}
    </div>
  );
}

export function CmsMediaImage({
  media,
  altOverride,
  fallbackAlt,
  className = "h-auto w-full rounded-lg border border-border object-cover",
}: {
  media: CmsMedia | null | undefined;
  altOverride?: string | null;
  fallbackAlt: string;
  className?: string;
}) {
  if (!media?.url) {
    return null;
  }

  const alt = altOverride || media.alternativeText || fallbackAlt;
  const width = media.width ?? 1200;
  const height = media.height ?? 800;

  return (
    <Image
      src={media.url}
      alt={alt}
      width={width}
      height={height}
      unoptimized={isLocalMediaUrl(media.url)}
      className={className}
    />
  );
}

export function getSectionAnchorId(section: CmsSectionBase): string | undefined {
  const id = section.anchorId?.trim();
  return id ? id : undefined;
}
