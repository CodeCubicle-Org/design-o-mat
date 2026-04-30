# PRD Validation Report (PM + UX)

- Date: 2026-04-30
- Reviewed file: `docs/prd.md`
- Reviewer mode: Product Management + UX quality validation
- Scope: ambiguities, conflicts, vague definitions, and testability gaps

## Executive assessment

Second-pass review against the current PRD (`v1.17`) shows major consistency improvements. The prior High-severity contradictions have been addressed. Remaining gaps are now mostly **governance clarity** (committed vs planned labeling), **testability detail**, and **operational definition depth** for implementation teams.

## Status of previous findings

### Resolved

1. **Optional previews vs mandatory dashboard conflict**  
   Resolved by combining:
   - `FR-7` (optional for repository check-in), and
   - `FR-33` (dashboard required with valid empty states).

2. **Skill-only lifecycle vs assistant-agnostic portability conflict**  
   Resolved via `FR-32`, which now allows documented workflows through skills **and/or** equivalent neutral script commands.

3. **Normative strength mismatch (`MUST` text with `Should` priority) in PM status requirements**  
   Resolved by changing `FR-20` and `FR-21` wording to `SHOULD`.

4. **Dashboard contract under-specification**  
   Largely resolved with filename guidance, minimum link expectations, and empty-state handling in `§5.8` and `§7.7`.

5. **Statistics source ambiguity**  
   Partially resolved by specifying changelog + manifest-style inputs in `§5.8`.

## Current findings (prioritized)

### 1) Medium — “Planned” labeling still overlaps with committed requirements in technical constraints

**What is happening**
- `§11` still marks several artifacts as “planned” (e.g., changelog artifacts, sample images tree, PM integration config) while corresponding requirements are already normative in FR/NFR.

**Why this matters**
- Product and engineering can read mixed commitment levels for the same feature set, which creates roadmap and acceptance ambiguity.

**Evidence**
- `§11 Technical constraints` lines with “(planned)” for artifacts already covered by committed requirements.

**Recommendation**
- Split `§11` into:
  - **Committed constraints**
  - **Future/optional constraints**
- Remove “planned” from anything with active MUST/SHOULD requirement rows unless it is explicitly “not yet shipped”.

---

### 2) Medium — Storybook bridge is well scoped, but testability criteria are still thin

**What is happening**
- `§5.10`, `FR-38`, and `FR-39` define optional Storybook bridge intent and mapping parity, but acceptance checks do not yet specify how parity is verified.

**Why this matters**
- Teams may claim parity while implementing incompatible override behavior.

**Evidence**
- `§5.10`
- `FR-38`, `FR-39`

**Recommendation**
- Add explicit acceptance checks (e.g., one fixture component where global/component/story overrides produce the same final values as independent config precedence).

---

### 3) Low — Artifact naming/path conventions are partly explicit but not fully normalized

**What is happening**
- Some artifacts are named as recommended (dashboard/schema files), while others remain suggestive or implementation-defined.

**Why this matters**
- In multi-repo adoption, loose naming can create integration drift and extra onboarding cost.

**Evidence**
- `§5.8` and `§5.9` use “recommended” names for several artifacts.

**Recommendation**
- Define a minimum “canonical names unless overridden by config” table in one place (likely `§11` + README).

---

### 4) Low — Success metrics could be more operational for release readiness

**What is happening**
- Metrics are strong narratively, but many lack explicit pass thresholds (binary or measurable ranges).

**Why this matters**
- Harder to use as release gates in CI/checklists.

**Evidence**
- `§10 Success metrics` has clear intent but mostly qualitative observations.

**Recommendation**
- Add optional measurable thresholds for top 3–5 release-critical metrics (for example dashboard link integrity, preview generation success, schema freshness checks).

## Suggested remediation order (updated)

1. Normalize `§11` commitment labels so they align with FR/NFR contract strength.
2. Add Storybook parity acceptance tests/checklist items (override precedence equivalence).
3. Consolidate canonical artifact naming/path rules.
4. Add measurable thresholds to a subset of success metrics for release gating.

## Validation outcome

- Overall status: **Strong and internally coherent for current scope.**
- Release recommendation: **Proceed**, with medium/low follow-ups treated as documentation-hardening and quality-gate improvements rather than blockers.
