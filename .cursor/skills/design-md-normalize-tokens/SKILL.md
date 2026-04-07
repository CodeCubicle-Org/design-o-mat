---
name: design-md-normalize-tokens
description: >-
  Normalizes raw UI capture into consistent DESIGN.md sections: draft section 2
  Color Palette, section 3 Typography hierarchy table, section 5 Layout scales,
  section 6 Depth and Shadow Philosophy. Use when normalizing tokens, Phase 2,
  building color tables, type ramp, spacing scale, or elevation levels. Part of
  the design-o-mat project.
---

# design-o-mat — normalize tokens (Phase 2)

## Goal

Turn Phase 1 notes into **internally consistent** draft subsections **§2, §3, §5, §6** with no duplicate semantic colors unless state (hover vs default) is explicit.

## Inputs

- Phase 1 structured notes or equivalent.
- Target file: draft `DESIGN.md` or section placeholders.

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 2 — Normalize tokens** (steps 2.1–2.4).
2. **§2:** Group colors with `###` headings; each bullet **Name (`value`): role**; add `var(--*)` when known.
3. **§3:** Build **Hierarchy** markdown table (Role, Font, Size, Weight, Line Height, Letter Spacing, Notes); add **Font Family** and **Principles** subsections.
4. **§5:** Spacing base + scale; grid/container; whitespace philosophy; border radius scale (or thin **Layout** list if mimicking minimal corpus files).
5. **§6:** Elevation table (include flat-only if no shadows); mandatory **Shadow Philosophy** paragraph; **Decorative Depth** or explicit none.
6. Run the Phase 2 **gate**: resolve conflicting hex for the same semantic role.

## Outputs

- Updated `DESIGN.md` (or patch) containing draft §2, §3, §5, §6 ready for narrative merge in Phase 3.

## Constraints

- Preserve **order of first appearance** for colors when the user cares about token priority; otherwise sort by semantic groups.
