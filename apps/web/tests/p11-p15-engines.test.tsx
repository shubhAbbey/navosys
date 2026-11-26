import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import {
  CaseStudiesCatalog,
  CaseStudyDetailView,
} from "@/components/case-studies";
import {
  IndustriesCatalog,
  IndustryDetailView,
} from "@/components/industries";
import { ServiceDetailView } from "@/components/services";
import type {
  CmsCaseStudy,
  CmsCaseStudySummary,
  CmsIndustry,
  CmsIndustrySummary,
  CmsService,
} from "@/types/cms";

const SOFTWARE_SERVICE_MOCK: CmsService = {
  documentId: "sw-doc",
  title: "Software Engineering",
  slug: "software-engineering",
  fullPath: "/services/software-engineering",
  pillar: "software-engineering",
  summary:
    "Web platforms, mobile apps, enterprise applications, maintenance, and modernization.",
  description: "Maintainable TypeScript engineering.",
  featuredImage: null,
  order: 30,
  isFeatured: true,
  isIndexable: true,
  capabilities: [
    {
      title: "Web Development",
      href: "/services/web-development",
      ctaLabel: "Explore Web Development",
      order: 1,
    },
  ],
  benefits: [{ title: "Strict Engineering Hygiene", order: 1 }],
  deliverables: [{ title: "Tested Repositories", order: 1 }],
  processSteps: [{ stepNumber: "01", title: "Scope", order: 1 }],
  technologies: [{ title: "TypeScript", order: 1 }],
  useCases: [],
  faqs: [],
  relatedServices: [],
  primaryCta: {
    label: "Get a Quote",
    url: "/contact/get-quote?service=software-engineering",
    variant: "primary",
    isVisible: true,
  },
  secondaryCta: null,
  seo: null,
  sections: [],
};

const DATA_SERVICE_MOCK: CmsService = {
  ...SOFTWARE_SERVICE_MOCK,
  documentId: "data-doc",
  title: "Data & Analytics",
  slug: "data-and-analytics",
  fullPath: "/services/data-and-analytics",
  pillar: "data-and-analytics",
  summary: "ETL/ELT pipelines, BI governance, and clarity-first visualization.",
  capabilities: [
    {
      title: "Data Engineering Pipelines",
      href: "/services/data-engineering",
      ctaLabel: "Explore Data Engineering",
      order: 1,
    },
  ],
  primaryCta: {
    label: "Get a Quote",
    url: "/contact/get-quote?service=data-and-analytics",
    variant: "primary",
    isVisible: true,
  },
};

const INDUSTRY_SUMMARY: CmsIndustrySummary = {
  documentId: "ind-fin",
  title: "Financial Services",
  slug: "financial-services",
  fullPath: "/industries/financial-services",
  summary:
    "Capability blueprint for audit-ready enterprise systems and reconciled BI.",
  featuredImage: null,
  order: 1,
  isFeatured: true,
  isIndexable: true,
};

const INDUSTRY_DETAIL: CmsIndustry = {
  ...INDUSTRY_SUMMARY,
  overview: "Strong tenant isolation and immutable audit logs.",
  keyChallenges: [
    { title: "Reconciling Legacy Ledgers", description: "Eliminate CSV drift.", order: 1 },
  ],
  solutionPatterns: [
    { title: "Typed Ledger Workflows", description: "Deterministic rules.", order: 1 },
  ],
  useCases: [
    { title: "Document Intake Queues", description: "Human approval.", order: 1 },
  ],
  complianceConsiderations: [
    { title: "Auditability First", description: "Least-privilege guards.", order: 1 },
  ],
  relatedServices: [SOFTWARE_SERVICE_MOCK],
  relatedCaseStudies: [],
  primaryCta: null,
  secondaryCta: null,
  seo: null,
};

const CASE_STUDY_SUMMARIES: CmsCaseStudySummary[] = [
  {
    documentId: "cs-cloud",
    title: "Cloud Migration & IaC Cutover Blueprint",
    slug: "multi-region-cloud-migration-blueprint",
    fullPath: "/case-studies/multi-region-cloud-migration-blueprint",
    isConceptual: true,
    categoryLabel: "Cloud & DevOps",
    summary: "Staged IaC landing zone and migration cutover blueprint.",
    featuredImage: null,
    order: 1,
    isFeatured: true,
    isIndexable: true,
  },
  {
    documentId: "cs-ai",
    title: "Human-Supervised AI Document Triage Workflow",
    slug: "governed-document-triage-automation",
    fullPath: "/case-studies/governed-document-triage-automation",
    isConceptual: true,
    categoryLabel: "AI & Automation",
    summary: "Deterministic routing with bounded extraction and human review.",
    featuredImage: null,
    order: 2,
    isFeatured: true,
    isIndexable: true,
  },
];

