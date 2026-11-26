const DEFAULT_STRAPI_URL = "http://127.0.0.1:1337";

function assertServerSide(): void {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
    throw new Error(
      "Strapi server client must not be invoked from browser code."
    );
  }
}

export function getStrapiBaseUrl(): string {
  assertServerSide();
  const configured = process.env.STRAPI_URL?.trim();
  const raw = configured && configured.length > 0 ? configured : DEFAULT_STRAPI_URL;
  return raw.replace(/\/+$/, "");
}

export function resolveStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const baseUrl = getStrapiBaseUrl();
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${normalizedPath}`;
}

export function isLocalMediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1"
    );
  } catch {
    return false;
  }
}

export interface FetchStrapiOptions {
  revalidate?: number;
  tags?: string[];
  timeoutMs?: number;
  cache?: RequestCache;
}

export async function fetchStrapi<T>(
  path: string,
  options: FetchStrapiOptions = {}
): Promise<T | null> {
  assertServerSide();
  const baseUrl = getStrapiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const apiToken = process.env.STRAPI_API_TOKEN?.trim();
  if (apiToken) {
    headers.Authorization = `Bearer ${apiToken}`;
  }

  try {
    const fetchInit: RequestInit & {
      next?: { revalidate?: number; tags?: string[] };
    } = {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(options.timeoutMs ?? 4000),
    };

    if (options.cache === "no-store") {
      fetchInit.cache = "no-store";
    } else {
      fetchInit.next = {
        revalidate: options.revalidate ?? 60,
        ...(options.tags ? { tags: options.tags } : {}),
      };
    }

    const response = await fetch(url, fetchInit);

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
