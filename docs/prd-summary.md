# PRD Summary - design-o-mat

## Product Snapshot

design-o-mat is a documentation-first collaboration toolkit for creating and maintaining a living `DESIGN.md` that defines both the design system and the design language (Google Stitch style, extended with awesome-design-md patterns). It combines:
- a structured authoring template,
- a shared designer/developer intake form,
- static-first local preview generation with configurable surfaces and reusable examples/templates,
- and Cursor skills for phase-based execution.

The project emphasizes portability and lifecycle roundtrip collaboration: designers, UX experts, and developers can all feed updates into shared artifacts, regenerate previews, and keep definitions current over time. Core guidance remains usable outside Cursor with neutral markdown, shell, and Node workflows, while Cursor skills provide an ergonomic acceleration layer.

## Problem It Solves

Teams doing LLM-assisted UI work often face spec drift, inconsistent prompting, disconnected design/UX/engineering decisions, and outdated design documentation. design-o-mat establishes:
- one canonical design spec format,
- a shared intake baseline before deep authoring,
- repeatable runbooks for validation and previewing,
- and a static, framework-agnostic preview model with optional Storybook bridge support.
- optional PM/Jira status snapshots on previews so design definitions and delivery state stay aligned.

## Target Users

- Design system authors
- Frontend engineers
- Coding/UI agents
- Maintainers porting the workflow to other repos
- Visual designers and PM/design-ops stakeholders
- UX experts feeding interaction/design-language decisions

## Core Capabilities (Documented as Present)

1. Shared Step 1 intake (`docs/design-definition-form.md`) for product, color, typography, layout, components, constraints, and sign-off.
2. Structured design-language narrative template (`docs/design-language.md`) for qualitative intent.
3. Stitch-aligned authoring model (`docs/template-DESIGN.md` -> Part IV `DESIGN.md`).
4. Separation of `DESIGN.md` into:
   - **Definition area** (design truth)
   - **Action area** (commands/runbooks)
5. Expanded preview model with config-driven surfaces:
   - `design-previews/preview-config.json` (global defaults + override rules)
   - `design-previews/component-preview_config.json` (component states/variants)
   - `design-previews/layout-preview_config.json` (section/full-page compositions)
6. Static preview dashboard and schema artifacts:
   - `preview-dashboard.html`
   - `preview-manifest.json`, `preview-links.json`, `preview-stats.json`
7. Smart-static schema contract: generation-time intelligence, static runtime (no backend required).
8. Optional Storybook bridge under `design-previews/storybook/` for component-preview teams that need Storybook; independent JSON path remains fully valid.
9. Repository conventions for skill naming/discovery and multi-assistant usability.

## Planned / Target Features (Not Yet Guaranteed Shipped)

- Moodboard skill and versioned moodboard previews.
- Change-request skill with traceable CR records and synchronized preview updates.
- Variation support with browser-side selector in light/dark previews.
- Color pairing rules insertion + preview surfacing.
- Optional MCP-backed PM status badges (e.g., Jira status beside components), when configured.
- Continued hardening of Storybook parity fixtures and optional bridge workflows.

## Functional Themes (PRD Contract)

- Maintain Stitch compatibility and corpus-aware section flexibility.
- Keep automation Node.js-only for first-party repo scripts.
- Preserve skill catalog governance and discoverability as skill count grows.
- Keep core artifacts assistant-agnostic; Cursor skills are ergonomic acceleration, not the only path.
- Ensure preview generation degrades gracefully for external integration failures.
- Preserve override precedence semantics across preview modes (independent and optional Storybook path).
- Keep preview artifacts static-first and backend-free at view time.

## Non-Goals

- Replacing design tools (Figma/Penpot) or app runtime theming systems.
- Shipping native integrations/extensions for every coding assistant.
- Hosting this as SaaS.

## Success Criteria (High Level)

- New contributors can produce a valid `DESIGN.md` using repo artifacts alone.
- Intake alignment occurs before deep authoring.
- Skills remain indexed and discoverable.
- Preview output reflects documented tokens and constraints.
- Design spec remains clear as "what to build" vs "what to run."
- Dashboard links resolve to generated outputs or explicit empty states.
- Override precedence is consistent (`global -> component -> preview/story`) across supported preview workflows.
- Preview artifacts open via `file://` (or static host) without backend services.

## Current Documentation State in `docs/`

- `prd.md`: full requirements and scope contract.
- `design-definition-form.md`: intake template and field mapping to Stitch/template.
- `design-language.md`: qualitative narrative companion for design intent.
- `template-DESIGN.md`: phased authoring template (Parts I–IV).

## Recommended Next Documentation Improvements

1. Add a compact implementation-status matrix (Shipped / Conditional / Planned) linked to FR IDs for preview-related areas.
2. Create `docs/skills-catalog.md` (if not already present) to prevent README drift as skills grow.
3. Add a short "release gates" cheat sheet in README (dashboard integrity, schema freshness, static portability, precedence parity).
