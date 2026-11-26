import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const FIELD_CONTROL_BASE =
  "w-full rounded-md border bg-canvas px-3.5 py-2.5 text-base text-navy placeholder:text-navy-muted/80 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-70";

function getControlBorderClass(hasError?: boolean): string {
  return hasError
    ? "border-error focus-visible:outline-error"
    : "border-border-strong hover:border-navy";
}

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

/**
 * Accessible field wrapper connecting label, optional hint, and error alert via predictable IDs.
 */
export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-xs font-normal text-navy-muted">
            (Required)
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-navy-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-sm font-medium text-error"
        >
          Error: {error}
        </p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({
  hasError = false,
  className = "",
  ...rest
}: InputProps) {
  return (
    <input
      aria-invalid={hasError || undefined}
      className={`min-h-11 ${FIELD_CONTROL_BASE} ${getControlBorderClass(hasError)} ${className}`.trim()}
      {...rest}
    />
  );
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({
  hasError = false,
  rows = 4,
  className = "",
  ...rest
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={hasError || undefined}
      className={`${FIELD_CONTROL_BASE} ${getControlBorderClass(hasError)} ${className}`.trim()}
      {...rest}
    />
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function Select({
  hasError = false,
  className = "",
  children,
  ...rest
}: SelectProps) {
  return (
    <select
      aria-invalid={hasError || undefined}
      className={`min-h-11 ${FIELD_CONTROL_BASE} ${getControlBorderClass(hasError)} ${className}`.trim()}
      {...rest}
    >
      {children}
    </select>
  );
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: ReactNode;
  hasError?: boolean;
}

export function Checkbox({
  id,
  label,
  hasError = false,
  className = "",
  ...rest
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="inline-flex min-h-11 cursor-pointer items-start gap-3 text-sm text-navy"
    >
      <input
        id={id}
        type="checkbox"
        aria-invalid={hasError || undefined}
        className={`mt-1 h-4 w-4 shrink-0 rounded border-border-strong accent-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${className}`.trim()}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
