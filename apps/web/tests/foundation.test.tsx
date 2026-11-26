import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import NotFound from "@/app/not-found";
import RootLayout, { metadata } from "@/app/layout";

describe("P01 Foundation Shell", () => {
  it("exports non-empty technical metadata", () => {
    expect(metadata.title).toBe("NAVOSYS — Technical Foundation");
    expect(typeof metadata.description).toBe("string");
  });

  it("renders HomePage with accessible main landmark, responsive container, and single h1", () => {
    render(<HomePage />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveClass("min-h-screen");

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

  it("renders RootLayout with lang=en and skip link targeting main content", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div data-testid="child">content</div>
      </RootLayout>
    );

    expect(html).toContain('<html lang="en"');
    expect(html).toContain('href="#main-content"');
    expect(html).toContain("Skip to main content");
    expect(html).toContain('data-testid="child"');
  });
});
