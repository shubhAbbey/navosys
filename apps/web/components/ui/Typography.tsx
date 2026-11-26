import type { HTMLAttributes, ReactNode } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";
export type HeadingScale = "display" | "h1" | "h2" | "h3" | "h4";

const HEADING_CLASSES: Record<HeadingScale, string> = {
  display: "text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]",
  h1: "text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl leading-[1.2]",
  h2: "text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl leading-[1.25]",
  h3: "text-lg font-semibold tracking-tight sm:text-xl leading-[1.3]",
  h4: "text-base font-semibold leading-[1.35]",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  scale?: HeadingScale;
  children: ReactNode;
}

/**
 * Semantic editorial heading decoupled from visual scale for clean outline hierarchy.
 */
export function Heading({
  as = "h2",
  scale,
  children,
  className = "",
  ...rest
}: HeadingProps) {
  const Tag = as;
  const resolvedScale = scale ?? as;

  return (
    <Tag
      className={`${HEADING_CLASSES[resolvedScale]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export type TextVariant = "lead" | "body" | "muted" | "eyebrow";

const TEXT_CLASSES: Record<TextVariant, string> = {
  lead: "text-base leading-relaxed sm:text-lg",
  body: "text-base leading-relaxed",
  muted: "text-sm leading-relaxed text-navy-muted",
  eyebrow: "text-xs font-semibold tracking-[0.12em] uppercase",
};

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: ReactNode;
}

/**
 * Body typography primitive with restrained line length and contrast-tested hierarchy.
 */
export function Text({
  variant = "body",
  children,
  className = "",
  ...rest
}: TextProps) {
  return (
    <p className={`${TEXT_CLASSES[variant]} ${className}`.trim()} {...rest}>
      {children}
    </p>
  );
}
