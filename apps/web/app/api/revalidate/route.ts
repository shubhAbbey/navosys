import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isSafeInternalPath, normalizePath } from "@/lib/routes/normalize";

const ALLOWED_TAGS = new Set([
  "global-setting",
  "navigation-menu",
  "pages",
  "redirects",
  "services",
]);

function secretsMatch(provided: string, expected: string): boolean {
  const providedDigest = createHash("sha256").update(provided).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

export async function POST(request: Request): Promise<Response> {
  const configuredSecret = process.env.STRAPI_REVALIDATE_SECRET?.trim();
  if (!configuredSecret) {
    return NextResponse.json(
      { error: "Revalidation secret is not configured." },
      { status: 503 }
    );
  }

  const headerSecret = request.headers.get("x-revalidate-secret") || "";
  const authHeader = request.headers.get("authorization") || "";
  const bearerSecret = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";
  const providedSecret = headerSecret || bearerSecret;

  if (!providedSecret || !secretsMatch(providedSecret, configuredSecret)) {
    return NextResponse.json(
      { error: "Unauthorized revalidation request." },
      { status: 401 }
    );
  }

  let body: { tags?: unknown; paths?: unknown } = {};
  try {
    body = (await request.json()) as { tags?: unknown; paths?: unknown };
  } catch {
    body = {};
  }

  const revalidatedTags: string[] = [];
  if (Array.isArray(body.tags)) {
    for (const tag of body.tags) {
      if (
        typeof tag === "string" &&
        (ALLOWED_TAGS.has(tag) ||
          tag.startsWith("page:/") ||
          tag.startsWith("service:/"))
      ) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
      }
    }
  }

  const revalidatedPaths: string[] = [];
  if (Array.isArray(body.paths)) {
    for (const rawPath of body.paths) {
      if (typeof rawPath === "string" && isSafeInternalPath(rawPath)) {
        const normalized = normalizePath(rawPath);
        revalidatePath(normalized);
        revalidatedPaths.push(normalized);
      }
    }
  }

  if (revalidatedTags.length === 0 && revalidatedPaths.length === 0) {
    revalidateTag("pages");
    revalidateTag("redirects");
    revalidatedTags.push("pages", "redirects");
  }

  return NextResponse.json({
    revalidated: true,
    tags: revalidatedTags,
    paths: revalidatedPaths,
  });
}
