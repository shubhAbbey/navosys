import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import NotFound from "@/app/not-found";
import RootLayout, { generateMetadata } from "@/app/layout";

describe("P01–P04 Foundation Shell", () => {
  it("generates metadata cleanly even when CMS is unreachable during isolated tests", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("CMS offline in unit test"))
    );

    const meta = await generateMetadata();
    expect(meta.title).toBeTruthy();
    expect(typeof meta.description).toBe("string");

    vi.unstubAllGlobals();
  });

  it("renders HomePage with accessible main landmark, responsive container, and single h1", () => {
    render(<HomePage />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveClass("bg-canvas", "text-navy");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("NAVOSYS Web Workspace Initialized");
  });

  it("renders NotFound with accessible landmark and return home link", () => {
    render(<NotFound />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page not found"
    );

    const homeLink = screen.getByRole("link", { name: "Return home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders RootLayout with lang=en, skip link, header, footer, and children", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("CMS offline in unit test"))
    );

    const element = await RootLayout({
      children: <div data-testid="child">content</div>,
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('<html lang="en"');
    expect(html).toContain('href="#main-content"');
    expect(html).toContain("Skip to main content");
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    expect(html).toContain('data-testid="child"');

    vi.unstubAllGlobals();
  });
});
