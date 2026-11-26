import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "NAVOSYS — Technical Foundation",
  description:
    "Phase 01 Next.js, TypeScript, and Tailwind CSS workspace initialization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-neutral-900"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
