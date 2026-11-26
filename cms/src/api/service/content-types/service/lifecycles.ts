function normalizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-');
}

function assignFullPath(data: Record<string, unknown>): void {
  if (typeof data.slug === 'string' && data.slug.trim()) {
    const cleanSlug = normalizeSlug(data.slug);
    data.slug = cleanSlug;
    data.fullPath = `/services/${cleanSlug}`;
  } else if (typeof data.fullPath === 'string' && data.fullPath.trim()) {
    const clean = data.fullPath.trim().toLowerCase().replace(/\/+$/, '');
    data.fullPath = clean.startsWith('/services/')
      ? clean
      : `/services/${normalizeSlug(clean)}`;
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    assignFullPath(event.params.data);
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    assignFullPath(event.params.data);
  },
};
