---
name: design-md-capture-tokens
description: >-
  Guides evidence capture from a live UI for DESIGN.md: screenshots, computed
  styles for key components, CSS custom properties, loaded fonts, optional
  breakpoint counts. Use when extracting tokens from a website, Phase 1, audit
  live UI, or capture reality before normalizing colors and typography. Part of
  the design-o-mat project.
---

# design-o-mat — capture tokens (Phase 1)

## Goal

Gather **empirical** values from the product (not guessed) so later phases can fill §1–§6 with defensible hex, px/rem, and variable names.

## Inputs

- Canonical UI URL(s) or staging links (from Phase 0).
- Optional: path to save screenshots and a notes file.

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 1 — Capture reality (evidence)** and follow steps **1.1–1.6** (desktop + mobile screenshots, computed styles for body/H1/button/input/card states, `:root` / theme variables, Network-tab fonts, optional media-query count).
2. Structure findings as: **Colors** (hex/rgba/oklab as seen), **Typography** (family, size, weight, line-height, letter-spacing per role sampled), **Spacing/radius/shadow** snippets, **CSS variable list** (name + sample value).
3. Call out **gaps** (e.g. dark mode not inspected, missing error state) for the user to confirm.

## Outputs

- Artifact the user can paste into Phase 2: spreadsheet, markdown note, or structured bullet list next to the draft `DESIGN.md`.

## Constraints

- Prefer **copied computed values** over defaults from memory.
- If the user has no URL, stop and ask for U3/U5 from Part I or proceed only from static assets they provide.
