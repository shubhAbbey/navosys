import { createHash, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { isSafeInternalPath, normalizePath } from "@/lib/routes/normalize";

function secretsMatch(provided: string, expected: string): boolean {
  const providedDigest = createHash("sha256").update(provided).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path") || searchParams.get("slug") || "/";
  const safeTarget = isSafeInternalPath(rawPath) ? normalizePath(rawPath) : "/";

  if (searchParams.get("exit") === "true") {
    const draft = await draftMode();
    draft.disable();
    return NextResponse.redirect(new URL(safeTarget, request.url));
  }

  const configuredSecret = process.env.STRAPI_PREVIEW_SECRET?.trim();
  if (!configuredSecret) {
    return NextResponse.json(
      { error: "Preview mode is not configured." },
      { status: 503 }
    );
  }

  const providedSecret = searchParams.get("secret") || "";
  if (!providedSecret || !secretsMatch(providedSecret, configuredSecret)) {
    return NextResponse.json(
      { error: "Invalid preview secret." },
      { status: 401 }
    );
  }

  if (!isSafeInternalPath(rawPath)) {
    return NextResponse.json(
      { error: "Invalid preview path." },
      { status: 400 }
    );
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(safeTarget, request.url));
}
