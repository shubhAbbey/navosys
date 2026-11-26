export interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Safely serializes JSON-LD structured data, escaping angle brackets to prevent script injection.
 */
export function StructuredData({ data }: StructuredDataProps) {
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
