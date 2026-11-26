import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceDetailView } from "@/components/services";
import type { CmsService } from "@/types/cms";

const AI_PILLAR_MOCK: CmsService = {
  documentId: "ai-and-automation-doc",
  title: "AI & Intelligent Automation",
  slug: "ai-and-automation",
  fullPath: "/services/ai-and-automation",
  pillar: "ai-and-automation",
  summary:
    "Practical AI agents, deterministic business process automation, and governed enterprise AI integration.",
  description:
    "AI creates real value when grounded in clean processes, dependable data, and human accountability.",
  featuredImage: {
    url: "http://127.0.0.1:1337/uploads/navosys_ai_automation_architecture.png",
    alternativeText:
      "Minimal geometric illustration of structured enterprise AI integration gateways and governed system layers",
    width: 1200,
    height: 900,
  },
  order: 20,
  isFeatured: true,
  isIndexable: true,
  capabilities: [
    {
      title: "AI Agents With Human Oversight",
      href: "/services/ai-agents",
      ctaLabel: "Explore AI Agents",
      order: 1,
    },
    {
      title: "Business Process Automation",
      href: "/services/business-process-automation",
      ctaLabel: "Explore Process Automation",
      order: 2,
    },
    {
      title: "Enterprise AI Integration",
      href: "/services/ai-integration",
      ctaLabel: "Explore AI Integration",
      order: 3,
    },
  ],
  benefits: [{ title: "Honest Fit-for-Purpose Design", order: 1 }],
  deliverables: [{ title: "Automation Opportunity & Risk Brief", order: 1 }],
  processSteps: [
    {
      stepNumber: "01 · Audit",
      title: "Workflow & Data Readiness Review",
      order: 1,
    },
  ],
  technologies: [{ title: "PostgreSQL / pgvector", order: 1 }],
  useCases: [],
  faqs: [
    {
      question: "Should every workflow use an AI agent?",
      answer:
        "No. Structured system-to-system sync and strict rules belong in deterministic business process automation.",
      order: 1,
    },
  ],
  relatedServices: [
    {
      title: "AI Integration",
      slug: "ai-integration",
      fullPath: "/services/ai-integration",
      pillar: "ai-and-automation",
      summary: "Model gateways and permission-aware retrieval.",
      featuredImage: null,
      order: 23,
      isFeatured: false,
      isIndexable: true,
    },
  ],
  primaryCta: {
    label: "Get a Quote",
    url: "/contact/get-quote?service=ai-and-automation",
    variant: "primary",
    isVisible: true,
  },
  secondaryCta: {
    label: "Book a Consultation",
    url: "/contact/book-consultation?service=ai-and-automation",
    variant: "outline",
    isVisible: true,
  },
  seo: null,
  sections: [
    {
      __component: "sections.comparison-table",
      heading: "Deterministic Automation vs. Human-Guided AI Agents",
      primaryColumnLabel: "Business Process Automation",
      secondaryColumnLabel: "AI Agents & Integration",
      rows: [
        {
          feature: "Best Input Type",
          primaryValue: "Structured records, forms, webhooks",
          secondaryValue: "Unstructured emails, PDFs, knowledge lookup",
          order: 1,
        },
      ],
    },
  ],
};

describe("P10 AI & Intelligent Automation Service Pages", () => {
  it("renders AI & Intelligent Automation pillar with image, sub-service links, FAQ, comparison table, related service, and prefilled CTAs", () => {
    render(<ServiceDetailView service={AI_PILLAR_MOCK} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "AI & Intelligent Automation"
    );
    expect(
      screen.getByAltText(
        "Minimal geometric illustration of structured enterprise AI integration gateways and governed system layers"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore AI Agents" })
    ).toHaveAttribute("href", "/services/ai-agents");
    expect(
      screen.getByRole("link", { name: "Explore Process Automation" })
    ).toHaveAttribute("href", "/services/business-process-automation");
    expect(
      screen.getByRole("link", { name: "Explore AI Integration" })
    ).toHaveAttribute("href", "/services/ai-integration");
    expect(
      screen.getByText("Deterministic Automation vs. Human-Guided AI Agents")
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Get a Quote" })[0]
    ).toHaveAttribute("href", "/contact/get-quote?service=ai-and-automation");
    expect(
      screen.getAllByRole("link", { name: "Book a Consultation" })[0]
    ).toHaveAttribute(
      "href",
      "/contact/book-consultation?service=ai-and-automation"
    );
  });
});