const CASE_STUDY_DETAIL: CmsCaseStudy = {
  ...CASE_STUDY_SUMMARIES[0],
  challenge: "Unrepeatable staging setups and risky manual cutovers.",
  solution: "Versioned IaC landing zones paired with blue/green rehearsal.",
  approach: "Staged across inventory, provisioning, rehearsal, and cutover.",
  architectureHighlights: [
    { title: "Versioned IaC Landing Zone", description: "Codified VPC and IAM.", order: 1 },
  ],
  outcomes: [
    { title: "Eliminates Snowflake Servers", description: "Repeatable environments.", order: 1 },
  ],
  technologies: [{ title: "Terraform / IaC", order: 1 }],
  relatedServices: [SOFTWARE_SERVICE_MOCK],
  relatedIndustries: [INDUSTRY_SUMMARY],
  primaryCta: null,
  secondaryCta: null,
  seo: null,
};

describe("P11–P15 Dynamic Services, Industries, Case Studies & Sitemap", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("renders Software Engineering (P11) and Data & Analytics (P12) services with prefilled quote links", () => {
    const { rerender } = render(
      <ServiceDetailView service={SOFTWARE_SERVICE_MOCK} />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Software Engineering"
    );
    expect(
      screen.getByRole("link", { name: "Explore Web Development" })
    ).toHaveAttribute("href", "/services/web-development");

    rerender(<ServiceDetailView service={DATA_SERVICE_MOCK} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Data & Analytics"
    );
    expect(
      screen.getByRole("link", { name: "Explore Data Engineering" })
    ).toHaveAttribute("href", "/services/data-engineering");
  });

  it("renders IndustriesCatalog and IndustryDetailView honestly with linked services and prefilled CTAs (P14)", () => {
    const { rerender } = render(
      <IndustriesCatalog industries={[INDUSTRY_SUMMARY]} />
    );
    expect(screen.getByText("Financial Services")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore sector" })).toHaveAttribute(
      "href",
      "/industries/financial-services"
    );

    rerender(<IndustryDetailView industry={INDUSTRY_DETAIL} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Financial Services"
    );
    expect(
      screen.getByText(/architecture patterns rather than named client endorsements/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View service" })
    ).toHaveAttribute("href", "/services/software-engineering");
    expect(
      screen.getAllByRole("link", { name: "Get a Quote" })[0]
    ).toHaveAttribute("href", "/contact/get-quote?industry=financial-services");
  });

  it("filters CaseStudiesCatalog by category and displays Conceptual Example transparency notice in CaseStudyDetailView (P15)", () => {
    const { rerender } = render(
      <CaseStudiesCatalog caseStudies={CASE_STUDY_SUMMARIES} />
    );
    expect(
      screen.getByText("Cloud Migration & IaC Cutover Blueprint")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Human-Supervised AI Document Triage Workflow")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "AI & Automation" }));
    expect(
      screen.queryByText("Cloud Migration & IaC Cutover Blueprint")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Human-Supervised AI Document Triage Workflow")
    ).toBeInTheDocument();

    rerender(<CaseStudyDetailView caseStudy={CASE_STUDY_DETAIL} />);
    expect(
      screen.getByText("Conceptual Reference Architecture")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/without claiming named third-party client deployments/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore industry" })
    ).toHaveAttribute("href", "/industries/financial-services");
  });

  it("includes services, industries, and case-studies in dynamic sitemap generation", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://navosys.in");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/pages")) {
          return new Response(
            JSON.stringify({
              data: [
                { fullPath: "/about", isIndexable: true },
                { fullPath: "/approach", isIndexable: true },
              ],
            }),
            { status: 200 }
          );
        }
        if (url.includes("/api/services")) {
          return new Response(
            JSON.stringify({
              data: [SOFTWARE_SERVICE_MOCK, DATA_SERVICE_MOCK],
            }),
            { status: 200 }
          );
        }
        if (url.includes("/api/industries")) {
          return new Response(
            JSON.stringify({ data: [INDUSTRY_SUMMARY] }),
            { status: 200 }
          );
        }
        if (url.includes("/api/case-studies")) {
          return new Response(
            JSON.stringify({ data: CASE_STUDY_SUMMARIES }),
            { status: 200 }
          );
        }
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      })
    );

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://navosys.in/about");
    expect(urls).toContain("https://navosys.in/approach");
    expect(urls).toContain("https://navosys.in/services/software-engineering");
    expect(urls).toContain("https://navosys.in/services/data-and-analytics");
    expect(urls).toContain("https://navosys.in/industries/financial-services");
    expect(urls).toContain(
      "https://navosys.in/case-studies/multi-region-cloud-migration-blueprint"
    );
  });
});
