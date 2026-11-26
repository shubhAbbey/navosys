import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CmsCatchAllPage, {
  generateMetadata as generatePageMetadata,
} from "@/app/[[...slug]]/page";
import { GET as previewGet } from "@/app/api/preview/route";
import { POST as revalidatePost } from "@/app/api/revalidate/route";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  buildBreadcrumbs,
  detectRouteConflicts,
  isSafeInternalPath,
  normalizePath,
  pathToSlugArray,
  slugArrayToPath,
} from "@/lib/routes/normalize";
import {
  buildPageMetadata,
  buildPageStructuredData,
} from "@/lib/seo/metadata";
import type { CmsPage, GlobalSettings } from "@/types/cms";

const { mockDraftEnable, mockDraftDisable, mockRevalidateTag, mockRevalidatePath } =
  vi.hoisted(() => ({
    mockDraftEnable: vi.fn(),
    mockDraftDisable: vi.fn(),
    mockRevalidateTag: vi.fn(),
    mockRevalidatePath: vi.fn(),
  }));

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({
    isEnabled: false,
    enable: mockDraftEnable,
    disable: mockDraftDisable,
  })),
}));

vi.mock("next/cache", () => ({
  revalidateTag: mockRevalidateTag,
  revalidatePath: mockRevalidatePath,
}));

const MOCK_GLOBAL: GlobalSettings = {
  siteName: "NAVOSYS",
  tagline: "Building What's Next.",
  siteUrl: "https://navosys.in",
  logoLight: null,
  logoDark: null,
  favicon: null,
  announcement: null,
  primaryCta: null,
  secondaryCta: null,
  contactEmail: null,
  contactPhone: null,
  contactLocation: null,
  footerSummary: null,
  copyrightText: "© 2026 NAVOSYS",
  socialLinks: [],
  legalLinks: [],
  defaultSeoTitle: "NAVOSYS",
  defaultSeoDescription: "Default SEO description",
};

const NESTED_PAGE: CmsPage = {
  documentId: "doc-nested",
  title: "P05 Nested Route Verification",
  slug: "nested-page",
  fullPath: "/p05-test/nested-page",
  pageType: "standard",
  summary: "Nested CMS page summary",
  body: "Nested CMS body content",
  parent: {
    title: "P05 Routing Verification Parent",
    slug: "p05-test",
    fullPath: "/p05-test",
    parent: null,
  },
  showBreadcrumbs: true,
  isIndexable: true,
  seo: {
    metaTitle: "Nested Route | NAVOSYS",
    metaDescription: "Nested route description",
    canonicalUrl: null,
    ogTitle: "Nested OG",
    ogDescription: "Nested OG desc",
    ogImage: null,
    noIndex: false,
    noFollow: false,
    structuredDataType: "WebPage",
  },
  updatedAt: "2026-11-26T00:00:00.000Z",
};

describe("P05 Path Normalization, Conflict Detection & Breadcrumbs", () => {
  it("normalizes paths, converts slug arrays, and rejects traversal", () => {
    expect(normalizePath("")).toBe("/");
    expect(normalizePath("/P05-Test//Nested-Page/")).toBe(
      "/p05-test/nested-page"
    );
    expect(slugArrayToPath(undefined)).toBe("/");
    expect(slugArrayToPath(["P05-Test", "Nested-Page"])).toBe(
      "/p05-test/nested-page"
    );
    expect(pathToSlugArray("/")).toEqual([]);
    expect(pathToSlugArray("/p05-test/nested-page")).toEqual([
      "p05-test",
      "nested-page",
    ]);
    expect(() => normalizePath("/p05-test/../secret")).toThrow();
    expect(isSafeInternalPath("/p05-test/nested-page")).toBe(true);
    expect(isSafeInternalPath("//evil.example")).toBe(false);
    expect(isSafeInternalPath("https://evil.example")).toBe(false);
  });

  it("detects duplicate paths and reserved prefixes", () => {
    const conflicts = detectRouteConflicts([
      { fullPath: "/About", documentId: "a" },
      { fullPath: "/about/", documentId: "b" },
      { fullPath: "/api/custom", documentId: "c" },
    ]);
    expect(conflicts).toHaveLength(2);
    expect(conflicts.map((c) => c.fullPath)).toEqual(["/about", "/api/custom"]);
  });

  it("builds ordered breadcrumbs from Home through parent hierarchy", () => {
    expect(buildBreadcrumbs(NESTED_PAGE)).toEqual([
      { label: "Home", href: "/" },
      { label: "P05 Routing Verification Parent", href: "/p05-test" },
      { label: "P05 Nested Route Verification", href: "/p05-test/nested-page" },
    ]);
  });
});

