---
name: design-md-validate-spec
description: >-
  Reviews an existing DESIGN.md against the Phase 5 checklist from
  template-DESIGN.md: Key Characteristics, typography coverage, component
  states, shadow philosophy, section seven eight alignment, section nine prompts.
  Use when validating DESIGN.md, QA design spec, review checklist, or Phase 5.
---

# Design MD — validate spec (Phase 5)

## Goal

Produce a **gap report** (and optional direct edits) so the spec matches the authoring template gates and awesome-design-md-style completeness.

## Inputs

- Path to `DESIGN.md` to review.

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 5 — Review against checklist** and evaluate each row against the target `DESIGN.md`.
2. For each check, mark **pass / fail / partial** with **one concrete fix** per failure (e.g. “Add disabled state to §4 Primary button”).
3. Verify **§1** contains `**Key Characteristics:**` and **§9** has the three subsections if strong agent adherence is required.
4. If the user targets awesome-design-md parity, cross-check **§7/§8** titles against **design-md-stitch-format** / [awesome-design-md-corpus-analysis.md](awesome-design-md-corpus-analysis.md).

## Outputs

- Markdown table or bullet list: Check → Status → Finding → Suggested edit.
- Optionally apply edits to `DESIGN.md` after user confirmation.

## Constraints

- Do not require `preview.html` for a pass; previews are Phase 6.
