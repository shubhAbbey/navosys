import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchStrapi, resolveStrapiMediaUrl } from "@/lib/strapi/client";
import { getGlobalLayoutData } from "@/lib/strapi/global";

describe("P04 Strapi Client & Global Layout Fetcher", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("blocks browser-side invocation outside test environment", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(fetchStrapi("/api/global-setting")).rejects.toThrow(
      "Strapi server client must not be invoked from browser code."
    );
  });

  it("resolves relative Strapi upload paths using STRAPI_URL", () => {
    vi.stubEnv("STRAPI_URL", "http://127.0.0.1:1337/");
    expect(resolveStrapiMediaUrl("/uploads/navosys_logo.png")).toBe(
      "http://127.0.0.1:1337/uploads/navosys_logo.png"
    );
    expect(
      resolveStrapiMediaUrl("https://cms.navosys.in/uploads/logo.png")
    ).toBe("https://cms.navosys.in/uploads/logo.png");
    expect(resolveStrapiMediaUrl(null)).toBeNull();
  });

  it("sends server-only Authorization header when STRAPI_API_TOKEN is set and normalizes Strapi 5 responses", async () => {
    vi.stubEnv("STRAPI_URL", "http://127.0.0.1:1337");
    vi.stubEnv("STRAPI_API_TOKEN", "server-secret-token");

    const fetchMock = vi.fn(
      async (input: RequestInfo | URL, _init?: RequestInit) => {
        void _init;
      const url = String(input);
      if (url.includes("/api/global-setting")) {
        return new Response(
          JSON.stringify({
            data: {
              siteName: "NAVOSYS",
              tagline: "Building What's Next.",
              logoLight: {
                url: "/uploads/navosys_logo_light.png",
                alternativeText: "NAVOSYS logo",
                width: 360,
                height: 80,
              },
              logoDark: {
                url: "/uploads/navosys_logo_dark.png",
                alternativeText: "NAVOSYS logo",
                width: 360,
                height: 80,
              },
              favicon: {
                url: "/uploads/navosys_favicon.png",
                alternativeText: "NAVOSYS icon",
                width: 512,
                height: 512,
              },
              announcement: {
                enabled: true,
                text: "Updated capabilities published.",
                ctaLabel: "Explore",
                ctaUrl: "/services",
                dismissible: true,
              },
              primaryCta: {
                label: "Get a Quote",
                url: "/contact/get-quote",
                variant: "primary",
                isVisible: true,
              },
              secondaryCta: {
                label: "Book a Consultation",
                url: "/contact/book-consultation",
                variant: "outline",
                isVisible: true,
              },
              contactEmail: "hello@navosys.in",
              socialLinks: [
                {
                  platform: "email",
                  label: "Email",
                  url: "mailto:hello@navosys.in",
                  order: 1,
                },
              ],
              legalLinks: [
                {
                  label: "Privacy Policy",
                  url: "/privacy",
                  isExternal: false,
                  openInNewTab: false,
                },
              ],
            },
          }),
          { status: 200 }
        );
      }

      return new Response(
        JSON.stringify({
          data: [
            {
              key: "header",
              title: "Header",
              items: [
                {
                  label: "About",
                  url: "/about",
                  order: 2,
                  isVisible: true,
                  isExternal: false,
                  children: [],
                },
                {
                  label: "Hidden",
                  url: "/hidden",
                  order: 3,
                  isVisible: false,
                  isExternal: false,
                  children: [],
                },
                {
                  label: "Services",
                  url: "/services",
                  order: 1,
                  isVisible: true,
                  isExternal: false,
                  children: [
                    {
                      label: "AI & Automation",
                      url: "/services/ai-and-automation",
                      description: null,
                      order: 2,
                      isVisible: true,
                      isExternal: false,
                    },
                    {
                      label: "Cloud & IT",
                      url: "/services/cloud-and-it",
                      description: "Cloud architecture",
                      order: 1,
                      isVisible: true,
                      isExternal: false,
                    },
                  ],
                },
              ],
              footerColumns: [],
            },
            {
              key: "footer",
              title: "Footer",
              items: [],
              footerColumns: [
                {
                  title: "Company",
                  order: 2,
                  isVisible: true,
                  links: [
                    {
                      label: "About",
                      url: "/about",
                      isExternal: false,
                      openInNewTab: false,
                    },
                  ],
                },
                {
                  title: "Services",
                  order: 1,
                  isVisible: true,
                  links: [
                    {
                      label: "Cloud & IT",
                      url: "/services/cloud-and-it",
                      isExternal: false,
                      openInNewTab: false,
                    },
                  ],
                },
              ],
            },
          ],
        }),
        { status: 200 }
      );
    });

    vi.stubGlobal("fetch", fetchMock);

    const data = await getGlobalLayoutData();
    expect(data.source).toBe("cms");
    expect(data.global.logoLight?.url).toBe(
      "http://127.0.0.1:1337/uploads/navosys_logo_light.png"
    );
    expect(data.headerNav.map((i) => i.label)).toEqual(["Services", "About"]);
    expect(data.headerNav[0].children.map((c) => c.label)).toEqual([
      "Cloud & IT",
      "AI & Automation",
    ]);
    expect(data.footerColumns.map((c) => c.title)).toEqual([
      "Services",
      "Company",
    ]);

    const firstCallInit = fetchMock.mock.calls[0]?.[1] as
      | RequestInit
      | undefined;
    expect(
      (firstCallInit?.headers as Record<string, string>)?.Authorization
    ).toBe("Bearer server-secret-token");
  });

  it("returns graceful fallback layout when Strapi is offline", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Connection refused"))
    );

    const data = await getGlobalLayoutData();
    expect(data.source).toBe("fallback");
    expect(data.global.siteName).toBe("NAVOSYS");
    expect(data.global.primaryCta?.label).toBe("Get a Quote");
    expect(data.global.secondaryCta?.label).toBe("Book a Consultation");
  });
});
