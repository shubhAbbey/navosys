const RESERVED_PREFIXES = ['/api', '/_next', '/admin'];

function normalizePath(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed || trimmed === '/') {
    return '/';
  }
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const collapsed = withLeading.replace(/\/+/g, '/');
  return collapsed.length > 1 && collapsed.endsWith('/')
    ? collapsed.slice(0, -1)
    : collapsed;
}

function assertNotReserved(fullPath: string): void {
  if (
    RESERVED_PREFIXES.some(
      (prefix) => fullPath === prefix || fullPath.startsWith(`${prefix}/`)
    )
  ) {
    throw new Error(`Reserved route path is not allowed: ${fullPath}`);
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    const { data } = event.params;
    if (typeof data.fullPath === 'string') {
      const normalized = normalizePath(data.fullPath);
      assertNotReserved(normalized);
      data.fullPath = normalized;
    } else if (typeof data.slug === 'string') {
      const slug = data.slug.trim().toLowerCase();
      const normalized = slug === 'home' ? '/' : normalizePath(slug);
      assertNotReserved(normalized);
      data.fullPath = normalized;
    }
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    const { data } = event.params;
    if (typeof data.fullPath === 'string') {
      const normalized = normalizePath(data.fullPath);
      assertNotReserved(normalized);
      data.fullPath = normalized;
    }
  },
};
