---
name: design-md-agent-prompt-guide
description: >-
  Writes DESIGN.md section 9 Agent Prompt Guide: Quick Color Reference, Example
  Component Prompts, and Iteration Guide for LLM few-shot UI generation. Use when
  writing section nine, agent prompts, iteration guide, operational layer, or
  Phase 4. Part of the design-o-mat project.
---

# design-o-mat — Agent Prompt Guide (Phase 4)

## Goal

Make §9 **paste-ready** for coding agents: dense token recap, quoted full-sentence prompts, numbered iteration rules.

## Inputs

- Near-complete `DESIGN.md` with §1–§8 filled (especially §2–§4).
- User’s three priority UI patterns (from Part II H question 23 if available).

## Steps

1. Open [template-DESIGN.md](template-DESIGN.md) **Phase 4 — Agent Prompt Guide** (steps 4.1–4.3) and **Part IV §9** template.
2. Add `### Quick Color Reference` with **6–12** bullets (background, text, CTA, border, focus, frequent accents).
3. Add `### Example Component Prompts` with **3–8** double-quoted strings; each prompt must mention **color, radius, typography, shadow/border** where relevant (Phase 4 gate).
4. Add `### Iteration Guide` with **5–10** numbered items targeting mistakes agents make for this brand (tie to Part II question 24 if present).
5. If the user wants a minimal spec, allow bullets-only §9 but note weaker few-shot strength (per template).

## Outputs

- Updated `DESIGN.md` §9 with three `###` subsections when possible.

## Constraints

- Quotes should be **implementation-grade** (sizes and hex), not vague “make it pretty.”
