import type { HTMLAttributes, ReactNode } from "react";

export type CardSurface = "ivory" | "sand" | "navy";

const CARD_SURFACE_CLASSES: Record<CardSurface, string> = {
  ivory: "bg-canvas text-navy border-border",
  sand: "bg-sand text-navy border-border",
  navy: "bg-navy text-canvas border-[#3A4F68]",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  interactive?: boolean;
  children: ReactNode;
}

/**
 * Understated bordered card surface with restrained elevation and optional hover emphasis.
 */
export function Card({
  surface = "ivory",
  interactive = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const interactiveClasses = interactive
    ? "transition-colors duration-150 hover:border-border-strong"
    : "";

  return (
    <div
      className={`rounded-lg border p-6 shadow-xs sm:p-8 ${CARD_SURFACE_CLASSES[surface]} ${interactiveClasses} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
