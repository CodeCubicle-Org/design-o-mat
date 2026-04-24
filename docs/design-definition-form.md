# Design definition form (intake)

**Purpose:** Single **Step 1** artifact for **designers** and **developers** to align on token and type basics before drafting `DESIGN.md`. Fill every section you can; use `N/A` with a short reason when something does not apply.

**How to use**

1. **Duplicate this file** into your project (e.g. `design-definition-form.md` next to where `DESIGN.md` will live). Do not treat this repo’s copy as your team’s source of truth unless you are authoring design-o-mat itself.
2. **Design** owns visual intent (colors, type, density, metaphors). **Engineering** owns constraints (stack, existing tokens, accessibility targets, what is already shipped in code).
3. Optional: draft [`design-language.md`](design-language.md) in **designer vocabulary** (north star, color story, type voice, spatial metaphor) so critiques and agent prompts align on *intent*, not only hex and px.
4. When the form is **complete enough to proceed** (minimum: **product name**, **primary + accent color intent**, **Title 1** and **body** typography, **light/dark** stance), continue with **`template-DESIGN.md`** (Parts I–III inventory and questionnaire) and the phased workflow in the [PRD](prd.md) / [`AGENTS.md`](../AGENTS.md).

**Maps to Stitch-style `DESIGN.md` sections:** §1 theme · §2 color · §3 typography · §4 components (high level) · §5 layout · §6 depth · §7/§8 choices · §9 prompts (later). **Section K** (inspiration image) feeds mood and palette cues into §1–§3 and into [`design-language.md`](design-language.md).

---

## A. Ownership and product

| Field | Designer | Developer | Notes |
|-------|----------|-----------|--------|
| **Product / system name** | | | Same intent as template **U1**. |
| **Form version / date** | | | e.g. `2026-04-24`. |
| **Primary design contact** | | | |
| **Primary engineering contact** | | | |

**One-sentence product UI goal** (what should this UI *feel* like?)  
_Your answer:_

**Who reads this UI most** (customers, developers, internal admins, mixed)?  
_Your answer:_

---

## B. Color

Use **hex** unless your source of truth is OKLCH or CSS variables—then name the variable or OKLCH and note it explicitly.

| Role | Hex (or token) | Usage notes |
|------|----------------|-------------|
| **Primary background (light)** | | Main app canvas. |
| **Primary text (on light)** | | Default body copy. |
| **Primary / brand (main CTA, key actions)** | | Often same as “brand”; distinct from accent if you use both. |
| **Accent (highlights, links, secondary emphasis)** | | When different from primary CTA, describe *where* accent is allowed (fills vs borders vs text only). |
| **Surface / elevated (cards, modals)** | | Optional if same as background + shadow only. |
| **Border / divider (default)** | | |
| **Success** | | |
| **Warning** | | |
| **Error / danger** | | |
| **Focus ring (keyboard)** | | Color + style intent (e.g. 2px solid). |

**Dark mode:** `light only` · `dark only` · `both` (fill companion column or attach separate table).

| Role (dark, if applicable) | Hex (or token) | Notes |
|----------------------------|----------------|-------|
| **Primary background (dark)** | | |
| **Primary text (dark)** | | |
| **Primary CTA (dark)** | | |

**Contrast / accessibility target** (e.g. WCAG 2.2 AA text, custom):  
_Your answer:_

---

## C. Typography

### C.1 Font families

| Role | Family name | Source (Google Fonts, Adobe, self-host, system) | Weights in use |
|------|-------------|-----------------------------------------------------|----------------|
| **Title / display** | | | |
| **Body** | | | |
| **Monospace / code** | | | |
| **Icon font or SVG-only** | | | `N/A` if icons are SVG only. |

### C.2 Title 1 (page / marketing H1 — maps to your top heading level)

| Attribute | Value | Notes |
|-----------|-------|-------|
| **Font family** | | Usually same as Title or Display above. |
| **Font size** | | e.g. `2.5rem`, `40px`. |
| **Font weight** | | e.g. `600`, `bold`. |
| **Line height** | | e.g. `1.1`, `44px`. |
| **Letter-spacing** | | e.g. `-0.02em`, `normal`. |
| **Text transform** | | `none`, `uppercase`, etc. |

### C.3 Additional heading scale (optional but recommended)

Fill levels you use in product (adjust labels to match your design system).

| Level | Font | Size | Weight | Line height |
|-------|------|------|--------|-------------|
| **Title 2 / H2** | | | | |
| **Title 3 / H3** | | | | |
| **Section label / overline** | | | | |
| **Body default** | | | | |
| **Body small / caption** | | | | |
| **Strong / emphasis** | | | | Same family as body unless noted. |

---

## D. Layout, shape, and depth

| Topic | Value | Notes |
|-------|-------|-------|
| **Spacing base unit** | | e.g. `8px`; fractional steps yes/no. |
| **Max content width** | | e.g. `1200px`, fluid. |
| **Grid / columns** | | e.g. 12-col, CSS grid. |
| **Corner radius scale** | | e.g. `sm 4` / `md 8` / `lg 12` / `pill 9999`. |
| **Shadow philosophy** | | none / subtle / layered / border-only. |
| **Border width default** | | e.g. `1px`. |

---

## E. Components (presence checklist)

Check what **must** appear in `DESIGN.md` §4 with **states** (default, hover, focus, disabled, loading, error where relevant).

