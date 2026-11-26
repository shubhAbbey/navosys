import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceDetailView } from "@/components/services";
import type { CmsService } from "@/types/cms";

const CLOUD_PILLAR_MOCK: CmsService = {
  documentId: "cloud-and-it-doc",
  title: "Cloud & IT Solutions",
  slug: "cloud-and-it",
  fullPath: "/services/cloud-and-it",
  pillar: "cloud-and-it",
  summary:
    "Resilient cloud migration, hybrid infrastructure, managed IT, DevOps, and IT modernization.",
  description: "Structured Cloud & IT engineering foundation.",
  featuredImage: {
    url: "http://127.0.0.1:1337/uploads/navosys_cloud_architecture.png",
    alternativeText:
      "Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes",
    width: 1200,
    height: 900,
  },
  order: 10,
  isFeatured: true,
  isIndexable: true,
  capabilities: [
    {
      title: "Cloud Migration & Landing Zones",
      href: "/services/cloud-migration",
      ctaLabel: "Explore Cloud Migration",
      order: 1,
    },
  ],
  benefits: [{ title: "Security by Default", order: 1 }],
  deliverables: [{ title: "Architecture & Security Blueprints", order: 1 }],
  processSteps: [
    { stepNumber: "01 · Discover", title: "Infrastructure Audit", order: 1 },
  ],
  technologies: [{ title: "Docker & Containers", order: 1 }],
  useCases: [],
  faqs: [
    {
      question: "Can we start with an assessment?",
      answer: "Yes, via our Cloud Readiness Assessment.",
      order: 1,
    },
  ],
  relatedServices: [
    {
      title: "Cloud Migration",
      slug: "cloud-migration",
      fullPath: "/services/cloud-migration",
      pillar: "cloud-and-it",
      summary: "Phased workload transitions.",
      featuredImage: null,
      order: 11,
      isFeatured: false,
      isIndexable: true,
    },
  ],
  primaryCta: {
    label: "Get a Quote",
    url: "/contact/get-quote?service=cloud-and-it",
    variant: "primary",
    isVisible: true,
  },
  secondaryCta: {
    label: "Request Cloud Assessment",
    url: "/contact/request-assessment?assessment=cloud-readiness",
    variant: "outline",
    isVisible: true,
  },
  seo: null,
  sections: [
    {
      __component: "sections.comparison-table",
      heading: "Choosing the Right Transition Strategy",
      primaryColumnLabel: "Staged Cloud Migration",
      secondaryColumnLabel: "Incremental IT Modernization",
      rows: [
        {
          feature: "Primary Driver",
          primaryValue: "Scalability or data center exit",
          secondaryValue: "Retiring EOL platforms",
          order: 1,
        },
      ],
    },
  ],
};

describe("P09 Cloud & IT Solutions Service Pages", () => {
  it("renders Cloud & IT Solutions with image, capabilities, FAQ, Dynamic Zone comparison table, related service, and prefilled CTAs", () => {
    render(<ServiceDetailView service={CLOUD_PILLAR_MOCK} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cloud & IT Solutions"
    );
    expect(
      screen.getByAltText(
        "Minimal geometric illustration of hybrid cloud architecture and interconnected infrastructure nodes"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore Cloud Migration" })
    ).toHaveAttribute("href", "/services/cloud-migration");
    expect(
      screen.getByText("Choosing the Right Transition Strategy")
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Get a Quote" })[0]
    ).toHaveAttribute("href", "/contact/get-quote?service=cloud-and-it");
    expect(
      screen.getAllByRole("link", { name: "Request Cloud Assessment" })[0]
    ).toHaveAttribute(
      "href",
      "/contact/request-assessment?assessment=cloud-readiness"
    );
  });
});
