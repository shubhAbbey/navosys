import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CmsCatchAllPage from "@/app/[[...slug]]/page";

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}));

const HOMEPAGE_CMS_PAYLOAD = {
  data: [
    {
      documentId: "home-doc",
      title: "NAVOSYS — Building What's Next.",
      slug: "home",
      fullPath: "/",
      pageType: "home",
      summary: "NAVOSYS enterprise technology services.",
      body: null,
      parent: null,
      showBreadcrumbs: false,
      isIndexable: true,
      seo: {
        metaTitle: "NAVOSYS — Building What's Next.",
        metaDescription: "Enterprise technology services.",
        noIndex: false,
        noFollow: false,
        structuredDataType: "WebPage",
      },
      sections: [
        {
          __component: "sections.split-hero",
          eyebrow: "Enterprise Technology Services",
          heading: "Building What's Next.",
          subheading: "Cloud, AI automation, software engineering, and data.",
          highlights:
            "Cloud & IT Solutions\nAI & Intelligent Automation\nSoftware Engineering\nData & Analytics",
          mediaPosition: "right",
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
          media: {
            url: "/uploads/navosys_home_hero.png",
            alternativeText:
              "Minimal architectural illustration of interconnected enterprise cloud and software systems",
            width: 1200,
            height: 900,
          },
          sortOrder: 1,
          isVisible: true,
        },
        {
          __component: "sections.card-grid",
          eyebrow: "Four Service Pillars",
          heading: "Core Technology Capabilities",
          gridKind: "services",
          columns: "2",
          items: [
            { title: "Cloud & IT Solutions", href: "/services/cloud-and-it", order: 1 },
            { title: "AI & Intelligent Automation", href: "/services/ai-and-automation", order: 2 },
            { title: "Software Engineering", href: "/services/software-engineering", order: 3 },
            { title: "Data & Analytics", href: "/services/data-and-analytics", order: 4 },
          ],
          sortOrder: 2,
          isVisible: true,
        },
        {
          __component: "sections.tabs",
          heading: "Targeted Engineering for Real Operational Bottlenecks",
          tabs: [
            { label: "Cloud & Infrastructure", title: "Unify Fragile Infrastructure", content: "Cloud modernization.", order: 1 },
            { label: "Manual Workflows", title: "Automate Business Processes", content: "Governed AI workflows.", order: 2 },
          ],
          sortOrder: 3,
          isVisible: true,
        },
        {
          __component: "sections.process-steps",
          heading: "Six-Stage Delivery Lifecycle",
          steps: [
            { stepNumber: "01 · Discover", title: "Assess Context", order: 1 },
            { stepNumber: "02 · Architect", title: "Design Systems", order: 2 },
          ],
          sortOrder: 4,
          isVisible: true,
        },
        {
          __component: "sections.cta-banner",
          heading: "Ready to Plan Your Next Initiative?",
          variant: "footer_cta",
          primaryCta: {
            label: "Get a Quote",
            url: "/contact/get-quote",
            variant: "primary",
            isVisible: true,
          },
          surface: "navy",
          sortOrder: 5,
          isVisible: true,
        },
      ],
    },
  ],
};

describe("P07 CMS-Composed Homepage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders CMS-driven Homepage hero, pillars, interactive challenges tabs, process, and conversion CTA", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/redirects")) {
          return new Response(JSON.stringify({ data: [] }), { status: 200 });
        }
        if (url.includes("/api/pages")) {
          return new Response(JSON.stringify(HOMEPAGE_CMS_PAYLOAD), {
            status: 200,
          });
        }
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      })
    );

    const element = await CmsCatchAllPage({ params: Promise.resolve({}) });
    render(element);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building What's Next."
    );
    expect(
      screen.getByAltText(
        "Minimal architectural illustration of interconnected enterprise cloud and software systems"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Cloud & IT Solutions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI & Intelligent Automation" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Software Engineering" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Data & Analytics" })
    ).toBeInTheDocument();

    const workflowTab = screen.getByRole("tab", { name: "Manual Workflows" });
    fireEvent.click(workflowTab);
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Automate Business Processes"
    );

    expect(
      screen.getAllByRole("link", { name: "Get a Quote" })[0]
    ).toHaveAttribute("href", "/contact/get-quote");
  });
});