| Component | Needed | Notes (variants: primary, ghost, danger, …) |
|-----------|--------|-----------------------------------------------|
| **Button** | ☐ | |
| **Link** | ☐ | Same color as button or distinct? |
| **Text input / textarea** | ☐ | |
| **Select / combobox** | ☐ | |
| **Checkbox / radio** | ☐ | |
| **Card** | ☐ | |
| **Modal / dialog** | ☐ | |
| **Navigation (header)** | ☐ | |
| **Table / data grid** | ☐ | |
| **Toast / alert** | ☐ | |
| **Tabs** | ☐ | |
| **Tooltip** | ☐ | |
| **Other (name)** | ☐ | |

---

## F. Motion, responsive, and §7 / §8 intent

| Topic | Choice | Notes |
|-------|--------|-------|
| **Motion level** | none / subtle / expressive | Tie to `prefers-reduced-motion` policy if known. |
| **Standard breakpoints** | | Names + px or `to be measured`. |
| **Minimum touch target** | | e.g. `44×44` CSS px. |

**Section 7 primary role** (pick one for your `DESIGN.md`; see `template-DESIGN.md` Part II G):  
☐ Do’s and Don’ts · ☐ Interaction & Motion · ☐ Dark Mode · ☐ Responsive (part 1 of split)  
_Rationale:_

**Section 8 primary role** (pick one):  
☐ Responsive Behavior · ☐ Accessibility & States · ☐ Responsive (Extended)  
_Rationale:_

---

## G. Engineering constraints (developer-led)

| Field | Value |
|-------|-------|
| **Stack** (React, Vue, plain HTML, Tailwind, etc.) | |
| **Existing token system** (CSS variables, Tailwind theme, Figma variables name) | |
| **Known technical limits** (fonts, subpixel, OKLCH support, etc.) | |

---

## H. Sources and links

| Asset | URL or path |
|-------|-------------|
| **Figma / Penpot (main file)** | |
| **Storybook / deployed UI** | |
| **Brand guidelines** | |

---

## K. Visual inspiration (optional — any image)

Use **one or more** reference images that are **not** limited to a website: photos, posters, scans, packaging, slides, or in-app screenshots. This section captures **mood** and speeds up **color** and **type** decisions; it does not replace your canonical tokens in **B** and **C**.

| Field | Designer | Developer | Notes |
|-------|----------|-----------|--------|
| **Image path(s)** | | | Repo-relative or shared-drive path, e.g. `inspiration/moodboard-01.jpg`. See [`inspiration/README.md`](../inspiration/README.md). |
| **What we are borrowing** | | | e.g. “warm paper + ink contrast”, “dense data chrome”, “soft gradients + sharp type”. |

**Helper (palette + type hints):** from the repo root, with Node.js v24+ and dependencies installed (`npm install`):

```bash
node scripts/extract-inspiration-from-image.mjs ./inspiration/your-file.jpg
```

For **raster** images (JPEG, PNG, WebP, etc.), the script writes a sibling **`.inspiration-hints.md`** file with **dominant colors** to paste into **§B** as starting hexes. **Font names are not embedded** in those formats—identify type visually (see below).

For **SVG** files, the same script also scans for **`font-family`** declarations when present and lists them under “Typeface hints”.

**Candidate typefaces (from matcher tools or designer judgment)**  
After running the helper, use a visual matcher on the **same** file or a **tight crop** of lettering: [MyFonts — WhatTheFont](https://www.myfonts.com/pages/whatthefont), your design tool’s font identification, or a foundry you trust. Paste the best match(es) here, then copy into **§C.1** when approved.

| Role | Candidate family | Confidence / notes |
|------|------------------|--------------------|
| **Title / display (from inspiration)** | | e.g. “WhatTheFont: 87% match” or “hand-set, no match”. |
| **Body (from inspiration)** | | Often `N/A` if the image is not UI copy. |

---

## I. Sign-off to proceed

We agree this form is **complete enough** to start **Part I–III** in `template-DESIGN.md` (or equivalent scope lock) and draft Part IV toward `DESIGN.md`.

| Role | Name | Date |
|------|------|------|
| **Design** | | |
| **Engineering** | | |

---

## Open questions

_List anything still undecided; resolve before or during normalization phase._

1.  
2.  
3.  

---

## J. Mapping to `template-DESIGN.md` and Stitch

Use this table when moving into **Part I (U1–U16)** and **Part II** of [`template-DESIGN.md`](../template-DESIGN.md). It is a **hint**, not a second source of truth—the template rows still win if you discover conflicts.

| Form section | Template Part I (examples) | Stitch / Part IV (examples) |
|--------------|----------------------------|-----------------------------|
| **A** Ownership, one-sentence goal | **U1**, Part II A | §1 Key characteristics, provenance |
| **B** Color | **U11**, **U15**, Part II C | §2 Color palette & roles |
| **C** Typography | **U7**, Part II D | §3 Typography |
| **D** Layout, shape, depth | Part II F | §5 Layout, §6 Depth & elevation |
| **E** Components | **U2**, **U4**, Part II E | §4 Component stylings |
| **F** Motion, responsive, §7/§8 | **U9**–**U13**, Part II G | §7 / §8 (per corpus choice) |
| **G** Engineering | **U14**–**U16**, Part II | Action area, stack notes |
| **H** Sources | **U3**, **U5**, **U6** | Evidence, canonical source |
| **K** Inspiration | Mood for §1; seed values for §2–§3 (verify) | Optional thumbnails later (`sample-images`); narrative in `design-language.md` |
| **I** Sign-off | Readiness gate before heavy Part IV drafting | — |
