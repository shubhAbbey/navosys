import type { Metadata } from "next";
import { Footer, Header } from "@/components/layout";
import { getGlobalLayoutData } from "@/lib/strapi/global";
import "../styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const layout = await getGlobalLayoutData();
  const faviconUrl = layout.global.favicon?.url;

  return {
    title: layout.global.defaultSeoTitle || "NAVOSYS — Technical Foundation",
    description:
      layout.global.defaultSeoDescription ||
      "NAVOSYS enterprise technology services platform.",
    ...(faviconUrl
      ? {
          icons: {
            icon: faviconUrl,
            apple: faviconUrl,
          },
        }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = await getGlobalLayoutData();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-canvas text-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas focus:outline-2 focus:outline-offset-2 focus:outline-navy"
        >
          Skip to main content
        </a>
        <Header layout={layout} />
        <div className="flex-1">{children}</div>
        <Footer layout={layout} />
      </body>
    </html>
  );
}
