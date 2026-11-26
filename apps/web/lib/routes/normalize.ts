import type {
  BreadcrumbItem,
  CmsPage,
  CmsPageParentRef,
  RouteConflict,
} from "@/types/cms";

const RESERVED_PREFIXES = ["/api", "/_next", "/admin"];

/**
 * Normalizes a route path into lowercase canonical form ("/" or "/segment/child").
 * Rejects path traversal attempts and strips query/hash fragments.
 */
export function normalizePath(raw: string): string {
  const withoutQueryOrHash = raw.split(/[?#]/)[0] ?? "";
  const trimmed = withoutQueryOrHash.trim().replace(/\\/g, "/");

  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const segments = withLeading
    .split("/")
    .filter((segment) => segment.length > 0 && segment !== ".");

  if (segments.some((segment) => segment === "..")) {
    throw new Error(`Invalid route traversal in path: ${raw}`);
  }

  if (segments.length === 0) {
    return "/";
  }

  return `/${segments.map((segment) => segment.toLowerCase()).join("/")}`;
}

export function slugArrayToPath(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return "/";
  }
  return normalizePath(slug.join("/"));
}

export function pathToSlugArray(fullPath: string): string[] {
  const normalized = normalizePath(fullPath);
  if (normalized === "/") {
    return [];
  }
  return normalized.slice(1).split("/");
}

export function isReservedSystemPath(fullPath: string): boolean {
  const normalized = normalizePath(fullPath);
  return RESERVED_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );
}

/**
 * Validates a relative internal path for safe redirects/preview navigation.
 */
export function isSafeInternalPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return false;
  }
  try {
    normalizePath(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Detects duplicate normalized paths or reserved system path collisions across CMS records.
 */
export function detectRouteConflicts(
  records: ReadonlyArray<{ fullPath: string; title?: string; documentId?: string }>
): RouteConflict[] {
  const grouped = new Map<string, string[]>();

  for (const record of records) {
    const normalized = normalizePath(record.fullPath);
    const label = record.documentId || record.title || record.fullPath;
    const list = grouped.get(normalized) ?? [];
    list.push(label);
    grouped.set(normalized, list);
  }

  const conflicts: RouteConflict[] = [];
  for (const [fullPath, sources] of grouped.entries()) {
    if (sources.length > 1 || isReservedSystemPath(fullPath)) {
      conflicts.push({
        fullPath,
        count: sources.length,
        sources,
      });
    }
  }

  return conflicts;
}

/**
 * Builds ordered breadcrumb trail from root Home through parent hierarchy to the current page.
 */
export function buildBreadcrumbs(page: CmsPage): BreadcrumbItem[] {
  const normalizedCurrent = normalizePath(page.fullPath);
  if (normalizedCurrent === "/") {
    return [{ label: "Home", href: "/" }];
  }

  const ancestors: BreadcrumbItem[] = [];
  const visited = new Set<string>([normalizedCurrent]);

  let cursor: CmsPageParentRef | null | undefined = page.parent;
  while (cursor && cursor.fullPath) {
    const normalizedParent = normalizePath(cursor.fullPath);
    if (visited.has(normalizedParent)) {
      break;
    }
    visited.add(normalizedParent);
    ancestors.unshift({
      label: cursor.title,
      href: normalizedParent,
    });
    cursor = cursor.parent;
  }

  const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  for (const ancestor of ancestors) {
    if (ancestor.href !== "/") {
      trail.push(ancestor);
    }
  }
  trail.push({
    label: page.title,
    href: normalizedCurrent,
  });

  return trail;
}
