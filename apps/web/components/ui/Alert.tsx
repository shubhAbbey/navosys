import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

const ALERT_STYLES: Record<
  AlertVariant,
  { container: string; label: string }
> = {
  info: {
    container: "bg-sand text-navy border-border-strong",
    label: "Notice",
  },
  success: {
    container: "bg-success-surface text-success border-success",
    label: "Success",
  },
  warning: {
    container: "bg-warning-surface text-warning border-warning",
    label: "Warning",
  },
  error: {
    container: "bg-error-surface text-error border-error",
    label: "Error",
  },
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

/**
 * Accessible status banner pairing explicit text labels with contrast-tested borders and surfaces.
 */
export function Alert({
  variant = "info",
  title,
  children,
  className = "",
  ...rest
}: AlertProps) {
  const style = ALERT_STYLES[variant];
  const role = variant === "error" || variant === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      className={`rounded-md border-l-4 border px-4 py-3 text-sm ${style.container} ${className}`.trim()}
      {...rest}
    >
      <p className="font-semibold">{title ?? style.label}</p>
      <div className="mt-1 leading-relaxed">{children}</div>
    </div>
  );
}
