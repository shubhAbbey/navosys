import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionRenderer } from "@/components/sections";
import {
  isAllowedVideoEmbedUrl,
  isSafeLinkUrl,
  parseSafeRichText,
} from "@/lib/content/safe-rich-text";
import type { CmsPageSection } from "@/types/cms";

describe("P06 Safe Rich Text & URL Security", () => {
  it("strips raw HTML/script tags and structures safe blocks", () => {
    const blocks = parseSafeRichText(
      `## Heading One\n\n<script>alert("xss")</script>Safe paragraph.\n\n- Item A\n- Item B`
    );

    expect(blocks).toEqual([
      { type: "heading", level: 2, text: "Heading One" },
      { type: "paragraph", text: 'alert("xss")Safe paragraph.' },
      { type: "list", items: ["Item A", "Item B"] },
    ]);
  });

  it("blocks dangerous link and video embed URLs", () => {
    expect(isSafeLinkUrl("/contact/get-quote")).toBe(true);
    expect(isSafeLinkUrl("https://navosys.in")).toBe(true);
    expect(isSafeLinkUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeLinkUrl("//evil.example")).toBe(false);

    expect(
      isAllowedVideoEmbedUrl("https://www.youtube-nocookie.com/embed/abc")
    ).toBe(true);
    expect(isAllowedVideoEmbedUrl("http://evil.example/embed")).toBe(false);
    expect(isAllowedVideoEmbedUrl("https://evil.example/embed")).toBe(false);
  });
});

describe("P06 Section Registry, Ordering, Visibility & Credibility Gates", () => {
  it("orders visible sections by sortOrder and omits hidden sections", () => {
    const sections: CmsPageSection[] = [
      {
        __component: "sections.cta-banner",
        heading: "Second Visible",
        sortOrder: 20,
        isVisible: true,
      },
      {
        __component: "sections.rich-text",
        heading: "Hidden Section",
        content: "Should not render",
        sortOrder: 5,
        isVisible: false,
      },
      {
        __component: "sections.hero",
        heading: "First Visible Hero",
        sortOrder: 10,
        isVisible: true,
        primaryCta: {
          label: "Get a Quote",
          url: "/contact/get-quote",
          variant: "primary",
          isVisible: true,
        },
      },
    ];

    const { container } = render(<SectionRenderer sections={sections} />);

    expect(screen.queryByText("Hidden Section")).not.toBeInTheDocument();
    const wrappers = container.querySelectorAll("[data-section-component]");
    expect(wrappers).toHaveLength(2);
    expect(wrappers[0]).toHaveAttribute(
      "data-section-component",
      "sections.hero"
    );
    expect(wrappers[1]).toHaveAttribute(
      "data-section-component",
      "sections.cta-banner"
    );
  });

  it("suppresses unverified stats, testimonials, logos, and team members", () => {
    const sections: CmsPageSection[] = [
      {
        __component: "sections.stats",
        heading: "Unverified Stats",
        items: [{ value: "99%", label: "Claim", isVerified: false }],
      },
      {
        __component: "sections.testimonials",
        heading: "Unverified Testimonials",
        items: [{ quote: "Fake quote", isVerified: false }],
      },
      {
        __component: "sections.logo-grid",
        heading: "Unapproved Logos",
        items: [{ name: "Unapproved Corp", isApproved: false }],
      },
      {
        __component: "sections.team-grid",
        heading: "Unapproved Team",
        members: [{ name: "Placeholder", role: "Lead", isApproved: false }],
      },
      {
        __component: "sections.stats",
        heading: "Verified Stats",
        items: [{ value: "4", label: "Service Pillars", isVerified: true }],
      },
    ];

    render(<SectionRenderer sections={sections} />);

    expect(screen.queryByText("Unverified Stats")).not.toBeInTheDocument();
    expect(screen.queryByText("Fake quote")).not.toBeInTheDocument();
    expect(screen.queryByText("Unapproved Corp")).not.toBeInTheDocument();
    expect(screen.queryByText("Placeholder")).not.toBeInTheDocument();
    expect(screen.getByText("Service Pillars")).toBeInTheDocument();
  });

  it("supports accessible FAQ Accordion and keyboard-navigable Tabs", () => {
    const sections: CmsPageSection[] = [
      {
        __component: "sections.faq-accordion",
        heading: "FAQ",
        allowMultiple: false,
        items: [
          { question: "Question 1", answer: "Answer 1", order: 1 },
          { question: "Question 2", answer: "Answer 2", order: 2 },
        ],
      },
      {
        __component: "sections.tabs",
        heading: "Approach Tabs",
        tabs: [
          { label: "Tab One", title: "Panel One", content: "Content One", order: 1 },
          { label: "Tab Two", title: "Panel Two", content: "Content Two", order: 2 },
        ],
      },
    ];

    render(<SectionRenderer sections={sections} />);

    const q1 = screen.getByRole("button", { name: /Question 1/i });
    const q2 = screen.getByRole("button", { name: /Question 2/i });
    expect(q1).toHaveAttribute("aria-expanded", "true");
    expect(q2).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(q2);
    expect(q1).toHaveAttribute("aria-expanded", "false");
    expect(q2).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Answer 2")).toBeInTheDocument();

    const tab1 = screen.getByRole("tab", { name: "Tab One" });
    const tab2 = screen.getByRole("tab", { name: "Tab Two" });
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");

    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two");
  });
});
