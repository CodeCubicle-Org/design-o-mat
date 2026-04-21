# design-o-mat — authoring template: production `DESIGN.md` + execution plan

**Version:** 1.2 · **Date:** 2026-04-07 · **Project:** [design-o-mat](https://github.com/CodeCubicle-Org/design-o-mat)  
**Validated against:** flat export [`voltagent-awesome-design-md-8a5edab282632443.txt`](./voltagent-awesome-design-md-8a5edab282632443.txt) (VoltAgent [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) snapshot).

This file has **two layers**:

1. **Parts I–III** — Human-only workflow: what to gather, questions to resolve, and the step-by-step plan to produce a finished spec.
2. **Part IV** — The **actual design-system document** body. Its **numbered sections 1–9** match the [Google Stitch `DESIGN.md` format](https://stitch.withgoogle.com/docs/design-md/format/) as **extended** by awesome-design-md: sections **1–8** follow Stitch’s themes; section **9 — Agent Prompt Guide** is the repo’s additive layer (quick colors, example prompts, iteration checklist).

**When you are done authoring:** copy **Part IV** (from the line `# Design System Inspiration of …` through section 9) into your project root as `DESIGN.md` (awesome-design-md and Stitch examples use **that exact filename and casing**). Remove Parts I–III from the shipped file, or keep them in a separate `DESIGN.authoring-notes.md`.

---

## Corpus alignment (what the source repo specifies)

The following is reproduced from the embedded **README** in the export (~lines 350–372). Your finished `DESIGN.md` should **cover these intents**, even if a section title varies slightly (see exceptions below).

| # | Section (Stitch-aligned intent) | What it captures |
|---|--------------------------------|------------------|
| 1 | Visual Theme & Atmosphere | Mood, density, design philosophy |
| 2 | Color Palette & Roles | Semantic name + hex + functional role |
| 3 | Typography Rules | Font families, full hierarchy table |
| 4 | Component Stylings | Buttons, cards, inputs, navigation **with states** |
| 5 | Layout Principles | Spacing scale, grid, whitespace philosophy |
| 6 | Depth & Elevation | Shadow system, surface hierarchy |
| 7 | Do's and Don'ts | Design guardrails and anti-patterns *(see corpus exceptions)* |
| 8 | Responsive Behavior | Breakpoints, touch targets, collapsing strategy *(see corpus exceptions)* |
| 9 | Agent Prompt Guide | Quick color reference, ready-to-use prompts |

**Companion artifacts in awesome-design-md** (optional for your project, recommended if you maintain HTML previews):

| File | Purpose |
|------|---------|
| `DESIGN.md` | The design system (what agents read) |
| `preview.html` | Visual catalog: swatches, type scale, buttons, cards |
| `preview-dark.html` | Same catalog with dark surfaces |

**Corpus exceptions (same nine numbers, different §7/§8 *titles* or *split content*)** — your template must allow these; do not force a contradiction:

| Pattern | Example in corpus | What to do |
|---------|-------------------|------------|
| §7 = Interaction & Motion (no Do/Don’t H2) | Cursor, opencode.ai | Put guardrails inside §4/§6 bullets or a short Do/Don’t **subsection** if you still want them. |
| §7 = Dark Mode | Mintlify | §8 remains **Responsive Behavior**; Do’s/Don’ts are not a separate H2 in that file — add critical rules in §1 **Key Characteristics** or §9 **Iteration Guide**. |
| §7 = Responsive (part 1), §8 = Responsive (Extended) | NVIDIA | First responsive block at §7; typography scaling / section strategy at §8. |
| §7 = Responsive, §8 = Accessibility & States | Notion | No §7 Do’s/Don’ts H2; accessibility and state machine live in §8. |

**Per-folder README** in the corpus: short disclaimer (“not the official design system”), file table, agent list (Claude, Cursor, Stitch), preview screenshots. Mirror this if you publish a **folder** (`design-md/<slug>/`) rather than a single root `DESIGN.md`.

**Contributing expectations** (from embedded `CONTRIBUTING.md`): if you change tokens, update `preview.html` / `preview-dark.html` in sync; compare against the live site when fixing hex/type.

**Preview generation (Node.js only):** the **design-o-mat** repo includes [`scripts/generate-design-previews.mjs`](./scripts/generate-design-previews.mjs). After `DESIGN.md` exists, run:

```bash
npm run generate-previews
# or: node scripts/generate-design-previews.mjs ./path/to/DESIGN.md --out ./output-dir
```

- First run writes `preview.html` and `preview-dark.html` next to `DESIGN.md` (or in `--out`).
- If `preview.html` already exists, the script writes **`preview-v2.html`** / **`preview-dark-v2.html`**, then `v3`, and so on (paired suffixes).
- Requires **Node 18+**. No Python.

---

# Part I — Data you need upfront (inventory)

Gather as much as possible **before** drafting Part IV. Missing items slow you down and force guesswork.

| ID | Data | Why it matters | Your status (fill in) |
|----|------|----------------|----------------------|
| U1 | **Product / brand name** | H1 and voice of the doc | |
| U2 | **Primary surfaces** (marketing app, docs, dashboard, mobile, email) | Scope of components and breakpoints | |
| U3 | **Canonical UI URL(s)** or **staging links** | Source for extracted colors, type, radii, shadows | |
| U4 | **Screenshots or screen recording** of hero, nav, forms, tables, modals, empty/loading/error states | States agents otherwise omit | |
| U5 | **Design source of truth** (Figma / Penpot / zero — code only) | Resolves conflicts when web ≠ design file | |
| U6 | **Brand guidelines PDF / Notion / wiki** (if any) | Official names for colors, type, logo rules | |
| U7 | **Font files or licensed webfont CSS** (families, weights in use) | Accurate `font-family` stacks | |
| U8 | **Logo / wordmark assets** (SVG preferred) | Nav and favicon treatment | |
| U9 | **Accessibility target** (e.g. WCAG 2.2 AA for text; focus policy) | §8 (or §7–8 split) content and contrast notes | |
| U10 | **Supported browsers / platforms** | OKLCH vs hex, variable fonts, `backdrop-filter` | |
| U11 | **Light-only, dark-only, or both** | Whether you need **§7 Dark Mode** (Mintlify-style) or dual tokens in §2 | |
| U12 | **Motion policy** (prefers-reduced-motion, duration caps) | **§7 Interaction & Motion** when that replaces Do’s/Don’ts | |
| U13 | **i18n** (RTL, long German strings, minimum font scaling) | Layout and truncation rules | |
| U14 | **Tech stack** (React, Vue, plain HTML, Tailwind, etc.) | Optional: class naming in prompts—not required for `DESIGN.md` | |
| U15 | **Existing token names** (CSS variables, Tailwind theme) | Align prose with code (`--color-*`, `--palette-*`, `--theme_*`, etc.) | |
| U16 | **Provenance** (live URL, extraction date, “inspired by” / unofficial disclaimer) | Matches corpus README tone; sets agent expectations on accuracy | |

**Minimum viable set to start:** **U1, U3 (or U5), U7, U11.** Everything else improves fidelity and reduces agent errors.

---

# Part II — Interactive questionnaire

Answer in place (replace `_…_` lines). If an item is **not applicable**, write `N/A` and state why—this prevents ambiguous blanks.

## A. Strategy and scope

1. **What is the single sentence this UI should communicate?** (e.g. “trustworthy enterprise analytics,” “playful creator tool.”)  
   _Your answer:_

2. **Who is the primary reader of the UI** (developers, consumers, mixed)?  
   _Your answer:_

3. **What must never change** even if trends shift? (e.g. “always pill buttons,” “always monospace data.”)  
   _Your answer:_

4. **What is explicitly out of scope** for this `DESIGN.md`? (e.g. “email templates only — no mobile app.”)  
   _Your answer:_

## B. Visual theme (maps to §1)

5. **Metaphor or reference world** (magazine, terminal, hardware, paper, glass, etc.)?  
   _Your answer:_

6. **Density:** airy, balanced, or dense?  
   _Your answer:_

7. **Signature element** a stranger would notice in 3 seconds (color bar, giant type, no shadow, etc.)?  
   _Your answer:_

## C. Color (maps to §2)

8. **List primary background, primary text, primary CTA, and one semantic** (success/warn/error) with hex (or OKLCH if that is source of truth).  
   _Your answer:_

9. **Are accent colors allowed on large fills** or only on borders/text/CTAs?  
   _Your answer:_

10. **Link vs button color rules** (same hue or different)?  
    _Your answer:_

## D. Typography (maps to §3)

11. **Font roles** (one family for all vs display + body + mono + icons). List each with file or CDN name.  
    _Your answer:_

12. **Minimum and maximum type scale** used in product (px or rem).  
    _Your answer:_

13. **Letter-spacing rules** (tight display, loose uppercase labels, none on body — specify).  
    _Your answer:_

## E. Components (maps to §4)

14. **Button variants** you must document (primary, secondary, ghost, danger, icon-only, etc.).  
    _Your answer:_

15. **Form field anatomy** (label position, error text, helper text, required indicator).  
    _Your answer:_

16. **Card pattern** (border vs shadow vs both; image aspect ratio if any).  
    _Your answer:_

## F. Layout and depth (maps to §5–6)

17. **Spacing base unit** (4, 8, or other) and whether fractional steps exist.  
    _Your answer:_

18. **Radius scale** (e.g. 4 / 8 / 12 / 9999px) and what each level is for.  
    _Your answer:_

19. **Shadow philosophy** in one line (none / single whisper / layered / border-only depth).  
    _Your answer:_

## G. Sections 7–8 structure (must match corpus patterns)

**Section 7 — pick exactly one primary role** (the H2 title should reflect this; section number stays **7**):

- [ ] **Do's and Don'ts** — default; matches Stitch README and majority of corpus files.  
- [ ] **Interaction & Motion** — use when hover/focus/transition specs *are* the guardrails (Cursor, opencode.ai).  
- [ ] **Dark Mode** — use when light/dark token inversion is a first-class chapter (Mintlify); pair with **§8 Responsive Behavior**.  
- [ ] **Responsive Behavior** — use as **first** responsive chapter when splitting (NVIDIA: §7 + §8 Extended).

_Section 7 choice + rationale:_

**Section 8 — pick exactly one primary role**:

- [ ] **Responsive Behavior** — default; full breakpoints / touch / collapsing / images.  
- [ ] **Accessibility & States** — use only when §7 is already **Responsive Behavior** and you are following the **Notion** pattern (focus system, states, contrast).  
- [ ] **Responsive Behavior (Extended)** — use when §7 is **Responsive Behavior** and you need a **second** responsive chapter (NVIDIA: typography scaling, dark/light section strategy).

_If you chose Do’s and Don’ts for §7, you almost always use **Responsive Behavior** for §8. If you chose Dark Mode for §7, you almost always use **Responsive Behavior** for §8._

_Section 8 choice + rationale:_

**Cross-check (avoid contradictions):**

| Your §7 | Forbidden §8 pairing | Reason |
|---------|----------------------|--------|
| Dark Mode | Accessibility only, no responsive | You still need responsive layout rules somewhere — use **Responsive Behavior** for §8. |
| Do’s and Don’ts | Responsive (Extended) with no §7 responsive | “Extended” implies an earlier responsive block; put the first block in §7 or merge into one §8. |

21. **Breakpoints** you will standardize on (names + px). If unknown, list “to be measured from CSS.”  
    _Your answer:_

22. **Touch-target minimum** (e.g. 44×44 CSS px) — fixed rule or “follow platform”?  
    _Your answer:_

## H. Agents and handoff (maps to §9)

23. **Three UI features** you want example prompts for (hero, data table, settings row, etc.).  
    _Your answer:_

24. **Forbidden shortcuts** agents often take for your brand (e.g. “pure black text,” “default blue links”).  
    _Your answer:_

---

# Part III — Execution plan (precise phases)

Follow in order. Do not skip **verification** gates; they prevent shipping a pretty but wrong spec.

## Phase 0 — Lock scope and sources

| Step | Action | Output | Done |
|------|--------|--------|------|
| 0.1 | Complete **Part I** table; mark unknowns | Checklist with gaps listed | [ ] |
| 0.2 | Complete **Part II** questionnaire (especially §7/§8 G) | Filled answers | [ ] |
| 0.3 | Choose **one** canonical source when web and Figma disagree (document the rule in §1 or a one-line note in §2) | Written rule | [ ] |

**Gate:** You can name the product, primary URL or design file, light/dark stance, and your **§7/§8 structure** with no contradiction.

---

## Phase 1 — Capture reality (evidence)

| Step | Action | Output | Done |
|------|--------|--------|------|
| 1.1 | Capture **full-page screenshots** at desktop width for key templates | Image files | [ ] |
| 1.2 | Capture **mobile** width for the same flows | Image files | [ ] |
| 1.3 | Record **computed styles** for: body, H1, primary button default/hover/focus/disabled, input default/focus/error, card | Notes or spreadsheet | [ ] |
| 1.4 | Extract **CSS variables** from `:root` or framework theme (search `--`, `color-`, `spacing-`) | Token list | [ ] |
| 1.5 | List **font faces** actually loaded (Network tab → font requests) | Family + weights | [ ] |
| 1.6 | Optional: count **major breakpoints** from CSS (media queries) if you will cite “N observed breakpoints” in §1 like several corpus files | Note | [ ] |

**Gate:** You have hex/rgba (or OKLCH) and px/rem values **copied from the product**, not guessed.

---

## Phase 2 — Normalize tokens (internal consistency)

| Step | Action | Output | Done |
|------|--------|--------|------|
| 2.1 | Build **§2**: semantic name → value → role → optional CSS var | Draft §2 | [ ] |
| 2.2 | Build **§3** hierarchy table: role → font → size → weight → line-height → letter-spacing → notes | Draft §3 | [ ] |
| 2.3 | Build **§5**: radius + spacing scales from smallest to largest in use | Draft §5 | [ ] |
| 2.4 | Build **§6**: elevation levels (even if “Level 0 = flat only”) + **Shadow Philosophy** sentence | Draft §6 | [ ] |

**Gate:** No duplicate conflicting hex for the same semantic role unless you document **state** (hover vs default).

---

## Phase 3 — Draft narrative, components, and §7–§8

| Step | Action | Output | Done |
|------|--------|--------|------|
| 3.1 | Write **§1**: 2–4 paragraphs + mandatory `**Key Characteristics:**` (6–12 bullets). Include **U16 provenance** if unofficial/extracted. Optional: extraction stats (breakpoints count, “shadows: none detected”) | Draft §1 | [ ] |
| 3.2 | Merge Phase 2 drafts into polished **§2, §3, §5, §6** (tables + prose); ensure **§6** has **Decorative Depth** or explicit “none” | Draft §2–3, §5–6 | [ ] |
| 3.3 | Write **§4**: at least **Buttons** with states; add **Cards & Containers**, **Inputs**, **Navigation**, **Image Treatment** as applicable; optional **Icons** (icon font / SVG set); **Distinctive components** for product-specific UI | Draft §4 | [ ] |
| 3.4 | Write **§7** using the **Part II G** choice (Do’s and Don’ts, Interaction & Motion, Dark Mode, or first Responsive block) | Draft §7 | [ ] |
| 3.5 | Write **§8** using the **Part II G** choice (standard Responsive, Accessibility & States, or Responsive Extended) | Draft §8 | [ ] |

**Gate:** A new teammate could implement a button **only** from §4 without opening Figma; §7/§8 titles match the questionnaire with no logical conflict.

---

## Phase 4 — Agent Prompt Guide (operational layer)

| Step | Action | Output | Done |
|------|--------|--------|------|
| 4.1 | **Quick Color Reference** — 6–12 bullets of the most-used tokens | §9 subsection | [ ] |
| 4.2 | **Example Component Prompts** — 3–8 full-sentence quoted prompts (corpus uses double-quote lines) | §9 subsection | [ ] |
| 4.3 | **Iteration Guide** — numbered list of non-obvious rules agents violate first | §9 subsection | [ ] |

**Gate:** Each example prompt mentions **at least** colors, radius, typography, and shadow/border treatment where relevant.

**Thin §9 (corpus: Airtable, Webflow):** bullets only under **Agent Prompt Guide** with no `###` children is acceptable but weaker for few-shot prompting—prefer the three subsections when possible.

---

## Phase 5 — Review against checklist

| Check | Question |
|-------|----------|
| ☐ | Does **§1** explain **why**, not only **what**? |
| ☐ | Does **§1** include **`**Key Characteristics:**`** (required in all 58 corpus files)? |
| ☐ | Does **§2** map every frequent UI color to a **role**? |
| ☐ | Does the **§3** table cover every heading level and body style in screenshots? |
| ☐ | Does **§4** include **focus** and **disabled** (and error where applicable)? |
| ☐ | Does **§5** use **Spacing System**, **Grid & Container**, **Whitespace Philosophy**, **Border Radius Scale** (or a deliberate thin **Layout** list with the same information)? |
| ☐ | Does **§6** state **Shadow Philosophy** in plain language (including “none”)? |
| ☐ | Do **§7–§8** match your Part II G choices and the corpus exception you intended? |
| ☐ | Does **§9** include **Quick Color Reference**, **Example Component Prompts**, and **Iteration Guide** when you need strong agent adherence? |
| ☐ | Could **§9** prompts be pasted into an agent without editing? |

---

## Phase 6 — Visual catalog (auto-generated, Node.js)

| Step | Action | Output | Done |
|------|--------|--------|------|
| 6.1 | From the directory that contains `DESIGN.md`, run **`npm run generate-previews`** or **`node scripts/generate-design-previews.mjs ./DESIGN.md`** (add **`--out ./design-md/<slug>`** if the file lives in a subfolder) | `preview.html` + `preview-dark.html` on first run | [ ] |
| 6.2 | Re-run the same command after token changes; if `preview.html` already exists, the script creates **`preview-v2.html`** / **`preview-dark-v2.html`**, then `v3`, … — **never overwrites** the previous pair without a new version number | Versioned `preview-vN.html` / `preview-dark-vN.html` | [ ] |
| 6.3 | If the generator loads **Inter** as a fallback (when no stack is detected), say so in **§1** or **§3** so agents still treat **`DESIGN.md` as canonical** for font names | Note in spec | [ ] |

The script parses **hex colors** from `DESIGN.md` and builds light/dark layouts from **relative luminance**; it does not parse full typography tables. Stitch does not require previews; awesome-design-md uses them for human QA. Regenerate after editing colors (per `CONTRIBUTING.md` spirit).

---

## Phase 7 — Ship

| Step | Action | Done |
|------|--------|------|
| 7.1 | Copy **Part IV** only to `DESIGN.md` in repo root (or `design-md/<slug>/DESIGN.md` if mirroring awesome-design-md) | [ ] |
| 7.2 | Run **Phase 6** (`npm run generate-previews`) so `preview.html` / `preview-dark.html` (or versioned names) sit beside `DESIGN.md` | [ ] |
| 7.3 | Optional: add **folder `README.md`** with disclaimer, file table, and agents list (Claude, Cursor, Stitch) like corpus | [ ] |
| 7.4 | Add a one-line pointer in root **`README.md`** or **`AGENTS.md`**: design agents follow `DESIGN.md` (see source README table: `AGENTS.md` = build, `DESIGN.md` = look and feel) | [ ] |
| 7.5 | Tag a release or commit message noting `DESIGN.md` initial version | [ ] |

---

# Part IV — Production `DESIGN.md` body

_Copy everything from the next line through the end of section 9 into your shipped `DESIGN.md`. Replace all `{{…}}` placeholders; remove instructional text in square brackets; remove every **unused** §7/§8 branch (including the bold **When §7 = …** / **When §8 = …** labels) so only one body remains under each of sections 7 and 8._

**Section heading cheatsheet (corpus-correct):**

- **§5:** prefer `## 5. Layout Principles`; thin specs may use `## 5. Layout` (Airtable, Webflow).  
- **§6:** prefer `## 6. Depth & Elevation`; thin specs may use `## 6. Depth`; descriptive H2 allowed (e.g. Webflow’s shadow-system title).  
- **§7 / §8:** titles must match **Part II G**; numbering stays 7 and 8.

# Design System Inspiration of {{PRODUCT_NAME}}

{{Optional one line: Unofficial / extracted from {{URL}}. Not the brand’s official design system.}}

## 1. Visual Theme & Atmosphere

[Write 2–4 short paragraphs. Cover: emotional tone, density, what makes the product visually distinct, and the design “story” (metaphor). Name the canonical UI surface (marketing site, app shell, docs). If values were extracted from computed styles or CSS, say so. Optional: note breakpoint count, shadow detection, or other empirical observations like the corpus.]

**Key Characteristics:**

- [Bullet: dominant background and text colors with hex]
- [Bullet: signature accent rule — where it may / may not appear]
- [Bullet: typography signature — families, weight discipline, tracking]
- [Bullet: radius signature — sharp vs soft vs pill]
- [Bullet: depth signature — flat / border-only / layered shadows]
- [Bullet: imagery or illustration style if any]
- [Bullet: one “never do this” brand violation]
- [Add 6–12 bullets total]

## 2. Color Palette & Roles

[Group with `###` headings. Corpus examples: Primary Brand, Premium Tiers, Text Scale, Semantic, Neutrals, Interactive States, Surface & Shadows, Extended Brand Palette, Timeline/Feature colors, Shadows & Depth.]

### {{COLOR_GROUP_NAME}}

- **{{Token name}}** (`{{#hex or css color}}`): {{role in UI}}; {{optional: `var(--your-token)`}}

[Repeat bullets. For each accent, state whether it may be used as large fills or only as signal (border, underline, CTA).]

## 3. Typography Rules

### Font {{Family | Families}}

- **{{Role}}**: `{{Primary family}}`, fallbacks: `{{stack}}`
- [Add: icon font, monospace, if used — corpus often documents icon fonts in §3 or §4]

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| {{e.g. Display Hero}} | {{family}} | {{px (rem)}} | {{100–900}} | {{number}} | {{px or normal}} | {{usage}} |
| {{e.g. Body}} | {{family}} | {{px (rem)}} | {{}} | {{}} | {{}} | {{}} |

[Add rows until every common text style in the product is covered. Thin corpus specs sometimes omit the Notes column—prefer including it.]

### Principles

- [Bullet: how hierarchy is achieved — weight vs size vs color vs tracking]
- [Bullet: OpenType features if any]
- [Bullet: truncation / ellipsis rules for UI if relevant]

## 4. Component Stylings

### Buttons

**{{Variant name e.g. Primary}}**

- Background: `{{color}}`
- Text: `{{color}}`
- Border: `{{none | 1px solid …}}`
- Padding: `{{vertical}} {{horizontal}}`
- Radius: `{{px | % | pill}}`
- Hover: {{describe + values}}
- Focus: {{ring/outline + values}}
- Active / pressed: {{}}
- Disabled: {{}}

[Repeat for each variant: secondary, ghost, danger, icon, link-as-button, etc.]

### Cards & Containers

- Background: `{{}}`
- Border: `{{}}`
- Radius: `{{}}`
- Shadow: `{{none | full CSS}}`
- Padding: `{{}}`
- [Image treatment if cards are media-forward]

### Inputs

- Default / filled / focus / error / disabled: {{for border, shadow, text, placeholder, label}}
- Radius: `{{}}`

### Navigation

- [Header: sticky or static, height, blur, border]
- [Link styles default/hover/active]
- [Mobile collapse behavior summary]

### Image Treatment

- [Aspect ratios, corners, overlays, lazy-load placeholders if any]

### Icons (optional)

- [Icon font family / weight, or SVG rules; sizing and color inheritance]

### {{Distinctive components}}

- [e.g. timeline, chat bubble, code block, data grid row, terminal block — one subsection each]

## 5. Layout Principles

[Or use `## 5. Layout` if the spec is minimal; keep the same information density either way.]

### Spacing System

- Base unit: {{e.g. 8px}}
- Scale: {{list values actually used}}
- [Stack vs inline gaps for common patterns]

### Grid & Container

- Max width: {{px}}
- Columns / gutters: {{}}
- [Key templates: landing, dashboard, docs]

### Whitespace Philosophy

- [1–3 bullets: density, section rhythm, alignment to brand story]

### Border Radius Scale

- [Name each step: e.g. Micro 4px — …; Pill 9999px — …]

## 6. Depth & Elevation

[Or `## 6. Depth` for minimal specs.]

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | {{none | border only}} | {{}} |
| Level 1 | `{{full shadow or border CSS}}` | {{}} |
| Level 2 | `{{}}` | {{}} |
| Focus | `{{}}` | {{}} |

**Shadow Philosophy:** [One short paragraph: layered vs whisper vs none; why.]

### Decorative Depth

- [Gradients, section backgrounds, dividers — or state “none intentionally.”]

## 7. {{SECTION_7_TITLE}}

[Set `SECTION_7_TITLE` to match Part II G. Keep **one** of the following bodies; delete the rest before shipping. Corpus uses `###` (not `####`) for children of §7.]

**When §7 = Do's and Don'ts** (majority of corpus):

### Do

- [Bullet list]

### Don't

- [Bullet list]

**When §7 = Interaction & Motion** (Cursor, opencode.ai):

### Hover States

- [Components and exact transitions]

### Focus States

- [Visibility requirement; color; outline vs shadow]

### Transitions

- [Durations; easing; reduced-motion note]

**When §7 = Dark Mode** (Mintlify):

### Color Inversions

- [Background, text, border, elevated surfaces, accent behavior]

### Key Adjustments

- [Buttons, inputs, charts, images]

**When §7 = Responsive Behavior** (first block, NVIDIA-style):

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| {{}} | {{}} | {{}} |

### Touch Targets

- [Rules]

### Collapsing Strategy

- [Nav, grids, sidebars, tables]

### Image Behavior

- [Crop, art direction, srcset summary]

## 8. {{SECTION_8_TITLE}}

[Set `SECTION_8_TITLE` to match Part II G. Default: `Responsive Behavior`. Alternatives: `Accessibility & States` (Notion), `Responsive Behavior (Extended)` (NVIDIA). Keep **one** primary body below; merge tables if you already used part of responsive at §7.]

**When §8 = Responsive Behavior** (standard, or second block after §7 responsive):

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| {{Mobile}} | {{px}} | {{}} |
| {{Tablet}} | {{px}} | {{}} |
| {{Desktop}} | {{px}} | {{}} |

### Touch Targets

- [Rules]

### Collapsing Strategy

- [Nav, grids, sidebars, tables]

### Image Behavior

- [Crop, art direction, srcset summary]

**When §8 = Responsive Behavior (Extended)** (NVIDIA):

### Typography Scaling

- [How display/body sizes change by breakpoint]

### Dark/Light Section Strategy

- [If the site alternates full-bleed dark and light sections, document rhythm here]

**When §8 = Accessibility & States** (Notion):

### Focus System

- [ ]

### Interactive States

- [Default, hover, active, focus, disabled — summary]

### Color Contrast

- [Pairs and target level]

## 9. Agent Prompt Guide

### Quick Color Reference

- Background: {{name}} (`{{hex}}`)
- Text primary: {{}} (`{{}}`)
- Text secondary: {{}} (`{{}}`)
- CTA: {{}} (`{{}}`)
- Border default: {{}}
- Focus ring: {{}}
- [Add remaining high-frequency tokens]

### Example Component Prompts

- "{{Full sentence prompt including typography, color, radius, shadow/border, spacing.}}"
- "{{Second prompt.}}"
- "{{Third prompt.}}"

### Iteration Guide

1. [Most important rule agents get wrong]
2. [Second rule]
3. [Third rule]
4. [Continue 5–10 items]

---

_End of Part IV — production `DESIGN.md` body._
