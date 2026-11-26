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

function normalizeAndValidateRedirect(data: Record<string, unknown>): void {
  if (typeof data.sourcePath === 'string') {
    data.sourcePath = normalizePath(data.sourcePath);
  }
  if (
    typeof data.destinationPath === 'string' &&
    !data.destinationPath.startsWith('http://') &&
    !data.destinationPath.startsWith('https://')
  ) {
    data.destinationPath = normalizePath(data.destinationPath);
  }
  if (
    typeof data.sourcePath === 'string' &&
    typeof data.destinationPath === 'string' &&
    data.sourcePath === data.destinationPath
  ) {
    throw new Error('Redirect sourcePath and destinationPath cannot match.');
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    normalizeAndValidateRedirect(event.params.data);
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    normalizeAndValidateRedirect(event.params.data);
  },
};
