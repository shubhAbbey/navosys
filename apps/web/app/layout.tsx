import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "NAVOSYS — Technical Foundation",
  description:
    "Phase 03 design system and lightweight UI foundation on Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas focus:outline-2 focus:outline-offset-2 focus:outline-navy"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
