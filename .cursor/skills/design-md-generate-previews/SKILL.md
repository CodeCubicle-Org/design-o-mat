---
name: design-md-generate-previews
description: >-
  Runs the Node.js script scripts/generate-design-previews.mjs to emit preview.html and
  preview-dark.html from DESIGN.md hex tokens; uses versioned preview-vN names
  when files already exist. Use when generating previews, preview.html, dark mode
  catalog, Phase 6, or light dark token board. Requires Node 18+. No Python. Part
  of the design-o-mat project.
---

# design-o-mat — generate previews (Phase 6)

## Goal

Produce **light** and **dark** HTML catalogs beside `DESIGN.md` without overwriting prior artifacts (versioned `preview-v2`, `v3`, …).

## Inputs

- Path to `DESIGN.md` (default `./DESIGN.md` from repo root).
- Optional `--out <dir>` if `DESIGN.md` lives under `design-md/<slug>/`.

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 6 — Visual catalog** for context (Inter fallback, regenerate after token edits).
2. From this repository root (where `package.json` and `scripts/generate-design-previews.mjs` live), run:
   - `npm run generate-previews` **or**
   - `node scripts/generate-design-previews.mjs <path-to-DESIGN.md> [--out <dir>]`
3. Confirm console output lists `preview.html` / `preview-dark.html` or **paired** `preview-vN.html` / `preview-dark-vN.html`.
4. If the script fell back to **Inter**, ensure §1 or §3 states that **DESIGN.md** remains canonical for font stacks.

## Outputs

- `preview.html` + `preview-dark.html` (or versioned pair) in the chosen output directory.

## Constraints

- **Node.js only** — [scripts/generate-design-previews.mjs](../../../scripts/generate-design-previews.mjs); do not use Python.
- The generator parses **hex** and luminance; it does **not** fully mirror typography tables.
