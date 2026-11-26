import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "neutral" | "teal" | "gold" | "navy";

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-sand text-navy border-border",
  // Uses Deep Navy Ink (#101B27) on Base Muted Teal (#6F9690) (5.33:1)
  teal: "bg-teal text-navy-deep border-transparent",
  // Uses Deep Navy (#23364D) on Warm Gold (#C89F79) (5.09:1) for subtle decorative labels only
  gold: "bg-gold text-navy border-transparent",
  navy: "bg-navy text-canvas border-transparent",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

/**
 * Contrast-verified tag/eyebrow badge primitive. Never rely on color alone for status.
 */
export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${BADGE_CLASSES[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </span>
  );
}
