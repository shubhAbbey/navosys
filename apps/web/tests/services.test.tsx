import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CmsCatchAllPage, {
  generateMetadata as generatePageMetadata,
} from "@/app/[[...slug]]/page";
import sitemap from "@/app/sitemap";
import { ServiceDetailView, ServicesCatalog } from "@/components/services";
import type { CmsService, CmsServiceSummary } from "@/types/cms";

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}));

const MOCK_SERVICES: CmsServiceSummary[] = [
  {
    documentId: "svc-1",
    title: "Cloud Readiness Assessment",
    slug: "cloud-readiness-assessment",
    fullPath: "/services/cloud-readiness-assessment",
    pillar: "cloud-and-it",
    summary: "Evaluate cloud readiness and migration sequencing.",
    featuredImage: null,
    order: 1,
    isFeatured: true,
    isIndexable: true,
  },
  {
    documentId: "svc-2",
    title: "AI Workflow Integration",
    slug: "ai-integration",
    fullPath: "/services/ai-integration",
    pillar: "ai-and-automation",
    summary: "Integrate governed AI workflows into existing tools.",
    featuredImage: null,
    order: 2,
    isFeatured: false,
    isIndexable: true,
  },
];

const MOCK_SERVICE_DETAIL: CmsService = {
  ...MOCK_SERVICES[0],
  description: "Detailed cloud readiness assessment overview.",
  capabilities: [
    { title: "Workload Mapping", description: "Map dependencies.", order: 1 },
  ],
  benefits: [
    { title: "Lower Risk", description: "Phased cutover plan.", order: 1 },
  ],
  deliverables: [
    { title: "Readiness Report", description: "Actionable roadmap.", order: 1 },
  ],
  processSteps: [
    { stepNumber: "01", title: "Discovery", description: "Review stack.", order: 1 },
  ],
  technologies: [{ title: "Docker", order: 1 }],
  useCases: [{ title: "Cloud Migration", order: 1 }],
  faqs: [
    {
      question: "What is delivered?",
      answer: "A full architecture readiness brief.",
      order: 1,
    },
  ],
  relatedServices: [MOCK_SERVICES[1]],
  primaryCta: null,
  secondaryCta: null,
  seo: {
    metaTitle: "Cloud Readiness Assessment | NAVOSYS",
    metaDescription: "Evaluate cloud readiness.",
    canonicalUrl: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    noIndex: false,
    noFollow: false,
    structuredDataType: "WebPage",
  },
  sections: [],
};

describe("P08 Services Overview, Filtering & Detail Resolution", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("renders featured and pillar-filtered services dynamically", () => {
    render(<ServicesCatalog services={MOCK_SERVICES} />);

    expect(
      screen.getByRole("heading", { name: "Featured Services" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: "Cloud Readiness Assessment" })
    ).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "AI Workflow Integration" })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /AI & Automation \(1\)/i })
    );

    expect(
      screen.getByRole("heading", { name: "AI Workflow Integration" })
    ).toBeInTheDocument();
    // Only the featured band remains for Cloud Readiness once All Services is filtered to AI
    expect(
      screen.getAllByRole("heading", { name: "Cloud Readiness Assessment" })
    ).toHaveLength(1);
  });

  it("renders ServiceDetailView with prefilled quote CTA, capabilities, FAQ, and related services", () => {
    render(<ServiceDetailView service={MOCK_SERVICE_DETAIL} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cloud Readiness Assessment"
    );
    expect(
      screen.getAllByRole("link", { name: "Get a Quote" })[0]
    ).toHaveAttribute(
      "href",
      "/contact/get-quote?service=cloud-readiness-assessment"
    );
    expect(screen.getByText("Workload Mapping")).toBeInTheDocument();
    expect(screen.getByText("Readiness Report")).toBeInTheDocument();
    expect(screen.getByText("What is delivered?")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Workflow Integration" })
    ).toBeInTheDocument();
  });

  it("resolves /services overview and new /services/<slug> records via catch-all route and sitemap without code changes", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://navosys.in");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/redirects")) {
          return new Response(JSON.stringify({ data: [] }), { status: 200 });
        }
        if (url.includes("/api/pages")) {
          return new Response(JSON.stringify({ data: [] }), { status: 200 });
        }
        if (url.includes("/api/services?filters")) {
          return new Response(
            JSON.stringify({ data: [MOCK_SERVICE_DETAIL] }),
            { status: 200 }
          );
        }
        if (url.includes("/api/services?")) {
          return new Response(JSON.stringify({ data: MOCK_SERVICES }), {
            status: 200,
          });
        }
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      })
    );

    const meta = await generatePageMetadata({
      params: Promise.resolve({
        slug: ["services", "cloud-readiness-assessment"],
      }),
    });
    expect(meta.title).toBe("Cloud Readiness Assessment | NAVOSYS");

    const element = await CmsCatchAllPage({
      params: Promise.resolve({
        slug: ["services", "cloud-readiness-assessment"],
      }),
    });
    render(element);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cloud Readiness Assessment"
    );

    const sm = await sitemap();
    expect(sm.map((entry) => entry.url)).toContain(
      "https://navosys.in/services/cloud-readiness-assessment"
    );
    expect(sm.map((entry) => entry.url)).toContain(
      "https://navosys.in/services/ai-integration"
    );
  });
});
