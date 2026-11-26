import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer, Header } from "@/components/layout";
import type { SiteLayoutData } from "@/types/cms";

const MOCK_LAYOUT: SiteLayoutData = {
  source: "cms",
  global: {
    siteName: "NAVOSYS",
    tagline: "Building What's Next.",
    siteUrl: "https://navosys.in",
    logoLight: {
      url: "http://127.0.0.1:1337/uploads/navosys_logo_light.png",
      alternativeText: "NAVOSYS logo",
      width: 360,
      height: 80,
    },
    logoDark: {
      url: "http://127.0.0.1:1337/uploads/navosys_logo_dark.png",
      alternativeText: "NAVOSYS logo",
      width: 360,
      height: 80,
    },
    favicon: null,
    announcement: {
      enabled: true,
      text: "Enterprise architecture advisory open.",
      ctaLabel: "Book a Consultation",
      ctaUrl: "/contact/book-consultation",
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
    contactPhone: null,
    contactLocation: "India",
    footerSummary: "Enterprise engineering and cloud solutions.",
    copyrightText: "© 2026 NAVOSYS. All rights reserved.",
    socialLinks: [
      {
        platform: "email",
        label: "Email NAVOSYS",
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
      {
        label: "Terms of Service",
        url: "/terms",
        isExternal: false,
        openInNewTab: false,
      },
    ],
    defaultSeoTitle: "NAVOSYS",
    defaultSeoDescription: "Enterprise technology services.",
  },
  headerNav: [
    {
      label: "Services",
      url: "/services",
      order: 1,
      isVisible: true,
      isExternal: false,
      children: [
        {
          label: "Cloud & IT Solutions",
          url: "/services/cloud-and-it",
          description: "Migration and managed infrastructure",
          order: 1,
          isVisible: true,
          isExternal: false,
        },
      ],
    },
    {
      label: "Contact",
      url: "/contact",
      order: 2,
      isVisible: true,
      isExternal: false,
      children: [],
    },
  ],
  footerColumns: [
    {
      title: "Services",
      order: 1,
      isVisible: true,
      links: [
        {
          label: "Cloud & IT Solutions",
          url: "/services/cloud-and-it",
          isExternal: false,
          openInNewTab: false,
        },
      ],
    },
  ],
};

describe("P04 Header, Navigation, Announcement & Footer", () => {
  it("renders Header with Strapi logo, CTAs, dismissible announcement, and keyboard-accessible nested menu", () => {
    render(<Header layout={MOCK_LAYOUT} />);

    expect(
      screen.getByRole("region", { name: "Site announcement" })
    ).toHaveTextContent("Enterprise architecture advisory open.");

    const logoImg = screen.getByAltText("NAVOSYS logo");
    expect(logoImg).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Get a Quote" })).toHaveAttribute(
      "href",
      "/contact/get-quote"
    );

    const submenuBtn = screen.getByRole("button", {
      name: "Services submenu",
    });
    expect(submenuBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(submenuBtn);
    expect(submenuBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Cloud & IT Solutions")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(submenuBtn).toHaveAttribute("aria-expanded", "false");

    const dismissBtn = screen.getByRole("button", {
      name: "Dismiss announcement",
    });
    fireEvent.click(dismissBtn);
    expect(
      screen.queryByRole("region", { name: "Site announcement" })
    ).not.toBeInTheDocument();
  });

  it("toggles accessible mobile navigation drawer", () => {
    render(<Header layout={MOCK_LAYOUT} />);

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", { name: "Close navigation menu" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" })
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" })
    ).not.toBeInTheDocument();
  });

  it("renders Footer on Deep Navy surface with CMS columns, contact info, social and legal links", () => {
    render(<Footer layout={MOCK_LAYOUT} />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-navy", "text-canvas");
    expect(screen.getByText("Building What's Next.")).toBeInTheDocument();
    expect(screen.getByText("hello@navosys.in")).toHaveAttribute(
      "href",
      "mailto:hello@navosys.in"
    );
    expect(
      screen.getByRole("link", { name: "Email NAVOSYS" })
    ).toHaveAttribute("href", "mailto:hello@navosys.in");
    expect(
      screen.getByRole("navigation", { name: "Legal navigation" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Privacy Policy" })
    ).toHaveAttribute("href", "/privacy");
  });
});
