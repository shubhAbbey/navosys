import type { HTMLAttributes, ReactNode } from "react";

export type SectionSurface = "ivory" | "sand" | "navy";
export type SectionSpacing = "compact" | "default" | "spacious";

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  ivory: "bg-canvas text-navy",
  sand: "bg-sand text-navy",
  navy: "bg-navy text-canvas [&_*]:focus-visible:outline-canvas",
};

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  compact: "py-10 sm:py-12 lg:py-16",
  default: "py-14 sm:py-20 lg:py-24",
  spacious: "py-16 sm:py-24 lg:py-28",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
}

/**
 * Semantic section wrapper applying approved NAVOSYS surface contrast and generous vertical whitespace.
 */
export function Section({
  children,
  surface = "ivory",
  spacing = "default",
  className = "",
  ...rest
}: SectionProps) {
  return (
    <section
      className={`${SURFACE_CLASSES[surface]} ${SPACING_CLASSES[spacing]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
}
