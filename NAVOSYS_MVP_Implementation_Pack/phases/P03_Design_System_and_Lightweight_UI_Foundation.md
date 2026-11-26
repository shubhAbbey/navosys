# P03 — Design System & Lightweight UI Foundation

**Read and obey `master/M0_MASTER_SPECIFICATION.md` before execution.**

## Objective
Finalize documented design tokens, typography, spacing, colors, responsive breakpoints, buttons, forms, cards, focus states, accessibility and component primitives. Create/approve visual assets only as specified.

## Mandatory phase workflow
1. Inspect the current repository, branch, status, existing implementation and phase dependencies. Do not overwrite or remove working code.
2. Create a concise plan and identify scope, schemas, content, image assets, tests and risks.
3. Implement only this phase's scope; preserve the architecture and lightweight principles in M0.
4. Create/update Strapi schemas, content and assets as required. Public-facing content must be CMS-driven.
5. Test locally: relevant tests, lint, TypeScript, production build, responsive and accessibility checks. Record actual results.
6. Update documentation and report files/schema/content/assets/tests/build/known issues.
7. Commit and push only if Git remote is connected and user-authorized. Never commit secrets.
8. Do not automatically start the next phase.

## Phase-specific implementation
Finalize documented design tokens, typography, spacing, responsive breakpoints, buttons, forms, cards, focus states, accessibility and component primitives. Create/approve visual assets only as specified.

### Approved NAVOSYS palette (mandatory)
- Warm Ivory `#FAF8F5` — dominant background.
- Sand `#E9E4DC` — secondary backgrounds, cards and alternate sections.
- Deep Navy `#23364D` — headings, navigation, footer, strong text and dark surfaces.
- Muted Teal `#6F9690` — primary CTA and selected accents, with contrast-safe treatment.
- Warm Gold `#C89F79` — restrained highlights only.

This palette replaces all previous provisional theme colors. Do not introduce a competing palette. Define central design tokens and contrast-tested variants where needed. Gold is not a default text/CTA color; do not use white text on teal or gold unless the measured contrast passes. Keep the overall visual style premium, warm, sophisticated, calm, trustworthy and modern—minimal design, whitespace, restrained borders/shadows, simple typography and subtle motion. Avoid neon, gratuitous gradients, generic robot imagery and visual clutter. Document color roles, contrast findings, typography, button states, surfaces, focus, selection, form and responsive behaviors. Verify WCAG 2.2 AA contrast where practical; color alone must not convey state.

### Palette usage
- Main canvas: Warm Ivory.
- Alternate/secondary panels: Sand.
- Headings/navigation/footer: Deep Navy.
- Primary conversion action: Muted Teal, using a contrast-safe text and hover/focus treatment.
- Small decorative emphasis: Warm Gold.
- Header and footer should feel cohesive with the theme; avoid over-darkening every section.
- Theme tokens should be centrally defined and reusable, not scattered hardcoded color values.

## Acceptance checklist
- [ ] M0 master specification followed.
- [ ] Phase scope implemented without unrelated changes.
- [ ] CMS content and assets managed through Strapi where applicable.
- [ ] Responsive behavior reviewed.
- [ ] Accessibility reviewed.
- [ ] Relevant tests pass and results are recorded.
- [ ] Lint, typecheck and production build verified where applicable.
- [ ] Documentation and phase report updated.
- [ ] Git status/commit/push reported truthfully.
- [ ] Outstanding issues documented.

## Status
Report as IMPLEMENTED, FAILED or AWAITING ACCEPTANCE. Implementation is not formal acceptance.
