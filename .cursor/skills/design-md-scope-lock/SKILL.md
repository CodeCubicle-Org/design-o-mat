---
name: design-md-scope-lock
description: >-
  Locks scope and sources for a new DESIGN.md before drafting: Part I upfront
  inventory (U1–U16), Part II questionnaire including §7/§8 structure (Part II G),
  and canonical source when web vs design files disagree. Use when starting a
  design system spec, filling prerequisites, Phase 0, scope lock, or Part II G
  section seven and eight choices.
---

# Design MD — scope and source lock (Phase 0)

## Goal

Produce a completed **gate** for authoring: product identity, URLs or design files, light/dark stance, **non-contradictory** §7/§8 plan, and explicit conflict-resolution rule between sources.

## Inputs

- Path to working notes or draft (optional): `DESIGN.md`, Notion, spreadsheet.
- Optional: live site URL, Figma/Penpot link.

## Steps

1. Open the project [template-DESIGN.md](template-DESIGN.md) at **Part I — Data you need upfront** and **Part II** (sections A–H, especially **G. Sections 7–8 structure**).
2. Walk through **Phase 0 — Lock scope and sources** (steps 0.1–0.3): complete Part I table rows, Part II answers, and write the single canonical-source rule when web ≠ design file.
3. Validate **Part II G cross-check**: chosen §7/§8 pairing must not match a forbidden row (e.g. Dark Mode §7 without Responsive §8).
4. Output a short **summary block** for the user: filled U1, U3/U5, U11, §7 title choice, §8 title choice, canonical source rule, and any **unknowns** still open.

## Outputs

- Filled or updated checklist (Part I / Part II) stored where the user keeps authoring notes, or appended as a comment block at top of draft `DESIGN.md` if they prefer.

## Constraints

- Do not draft full §2–§9 here; only lock scope. Use **design-md-draft-body** for narrative sections.
- Align §7/§8 options with **design-md-stitch-format** if the user must match awesome-design-md / Stitch conventions.
