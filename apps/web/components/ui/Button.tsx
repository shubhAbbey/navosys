import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-60";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Uses contrast-tested Muted Teal Deep (#3D645E) + Warm Ivory (#FAF8F5) (6.22:1)
  primary:
    "bg-teal-deep text-canvas hover:bg-teal-hover active:bg-teal-hover border border-transparent",
  secondary:
    "bg-navy text-canvas hover:bg-navy-deep active:bg-navy-deep border border-transparent",
  outline:
    "bg-transparent text-navy border border-border-strong hover:bg-sand active:bg-sand",
  ghost:
    "bg-transparent text-navy border border-transparent hover:bg-sand active:bg-sand",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string
): string {
  return `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim();
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Accessible action button primitive adhering to contrast-tested NAVOSYS theme tokens.
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Next.js Link styled with the NAVOSYS button variants for navigation CTAs.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={getButtonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
