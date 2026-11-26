"use client";

import { useId, useRef, useState } from "react";
import { ButtonLink, Card, Container, Heading, Section, Text } from "@/components/ui";
import { isSafeLinkUrl } from "@/lib/content/safe-rich-text";
import type { TabsSectionData } from "@/types/cms";
import { getSectionAnchorId, SectionHeader } from "./section-utils";

export function TabsSection({ section }: { section: TabsSectionData }) {
  const surface = section.surface ?? "sand";
  const cardSurface = surface === "sand" ? "ivory" : surface === "ivory" ? "sand" : "navy";
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabs = [...(section.tabs ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (tabs.length === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, tabs.length - 1);
  const currentTab = tabs[safeIndex];
  const highlights = (currentTab.highlights ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    let next = idx;
    if (event.key === "ArrowRight") {
      next = (idx + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      next = (idx - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="default">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        <div
          role="tablist"
          aria-label={section.heading}
          className="mt-8 flex flex-wrap gap-2 border-b border-border pb-3"
        >
          {tabs.map((tab, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={`${tab.label}-${idx}`}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`${baseId}-tab-${idx}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${baseId}-panel-${idx}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`min-h-11 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  isSelected
                    ? "bg-navy text-canvas"
                    : "border border-border bg-canvas text-navy hover:bg-sand"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <Card
          id={`${baseId}-panel-${safeIndex}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${safeIndex}`}
          surface={cardSurface}
          className="mt-6"
        >
          <Heading as="h3">{currentTab.title}</Heading>
          <Text className="mt-3 text-navy-muted">{currentTab.content}</Text>
          {highlights.length > 0 ? (
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-navy">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {currentTab.ctaLabel &&
          currentTab.ctaUrl &&
          isSafeLinkUrl(currentTab.ctaUrl) ? (
            <div className="mt-6">
              <ButtonLink href={currentTab.ctaUrl} variant="primary" size="sm">
                {currentTab.ctaLabel}
              </ButtonLink>
            </div>
          ) : null}
        </Card>
      </Container>
    </Section>
  );
}
