---
name: design-md-draft-body
description: >-
  Drafts DESIGN.md sections 1 and 4 through 8: Visual Theme with Key
  Characteristics, Component Stylings with states, and sections 7–8 per Part II G.
  Merges polished sections 2, 3, 5, 6 from Phase 2. Use when writing DESIGN.md
  body, drafting components, theme narrative, Phase 3, or sections one four
  seven eight. Part of the design-o-mat project.
---

# design-o-mat — draft body (Phase 3)

## Goal

Produce a readable **§1–§8** that matches the user’s **Part II G** choices and passes the Phase 3 gate (button implementable from §4 alone).

## Inputs

- Draft §2, §3, §5, §6 from Phase 2 (or instruct user to run **design-md-normalize-tokens** first).
- Locked **§7/§8 structure** from **design-md-scope-lock** / Part II G.
- Optional: `DESIGN.md` path (default project root `DESIGN.md`).

## Steps

1. Open [template-DESIGN.md](../../../docs/template-DESIGN.md) **Phase 3 — Draft narrative, components, and §7–§8** (steps 3.1–3.5) and **Part IV** cheatsheet for heading variants.
2. **§1:** 2–4 paragraphs + mandatory `**Key Characteristics:**` (6–12 bullets); U16 provenance if unofficial; optional extraction stats.
3. **§2–§6:** Merge Phase 2 prose; remove bracket instructions and placeholders.
4. **§4:** Buttons (all variants + hover/focus/active/disabled); Cards, Inputs, Navigation, Image Treatment; optional Icons; **Distinctive components** subsections as needed.
5. **§7:** Single chosen body per Part II G; remove unused **When §7 =** branch content before ship.
6. **§8:** Single chosen body; for Notion/NVIDIA patterns, follow template’s **Responsive** / **Accessibility** / **Extended** subsections.
7. Ensure H1 remains `# Design System Inspiration of {Name}`.

## Outputs

- Updated `DESIGN.md` with complete §1–§8 (and §9 left stubbed or untouched unless user also wants Phase 4).

## Constraints

- **Key Characteristics** must appear in §1 (corpus universal).
- Do not leave conflicting §7/§8 titles versus Part II G.
