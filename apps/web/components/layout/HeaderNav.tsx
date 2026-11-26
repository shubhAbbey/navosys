"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui";
import type { CmsCta, CmsNavItem } from "@/types/cms";

export interface HeaderNavProps {
  items: CmsNavItem[];
  primaryCta: CmsCta | null;
  secondaryCta: CmsCta | null;
}

function NavLinkElement({
  href,
  isExternal,
  className,
  onClick,
  children,
}: {
  href: string;
  isExternal: boolean;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * Accessible, keyboard-navigable desktop dropdown navigation and responsive mobile drawer.
 */
export function HeaderNav({
  items,
  primaryCta,
  secondaryCta,
}: HeaderNavProps) {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        setMobileOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopMenu(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileDrawerId = `${baseId}-mobile-drawer`;

  return (
    <div ref={navContainerRef} className="flex items-center gap-3">
      {/* Desktop Navigation */}
      <nav aria-label="Main navigation" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const hasChildren = item.children.length > 0;
            const itemKey = `${item.label}-${item.url}`;
            const isOpen = openDesktopMenu === itemKey;
            const submenuId = `${baseId}-submenu-${item.label
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <li key={itemKey} className="relative flex items-center">
                <NavLinkElement
                  href={item.url}
                  isExternal={item.isExternal}
                  onClick={() => setOpenDesktopMenu(null)}
                  className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-navy transition-colors duration-150 hover:bg-sand/70 hover:text-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {item.label}
                </NavLinkElement>

                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={submenuId}
                      aria-label={`${item.label} submenu`}
                      onClick={() =>
                        setOpenDesktopMenu(isOpen ? null : itemKey)
                      }
                      className="inline-flex h-9 w-8 items-center justify-center rounded-md text-navy hover:bg-sand/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    >
                      <span
                        aria-hidden="true"
                        className={`text-xs transition-transform duration-150 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {isOpen ? (
                      <ul
                        id={submenuId}
                        className="absolute top-full left-0 z-50 mt-2 w-72 rounded-lg border border-border bg-canvas p-2 shadow-md"
                      >
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.url}`}>
                            <NavLinkElement
                              href={child.url}
                              isExternal={child.isExternal}
                              onClick={() => setOpenDesktopMenu(null)}
                              className="block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                            >
                              <span className="block text-sm font-medium text-navy">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="mt-0.5 block text-xs text-navy-muted">
                                  {child.description}
                                </span>
                              ) : null}
                            </NavLinkElement>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop Header CTAs */}
      <div className="hidden lg:flex lg:items-center lg:gap-2.5">
        {secondaryCta && secondaryCta.isVisible !== false ? (
          <ButtonLink
            href={secondaryCta.url}
            variant={secondaryCta.variant || "outline"}
            size="sm"
          >
            {secondaryCta.label}
          </ButtonLink>
        ) : null}
        {primaryCta && primaryCta.isVisible !== false ? (
          <ButtonLink
            href={primaryCta.url}
            variant={primaryCta.variant || "primary"}
            size="sm"
          >
            {primaryCta.label}
          </ButtonLink>
        ) : null}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={mobileDrawerId}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMobileOpen((prev) => !prev)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border-strong bg-canvas px-3 text-sm font-medium text-navy hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy lg:hidden"
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile Navigation Drawer */}
      {mobileOpen ? (
        <div
          id={mobileDrawerId}
          className="absolute top-full right-0 left-0 z-50 border-b border-border bg-canvas shadow-md lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6"
          >
            <ul className="space-y-1">
              {items.map((item) => {
                const hasChildren = item.children.length > 0;
                const itemKey = `${item.label}-${item.url}`;
                const isGroupOpen = openMobileGroup === itemKey;
                const groupId = `${baseId}-mobile-group-${item.label
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`;

                return (
                  <li
                    key={itemKey}
                    className="border-b border-border/60 pb-1 last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <NavLinkElement
                        href={item.url}
                        isExternal={item.isExternal}
                        onClick={() => setMobileOpen(false)}
                        className="flex min-h-11 flex-1 items-center rounded-md px-2 text-base font-medium text-navy hover:bg-sand"
                      >
                        {item.label}
                      </NavLinkElement>
                      {hasChildren ? (
                        <button
                          type="button"
                          aria-expanded={isGroupOpen}
                          aria-controls={groupId}
                          aria-label={`Toggle ${item.label} links`}
                          onClick={() =>
                            setOpenMobileGroup(isGroupOpen ? null : itemKey)
                          }
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-navy hover:bg-sand"
                        >
                          <span aria-hidden="true">
                            {isGroupOpen ? "−" : "+"}
                          </span>
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isGroupOpen ? (
                      <ul id={groupId} className="mt-1 space-y-1 pl-4 pb-2">
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.url}`}>
                            <NavLinkElement
                              href={child.url}
                              isExternal={child.isExternal}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-11 items-center rounded-md px-2 text-sm text-navy-muted hover:bg-sand hover:text-navy"
                            >
                              {child.label}
                            </NavLinkElement>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-2.5 pt-3 sm:flex-row">
              {secondaryCta && secondaryCta.isVisible !== false ? (
                <ButtonLink
                  href={secondaryCta.url}
                  variant={secondaryCta.variant || "outline"}
                  size="md"
                  className="w-full sm:flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
              {primaryCta && primaryCta.isVisible !== false ? (
                <ButtonLink
                  href={primaryCta.url}
                  variant={primaryCta.variant || "primary"}
                  size="md"
                  className="w-full sm:flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {primaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
