"use client";

import { useId, useState } from "react";
import { Container, Section } from "@/components/ui";
import type { FaqAccordionSectionData } from "@/types/cms";
import { getSectionAnchorId, SectionHeader } from "./section-utils";

export function FaqAccordionSection({
  section,
}: {
  section: FaqAccordionSectionData;
}) {
  const surface = section.surface ?? "ivory";
  const isDark = surface === "navy";
  const baseId = useId();
  const items = [...(section.items ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  if (items.length === 0) {
    return null;
  }

  function toggleItem(index: number) {
    setOpenIndices((prev) => {
      const isOpen = prev.includes(index);
      if (section.allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      }
      return isOpen ? [] : [index];
    });
  }

  return (
    <Section
      id={getSectionAnchorId(section)}
      surface={surface}
      spacing={section.spacing ?? "default"}
    >
      <Container size="narrow">
        <SectionHeader
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
          surface={surface}
        />

        <div className="mt-8 divide-y divide-border rounded-lg border border-border">
          {items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            const triggerId = `${baseId}-faq-btn-${idx}`;
            const panelId = `${baseId}-faq-panel-${idx}`;

            return (
              <div key={`${item.question}-${idx}`}>
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className={`flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                      isDark
                        ? "hover:bg-navy-deep/40 focus-visible:outline-canvas"
                        : "hover:bg-sand/60 focus-visible:outline-navy"
                    }`}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="shrink-0 text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`px-5 pb-5 text-sm leading-relaxed ${
                      isDark ? "text-sand/90" : "text-navy-muted"
                    }`}
                  >
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
