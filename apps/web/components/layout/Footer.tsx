import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { isLocalMediaUrl } from "@/lib/strapi/client";
import type { CmsLink, SiteLayoutData } from "@/types/cms";

export interface FooterProps {
  layout: SiteLayoutData;
}

function FooterNavLink({ link }: { link: CmsLink }) {
  const className =
    "inline-flex min-h-9 items-center text-sm text-sand/90 transition-colors duration-150 hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";

  if (link.isExternal || link.openInNewTab) {
    return (
      <a
        href={link.url}
        target={link.openInNewTab ? "_blank" : undefined}
        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.url} className={className}>
      {link.label}
    </Link>
  );
}

/**
 * Global site footer on Deep Navy surface driven by Strapi Global Settings and Navigation Menus.
 */
export function Footer({ layout }: FooterProps) {
  const { global, footerColumns } = layout;
  const logo = global.logoDark;

  return (
    <footer className="border-t border-[#3A4F68] bg-navy text-canvas [&_*]:focus-visible:outline-canvas">
      <Container size="wide" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Contact Summary */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="/"
              aria-label={`${global.siteName} home`}
              className="inline-flex min-h-11 items-center rounded-md"
            >
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alternativeText || `${global.siteName} logo`}
                  width={logo.width ?? 180}
                  height={logo.height ?? 40}
                  unoptimized={isLocalMediaUrl(logo.url)}
                  className="h-9 w-auto"
                />
              ) : (
                <span className="text-lg font-bold tracking-[0.14em] text-canvas uppercase">
                  {global.siteName}
                </span>
              )}
            </Link>

            {global.tagline ? (
              <p className="text-xs font-semibold tracking-[0.12em] text-gold uppercase">
                {global.tagline}
              </p>
            ) : null}

            {global.footerSummary ? (
              <p className="max-w-sm text-sm leading-relaxed text-sand/90">
                {global.footerSummary}
              </p>
            ) : null}

            {(global.contactEmail ||
              global.contactPhone ||
              global.contactLocation) && (
              <address className="space-y-1.5 pt-2 text-sm not-italic text-sand/90">
                {global.contactEmail ? (
                  <div>
                    <a
                      href={`mailto:${global.contactEmail}`}
                      className="hover:text-canvas hover:underline underline-offset-4"
                    >
                      {global.contactEmail}
                    </a>
                  </div>
                ) : null}
                {global.contactPhone ? (
                  <div>
                    <a
                      href={`tel:${global.contactPhone.replace(/\s+/g, "")}`}
                      className="hover:text-canvas hover:underline underline-offset-4"
                    >
                      {global.contactPhone}
                    </a>
                  </div>
                ) : null}
                {global.contactLocation ? (
                  <div>{global.contactLocation}</div>
                ) : null}
              </address>
            )}

            {global.socialLinks.length > 0 ? (
              <ul
                aria-label="Social and contact links"
                className="flex flex-wrap gap-3 pt-2"
              >
                {global.socialLinks.map((social) => {
                  const isMailto = social.url.startsWith("mailto:");
                  return (
                    <li key={`${social.platform}-${social.url}`}>
                      <a
                        href={social.url}
                        target={isMailto ? undefined : "_blank"}
                        rel={isMailto ? undefined : "noopener noreferrer"}
                        className="inline-flex min-h-9 items-center rounded-md border border-[#3A4F68] px-3 py-1.5 text-xs font-medium text-canvas transition-colors duration-150 hover:border-gold hover:text-gold"
                      >
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* Dynamic CMS Footer Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-semibold tracking-[0.12em] text-gold uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.url}`}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#3A4F68] pt-8 text-xs text-sand/85 sm:flex-row sm:items-center sm:justify-between">
          <p>{global.copyrightText}</p>
          {global.legalLinks.length > 0 ? (
            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {global.legalLinks.map((link) => (
                  <li key={`${link.label}-${link.url}`}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
