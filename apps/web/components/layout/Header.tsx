import Image from "next/image";
import Link from "next/link";
import { isLocalMediaUrl } from "@/lib/strapi/client";
import type { SiteLayoutData } from "@/types/cms";
import { AnnouncementBar } from "./AnnouncementBar";
import { HeaderNav } from "./HeaderNav";

export interface HeaderProps {
  layout: SiteLayoutData;
}

/**
 * Global site header driven by Strapi Global Settings and Navigation Menus.
 */
export function Header({ layout }: HeaderProps) {
  const { global, headerNav } = layout;
  const logo = global.logoLight;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur-xs">
      <AnnouncementBar announcement={global.announcement} />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${global.siteName} home`}
          className="inline-flex min-h-11 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alternativeText || `${global.siteName} logo`}
              width={logo.width ?? 180}
              height={logo.height ?? 40}
              unoptimized={isLocalMediaUrl(logo.url)}
              priority
              className="h-9 w-auto"
            />
          ) : (
            <span className="text-lg font-bold tracking-[0.14em] text-navy uppercase">
              {global.siteName}
            </span>
          )}
        </Link>

        <HeaderNav
          items={headerNav}
          primaryCta={global.primaryCta}
          secondaryCta={global.secondaryCta}
        />
      </div>
    </header>
  );
}
