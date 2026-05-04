# Design guidelines (usage)

**Purpose:** Document **how** the design system is **used in the real product**—patterns, flows, and decisions that **designers** own and evolve over time. This file complements [`DESIGN.md`](../DESIGN.md) (the Stitch-aligned **definition** of tokens, components, and rules) and [`design-language.md`](design-language.md) (conceptual **voice** from Step 1 intake). **Normative** colors, type scales, and component APIs stay in `DESIGN.md`; **this** file captures **application guidance** so engineering, PM, and agents build screens that match designer intent, not only the raw spec.

**Who maintains it:** **Designers** (or design leads) **create and update** this document as the product and system mature. Engineers may propose edits via PR or change request; designers resolve conflicts with `DESIGN.md` when usage and spec appear to disagree.

**How to use**

1. Keep `DESIGN.md` the **source of truth** for what exists in the system (components, states, tokens).
2. Use **this** file for **when and how** to combine those pieces: page types, navigation patterns, empty and loading states, forms, tables, modals, destructive flows, accessibility callouts for *your* product, and links to reference screens or Figma when helpful.
3. When `DESIGN.md` changes (new component, renamed token), **update** relevant sections here so usage guidance does not reference retired patterns.
4. Store the file at **`docs/design-guidelines.md`** next to other design-o-mat docs (or your project’s agreed path); point to it from README or `AGENTS.md` if agents should read it during UI work.

**Relationship to other artifacts**

| Artifact | Role |
|----------|------|
| **`DESIGN.md`** | **Definition:** tokens, components, states, §7/§8 guardrails, Agent Prompt Guide (section 9). |
| **`docs/design-definition-form.md`** | **Step 1 intake:** agreed baseline before deep spec work. |
| **`docs/design-language.md`** | **Voice and intent** from intake—mood, audience, craft signals for authors. |
| **`docs/design-guidelines.md` (this file)** | **Usage:** concrete application patterns and product-specific UI rules **as defined by the designer**. |

---

## 1. Scope of this document

_State which surfaces or domains this file covers (e.g. marketing site only, logged-in app, admin). List out-of-scope areas if another guidelines file or team owns them._

---

## 2. Layout and navigation patterns

_Describe recurring shells: headers, sidebars, tabs, breadcrumbs, max content width, when to use full-bleed vs contained layouts. Link to `DESIGN.md` §5 where layout tokens are defined._

---

## 3. Page and flow patterns

_For each major flow (onboarding, settings, checkout, list → detail), summarize the expected structure, primary components, and any ordering rules designers require._

---

## 4. Component usage by context

_When to prefer Card vs Panel, Button variants for primary vs secondary actions on the same screen, Input groups for forms, Data display patterns. Call out combinations that are discouraged even if technically allowed by the spec._

---

## 5. Content, copy, and empty states

_Tone for errors and confirmations (if not only in `DESIGN.md` §7), empty-state illustrations vs text-only, skeleton usage, truncation and “show more” rules._

---

## 6. Motion, focus, and accessibility in product

_Product-level expectations beyond §7/§8 in `DESIGN.md`: skip links, focus order in modals, reduced-motion behavior for marketing vs app._

---

## 7. Review and change log (optional)

_Keep a short dated list of substantive guideline updates, or point to your team’s changelog / CR process._

---

## Document control

| Field | Value |
|-------|-------|
| **Maintained by** | Design (primary) |
| **Aligned with** | `DESIGN.md` Definition; `docs/design-language.md` for voice |
| **Update trigger** | New screens, system releases, or repeated implementation questions |
