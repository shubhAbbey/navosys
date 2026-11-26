"use client";

import Link from "next/link";
import { useState } from "react";
import type { CmsAnnouncement } from "@/types/cms";

export interface AnnouncementBarProps {
  announcement: CmsAnnouncement | null;
}

/**
 * Dismissible top announcement bar rendered only when enabled in Strapi Global Settings.
 */
export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!announcement?.enabled || !announcement.text || dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="border-b border-gold/60 bg-sand text-navy"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 sm:text-sm lg:px-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{announcement.text}</span>
          {announcement.ctaLabel && announcement.ctaUrl ? (
            <Link
              href={announcement.ctaUrl}
              className="font-semibold text-navy underline underline-offset-4 hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              {announcement.ctaLabel}
            </Link>
          ) : null}
        </p>
        {announcement.dismissible ? (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-navy hover:bg-canvas/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
