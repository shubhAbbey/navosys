# NAVOSYS Design System & Lightweight UI Foundation (P03)

Governing references:
- `NAVOSYS_MVP_Implementation_Pack/master/NAVOSYS_APPROVED_THEME.md`
- `NAVOSYS_MVP_Implementation_Pack/phases/P03_Design_System_and_Lightweight_UI_Foundation.md`

Design personality: **premium, warm, sophisticated, calm, trustworthy, and modern** — generous whitespace, minimal borders/shadows, restrained motion, and zero neon or gratuitous gradients.

---

## 1. Approved Color Tokens & Measured Contrast (WCAG 2.2 AA)

Central tokens live in [apps/web/styles/globals.css](file:///C:/Users/Shubham/OneDrive/Desktop/NAVOSYS/apps/web/styles/globals.css) and [apps/web/lib/design/tokens.ts](file:///C:/Users/Shubham/OneDrive/Desktop/NAVOSYS/apps/web/lib/design/tokens.ts).

| Token | CSS Variable | HEX | Role | Measured Contrast |
|---|---|---|---|---|
| Warm Ivory | `--navosys-ivory` (`bg-canvas`) | `#FAF8F5` | Primary page canvas | `11.61:1` with Deep Navy |
| Sand | `--navosys-sand` (`bg-sand`) | `#E9E4DC` | Cards & alternating sections | `9.73:1` with Deep Navy |
| Deep Navy | `--navosys-navy` (`text-navy` / `bg-navy`) | `#23364D` | Headings, navigation, footer, dark sections | `11.61:1` on Ivory |
| Muted Navy | `--navosys-navy-muted` | `#3E4E62` | Secondary / supporting copy | `8.02:1` on Ivory / `6.72:1` on Sand |
| Deep Navy Ink | `--navosys-navy-deep` | `#101B27` | High-contrast ink on Muted Teal / hover navy | `5.33:1` on `#6F9690` |
| Muted Teal (Base) | `--navosys-teal` | `#6F9690` | Selected accents, subtle badges (dark ink only) | `5.33:1` with `#101B27` |
| Muted Teal Deep (CTA) | `--navosys-teal-deep` | `#3D645E` | Primary CTA fill (`Get a Quote`) with Warm Ivory text | `6.22:1` with `#FAF8F5` |
| Muted Teal Hover | `--navosys-teal-hover` | `#355853` | Primary CTA hover/active fill | `7.41:1` with `#FAF8F5` |
| Warm Gold | `--navosys-gold` | `#C89F79` | Sparing decorative highlights / badges only | `5.09:1` with `#23364D` |
| Subtle Border | `--navosys-border` | `#D9D2C7` | Card & divider hairlines | Structural |
| Strong Border | `--navosys-border-strong` | `#66707C` | Form input borders & outline buttons | `4.71:1` on Ivory / `3.99:1` on Sand |
| Error | `--navosys-error` / `-surface` | `#8F2D2D` / `#FDF4F3` | Validation errors (paired with `Error:` text) | `7.67:1` on Ivory |
| Success | `--navosys-success` / `-surface` | `#2B5B54` / `#F2F7F6` | Positive confirmation (paired with `Success` label) | `7.26:1` on Ivory |
| Warning | `--navosys-warning` / `-surface` | `#7A4E1D` / `#FBF6EF` | Cautionary notice (paired with `Warning` label) | `6.75:1` on Ivory |

### Contrast Policy Findings
- **White (`#FFFFFF`) on base Muted Teal (`#6F9690`) measures `3.26:1`** and **white on Warm Gold (`#C89F79`) measures `2.28:1`** — both fail WCAG 2.2 AA (`4.5:1` for normal text).
- Therefore, **white text is prohibited on `#6F9690` and `#C89F79`**. Primary CTA buttons use the contrast-tested Muted Teal Deep variant (`#3D645E`, `6.22:1` with Warm Ivory `#FAF8F5`; hover `#355853`, `7.41:1`), while base `#6F9690` and `#C89F79` always pair with `#101B27` or `#23364D`.
- Color is never used alone to convey state: form errors include `Error:` text + `role="alert"` + `aria-invalid`, alerts render explicit status headings, and disabled controls expose `disabled` semantics + cursor + opacity.

---

## 2. Typography, Spacing & Breakpoints

- **Font Stack:** System UI sans (`--navosys-font-sans`) and monospace (`--navosys-font-mono`) with `line-height: 1.6` body defaults and tight editorial heading line-heights (`1.15`–`1.35`). Zero external network font blocking during offline/CI builds.
- **Responsive Breakpoints:** `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.
- **Containers (`Container`):** `narrow` (`max-w-3xl`), `default` (`max-w-6xl`), `wide` (`max-w-7xl`) with `px-4 sm:px-6 lg:px-8`.
- **Section Spacing (`Section`):** `compact` (`py-10 sm:py-12 lg:py-16`), `default` (`py-14 sm:py-20 lg:py-24`), `spacious` (`py-16 sm:py-24 lg:py-28`).

---

## 3. Interaction, Focus, Selection & Reduced Motion

- **Focus Indicators:** Global `:focus-visible` uses a `2px solid #23364D` outline with `2px` offset (`#FAF8F5` on dark `navy` sections).
- **Text Selection:** `::selection` highlights with Sand (`#E9E4DC`) and Deep Navy Ink (`#101B27`).
- **Touch Targets:** Buttons (`md`/`lg`) and form inputs/selects/checkbox labels enforce at least `44px` (`min-h-11`) interactive height.
- **Reduced Motion:** `@media (prefers-reduced-motion: reduce)` sets `scroll-behavior: auto` and forces `0.01ms` animation/transition durations.

---

## 4. UI Component Primitives (`apps/web/components/ui/`)

All P03 primitives are lightweight React Server-compatible components (`0` client JS required):
- `Container`, `Section`, `Heading`, `Text`
- `Button`, `ButtonLink` (`primary`, `secondary`, `outline`, `ghost`; `sm`, `md`, `lg`)
- `Card` (`ivory`, `sand`, `navy`, optional `interactive`)
- `Badge` (`neutral`, `teal`, `gold`, `navy`)
- `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`
- `Alert` (`info`, `success`, `warning`, `error`)

---

## 5. Visual Assets

No visual/image assets were required or created in P03. Brand logos and favicons belong to **P04** (`P04_Global_Settings,_Header,_Navigation_and_Footer.md`).