describe("P05 SEO, Sitemap, Robots & Catch-All Resolution", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("builds canonical, robots, and JSON-LD metadata from CMS SEO fields", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://navosys.in");
    const meta = buildPageMetadata(NESTED_PAGE, MOCK_GLOBAL);
    expect(meta.title).toBe("Nested Route | NAVOSYS");
    expect(meta.alternates?.canonical).toBe(
      "https://navosys.in/p05-test/nested-page"
    );
    expect(meta.robots).toEqual({ index: true, follow: true });

    const jsonLd = buildPageStructuredData(
      NESTED_PAGE,
      MOCK_GLOBAL,
      buildBreadcrumbs(NESTED_PAGE)
    );
    expect(JSON.stringify(jsonLd)).toContain("BreadcrumbList");
  });

  it("excludes noindex pages from sitemap and exposes sitemap URL in robots.txt", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://navosys.in");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/pages")) {
          return new Response(
            JSON.stringify({
              data: [
                { ...NESTED_PAGE, fullPath: "/", isIndexable: true },
                NESTED_PAGE,
                {
                  ...NESTED_PAGE,
                  documentId: "doc-noindex",
                  fullPath: "/p05-test/noindex-page",
                  isIndexable: false,
                },
              ],
            }),
            { status: 200 }
          );
        }
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      })
    );

    const entries = await sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      "https://navosys.in/",
      "https://navosys.in/p05-test/nested-page",
    ]);

    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBe("https://navosys.in/sitemap.xml");
  });

  it("renders CMS nested page and breadcrumbs via catch-all route without code additions", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/redirects")) {
          return new Response(JSON.stringify({ data: [] }), { status: 200 });
        }
        if (url.includes("/api/pages")) {
          return new Response(JSON.stringify({ data: [NESTED_PAGE] }), {
            status: 200,
          });
        }
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      })
    );

    const meta = await generatePageMetadata({
      params: Promise.resolve({ slug: ["p05-test", "nested-page"] }),
    });
    expect(meta.title).toBe("Nested Route | NAVOSYS");

    const element = await CmsCatchAllPage({
      params: Promise.resolve({ slug: ["p05-test", "nested-page"] }),
    });
    render(element);

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "P05 Nested Route Verification"
    );
  });
});

describe("P05 Preview & Revalidation Security", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("rejects unauthorized preview secrets and open redirects", async () => {
    vi.stubEnv("STRAPI_PREVIEW_SECRET", "top-secret-preview");

    const unauthorized = await previewGet(
      new Request("http://localhost:3000/api/preview?secret=wrong&slug=/about")
    );
    expect(unauthorized.status).toBe(401);

    const openRedirect = await previewGet(
      new Request(
        "http://localhost:3000/api/preview?secret=top-secret-preview&slug=//evil.example"
      )
    );
    expect(openRedirect.status).toBe(400);

    const valid = await previewGet(
      new Request(
        "http://localhost:3000/api/preview?secret=top-secret-preview&slug=/p05-test/draft-only"
      )
    );
    expect(valid.status).toBe(307);
    expect(mockDraftEnable).toHaveBeenCalledTimes(1);
    expect(valid.headers.get("location")).toBe(
      "http://localhost:3000/p05-test/draft-only"
    );
  });

  it("validates revalidation secret and revalidates allowlisted tags/paths", async () => {
    vi.stubEnv("STRAPI_REVALIDATE_SECRET", "top-secret-revalidate");

    const unauthorized = await revalidatePost(
      new Request("http://localhost:3000/api/revalidate", { method: "POST" })
    );
    expect(unauthorized.status).toBe(401);

    const authorized = await revalidatePost(
      new Request("http://localhost:3000/api/revalidate", {
        method: "POST",
        headers: {
          "x-revalidate-secret": "top-secret-revalidate",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          tags: ["pages", "disallowed-tag"],
          paths: ["/p05-test/nested-page", "//bad-path"],
        }),
      })
    );
    expect(authorized.status).toBe(200);
    const json = (await authorized.json()) as {
      revalidated: boolean;
      tags: string[];
      paths: string[];
    };
    expect(json).toEqual({
      revalidated: true,
      tags: ["pages"],
      paths: ["/p05-test/nested-page"],
    });
    expect(mockRevalidateTag).toHaveBeenCalledWith("pages");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/p05-test/nested-page");
  });
});
