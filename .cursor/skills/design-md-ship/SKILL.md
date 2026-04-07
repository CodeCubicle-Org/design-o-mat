---
name: design-md-ship
description: >-
  Finalizes shipping DESIGN.md: ensure Part IV-only body in the target file,
  run preview generation, optional folder README like awesome-design-md, pointer
  in README or AGENTS.md, commit message note. Use when shipping, finalize,
  handoff, Phase 7, or publish design-md folder. Part of the design-o-mat project.
---

# design-o-mat — ship (Phase 7)

## Goal

Deliver a **clean** `DESIGN.md` for agents plus optional repo hygiene matching VoltAgent awesome-design-md layout.

## Inputs

- Authoring file that may still contain Parts I–III (if user used embedded template) **or** already stripped production body.
- Target path: repo root `DESIGN.md` or `design-md/<slug>/DESIGN.md`.

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 7 — Ship** (steps 7.1–7.5).
2. **7.1:** Ensure shipped file contains **only** production `# Design System Inspiration…` through **§9** — no Part I–III workflow prose unless user explicitly wants a combined doc.
3. **7.2:** Run **design-md-generate-previews** (or `node generate-design-previews.mjs` with correct `--out`).
4. **7.3 (optional):** Add folder `README.md` with disclaimer, file table (`DESIGN.md`, previews), agents (Claude, Cursor, Stitch).
5. **7.4:** Ensure root **AGENTS.md** or **README.md** states that **design agents** follow **`DESIGN.md`** for look-and-feel (coding agents follow AGENTS.md for build).
6. **7.5:** Suggest a commit message line e.g. `docs: add DESIGN.md v1`.

## Outputs

- Clean `DESIGN.md`, optional previews, optional `README.md`, updated pointers.

## Constraints

- Do not strip user-intentional extra appendices without asking.
