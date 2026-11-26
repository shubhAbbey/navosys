import type { ReactNode } from "react";

export type ContainerSize = "narrow" | "default" | "wide";

const SIZE_CLASSES: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

/**
 * Responsive horizontal page container enforcing consistent gutters across breakpoints.
 */
export function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${SIZE_CLASSES[size]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
