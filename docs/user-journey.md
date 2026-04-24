# User Journey — Designers and Developers

This document describes how designers and developers collaborate in **design-o-mat** to keep `DESIGN.md`, previews, and implementation aligned.

## Designer journey

1. **Kickoff intent**
   - Define mood, brand direction, and non-negotiables.
   - Optionally provide a website link, screenshots, or mood references for AI-assisted extraction.

2. **Define the design system**
   - Fill the design definition in `DESIGN.md` (Definition area):
     - color roles
     - typography hierarchy
     - component states
     - layout and spacing rules
     - depth/elevation rules
     - responsive behavior
   - Add pairing rules (allowed/forbidden combinations).

3. **Attach visual evidence**
   - Add sample assets under `sample-images/<scope-id>/`.
   - Ensure sections/components include stable scope IDs in `DESIGN.md`.

4. **Generate and review previews**
   - Run preview generation.
   - Review light/dark output, variation selectors, rules panel, image thumbnail strips, and changelog visibility (collapsed by default).

5. **Request changes (if needed)**
   - Open or update a change request (e.g., `change-requests/CR-0001.md`) with scope and acceptance criteria.
   - For exploratory work, create or bump moodboard versions (e.g., `moodboards/<slug>/v2/`).

6. **Approve / sign off**
   - Confirm preview output matches design intent.
   - Optional: use PM mapping (e.g., Jira issue keys) so component status badges can be shown in generated previews.

## Developer journey

1. **Start from source of truth**
   - Read `DESIGN.md` first (tokens, states, responsive and guardrail rules).

2. **Implement in product code**
   - Build against semantic tokens and component definitions.
   - Respect contrast and forbidden-pairing rules.

3. **Validate against previews**
   - Compare implementation to generated preview output.
   - Check parity across light/dark and any declared variations.

4. **Close gaps via change requests**
   - If implementation reveals mismatches or opportunities, create/update a CR instead of introducing undocumented design drift.

5. **Ship with traceability**
   - Link PR/commit to CR and optional PM issue keys.
   - Ensure final implementation and preview output match `DESIGN.md`.

## Shared handoff checkpoints

1. **Definition complete** — Designer confirms `DESIGN.md` is complete enough to implement.
2. **Preview validated** — Designer and developer verify generated output reflects intended behavior.
3. **Implementation parity** — Developer confirms shipped UI matches spec and preview.
4. **History updated** — Changelog/CR records updated so changes are auditable.

## Definition of done for a change

A change is done when all are true:

- `DESIGN.md` updated (design truth)
- Preview regenerated and validated (visual truth)
- Implementation updated and verified (delivery truth)
- CR/changelog updated with traceability
