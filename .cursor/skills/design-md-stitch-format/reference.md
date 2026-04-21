# Reference: Stitch + awesome-design-md `DESIGN.md` shape

*For the [design-o-mat](https://github.com/CodeCubicle-Org/design-o-mat) project.*

Condensed from [awesome-design-md-corpus-analysis.md](../../../awesome-design-md-corpus-analysis.md) and [template-DESIGN.md](../../../template-DESIGN.md). Use with skill **design-md-stitch-format**.

## Official intent (Stitch themes + repo §9)

| # | Section | Role |
|---|---------|------|
| 1 | Visual Theme & Atmosphere | Mood, density, philosophy |
| 2 | Color Palette & Roles | Name + hex + role (+ optional CSS var) |
| 3 | Typography Rules | Families + hierarchy table |
| 4 | Component Stylings | Buttons, cards, inputs, nav, states |
| 5 | Layout Principles | Spacing, grid, whitespace, radius *(or thin `## 5. Layout`)* |
| 6 | Depth & Elevation | Levels + Shadow Philosophy *(or `## 6. Depth`)* |
| 7 | Do's and Don'ts *(default)* | Guardrails — **see exceptions** |
| 8 | Responsive Behavior *(default)* | Breakpoints, touch, collapsing, images — **see exceptions** |
| 9 | Agent Prompt Guide | Quick colors, example prompts, iteration *(awesome-design-md extension)* |

## Universal conventions (58-file corpus)

- H1: `# Design System Inspiration of {Brand}`
- Sections always `## 1.` … `## 9.`
- **`**Key Characteristics:**`** required in §1
- §2–§4, §9 section **titles** fixed wording; §5–§6 titles may shorten; §7–§8 vary (below)

## §7 exceptions

| §7 title | Brands (examples) |
|----------|-------------------|
| Do's and Don'ts | Majority |
| Interaction & Motion | Cursor, opencode.ai |
| Dark Mode | Mintlify |
| Responsive Behavior (part 1) | NVIDIA |

## §8 exceptions

| §8 title | Brands (examples) |
|----------|-------------------|
| Responsive Behavior | Majority; follows Mintlify §7 Dark Mode |
| Accessibility & States | Notion (after §7 Responsive) |
| Responsive Behavior (Extended) | NVIDIA (after §7 Responsive) |
| `Responsive: …px` minimal | Webflow |

## Companion files (awesome-design-md layout)

- `preview.html`, `preview-dark.html` — optional human QA; generate via **design-md-generate-previews** / `node scripts/generate-design-previews.mjs`

## Links

- [Stitch DESIGN.md overview](https://stitch.withgoogle.com/docs/design-md/overview/)
- [Stitch format](https://stitch.withgoogle.com/docs/design-md/format/)
- [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
