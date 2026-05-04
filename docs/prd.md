# Product Requirements Document — design-o-mat

| Field | Value |
|-------|-------|
| **Product** | design-o-mat |
| **Repository** | [CodeCubicle-Org/design-o-mat](https://github.com/CodeCubicle-Org/design-o-mat) |
| **Document version** | 1.27 |
| **Created** | 2026-04-17 |
| **Last modified** | 2026-05-04 |
| **Status** | Draft — living document |

---

## 1. Executive summary

**design-o-mat** is a project-level system for documenting both the **design system** and the broader **design language** in a living [Google Stitch `DESIGN.md`](https://stitch.withgoogle.com/docs/design-md/overview/) format (extended with patterns from [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md)). The product bundles a phased authoring template, optional HTML light/dark previews generated from documented tokens, and Cursor **project skills** so humans and agents can execute one workflow phase at a time with consistent quality. **Step 1 (shared intake)** is the markdown form **`docs/design-definition-form.md`**: designers, UX contributors, and developers fill predefined fields (product identity, **primary and accent color**, typography including **Title 1** font and size, layout tokens, component checklist, §7/§8 intent, engineering constraints) **before** deep work in `docs/template-DESIGN.md`. Teams **create and update** **`docs/design-guidelines.md`** to capture **designer-owned usage guidance**—how the system is **applied** in real product UI (patterns, flows, composition)—alongside the formal **definition** in `DESIGN.md` ([§5.1](#51-in-scope), [FR-45](#8-functional-requirements)). For **brownfield** products (UI already in code), **[§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation)** and **[§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)** specify **evidence-first** bootstrap, **refinement** against audits, and a **draft guidelines** file seeded from the repo for designers to finalize ([FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements)). **[§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)** defines how **developers** and **agents** implement **new** components using **canonical design token ids** while **optionally composing** packaged primitives (for example a **Dropdown** pattern from **[shadcn/ui](https://ui.shadcn.com/)**) that **should** be **restyled or wrapped** so the shipped UI matches **`DESIGN.md`**—not the upstream library’s defaults ([§7.11](#711-developer-new-component-token-native-third-party-primitive), [FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)). **[§5.14](#514-design-system-repository-versioning-and-consumer-pinning)** describes **versioning the design system through its own Git repository** (recommended) so **designers** and **developers** can **cut a reviewed release** (tag / changelog) that **consumer product repos pin** for **upcoming app releases** ([§7.12](#712-release-and-consume-a-versioned-design-system), [FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements)).

The goal is continuous **roundtrip collaboration**: each discipline can feed inputs back into the same artifacts, regenerate previews locally, and keep documentation, examples, and implementation intent synchronized through the entire product lifecycle. The **design-o-mat** toolset (shared intake, template, previews, and skills) is intended for **technical and non-technical** roles alike—**designers**, **product owners (PO)**, **product managers (PM)**, and **developers** / engineers—so the same artifacts support visual intent, prioritization, and implementation without assuming every contributor is comfortable editing `DESIGN.md` directly for every task. The project **prepares** a **GitHub template repository** so **non-technical** people can create a **new design-system repository** through GitHub’s **Use this template** flow (no manual clone-and-scaffold of folder layout as the only path). The same **spec, template, runbooks, and scripts** are intended to stay **usable across coding assistants and model vendors** (for example **GitHub Copilot**, **Claude Code**, **Cursor**, **Google Gemini**–based tools, **OpenAI Codex**, **Mistral Codestral**, and comparable products); Cursor skills are the **first-party** automation layer in this repository, not the only environment where the workflow applies.

This PRD defines what the project is for, who it serves, what is in scope, and how success is measured so contributors and consumers can align on expectations beyond the README alone.

The **Cursor skill set will grow** as features in this PRD land and new needs appear. **Naming, discovery, and documentation rules** for additional `design-md-*` (and related) skills are defined in [§5.0](#50-skill-catalog-and-extensibility) so the repo scales without ad hoc folders or undocumented agents.

For **this** repository’s `DESIGN.md`, the product treats the file as two main regions: a **Definition area** (what the system is—structured for AI and human readers) and an **Action area** (how to run checks, validation, generation, and maintenance via commands, code, and shell scripts). See [§6](#6-designmd-structure-definition-and-action-areas).

Planned work is organized under **§5** (**§5.0** governance, **§5.4–§5.14** features): **new Cursor skills** for moodboards, change requests, variations, and color pairing ([§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)); **preview change history** ([§5.5](#55-preview-change-history-embedded-and-standalone)); optional **PM status** via MCP ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)); **designer screenshot** attachments ([§5.7](#57-designer-screenshot-attachments-and-sample-images)); **component/layout preview surfaces** configured via dedicated JSON files ([§5.8](#58-expanded-preview-surfaces-component-and-layout-preview-configs)); a **framework-agnostic preview schema contract** that keeps previews smart while static ([§5.9](#59-framework-agnostic-smart-static-preview-schema-contract)); an **optional Storybook bridge** for teams that need Storybook-native component previews ([§5.10](#510-optional-storybook-bridge-for-component-previews)); a planned **codebase adherence audit** that **parses** configured source paths and **rates** implementation against **`DESIGN.md`** and **`docs/design-guidelines.md`** ([§5.11](#511-codebase-adherence-audit)); and **brownfield bootstrap** workflows that combine **repository + live UI evidence**, **spec refinement**, and **starter guideline generation** ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation)); plus **developer-facing** guidance for **token-named** implementations and **third-party primitive composition** ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)); and **Git-based versioning** when the **design system lives in its own repository**, with **explicit pins** into **consumer** product repos ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning)). Additional skills will follow [§5.0](#50-skill-catalog-and-extensibility). The bullets below summarize the preview-facing pillars.

**Preview change history** — Design-system preview HTML MUST include a **collapsible** (initially **collapsed**) **history of changes** block appended to each page, and MUST emit a **separate** changelog HTML file that reuses the **same** layout and tokens. See [§5.5](#55-preview-change-history-embedded-and-standalone).

**PM tool status on previews** — A **skill integration config file** (repo-level, documented) MAY declare **MCP** access to project-management tools (e.g. **Jira**). At **preview build time**, the workflow retrieves fields such as **issue status** (a **snapshot** baked into static HTML—not live polling unless a future release adds it) and **renders that status next to the component** on the catalog preview (e.g. **Button** with **Approved**). See [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews).

**Designer screenshot attachments** — Designer-supplied **screenshots** attach to **sections**, **components**, and finer **elements** via files under a **`sample-images`** (or configured) tree. Catalog previews show **up to three tiny thumbnails** under each matched block plus the **total image count**; a **skill** rescans that folder on **every** preview run so the UI stays in sync with disk. See [§5.7](#57-designer-screenshot-attachments-and-sample-images).

**Expanded preview surfaces** — Beyond simple design-system token catalogs, the product MUST support **component preview artifacts** driven by **`component-preview_config.json`** and **layout/page preview artifacts** driven by **`layout-preview_config.json`**. Skills MUST support **create** and **update** flows for both preview families. A static per-project **preview dashboard** links to every preview surface and MAY show static metrics/trends. See [§5.8](#58-expanded-preview-surfaces-component-and-layout-preview-configs).

**Smart static schema** — Preview intelligence (coverage, counts, trends, link validation, variant/state metadata) SHOULD be computed at generation time and exposed via a framework-agnostic JSON contract consumable by static HTML/JS pages, without requiring React or any backend. See [§5.9](#59-framework-agnostic-smart-static-preview-schema-contract).

**Optional Storybook bridge** — Teams MAY generate component previews through Storybook using mapping files under `design-previews/storybook/`. This integration is optional; independent config-driven previews remain fully supported without Storybook. See [§5.10](#510-optional-storybook-bridge-for-component-previews).

**Codebase adherence audit** — Planned tooling **actively parses** a **specified** portion of the product codebase (declared roots, globs, or include/exclude lists) and **validates** plus **rates** how well that code **adheres** to the **design system** in **`DESIGN.md`** and to **usage** rules in **`docs/design-guidelines.md`** when that file is present. See [§5.11](#511-codebase-adherence-audit).

**Brownfield design-system bootstrap** — Teams with a **mature or legacy UI codebase** need a **documented path** to stand up **`DESIGN.md`** from **evidence** (live UI, repo-held tokens, component entry points), **iterate** the spec against reality, and **bootstrap** a first **`docs/design-guidelines.md`** from structured gaps and patterns—without treating auto-generated prose as normative truth. See [§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation).

**Token-native components + third-party primitives** — When adding **new** UI, developers and coding agents **name and apply project tokens** intentionally and may adopt **battle-tested primitives** (for example **[shadcn/ui](https://ui.shadcn.com/)** + **Radix UI** behavior under a Dropdown) provided the **implementation is merged with this repo’s design system** (colors, typography, spacing, elevation, interaction states per `DESIGN.md`). See [§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition).

**Git-versioned design-system repository** — Teams align **shipping product releases** with a **released design-system revision** hosted in **its own Git repo** (**tags**, **SemVer**, **immutable commit SHA** pinned from apps). **design-o-mat** documents the **workflow**—not hosted Git—for **finalize → tag → bump pin** coordination. See [§5.14](#514-design-system-repository-versioning-and-consumer-pinning).

---

## 2. Vision and goals

### 2.1 Vision

Make it practical for any team to maintain a **portable, agent-readable design definition** (`DESIGN.md`) that captures both **design-system rules** and **design-language intent**, stays aligned with Stitch semantics and corpus reality (including known §7/§8 variants), and remains continuously testable through local previews/templates—without requiring a proprietary design tool—while remaining **actionable** whether the team’s coding assistant is **Copilot, Claude Code, Cursor, Gemini-based tooling, Codex, Codestral**, or another LLM-backed editor integration.

### 2.2 Primary goals

1. **Reduce design drift** — One canonical markdown source for design-system and design-language decisions; clear separation between authoring notes (Parts I–III in the template) and the shipped Part IV body.
2. **Improve agent outcomes** — Skills with explicit triggers; section 9 (Agent Prompt Guide) for few-shot UI generation and iteration.
3. **Support evidence-based authoring** — Phases for scope lock, live capture, normalization, validation, preview generation, and ship.
4. **Stay format-compatible** — Document and tooling respect Stitch numbering and awesome-design-md extensions, including documented corpus exceptions for sections 7 and 8.
5. **Unify spec and operations in one file** — Keep declarative design content (Definition) and invocable runbooks (Action) in `DESIGN.md`, with boundaries clear enough that agents parse intent without executing prose by mistake.
6. **Treat skills as the product CLI** — Designers and developers invoke **skills and the preview pipeline**—existing `design-md-*` phases plus planned **[§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)–[§5.7](#57-designer-screenshot-attachments-and-sample-images)** work (moodboards, change requests, variations, pairing rules, **changelog**, optional **PM status**, **`sample-images`** thumbnails), and **additional `design-md-*` skills** described under **[§5.8](#58-expanded-preview-surfaces-component-and-layout-preview-configs)–[§5.14](#514-design-system-repository-versioning-and-consumer-pinning)** (expanded previews, Storybook bridge, adherence audit, brownfield bootstrap, token-native composition, versioning)—as scoped commands, with artifacts versioned and previewable in the browser where applicable.
7. **Changelog without clutter** — Preview surfaces carry an auditable **change history** that stays **collapsed by default** and is also available as a **dedicated HTML page** for sharing or printing.
8. **Design ↔ delivery alignment** — Optional **MCP-backed** links from `DESIGN.md` components to PM issues (Jira, etc.) surface **issue status as of preview generation** (**snapshot** in static HTML) next to the spec; **live** in-browser refresh remains out of scope until explicitly shipped ([§5.3](#53-future-considerations-backlog-signals-not-committed)).
9. **Evidence next to spec** — Designer **screenshots** attach to the right **section / component / element** and appear as a compact **thumbnail strip** on previews, refreshed from the **`sample-images`** folder whenever previews regenerate.
10. **Extensible skills surface** — New capabilities ship as **additional project skills** under documented conventions ([§5.0](#50-skill-catalog-and-extensibility)); the README (or **skills catalog** doc) and this PRD stay aligned so humans and agents always know what exists and when to use it.
11. **Multi-assistant authoring** — Core artifacts (`DESIGN.md`, `docs/template-DESIGN.md`, `AGENTS.md`, preview pipeline, Action-area runbooks) SHOULD **not** assume a single vendor; documentation SHOULD make phase intent clear enough to follow with **GitHub Copilot**, **Claude Code**, **Cursor**, **Gemini**-class assistants, **OpenAI Codex**, **Mistral Codestral**, and similar tools ([FR-26](#8-functional-requirements)).
12. **Designer–developer intake** — A single **Step 1** form (`docs/design-definition-form.md`) captures agreed tokens and type basics so both roles start from the same facts before Parts I–III and `DESIGN.md` drafting ([FR-27](#8-functional-requirements), [§7.0](#70-shared-intake-designdefinitionformmd)).
13. **Lifecycle roundtrip** — Designers, UX experts, and developers can iterate in all directions (brief -> spec -> preview -> implementation feedback -> updated spec) without resetting process artifacts each cycle.
14. **Usage guidelines alongside definition** — Designers **create and update** **`docs/design-guidelines.md`** so **application-level** guidance (patterns, flows, how components combine in real screens) stays current with the **definition** in `DESIGN.md` ([FR-45](#8-functional-requirements)).
15. **Implementation conformance signal** — Teams can run a **codebase adherence audit** over a **configured scope** of source files to **validate** and **score** alignment with **`DESIGN.md`** and **`docs/design-guidelines.md`**, making drift visible before release ([§5.11](#511-codebase-adherence-audit), [FR-46](#8-functional-requirements)).
16. **Brownfield bootstrap and refinement** — Teams with **existing product UI** can follow a **first-class journey** ([§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)) supported by **documented** (and, where shipped, **automated**) steps: evidence from **URL + repository**, **draft** `DESIGN.md` alignment, **repeatable refinement** against audits, and a **starter** **`docs/design-guidelines.md`** produced from **codebase + gap signals** for designers to **own and rewrite** ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements)).
17. **Token-aligned implementation from primitives** — **Developers** and **agents** can implement **new** components by **mapping `DESIGN.md` token ids** into code and **composing documented third-party primitives** (example: **shadcn/ui** Dropdown) **without** shipping the upstream library look-and-feel; **§9** and repo guidance equip AI to prefer **spec tokens + guidelines** over generic library defaults ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)).
18. **Versioned design-system releases** — Teams can maintain the **canonical** `DESIGN.md` / guidelines / previews in a **dedicated Git repository**, **release** audited versions (**tags**, semver policy, changelog), and **pin** those revisions from **consumer** application repos so each **product release** adopts an **explicit, agreed design-system baseline** ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [§7.12](#712-release-and-consume-a-versioned-design-system), [FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements)).

### 2.3 Non-goals

- Replacing Figma, Penpot, or component libraries in code.
- Owning runtime theming or build pipelines for consuming applications (beyond documenting tokens and generating static HTML previews).
- Mandating a single interpretation of §7/§8 where the corpus intentionally varies (the product must document and allow variants).
- **Vendor-locking** consumers to a specific **primitive UI kit** (**shadcn/ui** is an **example** in docs only; teams pick their own adapters) ([NFR-18](#9-non-functional-requirements)).
- Operating **Git hosting**, **artifact registries**, or **package publish infrastructure** as a hosted service (**documented** workflows and **pinning patterns** only) ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning)).

---

## 3. Problem statement

Teams want LLM-assisted UI work to be **repeatable**, **on-brand**, and shared across design, UX, and engineering, but ad-hoc prompts and scattered notes produce inconsistent components, wrong contrast, missing states, and unclear design-language intent. A formal `DESIGN.md` alone does not always answer **how** the system should be **used** on specific flows; **`docs/design-guidelines.md`** gives **designers** a dedicated place to **author and revise** that usage layer beside the spec ([§5.1](#51-in-scope), [FR-45](#8-functional-requirements)). **Design and engineering** often diverge before a spec exists: a **shared intake form** (`docs/design-definition-form.md`) establishes a common baseline (colors, Title 1 / body type, layout, component scope) **first**. **Product apps** often need to **freeze** which **design-system revision** they build against across a **release train**—especially when **`DESIGN.md`** lives beside feature work and drifts casually. Hosting the **design system in its own Git repository** with **immutable tags or SHAs** that **consumer repos pin** (**submodule**, **package version**, **`npm`/Git dependency**, or **vendored copy with recorded ref**) lets **design** and **engineering** jointly **finalize** “**use v2.3 for Q3 releases**” before implementation catches up ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning)). **Brownfield** products already ship UI in code: teams still need the **same** Stitch-aligned spec and usage layer, but the **starting point** is **reverse evidence** (what the app does today) and **iterative convergence** between **`DESIGN.md`**, **`docs/design-guidelines.md`**, and refactors—not only a blank-slate greenfield arc ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)). A Stitch-aligned `DESIGN.md` addresses the full system, yet authors need **guidance**, **checklists**, and **optional automation** (previews, examples, and status snapshots) so the definition stays complete, validated, and continuously up to date. design-o-mat packages that workflow into copyable artifacts and agent skills.

---

## 4. Target users and personas

The product is aimed at **technical and non-technical** contributors across the delivery org: **designers** anchor look-and-feel and evidence; **PO** and **PM** staff align scope, acceptance, and tracker status with what the spec and previews show; **engineers** and **agents** apply structured edits, scripts, and validation. Personas below spell out role-specific needs on top of that shared baseline.

| Persona | Needs |
|---------|--------|
| **Design system author** | **`docs/design-definition-form.md` (Step 1)** with design-led fields; then structured questionnaire, inventory (U1–U16), clear phases, validation checklist. **Creates and updates** **`docs/design-guidelines.md`** for product-specific **usage** patterns that complement `DESIGN.md` ([FR-45](#8-functional-requirements)). For **brownfield** work, leads **refinement** of auto-drafted spec sections and **rewrites** machine-seeded guideline drafts into **designer-owned** guidance ([§7.10](#710-brownfield-existing-codebase-design-system-bootstrap), [FR-48](#8-functional-requirements)). |
| **Frontend engineer** | Same **Step 1** form for stack and token constraints; token tables, component states, layout and elevation rules in `DESIGN.md`; optional HTML previews for quick visual QA. Reads **`docs/design-guidelines.md`** when present for **how** to apply the system to real screens ([FR-45](#8-functional-requirements)). Runs or interprets **codebase adherence audit** output over owned paths to close gaps vs spec and guidelines ([§5.11](#511-codebase-adherence-audit), [FR-46](#8-functional-requirements)). On **brownfield** programs, contributes **repo-side evidence** (token files, global styles, component roots) and helps wire **scope config** for audits and bootstrap outputs ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)). When adding **new** UI, follows **[§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)**: implements with **canonical token names**, and when using **libraries such as shadcn/ui**, **applies** project tokens and patterns so components match **`DESIGN.md`** ([§7.11](#711-developer-new-component-token-native-third-party-primitive), [FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)). |
| **Coding agent (any LLM-backed assistant)** | `AGENTS.md` pointer to `DESIGN.md`; phased workflow and Action-area commands; in Cursor, **project skills** for scoped tasks (normalize tokens, validate, generate previews). When **`docs/design-guidelines.md`** exists and is linked from README or `AGENTS.md`, **SHOULD** treat it as **designer-authored usage** input alongside the Definition. For **new** components, **SHOULD** use **`DESIGN.md`** token/component vocabulary when generating styles and **SHOULD NOT** paste **unmodified** generic **shadcn/ui** (or similar) visuals when the **Definition** dictates different colors, radii, or type—**surface** mismatches for human review per [FR-53](#8-functional-requirements); **`§9`** examples and **[§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)** spell out the **compose-then-theme** pattern ([FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)). Same spec and runbooks apply when using **Copilot**, **Claude Code**, **Gemini**-based tools, **Codex**, **Codestral**, etc., with tool-native invocation left to the author or future packaged exports ([§5.1](#51-in-scope), [FR-26](#8-functional-requirements)). |
| **Design / UI agent** | Single source of truth for look-and-feel; section 9 prompts for iteration. |
| **Maintainer of another repo** | Ability to copy `.cursor/skills/design-md-*`, `docs/template-DESIGN.md`, and the preview script into another project; **predictable skill names** and a **single catalog** of skills (see [§5.0](#50-skill-catalog-and-extensibility)) reduce fork drift. Alternatively, start from the published **GitHub template repository** ([§5.1](#51-in-scope), [FR-44](#8-functional-requirements)). When using a **standalone design-system repository**, **pins** (**tag**, **SHA**, **package semver**) gate which spec **agents** read in **consumer** repos ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements)). |
| **Non-technical repo creator** | Create a new design-system workspace via GitHub **Use this template** on the prepared template repo; follow README **first steps** (e.g. Step 1 intake, optional preview generation with help from a technical teammate or agent) without assembling the repo tree by hand. |
| **Customer / stakeholder** | Change requests captured and traceable; visible outcomes in previews without editing `DESIGN.md` by hand. |
| **Visual designer** | Co-own **`docs/design-definition-form.md`** (colors, type, mood); moodboards and multi-variation previews for exploration; pairing rules visible so unsafe combinations are avoided early; drop screenshots into **`sample-images`** and see them under the right component on the next preview run. **Maintains** **`docs/design-guidelines.md`** so implementation reflects **intended usage**, not only tokens ([FR-45](#8-functional-requirements)). |
| **Design ops / PM** | Jira (or similar) **status** on preview pages next to components (**snapshot** at preview generation); config-driven MCP without hard-coding vendor logic in `DESIGN.md` prose. MAY use **adherence scores** from [§5.11](#511-codebase-adherence-audit) in reviews or release readouts when the audit ships ([FR-46](#8-functional-requirements)). Tracks **design-system release** (**tag**/version) slated for **upcoming product milestones** alongside feature scope ([§7.12](#712-release-and-consume-a-versioned-design-system)). |

---

## 5. Product scope

### 5.0 Skill catalog and extensibility

The product intentionally treats **Cursor project skills** as the primary **extensible control plane** for **Cursor**: each new PRD feature (or sub-workflow) MAY ship as its own skill folder rather than overloading a single mega-skill. The repository MUST stay navigable as the count grows. **Skill instructions** SHOULD remain readable as **plain procedural markdown** so other assistants can reuse the same steps where the host has no skill equivalent ([FR-26](#8-functional-requirements)).

| Topic | Requirement |
|-------|-------------|
| **Naming** | New first-party skills MUST use the **`design-md-`** prefix and **kebab-case** slugs (e.g. `design-md-moodboard`, `design-md-sample-images`) unless a documented exception applies (e.g. integration-only tools under a second prefix agreed in `docs/`). |
| **Structure** | Each skill remains a **folder** under `.cursor/skills/<skill-name>/` with **`SKILL.md`** and YAML front matter including a **`description`** that states when the agent should apply it ([FR-3](#8-functional-requirements)). |
| **Discovery** | Every **shipped** skill MUST appear in the **authoritative index** described in [FR-5](#8-functional-requirements) (README table and/or `docs/skills-catalog.md`). Optional grouping by **theme** (authoring, previews, integrations, assets) is encouraged as the list grows. |
| **PRD traceability** | When a **new** skill is introduced or a skill gains materially new behavior, maintainers SHOULD add or update a **§5** subsection (or a row in a future consolidated skills table) and, when relevant, **FR/NFR** rows so this document remains the contract for *what* skills are for—not only `SKILL.md` prose. |
| **Deprecation** | If a skill is **superseded**, its `SKILL.md` SHOULD point to the replacement; the catalog index MUST mark **deprecated** skills until removal per a documented grace period. |
| **Consumer repos** | Teams that copy skills into other workspaces SHOULD copy the **catalog snippet** or `docs/skills-catalog.md` together with `.cursor/skills/` so downstream agents see the full set. |

### 5.1 In scope

| Area | Specification |
|------|----------------|
| **Skill catalog governance** | [§5.0](#50-skill-catalog-and-extensibility) applies to **all** present and future `design-md-*` skills; new skills are expected as the PRD expands. |
| **Design definition form** | **`docs/design-definition-form.md`** in the **`docs/`** folder: shared **Step 1** markdown form for designers and developers (ownership, color roles including primary/accent, **Title 1** and body typography, layout/radius/shadow, component checklist, §7/§8 intent, engineering constraints, sign-off). Teams copy it into their project and fill before or alongside Part I–II ([FR-27](#8-functional-requirements), [§7.0](#70-shared-intake-designdefinitionformmd)). |
| **Authoring template** | `docs/template-DESIGN.md`: Parts I–III workflow, Part IV body structure, phases 0–7, alignment notes with awesome-design-md corpus. |
| **Reference analysis** | Documentation such as `awesome-design-md-corpus-analysis.md` explaining real-world §7/§8 patterns. |
| **Preview generation** | `scripts/generate-design-previews.mjs` (**Node.js v24+**): parse hex tokens from `DESIGN.md`, emit `preview.html` / `preview-dark.html`, versioned `preview-vN` when files exist; embed and link **preview change history** per [§5.5](#55-preview-change-history-embedded-and-standalone); optional **PM status badges** per [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews); optional **designer screenshot thumbnail strips** per [§5.7](#57-designer-screenshot-attachments-and-sample-images); and additional component/layout preview artifacts per [§5.8](#58-expanded-preview-surfaces-component-and-layout-preview-configs). |
| **Cursor project skills** | Under `.cursor/skills/`: scope lock, capture tokens, normalize tokens, draft body, agent prompt guide, validate spec, generate previews, ship, stitch format reference; plus planned skills in [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules) and **sample-images** / screenshot attachment workflow in [§5.7](#57-designer-screenshot-attachments-and-sample-images). |
| **Agent onboarding** | `AGENTS.md` and README tables describing when to use which skill and typical **greenfield**, **brownfield** ([§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)), and **small-edit** flows. |
| **`DESIGN.md` layout** | Two-region model: **Definition area** (Stitch-aligned sections 1–9 and narrative spec) and **Action area** (commands, scripts, and procedural steps for check / validate / create / update / delete and similar operations). |
| **Licensing** | MIT per `LICENSE`. |
| **Multi-assistant / multi-LLM usability** | Shipped **Definition** and **Action** content, `docs/template-DESIGN.md`, `AGENTS.md`, README guidance, and **Node preview scripts** MUST be **usable** when the author’s coding environment is not Cursor—e.g. **GitHub Copilot**, **Claude Code**, **Google Gemini**–backed assistants, **OpenAI Codex**, **Mistral Codestral**, or other comparable tools. **Cursor** `.cursor/skills/` remain the **canonical** packaged automation for Cursor; cross-tool parity is met by **portable markdown and scripts** plus documented phase mapping ([FR-26](#8-functional-requirements)), not by mandating identical native integrations in every host ([§5.2](#52-out-of-scope-current-product-boundary)). |
| **GitHub template repository** | Maintain a **template-enabled** repository on **GitHub** (org and repo name fixed when published) that mirrors the starter layout teams need for a new design-system project—**`docs/design-definition-form.md`**, **`docs/template-DESIGN.md`**, optional starter **`docs/design-guidelines.md`**, `AGENTS.md`, preview script and `package.json`, `.cursor/skills/design-md-*` as applicable—so **non-technical** and technical users can click **Use this template** to create a new repository without manually copying files from [CodeCubicle-Org/design-o-mat](https://github.com/CodeCubicle-Org/design-o-mat). The template repo’s README **SHOULD** explain the GitHub UI path and **first steps** after create (rename product, complete Step 1, optional Node install for previews). **Sync policy** (how often the template tracks the canonical repo) **SHOULD** be documented for maintainers ([FR-44](#8-functional-requirements)). |
| **Design usage guidelines** | **`docs/design-guidelines.md`**: a **designer-maintained** markdown companion where teams **create and update** guidance for the **actual usage** of the design system in product UI—patterns, flows, page types, and context-specific component choices—without duplicating normative token and component **Definition** that belongs in `DESIGN.md`. README **or** `AGENTS.md` **SHOULD** mention the file when present so agents and engineers consult **definition + usage** together ([FR-45](#8-functional-requirements)). |
| **Codebase adherence audit** | Planned capability under [§5.11](#511-codebase-adherence-audit): **parse** a **specified** codebase region, **validate** against **`DESIGN.md`** and **`docs/design-guidelines.md`**, and emit a **rating** / scored report ([FR-46](#8-functional-requirements)). |
| **Brownfield bootstrap and guidelines** | Documented and (when shipped) **tool-assisted** path under [§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation) and [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap): combine **URL capture** with **repo token/component inventory**, **normalize** legacy naming into `DESIGN.md`, **refine** the Definition through validation and adherence feedback, and emit a **draft** **`docs/design-guidelines.md`** scaffold for **human curation** ([FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements)). |
| **Token-native & third-party primitive composition** | Documented pattern under [§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition) and [§7.11](#711-developer-new-component-token-native-third-party-primitive): **new** components **reference `DESIGN.md` token ids** in code; optional **UI primitive libraries** (e.g. **[shadcn/ui](https://ui.shadcn.com/)**) supply **behavior/structure** while **project tokens and guidelines govern appearance** ([FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)). |
| **Design-system repo versioning & consumer pins** | Documented patterns under [§5.14](#514-design-system-repository-versioning-and-consumer-pinning) and [§7.12](#712-release-and-consume-a-versioned-design-system): **recommended** **`DESIGN.md` + artifacts in a dedicated Git repository** with **semver tags** or equivalent; **consumer** apps record **immutable refs** (**SHA**, submodule commit, npm/git dependency version) aligned to **shipping releases** ([FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)). |

### 5.2 Out of scope (current product boundary)

- Hosted SaaS or account-based services.
- Shipping **native IDE or host extensions** for every coding assistant (Copilot, Claude Code, Gemini, Codex, Codestral, etc.); first-party repo integration remains **Cursor skill markdown** under `.cursor/skills/`. **Multi-assistant usability** of the **spec and runbooks** is [in scope](#51-in-scope) ([FR-26](#8-functional-requirements)).
- Automatic scraping or CI that runs against arbitrary URLs without user invocation (skills may guide manual capture).

### 5.3 Future considerations (backlog signals, not committed)

- Additional preview surfaces beyond the committed families in [§5.8](#58-expanded-preview-surfaces-component-and-layout-preview-configs) (e.g. animation timeline demos).
- CLI packaging (`npx design-o-mat`) if distribution friction becomes a recurring request.
- Optional JSON or CSS-variables export from `DESIGN.md` for codegen pipelines.
- Deeper integration (CI gates) that fail builds when preview HTML violates documented pairing rules from §2/§7.
- Live in-browser refresh of Jira status without regenerating HTML (polling or OAuth in static pages).
- Full-screen **lightbox** or zoom for attachment images beyond the three-thumbnail strip.
- **Auto-generated** skill index (e.g. script that lists `.cursor/skills/` + `description` excerpts) to reduce manual README drift.
- **Optional packaged exports** of phase workflows into host-specific formats (e.g. Copilot instructions, Claude Code slash-doc bundles, rules files) if demand consolidates—without duplicating the semantic source of truth outside `DESIGN.md` / template.

### 5.4 Planned Cursor skills (moodboards, change requests, variations, combination rules)

*This subsection spells out **§5.4.1–§5.4.4** only (skill-first moodboard, change-request, variation, and color-rules work). Other planned capabilities—previews, Storybook, adherence, brownfield, primitives, versioning (**§5.8–§5.14**)—are specified later; see the intro paragraph immediately below.*

The following capabilities are **planned** to ship as **new Cursor project skills** (each as a folder under `.cursor/skills/` with `SKILL.md` and YAML `description`), consistent with [FR-3](#8-functional-requirements) and [§5.0](#50-skill-catalog-and-extensibility). Slug names are **suggested** until implementation; README and `AGENTS.md` MUST be updated when each skill ships ([FR-5](#8-functional-requirements)). This subsection is **target architecture**, not a commitment that all skills exist on a given calendar date. **Additional skills** beyond **§5.4.1–§5.4.4** (moodboards, change requests, variations, color rules) and other capabilities under **§5.8–§5.14** (previews, adherence, brownfield, primitives, versioning) are expected over time; they follow the same [§5.0](#50-skill-catalog-and-extensibility) rules.

#### 5.4.1 Moodboards (`design-md-moodboard` — suggested slug)

| Topic | Requirement |
|-------|-------------|
| **Purpose** | **Create** and **update** moodboards as first-class artifacts for exploration and alignment before or alongside `DESIGN.md` hardening. |
| **Storage** | Each moodboard lives in its **own folder** (e.g. `moodboards/<slug>/`), never mixed ad hoc at repo root. |
| **Versioning** | Each logical moodboard MUST support **discrete versions** (e.g. `moodboards/<slug>/v1/`, `v2/`, or semver folders) so past directions remain findable and diffable; the skill documents the canonical convention. |
| **Preview** | Every moodboard version MUST ship a **browser-ready preview page** (static HTML, or a small static bundle) with a documented path so designers can open it locally without a build server where possible. |
| **Skill behavior** | Skill instructs agents to scaffold or patch assets, bump version folders when scope changes materially, and keep an index (optional `moodboards/README.md`) listing slugs and latest version. |

#### 5.4.2 Change requests (`design-md-change-request` — suggested slug)

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Record and apply **change requests** from **customers** or **designers** against the current design system. |
| **Targets** | Applied changes MUST update the **`DESIGN.md` Definition** (tokens, components, rules, prompts as relevant) and MUST propagate to **both** generated preview surfaces: **light** (`preview.html` or versioned equivalent) and **dark** (`preview-dark.html` or versioned equivalent). |
| **Traceability** | Each CR SHOULD have a stable id or filename (e.g. `change-requests/CR-0007.md` or dated slug) and SHOULD reference the moodboard or variation it came from when applicable. |
| **Skill behavior** | Skill walks intake (summary, scope, acceptance), edits `DESIGN.md`, then runs or documents regeneration steps for previews so bright/dark stay in sync. |

#### 5.4.3 Design variations (`design-md-variations` — suggested slug)

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Maintain **displayable, versioned variations** of the design system (e.g. three **accent-color** candidates) without overwriting the canonical spec silently. |
| **Versioning** | Variations MUST be versioned in a predictable layout (e.g. `variations/v2/accent-a`, `accent-b`) or encoded in `DESIGN.md` with explicit variation ids; the skill picks one convention and documents it. |
| **Preview UX** | Design-system preview pages MUST offer a **selector** (tabs, dropdown, or toggle) to switch between variations in **both** light and dark previews so stakeholders can compare in the browser. |
| **Skill behavior** | Skill creates/updates variation token sets, wires preview generation to emit multi-variation HTML (or linked pages), and aligns §2/§9 prose if prompts must mention variation ids. |

#### 5.4.4 Color combination and pairing rules (`design-md-color-rules` — suggested slug, or merged into normalize/validate)

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Encode **which colors may be combined** (foreground/background/accent) and **which combinations are forbidden** (e.g. black text on a near-black surface), including accessibility-motivated guardrails. |
| **`DESIGN.md` content** | If this block is **missing**, the skill MUST **add** a normative subsection to the Definition (recommended placement: **§2 Color** companion table, or **§7** guardrails when §7 is Do’s/Don’ts; document choice in `docs/template-DESIGN.md` when standardized). Structure MUST be machine-friendly (tables: allowed pairs, forbidden pairs, minimum contrast notes). |
| **Preview** | Preview pages MUST **surface** these rules (dedicated panel, callouts, or inline swatch matrix) so designers see constraints alongside components. |
| **Skill behavior** | Skill audits `DESIGN.md`, inserts or refines the rules block, and ensures preview generator reads and renders it (or documents manual steps until the script supports it). |

### 5.5 Preview change history (embedded and standalone)

Stakeholders need to see **what changed** in the design system and previews over time without scrolling through long static catalogs. The preview pipeline SHALL satisfy all of the following.

| Topic | Requirement |
|-------|-------------|
| **Embedded block** | Each **design-system** preview page (`preview.html`, `preview-dark.html`, and any versioned `preview-vN` / `preview-dark-vN` pair emitted by the generator) MUST **append** a **History of changes** section **after** the main preview content (e.g. end of `<body>`), reusing the **same** typography, spacing, and surface colors as that page so it reads as one cohesive design—not a third-party widget skin. |
| **Collapsible + default state** | The embedded history MUST be **collapsible** (e.g. HTML `<details>` / `<summary>`, or an accessible disclosure control with equivalent keyboard and screen-reader behavior). It MUST be **collapsed when the page first loads** (no `open` attribute on `<details>`; if script-driven, initial state collapsed). |
| **Standalone page** | The generator MUST emit at least one **separate** HTML file dedicated to the full changelog (suggested names: `preview-changelog.html` for light, `preview-changelog-dark.html` for dark—exact filenames documented in README / script `--help`). That page MUST use the **same** visual design system (shared CSS variables, fonts, and layout primitives) as the catalog previews so switching between “catalog” and “history-only” feels consistent. |
| **Cross-linking** | Embedded collapsed region SHOULD include a short summary line (e.g. latest entry date + count) and a **link** to the standalone changelog page for deep reading; the standalone page SHOULD link back to `preview.html` / `preview-dark.html` as appropriate. |
| **Data source** | Changelog entries MUST be read from a **documented, machine-friendly** source (e.g. `docs/preview-changelog.md` with a strict heading convention, JSON/YAML alongside `DESIGN.md`, or a dedicated subsection of the `DESIGN.md` **Action area**). The generator MUST document how to add entries; skills that apply CRs SHOULD append or instruct append to that source when previews regenerate. |
| **Moodboards** | Moodboard preview HTML SHOULD follow the same **collapsible / collapsed-by-default** pattern when a moodboard ships its own history file; if a moodboard has no changelog source, the block MAY be omitted or show a single-line “No recorded history yet.” |

### 5.6 Skill config and MCP project-management status on previews

Teams track design-system work in **issue trackers** (e.g. **Jira**). The product SHOULD connect those systems to **preview HTML** via a **declarative skill integration config** and **MCP** (Model Context Protocol) so agents or tooling can fetch remote fields without pasting secrets into `DESIGN.md`.

| Topic | Requirement |
|-------|-------------|
| **Skill config file** | Teams that enable PM status on previews MUST use a **single, documented config file** (suggested path: `docs/design-o-mat-pm.config.yaml` or `.cursor/design-o-mat-pm.config.yaml`—exact path chosen at implementation) that declares: which **MCP server identifiers** correspond to which PM tool (e.g. Jira), which **issue fields** to read (at minimum **status**), optional **project / issue type** filters, and display labels for the preview UI. The file MUST NOT contain long-lived **passwords or API tokens**; credentials remain in the user’s **Cursor MCP configuration** or environment as per [NFR-8](#9-non-functional-requirements). |
| **MCP access** | The config references MCP servers the user has already enabled (e.g. Atlassian/Jira MCP). **Skills** (or the preview generator runbook in the **Action area**) describe **when** to call MCP tools to resolve keys and fields. Implementation MAY be “agent-only” (human runs generate-previews after an agent step that writes a small `preview-pm-status.json` snapshot) or “scripted” if a headless MCP client exists—either way the PRD requires the **outcome**: statuses on previews. |
| **Element ↔ issue mapping** | `DESIGN.md` (typically **§4 Component stylings**) MUST support an optional, machine-readable **link** from a named design element (e.g. **Button**, **Card**) to a **Jira issue key** or URL (table column, YAML front-matter block, or fenced metadata convention—standardized in `docs/template-DESIGN.md` when shipped). Unmapped components simply omit a badge. |
| **Status retrieval** | For each mapped element, the workflow MUST retrieve the configured **status** field from the PM tool (e.g. **Approved**, **In progress**) at **preview build time**, producing a **snapshot** suitable for static HTML. |
| **Preview rendering** | Catalog previews (`preview.html` / `preview-dark.html` and versioned pairs) MUST render the status **adjacent to** the corresponding component section (e.g. subtitle, pill, or table column: `Button` — badge **Approved**), using the same typography and color tokens as the rest of the page so it does not read as an alien widget. |
| **Failure modes** | If MCP is unavailable, auth fails, or an issue key is invalid, the preview MUST **degrade gracefully** (e.g. badge `—`, `Unknown`, or last cached value with a subtle “stale” hint) and MUST NOT break generation of the rest of the catalog. |
| **Other PM tools** | The same pattern SHOULD generalize beyond Jira (e.g. **Linear**, **Azure DevOps**) via additional MCP servers and config entries, without changing the `DESIGN.md` mapping shape more than necessary. |
| **Git commit tracking (optional)** | Similar to issue-status linkage, teams MAY map elements/components to **git commit references** (SHA, short SHA, or commit URL) and render a commit badge/link in previews. The workflow SHOULD support local git metadata and hosted providers, including **GitHub commit URLs**. If commit metadata cannot be resolved, preview generation MUST still succeed with a defined fallback. |

### 5.7 Designer screenshot attachments and sample images

Designers produce **reference screenshots** (Figma exports, product captures, annotations). These MUST be attachable to **Stitch sections** (e.g. §2 Color), **§4 components** (e.g. Button), and **sub-elements** where the spec names a distinct block (e.g. Button / **destructive** variant row). Previews MUST surface them without manual HTML editing.

| Topic | Requirement |
|-------|-------------|
| **Storage folder** | Image files live under a repo-root (or `--out`-adjacent) tree named **`sample-images/`** by default. Teams MAY configure **`sample-image/`** (singular) or another path in preview config / skill docs, but one canonical layout MUST be documented in README. Subfolders MUST map predictably to scope ids (e.g. `sample-images/s4-button/`, `sample-images/s2-palette/`, `sample-images/s4-button-destructive/`—exact naming convention fixed at implementation and mirrored in `docs/template-DESIGN.md`). |
| **Formats** | At minimum **PNG** and **JPEG**; **WebP** and **GIF** SHOULD be accepted where the generator or browser support allows. |
| **`DESIGN.md` binding** | The Definition SHOULD declare, per section or component (or element), a **stable scope id** that matches the subfolder name or a table column (e.g. `Sample images scope: s4-button`) so agents and the preview script resolve attachments deterministically. |
| **Preview placement** | For each scope that has one or more image files, the catalog preview MUST render a **compact attachment strip immediately below** the corresponding section/component/element block (after the live demo or description for that block). |
| **Thumbnail strip UX** | The strip MUST show **at most three** images as **small thumbnails** (tiny preview: fixed max height/width, `object-fit` crop, clear alt text from filename or manifest). It MUST also show the **total count** of image files in that scope’s folder (e.g. “**3** of **12** images” or “**12** images” when *N* ≤ 3), so viewers know more assets exist than the three visible slots. |
| **Every run** | On **each** execution of preview generation (or the dedicated **`design-md-sample-images`** skill suggested name), the workflow MUST **re-read the filesystem** under `sample-images/` (or configured root) and rebuild attachment metadata so **add**, **remove**, and **rename** of files are reflected without stale caches. |
| **Skill responsibility** | A Cursor skill (standalone or folded into **generate-previews**) MUST document: how to name folders, how to add a scope id to `DESIGN.md`, and that running the skill / `npm run generate-previews` **syncs** thumbnails to current files. |
| **Performance** | The preview SHOULD NOT inline multi-megabyte originals at full resolution for all thumbs; prefer **thumbnail-sized** rendering in HTML/CSS or generated downsized assets per [NFR-10](#9-non-functional-requirements). |

### 5.8 Expanded preview surfaces: component and layout preview configs

The current design-system preview pages remain required, but they are no longer the only preview target. The product SHALL additionally generate **component-focused previews** and **layout/page previews** from dedicated configuration files and skills.

| Topic | Requirement |
|-------|-------------|
| **Component preview config** | The repo MUST support a machine-readable **`component-preview_config.json`** that declares which components and variants to render, which states/examples to include, and optional notes/metadata fields for the output previews. |
| **Layout preview config** | The repo MUST support a machine-readable **`layout-preview_config.json`** that declares page-section and full-page compositions that demonstrate realistic usage of design-system widgets/components. |
| **Mosaic tile previews** | The repo SHOULD support reusable **mosaic tiles**: richer composite preview blocks that combine multiple elements and components (for example, media, text, CTA, badges, and supporting metadata) to represent realistic product slices beyond a single component demo. |
| **Preview outputs** | The generation workflow MUST produce static, browser-openable component and layout preview files from those configs, in addition to the existing design-system preview pages. |
| **Skill coverage** | Cursor project skills MUST include create/update guidance (or dedicated skills) for both config files and their generated artifacts, so agents can scaffold new previews and maintain existing ones predictably. |
| **Composition fidelity** | Layout previews SHOULD represent plausible sections/pages (hero, pricing, dashboard slices, etc.) populated with components from the current design system, not arbitrary placeholder blocks disconnected from documented tokens. |
| **Sync expectation** | When components/tokens/layout guidance change in `DESIGN.md`, the component and layout preview artifacts SHOULD be regenerated in the same workflow as catalog previews to minimize drift. |
| **Skill-owned lifecycle** | Every preview page family (design-system catalog, changelog pages, component previews, layout/page previews) MUST be created and updated through documented skill workflows (single skill with subcommands or multiple focused skills). |
| **Common dashboard** | Each project MUST have one static, browser-openable **preview dashboard page** that links to all generated preview pages so contributors have a single entry point. |
| **Dashboard output contract** | Canonical dashboard filename SHOULD be **`preview-dashboard.html`** (or a documented equivalent). The dashboard MUST live with preview outputs so links resolve under `file://` and static hosting without rewrite rules. |
| **Minimum dashboard links** | Dashboard MUST expose links to: design-system light/dark catalogs, standalone changelog page(s), component preview output(s), and layout/page preview output(s). If a preview family has not been generated yet, the dashboard MUST show a non-broken placeholder state for that link target. |
| **Dashboard insights** | The dashboard MAY render useful static summaries (e.g. number of components covered, number of layout examples, latest preview update date, change-entry counts over time) computed at generation time from local files/configs. Trend/counter values SHOULD be sourced from a documented changelog source plus a generated preview manifest JSON (or documented equivalent) so calculations stay deterministic across runs. |
| **No backend runtime** | Dashboard and preview pages MUST remain static artifacts (HTML/CSS/JS with optional JSON snapshots). No backend service, database, or live API dependency is required at view time. |

### 5.9 Framework-agnostic smart static preview schema contract

To keep previews “smart” while preserving static portability, the product SHALL define a **tool- and framework-agnostic data contract** that generation workflows emit and preview pages consume.

| Topic | Requirement |
|-------|-------------|
| **Core principle** | Intelligence MUST be computed at generation time (Node script and/or skills), not by a backend at view time. Runtime pages only read static artifacts. |
| **Schema artifacts** | The preview workflow SHOULD emit machine-readable files such as **`preview-manifest.json`**, **`preview-stats.json`**, and **`preview-links.json`** (or documented equivalent names) alongside HTML outputs. |
| **Config inputs** | **`component-preview_config.json`** and **`layout-preview_config.json`** MUST map into the shared schema so component and layout outputs can be rendered by any static page renderer. |
| **Framework agnostic outputs** | Generated preview pages MUST be usable as plain static HTML/CSS/JS and MUST NOT require React (or any specific UI framework) at view time. Framework-specific generators MAY exist as upstream adapters but MUST normalize into the same schema. |
| **Smart static behaviors** | Search/filter/sort, variant toggles, coverage indicators, trend counters, and empty-state handling SHOULD operate entirely from local schema JSON and embedded HTML metadata. |
| **Determinism** | Given identical source inputs (`DESIGN.md`, configs, changelog source, image folders), the workflow SHOULD produce reproducible schema outputs and preview pages. |
| **Accessibility baseline** | Interactive static behaviors SHOULD use semantic controls and keyboard-operable patterns (`<details>`, buttons, labeled inputs) without requiring framework-specific component runtimes. |

### 5.10 Optional Storybook bridge for component previews

The product supports an optional Storybook integration path for teams that already use Storybook, while preserving the framework-agnostic default preview model.

| Topic | Requirement |
|-------|-------------|
| **Optionality** | Storybook integration MUST be optional. Teams MUST be able to use `design-previews/*.json` and generated static previews without Storybook. |
| **Folder convention** | Storybook bridge assets SHOULD live under **`design-previews/storybook/`** (mapping guide, example `.storybook` configs, and story templates) so the integration is discoverable but isolated from framework-agnostic defaults. |
| **Mapping parity** | Storybook examples SHOULD mirror the same override precedence as design-o-mat preview configs: global defaults -> component defaults -> per-preview overrides. |
| **Component focus** | Storybook bridge scope is primarily component previews (CSF stories, global preview config). Layout/page previews MAY stay on the independent static path unless a future release expands Storybook coverage. |
| **No lock-in** | Introducing Storybook bridge files MUST NOT change or deprecate independent config files (`preview-config.json`, `component-preview_config.json`, `layout-preview_config.json`). |

### 5.11 Codebase adherence audit

Teams need **objective signal** on whether shipped UI code **matches** the **design system** (`DESIGN.md` Definition) and **designer-authored usage** (`docs/design-guidelines.md`). The product **SHOULD** add a **codebase adherence audit** capability (same commitment level as [FR-46](#8-functional-requirements)) that **actively parses** a **declared subset** of the repository (for example `src/components/**`, `app/(routes)/**`, or paths listed in a config file), runs **checks** derived from those two documents, and produces a **validation result** plus an **adherence rating** (numeric score, letter tier, or multi-axis rubric—exact scheme fixed at implementation and documented beside the tool). **When shipped**, the audit workflow’s own requirements (scope, outputs, transparency) remain as stated in the table below and in [NFR-16](#9-non-functional-requirements).

| Topic | Requirement |
|-------|-------------|
| **Purpose** | **Validate** implementation under configured paths against **`DESIGN.md`** (tokens, components, states, pairing/guardrails where machine-checkable) and against **`docs/design-guidelines.md`** when present (usage patterns expressed in checkable form or mapped to rules). **Rate** overall and/or per-module **adherence** so teams can prioritize fixes and track trends over time. |
| **Scope configuration** | The workflow MUST accept an explicit **scope** (include globs/paths, optional excludes, max file size or extensions) so audits target **UI-relevant** code only and skip vendor or generated trees unless opted in. |
| **Inputs** | **`DESIGN.md`** (Definition area as primary normative source); **`docs/design-guidelines.md`** when the file exists (**SHOULD** contribute to scoring for usage-level rules); optional **rule pack** version id so reports remain interpretable after spec updates. |
| **Parsing / analysis** | The implementation **SHOULD** start with **deterministic** static analysis (AST/CSS extraction, design-token usage, className heuristics, import graph to design-system entry points) appropriate to the stack documented in the project. **Optional** LLM-assisted interpretation of free-text guidelines **MAY** augment findings but MUST be **labeled** in output and MUST NOT be the only path for claims marked “pass/fail” in CI unless explicitly configured ([NFR-16](#9-non-functional-requirements)). |
| **Outputs** | Each run MUST emit at least one **machine-readable** artifact (e.g. `adherence-report.json` or documented equivalent) with per-finding **severity**, **rule id**, **file path**, and **line/column** when available; **SHOULD** emit a **human-readable** summary (Markdown or HTML) including an **aggregate adherence rating** and top regressions. |
| **Node / skills** | Primary implementation **SHOULD** be **Node.js v24+** (consistent with [NFR-4](#9-non-functional-requirements)) and/or a **`design-md-*`** Cursor skill that wraps the same CLI for agent-driven runs. |
| **CI / local** | The audit **SHOULD** run locally and in **CI** with stable exit codes or thresholds documented for “warn vs fail” gates; teams choose whether failing the build on low scores is in scope for their org. |
| **Non-duplication** | The audit MUST **not** redefine tokens or components; it **reads** `DESIGN.md` / guidelines and maps to **rules**. When `DESIGN.md` and guidelines disagree, [NFR-15](#9-non-functional-requirements) precedence applies and the report **SHOULD** flag **conflict** rather than guessing. |
| **Discoverability** | When shipped, README **or** `AGENTS.md` **SHOULD** document how to configure scope, run the audit, and read the rating; the skill catalog ([FR-5](#8-functional-requirements)) **SHOULD** list the adherence skill if one exists. |

### 5.12 Brownfield design-system bootstrap and guideline generation

Teams **introducing or formalizing** a design system **inside an existing codebase** need more than the greenfield ordering in [§7.1](#71-greenfield-spec-happy-path): they must **harvest** reality from **both** deployed or staging UI **and** source (global styles, token modules, Tailwind/theme config, CSS variables, component barrel files), then **converge** on a **`DESIGN.md`** that can be **refined** over multiple cycles and a **`docs/design-guidelines.md`** that captures **how legacy screens behave today** and **how new work should diverge**—without machine output overwriting human design authority.

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Provide a **repeatable brownfield arc**: (1) **inventory** legacy UI surfaces and technical constraints; (2) **ingest evidence** from URL(s) and repository paths; (3) **draft or update** `DESIGN.md` §2–§6 (and narrative §1 where helpful) with explicit **“as implemented” vs “target”** notes where the team has not yet converged; (4) **refine** using **validate**, **change requests** ([§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)), and **[§5.11](#511-codebase-adherence-audit)** when available; (5) **bootstrap** a first **`docs/design-guidelines.md`** from **structured inputs** (audit summaries, top duplicate patterns, navigation hot spots, exceptions) for designers to **edit into** the canonical usage doc. |
| **Documentation-first** | Until automation ships, **`docs/template-DESIGN.md`**, README, and/or `AGENTS.md` **SHOULD** describe the **brownfield ordering** (evidence before prescriptive §1 claims), **checklist** for repo paths to scan, and **how** draft guideline output must be **labeled** and **reviewed** ([FR-47](#8-functional-requirements)). |
| **Repository evidence ingestion** | The product **SHOULD** ship or document a **configurable** workflow (CLI and/or **`design-md-*`** skill, e.g. suggested slug `design-md-brownfield-inventory`) that lists **candidate token sources** (theme JSON, `.css` roots, Tailwind config, design-tokens packages), **component entry directories**, and **layout shells**—emitting a **machine-readable inventory** (e.g. `brownfield-inventory.json`) and a **short human summary** for Part I / Step 1 ([FR-47](#8-functional-requirements)). |
| **Reconciliation artifact** | The workflow **SHOULD** produce a **reconciliation** artifact (Markdown or JSON) mapping **legacy token/component names** → **normalized** `DESIGN.md` roles or noting **unmapped** debt, so **normalize** and **draft body** skills do not silently drop aliases ([FR-49](#8-functional-requirements)). |
| **Spec refinement loop** | Brownfield docs **SHOULD** describe an explicit loop: **generate previews** → **run adherence audit** (when shipped) → **triage** → **edit `DESIGN.md` or CR** → **regenerate**; optional **variations** ([§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)) for **parallel “legacy skin” vs “target skin”** exploration where teams need stakeholder compare ([FR-47](#8-functional-requirements), [FR-46](#8-functional-requirements)). |
| **Guideline document bootstrap** | The product **SHOULD** ship a **guideline generator** step (CLI and/or skill, e.g. suggested slug `design-md-guidelines-bootstrap`) that **creates or overwrites-with-warning** a **draft** **`docs/design-guidelines.md`** containing: **auto table of contents**; sections for **patterns observed in code**; **known exceptions** (linked to audit rule ids when available); **migration notes** (strangler boundaries, “do not extend” legacy widgets); and **empty callouts** for designer-authored **principles** and **flows**. Output files **MUST** include a **prominent banner** stating **DRAFT — designer review required** until a human removes it ([FR-48](#8-functional-requirements), [NFR-17](#9-non-functional-requirements)). |
| **Non-duplication** | Bootstrap output **MUST NOT** duplicate full normative **`DESIGN.md`** token tables inside **`docs/design-guidelines.md`**; it **SHOULD** **link** to `DESIGN.md` sections and carry only **usage** and **context** prose plus **pointers** to exceptions ([NFR-15](#9-non-functional-requirements), [FR-48](#8-functional-requirements)). |
| **Node / skills** | Implementation **SHOULD** follow [NFR-4](#9-non-functional-requirements) (**Node.js v24+** for any shipped script); skills **SHOULD** wrap the same commands for Cursor agents ([FR-50](#8-functional-requirements)). |
| **Discoverability** | When shipped, [FR-5](#8-functional-requirements) **SHOULD** list brownfield skills; README **SHOULD** add a **Brownfield** row or subsection under typical flows pointing to [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap). |

### 5.13 Token-native component implementation and third-party primitive composition

**Developers** often add widgets by pulling **ready-made primitives**—for example a **Dropdown** built from **[shadcn/ui](https://ui.shadcn.com/)** (typically **Radix UI** primitives + local component files)—while the **product owner** expects every pixel to obey **`DESIGN.md`**. The product SHALL document—and MAY later automate—a **consistent pattern**: **behavior** may come from a **third-party primitive** or **headless** layer; **visual and interaction semantics** (color roles, type scale, spacing, radius, shadows, hover/focus/disabled) **derive from documented design tokens and component specs**, not from the upstream package’s showcase styling.

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Enable **new** UI work where **implementations cite project token ids** (`DESIGN.md` §2–§6 vocabulary, mirrored in CSS variables, Tailwind theme, or codegen as the team defines in the Action area) and coding agents **compose** curated primitives (examples: **[shadcn/ui](https://ui.shadcn.com/)**, other **copy-in** libraries, headless adapters) **only** after mapping them to **`DESIGN.md`** and **`docs/design-guidelines.md`**. |
| **Naming and traceability** | Template, `AGENTS.md`, and **`DESIGN.md` §9 (Agent Prompt Guide)** **SHOULD** include explicit instructions and **few-shot prompts** requiring **token names from the Definition** when generating or refactoring components (**no magic hex** in prompts where a **role id** exists) ([FR-51](#8-functional-requirements)). |
| **Compose-then-theme pattern** | Authoritative docs **SHOULD** describe steps: pick **nearest `DESIGN.md` §4** component (or propose a scoped extension via **CR**); choose **primitive** if any (e.g. shadcn **Select** / **DropdownMenu** for “Dropdown”); **replace** default **className** / **CSS variables** with **project token bindings** and **states** listed in **`DESIGN.md`**; verify **pairing/accessibility** per Definition and **`docs/design-guidelines.md`** ([FR-52](#8-functional-requirements)). |
| **AI behavior** | `AGENTS.md` and **`DESIGN.md` §9** **SHOULD** state that **coding agents SHOULD** prefer **repository tokens** when implementing or extending UI and **SHOULD NOT** leave **primitive defaults** where they **conflict** with **`DESIGN.md`** without flagging the discrepancy for human review ([FR-53](#8-functional-requirements)). **[§7.11](#711-developer-new-component-token-native-third-party-primitive)** is the **canonical** human/agent checklist. |
| **Worked examples** | The shipped **§9** corpus (or companion doc linked from README) **SHOULD** contain at least one **end-to-end** example modeled on **shadcn/ui** + **`DESIGN.md`** tokens (e.g. “Add `ProductFilterDropdown` using shadcn **DropdownMenu** with our **surface / text / ring** roles”) without implying **exclusive** coupling to that vendor ([FR-51](#8-functional-requirements)). |
| **Optional registry** | Teams **MAY** maintain a **short mapping table** (in `DESIGN.md` §4 notes, `docs/design-guidelines.md`, or `component-primitive-map.md`) listing **product component** → **preferred primitive** + **styling notes**; the registry is **convenience**, not a substitute for **`DESIGN.md`** token truth ([FR-52](#8-functional-requirements)). |
| **Optional skill / CLI** | A future **`design-md-*`** skill (e.g. `design-md-compose-component`) **MAY** scaffold file stubs and **checklists** (imports, token class names, state matrix) when the team opts in; **Node.js v24+** if scripts ship ([NFR-4](#9-non-functional-requirements)). |
| **Non-goals** | design-o-mat **does not** vendor-pin to **shadcn/ui**; **does not** ship shadcn as a **mandatory** dependency; **does not** fork upstream components—teams own **licenses** and **upgrade** paths ([NFR-18](#9-non-functional-requirements)). |

### 5.14 Design-system repository versioning and consumer pinning

Many orgs ship **better outcomes** when the **design-system source of truth**—**`DESIGN.md`**, **`docs/design-guidelines.md`**, preview assets, **`design-definition-form.md`**, and optional **skills** mirrored for consumers—is maintained in **its own Git repository** (the **design-system repo**). **Semantic versions** (**tags** aligned to **semver** policy), **immutable commit SHAs**, and **changelog** discipline then become the **versioning spine**: **consumer** **product repos** (**application monorepo**, micro-frontend workspace, mobile shell, etc.) **pin** a **specific revision** during each **release cycle** (“**App 24.12** adopts **design-system v3.4.1**”). design-o-mat **documents** this **supply chain**; it **does not** host repositories ([§2.3](#23-non-goals)).

| Topic | Requirement |
|-------|-------------|
| **Purpose** | Make it **straightforward** for **designers** and **developers** to **publish** reviewed design-system increments and for **engineering** to adopt them in **upcoming software releases** on a **known** **`DESIGN.md`** baseline—with **agents** pointed at that **pinned** copy when invoking skills or reading the Definition ([§7.12](#712-release-and-consume-a-versioned-design-system)). |
| **Dedicated repository model (recommended)** | Template, README, and/or `docs/` **SHOULD** describe the **recommended** topology: **`design-system` repo** owns Part IV authoring and **releases**; **application** repos **consume** via **pinned** **Git ref** (**tag** preferred for humans, **SHA** preferred for reproducibility) or equivalent **package** distribution ([FR-54](#8-functional-requirements)). **Monorepo** setups remain valid but **SHOULD** still document **which path** constitutes the **exported** definition if multiple packages exist ([FR-55](#8-functional-requirements)). |
| **Pinning patterns** | Authoritative docs **SHOULD** cover **representative integration** mechanisms: **`git submodule`**, **`npm`/`pnpm`/`yarn` dependency on** **GitHub tarball** pinned to tag/SHA, **private registry** semver, **`vendor/` subtree** copied with **recorded HEAD**—including **tradeoffs** (ease vs drift resistance) ([FR-54](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)). |
| **Release ceremony** | The design-system repo **README** or `RELEASE.md` (**SHOULD** be documented or scaffolded by template) describes: **finalize** previews + validated `DESIGN.md` → **`git tag`** (and optional **GitHub Release** notes) → **communicate adoption window** → **consumers bump pin** via PR before feature freeze ([FR-55](#8-functional-requirements)). |
| **Version manifest** | The design-system repo **SHOULD** expose **one** human- and machine-obvious **version signal**: e.g. **Git annotated tag**, optional **`DESIGN_SYSTEM_VERSION`** in **`package.json`** (for Node consumers), **`design-system-manifest.json`** (fields: semver, git SHA, `DESIGN.md` hash)—exact schema documented when introduced ([FR-56](#8-functional-requirements)). |
| **Agents** | **`AGENTS.md`** in **consumer** repos **SHOULD** state **where** the pinned `DESIGN.md` lives (**path** relative to submodule or symlink) so **skills** resolve the **same Definition** CI and locally ([FR-56](#8-functional-requirements)). |
| **Backward compatibility** | Docs **SHOULD** remind maintainers that **semver** bumps carry **migration** implications; large breaking changes SHOULD pair with **`docs/design-guidelines.md`** “**upgrade notes**” or link to **`change-requests/`** histories when teams use §5.4 workflows ([FR-55](#8-functional-requirements)). |
| **Non-goals** | No mandated **mono- vs polyrepo**; no required **npm publish**—only **transparent** versioning and **pinned consumption** semantics ([§2.3](#23-non-goals)). |

---

## 6. DESIGN.md structure: Definition and Action areas

The **design-o-mat** `DESIGN.md` (and authoring guidance we publish for teams that mirror this repo) SHALL be organized into **two main areas** in one file. The split keeps **declarative truth** separate from **executable procedure**, so AI agents can read the spec reliably and invoke or follow operations only when intended.

### 6.1 Definition area

| Aspect | Requirement |
|--------|-------------|
| **Purpose** | Describe the design system: theme, tokens, typography, components (with states), layout, depth, guardrails, responsive behavior, and the Agent Prompt Guide (section 9), aligned with Stitch + awesome-design-md conventions where applicable. |
| **Audience** | LLMs and humans implementing or reviewing UI; content MUST be structured for machine consumption (consistent headings, tables, explicit names for colors/roles, state lists, breakpoints). |
| **Content type** | Prose, tables, lists, and fenced examples that illustrate appearance or usage **without** being mistaken for shell commands to run (e.g. sample CSS or JSX in clearly labeled blocks). |
| **Source of truth** | The Definition area is authoritative for **what** the UI should look like and how it should behave. |
| **Pairing rules** | Normative **color combination** tables (allowed/forbidden foreground-on-background, accent usage) live in the Definition when the product adopts the color-rules skill (§5.4.4 under [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)); they are inputs to previews and validation. |
| **PM linkage** | Optional per-component **issue keys** (Jira, etc.) and optional **git commit references** (SHA/URL) live in the Definition when teams use [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews); they are not required for a valid Stitch-style doc. |
| **Screenshot scope ids** | Optional **stable ids** (for `sample-images/<id>/` folders) for sections, components, and named elements live in the Definition when teams use [§5.7](#57-designer-screenshot-attachments-and-sample-images). |
| **Implementation hints (optional)** | Where teams use **third-party primitives** ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)), optional **non-normative** notes (e.g. “implemented via shadcn **DropdownMenu**”) **MAY** appear in §4 or an appendix as long as **tokens and states** remain explicit and **authoritative**; agents still **MUST** apply **`DESIGN.md`** styling ([FR-51](#8-functional-requirements)–[FR-52](#8-functional-requirements)). |
| **Design-system version cue (optional)** | When teams use **[§5.14](#514-design-system-repository-versioning-and-consumer-pinning)**, §1 (**Key Characteristics** / intro) **MAY** name the **semver** **or** **release tag** of this Part IV artifact so previews, exports, and **consumer** manifests stay **human-glance aligned** with **Git**; **truth** remains the **pinned ref** ([FR-56](#8-functional-requirements)). |

### 6.2 Action area

| Aspect | Requirement |
|--------|-------------|
| **Purpose** | Collect **commands, code, and shell scripts** (and step-by-step invocations) that **do** something against the repo or artifacts: e.g. **check**, **validate**, **create**, **update**, **delete**, and other maintenance or CI-friendly actions tied to the spec. |
| **Audience** | Humans, coding agents, and automation; each entry SHOULD state working directory, prerequisites (e.g. **Node.js v24+**), and whether the operation is read-only or mutates files. |
| **Content type** | Runnable shell lines, `npm` / `node` invocations, small scripts, validation checklists with explicit pass/fail criteria, and “how to regenerate previews” style runbooks. Destructive operations (**delete**, reset, clean) MUST be labeled as such and MUST NOT be implied by ambiguous prose. |
| **Boundaries** | The Action area MUST be visually and structurally distinct from the Definition area (e.g. a dedicated top-level section such as “Actions / Runbook”, or an appendix) so parsers and agents do not treat a command line as a design token or vice versa. |

### 6.3 How the two areas work together

- **Definition → Action:** Actions SHOULD reference which parts of the Definition they validate or regenerate (e.g. “after editing §2 hex table, run …”).
- **Action → Definition:** Actions that **create** or **update** files (previews, exports) SHOULD document outputs and versioning behavior so the Definition remains the semantic source of truth.
- **External compatibility:** Stitch-oriented **sections 1–9** live in the Definition area. The Action area is an **additive** layer for design-o-mat; external tools that only understand classic `DESIGN.md` MAY ignore the Action block if they do not need automation.

---

## 7. User journeys

### 7.0 Shared intake: `docs/design-definition-form.md`

1. **Duplicate** `docs/design-definition-form.md` into the target project next to (or above) where `DESIGN.md` will live.
2. **Designer** fills visual fields: product name, color roles (primary background/text, brand/CTA, accent, semantic, focus), **Title 1** (font, size, weight, line-height, letter-spacing), extended type scale as needed, layout/radius/shadow, component checklist, motion and breakpoint intent, §7/§8 choices.
3. **Developer** fills engineering fields: stack, existing tokens, technical limits; reviews color/type for feasibility.
4. **Sign-off** when minimum bar is met ([FR-27](#8-functional-requirements)); open questions listed in the form are either resolved or explicitly carried into Part II.
5. Proceed to **[§7.1](#71-greenfield-spec-happy-path)** (greenfield) **or [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)** (existing codebase)—use the completed form as **input** to Part I inventory and Part II questionnaire (avoid contradicting signed-off tokens without updating the form or recording a CR).

### 7.1 Greenfield spec (happy path)

1. Complete **`docs/design-definition-form.md`** (Step 1) per [§7.0](#70-shared-intake-designdefinitionformmd).
2. Run **scope lock** skill → fill Part I inventory and Part II questionnaire; choose §7/§8 structure per product needs (should align with the form’s §7/§8 intent unless scope changed).
3. If a live URL exists → **capture tokens** (evidence: screenshots, computed styles, CSS variables, fonts, breakpoints).
4. **Normalize tokens** → draft §2, §3, §5, §6 with consistent semantics.
5. **Draft body** → §1–§8 including Key Characteristics and component states.
6. **Agent prompt guide** → complete §9.
7. **Validate spec** → Phase 5 checklist.
8. **Generate previews** → `npm run generate-previews` (includes **embedded** collapsed history + **standalone** changelog pages per [§5.5](#55-preview-change-history-embedded-and-standalone)).
9. **Ship** → Part IV-only `DESIGN.md`, optional folder README, pointers in README / `AGENTS.md`.
10. **Optional: usage guidelines** → **Create or update** **`docs/design-guidelines.md`** so designer-owned **application** guidance (patterns, flows, page-level composition) stays aligned with the shipped **Definition**; link the file from README or `AGENTS.md` when teams want agents and engineers to read **definition + usage** together ([FR-45](#8-functional-requirements)).

Authors SHOULD place procedural steps from the template/skills that are “always run the same way” into the **Action area** of `DESIGN.md` as the repo’s canonical runbook, while keeping narrative spec in the **Definition area**.

### 7.2 Small edit

- Token-only change → normalize (and validate); regenerate previews if colors changed.
- §9-only change → agent prompt guide skill; validate if prompts reference obsolete tokens.
- **Usage-only change** → edit **`docs/design-guidelines.md`**; confirm prose still matches `DESIGN.md` (no contradictory normative claims); update `DESIGN.md` if tokens or components changed instead ([FR-45](#8-functional-requirements)).

### 7.3 Moodboards, change requests, variations, and pairing rules

1. **Moodboard** — Run **moodboard** skill → create or bump version under `moodboards/<slug>/vN/` → add or refresh static **preview HTML** → optional index entry.
2. **Change request** — Log CR under `change-requests/` (or agreed convention) → **change-request** skill applies edits to `DESIGN.md` → regenerate **light and dark** previews → link CR id in commit or PR description.
3. **Variations** — Run **variations** skill → add alternate token set (file or `DESIGN.md` block) → extend preview build so **selector** switches variants in both themes → document default vs experimental in §1 or §2.
4. **Pairing rules** — Run **color-rules** skill → ensure Definition contains pairing tables → regenerate previews showing **rules panel** → run validate skill so guardrails stay in sync.

### 7.4 PM status on previews (Jira via MCP)

1. Enable the **Jira** (or vendor) **MCP server** in Cursor with appropriate auth.
2. Add or edit **`design-o-mat-pm.config.yaml`** (or shipped equivalent) → set MCP server id, field id for **status**, display rules for badges.
3. In **`DESIGN.md` §4**, add **issue keys** next to components that should show status (e.g. Button → `PROJ-123`).
4. Run the **documented** workflow (agent + MCP fetch, then `npm run generate-previews`, or a future single command) → confirm **Approved** (or current status) appears **beside** the Button block on light/dark previews.
5. Optional: add **commit references** (SHA/URL) for components/elements that need implementation traceability, then regenerate previews and confirm a commit badge/link is shown (including **GitHub** commit links when provided).

### 7.5 Designer screenshots (`sample-images`)

1. Pick a **scope id** for a section or component (e.g. `s4-button`) and add it to **`DESIGN.md`** per template guidance.
2. Create **`sample-images/s4-button/`** (or configured root + subfolder) and drop PNG/JPEG files.
3. Run **`design-md-sample-images`** and/or **`npm run generate-previews`** → confirm **three thumbnails** max appear **below** the Button block and copy shows **total** file count (e.g. 12 images).
4. Add or delete files in the folder → run again → counts and visible thumbs **update** without editing HTML.

### 7.6 Component and layout preview generation

1. Add or update **`component-preview_config.json`** to define component-level examples and states to render.
2. Add or update **`layout-preview_config.json`** to define section-level and full-page compositions built from the design-system widgets/components.
3. Run the preview generation workflow and/or dedicated preview skills to regenerate component and layout outputs alongside existing design-system previews.
4. Open generated files in the browser and confirm examples still match current `DESIGN.md` tokens, component rules, and interaction intent.

### 7.7 Project preview dashboard (static)

1. Run the documented preview skill workflow so each preview family is (re)generated through skills.
2. Generate/update the single project dashboard page that links to all preview artifacts (catalog, changelog, component previews, layout/page previews).
3. Verify dashboard stat cards or summaries (if enabled) are regenerated from local artifacts/configs and reflect current counts/trends from the documented sources.
4. Open the dashboard as the primary entry point; navigate to each preview page from there without any backend service running. If a preview family is not generated yet, verify the dashboard shows a clear empty state instead of a broken link.

### 7.8 Smart static preview data flow

1. Update `DESIGN.md`, `component-preview_config.json`, and/or `layout-preview_config.json`.
2. Run the preview workflow (skills and/or neutral scripts) to regenerate HTML previews plus schema artifacts (`preview-manifest.json`, `preview-stats.json`, `preview-links.json`, or documented equivalents).
3. Verify static behaviors (filters/toggles/counts/trends/empty states) work from local files only (`file://` or static hosting), with no backend or live API.
4. If a team uses a framework-specific generator upstream, confirm it still emits the common schema and produces equivalent static runtime behavior.

### 7.9 Codebase adherence audit (planned)

1. Ensure **`DESIGN.md`** and (if used) **`docs/design-guidelines.md`** reflect current intent ([FR-45](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)).
2. Add or edit the **scope config** (documented path—see [§5.11](#511-codebase-adherence-audit)) so the audit targets the correct UI directories and excludes noise (build output, fixtures).
3. Run the **adherence audit** CLI or Cursor skill ([FR-46](#8-functional-requirements)).
4. Review **machine-readable** and **summary** outputs; triage findings by severity; open issues or CRs for **Definition** vs **implementation** gaps.
5. Optionally wire the same command into **CI** with team-agreed thresholds; track **rating** trend across releases.

### 7.10 Brownfield: existing codebase design-system bootstrap

For products that **already ship UI**, the goal is a **convergent** `DESIGN.md` plus a **designer-owned** `docs/design-guidelines.md` grounded in **what exists**, with room to **refine** toward a **target** system.

1. Complete **`docs/design-definition-form.md`** with **extra emphasis** on **existing tokens**, **stack**, **constraints**, and **screenshots** of current key screens ([§7.0](#70-shared-intake-designdefinitionformmd)).
2. **Scope lock** → Part I / Part II explicitly record **legacy surfaces**, **debt**, **strangler** boundaries (what may keep old styling short term vs what is in scope for the first spec pass).
3. **Repository evidence** → run or follow the **brownfield inventory** workflow ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [FR-47](#8-functional-requirements)): capture paths to theme files, global CSS, component roots; save **`brownfield-inventory.json`** (or documented equivalent) in-repo.
4. **Live UI evidence** → when a URL exists, run **capture tokens** (screenshots, computed styles, CSS variables, fonts, breakpoints) for **staging/production parity** where safe.
5. **Reconcile** → produce or maintain the **legacy → normalized** mapping artifact ([FR-49](#8-functional-requirements)); resolve **aliases** and **unmapped** debt before treating normalized tables as authoritative.
6. **Normalize tokens** → draft §2, §3, §5, §6; use **“as implemented”** callouts where code and **target** still disagree.
7. **Draft body** → §1–§8 and **§9** when the team is ready for agent prompts; prefer **honest** Key Characteristics over aspirational-only prose until a **CR** closes the gap.
8. **Validate spec** → Phase 5 checklist; fix **structural** issues before heavy visual polish.
9. **Generate previews** → confirm catalogs reflect **current** token reality; use **variations** if comparing **legacy vs target** palettes ([§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)).
10. **Baseline conformance** → when [§5.11](#511-codebase-adherence-audit) is available, run **adherence audit** on configured UI paths; store or link the first **rating** for trend comparison ([§7.9](#79-codebase-adherence-audit-planned)).
11. **Refine the design system** → **repeat**: triage audit / review → **edit `DESIGN.md`** or log a **change request** → **normalize** or **draft body** as needed → **validate** → **regenerate previews** → **re-audit** until the **Definition** matches agreed **target** for in-scope surfaces ([FR-47](#8-functional-requirements), [FR-46](#8-functional-requirements)).
12. **Bootstrap `docs/design-guidelines.md`** → run **guideline generator** ([FR-48](#8-functional-requirements)); **remove the DRAFT banner** only after a **design system author** or **visual designer** rewrites sections for **real usage**, **exceptions**, and **migration** guidance; ensure no **normative** conflict with `DESIGN.md` ([NFR-15](#9-non-functional-requirements), [NFR-17](#9-non-functional-requirements)).
13. **Ship** → Part IV-only `DESIGN.md`, committed **guidelines**, pointers in README / `AGENTS.md`; keep **reconciliation** and **inventory** artifacts discoverable (folder + README index) for the next refinement cycle ([FR-50](#8-functional-requirements)).

### 7.11 Developer: new component (token-native + third-party primitive)

For a **new** interactive control (example: **filter Dropdown** on a data table):

1. Locate the **closest** match in **`DESIGN.md` §4** (or open a **change request** to add a scoped definition if missing).
2. List **token roles** to use: **surface**, **text**, **border**, **ring/focus**, **accent**, **spacing scale**, **radius**, **elevation**—by **id** as named in §2–§6 (not ad hoc hex in code comments when avoidable).
3. If using a **primitive library**, pick the **component** (example: add via **shadcn/ui** **DropdownMenu** or **Select** per team convention) and record the choice in **optional** **primitive registry** notes ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)).
4. **Replace** default **styles** from the generator or template with **project theme** bindings (CSS variables, Tailwind **semantic** classes, or documented equivalent) so **hover**, **focus-visible**, **disabled**, and **open** states match **`DESIGN.md`** and **`docs/design-guidelines.md`**.
5. Run **validate** on `DESIGN.md` if the **Definition** changed; run **previews** or **Storybook** if the team uses them; when [§5.11](#511-codebase-adherence-audit) is available, **spot-check** the new files against **token usage** rules.
6. **Agent step** — Use **`DESIGN.md` §9** prompts that **name** the **component**, **token roles**, and **primitive** explicitly (e.g. “Use shadcn **DropdownMenu**; map **menu surface** to `surface-elevated`, **item text** to `text-primary` …”) so output is **reviewable** against the spec ([FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)).

### 7.12 Release and consume a versioned design-system

**Actors:** **Design system authors**, **frontend leads**, **PM / release**.

1. Maintain **`DESIGN.md`**, previews, and **`docs/design-guidelines.md`** in the **design-system Git repository** (see [§5.14](#514-design-system-repository-versioning-and-consumer-pinning)).
2. **Finalize** candidate changes (**validate**, **generate previews**, optional **audit** runs when [§5.11](#511-codebase-adherence-audit) ships); resolve **blocking** CRs.
3. **Tag** an **immutable** release (**annotated Git tag**, semver-aligned name per team policy); publish **release notes** (changelog) summarizing token/component deltas and **migration** hints ([FR-55](#8-functional-requirements)).
4. **Communicate adoption** (“**mobile + web ship `design-system@3.5.0` next sprint**”).
5. In each **consumer** **application** repository, update the **pin** (**submodule** commit, **`package.json` git dependency**, **lockfile**, or **documented vendor SHA**) via **reviewed PR**; ensure **`AGENTS.md`** paths still resolve to the **pinned** `DESIGN.md` ([FR-54](#8-functional-requirements), [FR-56](#8-functional-requirements)).
6. **Optional:** emit or update **`design-system-manifest.json`** during release so tooling can assert **parity** (`DESIGN.md` hash ≠ unexpected drift) ([FR-56](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)).
7. **Product release** merges only after pins match the **accepted** baseline; subsequent **floating** bumps happen on the **next** train.

---

## 8. Functional requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | The template MUST document Stitch sections 1–9, with section 9 as the additive Agent Prompt Guide layer. | Must |
| FR-2 | The template MUST document corpus exceptions for §7/§8 without forcing contradictory titles. | Must |
| FR-3 | Each project skill MUST include a YAML `description` stating when the agent should apply it. | Must |
| FR-4 | Preview script MUST run on **Node.js v24 or newer** and document CLI usage (`--help`, optional `--out`). | Must |
| FR-5 | The repo MUST maintain an **authoritative skill index**: either a dedicated **`docs/skills-catalog.md`** (grouped by theme as the list grows) **or** an equivalent **README** section—listing **every** shipped `design-md-*` (and documented exception) skill with **one-line purpose** and **phase / when-to-use** mapping. The index MUST be **updated in the same change** whenever a skill is **added**, **renamed**, **deprecated**, or materially re-scoped ([§5.0](#50-skill-catalog-and-extensibility)). **`AGENTS.md` SHOULD link** to that index (or embed a short cheat sheet that stays in sync). | Must |
| FR-6 | Ship guidance MUST clarify that shipped `DESIGN.md` is Part IV (or equivalent) without authoring-only noise. | Should |
| FR-7 | Generated previews SHOULD remain optional for repository check-in; the repo remains useful without preview HTML committed. | Should |
| FR-8 | Repository `DESIGN.md` MUST separate **Definition** (spec sections 1–9 and related narrative) from **Action** (runbook: shell, npm, scripts, validation steps). | Must |
| FR-9 | The Action area MUST support categories including **check**, **validate**, **create**, **update**, and **delete** (or explicitly document `N/A` with rationale where an operation does not apply). | Should |
| FR-10 | Any runnable line in the Action area MUST be distinguishable from design prose (dedicated section/appendix and/or consistent fencing and labeling). | Must |
| FR-11 | **Moodboard** skill MUST scaffold versioned folders per §5.4.1 under [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules) and MUST produce a **browser-openable** preview per version. | Must |
| FR-12 | **Change-request** skill MUST persist a **traceable** CR record and MUST update **`DESIGN.md`** plus **both** light and dark previews when a CR is applied. | Must |
| FR-13 | **Variations** skill MUST keep variations **versioned** and MUST expose them in preview UI via a **selector** on light and dark pages (§5.4.3 under [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)). | Must |
| FR-14 | **Color-rules** skill MUST ensure pairing/combination rules exist in `DESIGN.md` (insert if absent) and MUST surface them on **design-system** preview pages (§5.4.4 under [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)). | Must |
| FR-15 | Preview generator enhancements for variations and rules panels SHOULD remain **Node-only** (no new mandatory Python stack), consistent with [NFR-4](#9-non-functional-requirements). | Should |
| FR-16 | When a CR or variation changes tokens, **§9 Agent Prompt Guide** SHOULD be reviewed so prompts do not reference removed color ids. | Should |
| FR-17 | Every generated **design-system** light/dark preview MUST **append** a **collapsible** “History of changes” block that is **collapsed on first paint**, per [§5.5](#55-preview-change-history-embedded-and-standalone). | Must |
| FR-18 | Preview generator MUST emit a **standalone** changelog HTML file (light; dark pair if dual previews exist) that **reuses the same design** (tokens, type, layout) as catalog previews, and MUST document the changelog **data source** format ([§5.5](#55-preview-change-history-embedded-and-standalone)). | Must |
| FR-19 | The repo **SHOULD** support a **skill integration config file** declaring **MCP**-backed access to PM tools (e.g. Jira) and which **fields** (at minimum **status**) to read for preview badges ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-20 | `DESIGN.md` SHOULD support an optional, documented mapping from **design elements** (e.g. Button) to **external issue keys** so status lookup is deterministic ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-21 | When PM integration is enabled and mappings exist, **design-system** previews SHOULD show the retrieved **status** next to the corresponding component on **both** light and dark pages ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-22 | If MCP or the PM API is unavailable, preview generation MUST still succeed and MUST show a **defined fallback** for badges ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Must |
| FR-43 | The repo SHOULD support optional per-element/per-component **git commit tracking** in previews (SHA and/or URL), including **GitHub commit links**, with graceful fallback when commit metadata is missing or invalid ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-23 | The product **MUST** support attaching designer **screenshots** to **sections**, **components**, and **elements** via files under **`sample-images/`** (or documented alternate, e.g. `sample-image/`) with a **stable scope id** per [§5.7](#57-designer-screenshot-attachments-and-sample-images). Teams MAY omit folders when they have no attachments. | Must |
| FR-24 | When attachments exist for a scope, catalog previews **MUST** render **below** that block: **≤ 3** tiny **thumbnail** previews plus the **total number** of image files in that folder ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). | Must |
| FR-25 | The **sample-images** skill or preview pipeline MUST **rescan** image folders on **every** preview generation run so attachment strips match current files on disk ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). | Must |
| FR-26 | **Multi-assistant usability:** `docs/template-DESIGN.md`, shipped `DESIGN.md` patterns (Definition + Action), `AGENTS.md`, and README **SHOULD** describe the phased workflow in terms **portable across coding assistants** (e.g. **GitHub Copilot**, **Claude Code**, **Cursor**, **Google Gemini**–based tools, **OpenAI Codex**, **Mistral Codestral**). Prose and runbooks **MUST NOT** rely on Cursor-only concepts where a **neutral** instruction (shell, npm, file paths, checklist) suffices. Where Cursor skills are the shortest path, **AGENTS.md** or README **SHOULD** state the **equivalent human or generic-agent** steps for teams not using Cursor. | Should |
| FR-27 | The repository **MUST** ship **`docs/design-definition-form.md`** (markdown) as the canonical **Step 1** intake: predefined sections for designer **and** developer input covering at minimum **product identity**, **primary and accent (and related) color roles**, **Title 1** typography (font family, size, weight, line-height), **body** type defaults, **layout / radius / shadow** basics, **component presence** checklist, **§7/§8 structure intent**, and **sign-off**. README **or** `AGENTS.md` **SHOULD** point authors to this file **before** or **alongside** Part I–II of `docs/template-DESIGN.md`. The form **SHOULD** state how it maps to Stitch §1–§9 and template **U1–U16** / Part II. | Must |
| FR-28 | The product MUST support **`component-preview_config.json`** as a declarative source for generating component-focused preview artifacts (including variants/states/examples) beyond the default design-system token catalog pages. | Must |
| FR-29 | The product MUST support **`layout-preview_config.json`** as a declarative source for generating section-level and full-page layout previews composed from design-system components/widgets. | Must |
| FR-30 | At least one Cursor skill (or two dedicated skills) MUST document and support **create** and **update** operations for both component and layout preview configs and their generated artifacts. | Must |
| FR-31 | Component/layout preview outputs SHOULD be regenerated as part of the same preview workflow used for existing design-system previews to reduce drift after token/component changes. | Should |
| FR-32 | All preview page families (design-system catalog, changelog, component, layout/page) MUST be created and updated via documented workflows (Cursor skills and/or equivalent neutral script commands), not manual ad hoc HTML-only edits as the primary path. | Must |
| FR-33 | The project MUST generate one static **preview dashboard page** that serves as the common browser entry point. The dashboard MUST link all preview families when present and MUST provide a valid empty state for families not yet generated. | Must |
| FR-34 | The preview dashboard SHOULD display static generation-time insights (counts/trends/last-updated indicators) derived from local files/configs, and MUST remain viewable without backend connectivity. | Should |
| FR-35 | The preview pipeline MUST define and emit a documented, framework-agnostic schema contract for static preview intelligence (manifest/links/stats), consumed by generated pages without requiring a backend at view time. | Must |
| FR-36 | Preview runtime artifacts MUST remain framework-independent at consumption time (plain static HTML/CSS/JS). React or other framework tooling MAY be used during generation only if outputs conform to the shared schema. | Must |
| FR-37 | Dashboard and preview smart behaviors (filters, variant toggles, counters, trend summaries, empty states) SHOULD read from generated local schema files rather than hard-coded duplicated values in each HTML page. | Should |
| FR-38 | The repository SHOULD provide an **optional** Storybook bridge under `design-previews/storybook/` with mapping guidance and starter files for Storybook-native component previews, without making Storybook a required dependency. | Should |
| FR-39 | Storybook bridge guidance SHOULD preserve design-o-mat override precedence semantics (global -> component -> preview override) so behavior stays consistent across independent and Storybook paths. | Should |
| FR-40 | The Storybook bridge SHOULD include a parity acceptance fixture demonstrating equivalent override resolution (`global -> component -> preview/story`) against the independent config model for at least one representative component. | Should |
| FR-41 | The Storybook bridge SHOULD define an optionality acceptance check: removing or ignoring `design-previews/storybook/` MUST NOT break independent static preview generation from `design-previews/*.json`. | Should |
| FR-42 | Storybook-native example stories SHOULD cover configured states/variants from `component-preview_config.json` (or a documented subset) so teams can verify mapping behavior, not only scaffold files. | Should |
| FR-44 | The product **SHOULD** ship or link to a **GitHub template repository** (template flag enabled) so users—especially **non-technical** contributors—can create a **new design-system repository** via **Use this template** with the expected starter tree and README **first steps**, without relying solely on manual copy from the canonical repo ([§5.1](#51-in-scope)). | Should |
| FR-45 | The repository **SHOULD** ship **`docs/design-guidelines.md`** (markdown scaffold or populated starter) documenting how teams **create and update** **designer-owned usage guidance** for applying the design system in real product UI, distinct from normative **Definition** in `DESIGN.md`. README **or** `AGENTS.md` **SHOULD** point authors to this file when usage guidance is part of the workflow ([§5.1](#51-in-scope), [§7.1](#71-greenfield-spec-happy-path)). | Should |
| FR-46 | The product **SHOULD** ship a **codebase adherence audit** that **parses** a **configured scope** of source files, **validates** findings against **`DESIGN.md`** (design-system Definition) and against **`docs/design-guidelines.md`** when present, and emits a **rating** or scored adherence summary plus structured per-finding details ([§5.11](#511-codebase-adherence-audit), [§7.9](#79-codebase-adherence-audit-planned)). | Should |
| FR-47 | The repository **SHOULD** document and, when implemented, **ship** a **brownfield** workflow ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)) that covers: **repo-side inventory** of token sources and component roots; **ordering** of phases for existing codebases; a **repeatable refinement loop** (previews → audit when available → triage → spec/CR edits → regenerate); and **optional variations** for legacy-vs-target comparison. Neutral prose for non-Cursor users **SHOULD** appear in template and/or README as for other phases ([FR-26](#8-functional-requirements)). | Should |
| FR-48 | The product **SHOULD** ship a **`docs/design-guidelines.md` bootstrap** capability (CLI and/or **`design-md-*`** skill) that emits a **draft** guidelines file from **structured inputs** (inventory, audit summary, reconciliation notes) with a **mandatory DRAFT banner** and **without** duplicating full **`DESIGN.md`** token tables ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [NFR-15](#9-non-functional-requirements), [NFR-17](#9-non-functional-requirements)). | Should |
| FR-49 | The brownfield workflow **SHOULD** emit a **reconciliation artifact** mapping **legacy names** to **normalized** `DESIGN.md` roles (or explicit **unmapped** debt) so normalization and drafting do not drop **aliases** silently ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation)). | Should |
| FR-50 | When brownfield CLI steps or skills ship, they **MUST** appear in the **authoritative skill index** per [FR-5](#8-functional-requirements) and **SHOULD** wrap or document the **same** **Node.js v24+** commands for Cursor and non-Cursor users ([NFR-4](#9-non-functional-requirements)). | Must |
| FR-51 | **`docs/template-DESIGN.md`**, README, and/or `AGENTS.md` **SHOULD** document that **new** components **reference `DESIGN.md` token and component ids** in implementation and in **§9** prompts; **`DESIGN.md` §9** **SHOULD** include at least one **worked example** of **composing a third-party primitive** (e.g. **shadcn/ui** **Dropdown** / **Select** pattern) **while binding** to **project token roles** ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [§7.11](#711-developer-new-component-token-native-third-party-primitive)). | Should |
| FR-52 | The product **SHOULD** document the **compose-then-theme** checklist (pick §4 spec → optional primitive → apply tokens and states → verify guidelines) and **MAY** reference an **optional** **primitive registry** file or table maintained by the team ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)). | Should |
| FR-53 | Persona and **§9** guidance for **coding agents** **SHOULD** require: when a **primitive library** is used, **do not** ship **default** primitive styling where it **conflicts** with **`DESIGN.md`**; **surface** conflicts for human review instead of silent mismatch ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [§4](#4-target-users-and-personas)). | Should |
| FR-54 | The repository **SHOULD** document running the **canonical design system as its own Git repository** and **pinning strategies** (**submodule**, **Git semver tag**, **`npm`/`pnpm` git dependency**, **vendor copy + recorded SHA**) for **consumer** application repos consuming **`DESIGN.md`** and related artifacts ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [§7.12](#712-release-and-consume-a-versioned-design-system)). | Should |
| FR-55 | **Release workflow** prose (**README**, `RELEASE.md`, or template appendix) **SHOULD** spell out **finalize → tag → changelog/release notes → consumer bump pin** coordination so designers and engineers can designate “**approved for upcoming product release X**” without ambiguous **floating branch** reliance ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [§7.12](#712-release-and-consume-a-versioned-design-system)). | Should |
| FR-56 | The product **SHOULD** recommend **one observable version signal** (annotated Git tag minimum; optionally **`DESIGN_SYSTEM_VERSION`** in **`package.json`**, **`design-system-manifest.json`**, or §1 semver echo) wired into **consumer** **`AGENTS.md`** path guidance so **agents** read **pinned** spec ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [§6.1](#61-definition-area)). | Should |

---

## 9. Non-functional requirements

| ID | Requirement | Notes |
|----|-------------|-------|
| NFR-1 | **Portability** — Skills and scripts usable when copied into another repo’s workspace. | README already describes copy path. |
| NFR-2 | **Clarity** — Prefer tables and explicit phase numbers over prose-only runbooks. | Align with `docs/template-DESIGN.md`. |
| NFR-3 | **Maintainability** — Changes to Stitch or awesome-design-md format expectations SHOULD be reflected in `design-md-stitch-format` and template/corpus docs together. | Process expectation for maintainers. |
| NFR-4 | **No Python dependency** — preview generation **and any other first-party repository scripts or automation** MUST use **Node.js v24 or newer** (JavaScript; ES modules; `engines.node` in `package.json`). Do not introduce a mandatory Python stack for tooling shipped in this repo. | Stated in template and `package.json`; see `AGENTS.md` for agent-facing wording. |
| NFR-5 | **Discoverability** — Moodboards, change requests, and variations use **documented folder layouts** and naming so agents and humans can list history without tribal knowledge. | New skills MUST ship a short convention section in `SKILL.md` or repo `docs/`. |
| NFR-6 | **Preview portability** — Moodboard and design-system previews SHOULD be openable as **static files** (`file://` or any static server) unless a skill explicitly documents otherwise. | Keeps designer workflow lightweight. |
| NFR-7 | **Accessible disclosure** — Collapsible history MUST be operable with **keyboard** and MUST expose an appropriate **accessible name** (native `<details>`/`<summary>` preferred). | Avoids custom-only click targets. |
| NFR-8 | **Secrets hygiene** — PM API tokens, OAuth client secrets, and PATs MUST **not** be committed in the skill config, `DESIGN.md`, or generated HTML; use **Cursor MCP auth**, environment variables, or OS secret stores only. | Config references server **names**, not raw credentials. |
| NFR-9 | **Resilience** — PM integration SHOULD respect **rate limits** and SHOULD use **caching** or batch fetch where documented so repeated preview runs do not spam Jira. | Optional backoff / TTL in config. |
| NFR-10 | **Thumbnail weight** — Preview pages MUST NOT require downloading full-resolution originals for every attachment by default; use constrained dimensions, `srcset`, or pre-generated small assets. | Keeps `preview.html` usable on slow links. |
| NFR-11 | **Skill catalog scalability** — With **10+** skills, a new contributor MUST still find **what exists** and **when to use it** within **two minutes** via the index in [FR-5](#8-functional-requirements); avoid duplicate or overlapping `description` triggers without a disambiguation note in the catalog. | Prefer `docs/skills-catalog.md` once README tables become unwieldy. |
| NFR-12 | **Assistant-agnostic core** — A reader using **only** `DESIGN.md`, **`docs/design-definition-form.md`**, `docs/template-DESIGN.md`, and README (no Cursor) MUST still understand **Step 1 intake**, **later phases**, **validation**, and **preview generation** prerequisites without opening `.cursor/skills/`; skill folders **add** Cursor-native ergonomics, they **MUST NOT** be the sole place critical requirements live ([FR-26](#8-functional-requirements), [FR-27](#8-functional-requirements)). **`docs/design-guidelines.md`** is **optional** for that minimum bar: when present, README or `AGENTS.md` **SHOULD** say whether contributors and agents **should** read it for UI work; **normative** tokens and components remain in **`DESIGN.md`** ([FR-45](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)). | Keeps Copilot / Claude Code / Gemini / Codex / Codestral workflows viable. |
| NFR-13 | **Static-only preview surfaces** — All generated preview pages, including the common dashboard and any statistics/trend widgets, MUST function as static files without requiring a running backend, database, or live API at view time. | Preserves offline portability and simple sharing (`file://` or static host). |
| NFR-14 | **Framework-neutral runtime** — A consumer opening generated previews MUST NOT need React/Vue/Svelte runtime dependencies; any optional framework adapters are build-time concerns only. | Keeps outputs portable across stacks and tooling choices. |
| NFR-15 | **Guidelines vs Definition** — When **`docs/design-guidelines.md`** is present, **normative** tokens, components, and states remain authoritative in **`DESIGN.md`**; usage prose **MUST NOT** silently contradict the Definition. Conflicts **SHOULD** be resolved by updating `DESIGN.md` or the guidelines with an explicit change record ([FR-45](#8-functional-requirements)). | Keeps a single spec truth while allowing rich usage narrative. |
| NFR-16 | **Adherence audit transparency** — Reports **MUST** distinguish **deterministic** checks from **optional** LLM-assisted or heuristic findings. Any **pass/fail** gate relied on in CI **MUST** be reproducible from committed inputs (`DESIGN.md`, guidelines, scope config, rule version) without undisclosed remote inference unless the team explicitly opts in. The audit **MUST NOT** send repository contents to external services by default ([FR-46](#8-functional-requirements)). | Prevents false confidence and surprise data egress. |
| NFR-17 | **Bootstrap guidelines are non-authoritative until reviewed** — Any **auto-generated** `docs/design-guidelines.md` (or appended bootstrap section) **MUST** ship with an explicit **DRAFT / machine-generated** banner until removed by a **human**; agents and audits **MUST** treat **`DESIGN.md`** as **normative** for tokens and components when **conflicts** arise ([FR-48](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)). | Prevents draft usage prose from overriding the Definition. |
| NFR-18 | **Third-party neutrality** — **shadcn/ui** and similar libraries are **illustrative** only; references in **`DESIGN.md`**, PRD, and examples **MUST NOT** imply a **mandatory** stack. **Licenses**, **supply chain**, and **version upgrades** for third-party primitives remain **the owning team’s** responsibility ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)). | Keeps design-o-mat portable across frameworks and vendors. |
| NFR-19 | **Reproducible design-system pins** — Any documented **consumption flow** SHOULD record an **immutable** **Git SHA** somewhere in the consumer repo (**lockfile**, **submodule commit**, **manifest**, **release checklist**) even when **semver tags** decorate releases, so auditors and audits can correlate **implemented UI** ↔ **exact** `DESIGN.md` snapshot ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements)). | Aligns adherence and RCA with deterministic inputs. |

---

## 10. Success metrics

Release-gate checks live in [§10.1](#101-release-gate-metrics-measurable); **MVP vs backlog** sequencing hints are in [§10.3](#103-mvp-vs-backlog-planning-signal).

| Metric | How to observe |
|--------|----------------|
| **Completeness** | A new author can produce a validated Part IV `DESIGN.md` using repo artifacts (including **`docs/design-definition-form.md`** Step 1) and skills, without external proprietary docs. |
| **Intake alignment** | For **greenfield** work, **design** and **engineering** complete **`docs/design-definition-form.md`** before deep Part II authoring; Part I–II entries do not silently contradict signed-off color/type without an explicit update or change record. For **brownfield** work, the same form captures **existing tokens and constraints** before normalization claims completeness, consistent with [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap). |
| **Skill utility** | Each skill maps to a named phase or task in the **authoritative index** ([FR-5](#8-functional-requirements)) and template; **no orphan skills** (every `.cursor/skills/design-md-*` folder appears in the index). |
| **Preview fidelity** | Generated HTML reflects documented hex roles; known limitation (e.g. Inter fallback) is documented in template Phase 6. |
| **Adoption** | Third-party repos copy skills/template **or** start from the **GitHub template repository**; issues/PRs reference phases and section numbers consistently. |
| **Spec vs runbook clarity** | New contributors can identify which part of `DESIGN.md` is “what to build” vs “what to run” within one minute of skimming headings. |
| **Moodboard reuse** | Any moodboard version from the last *N* iterations can be located from the repo tree and opened in a browser without undocumented manual steps. |
| **CR ↔ preview parity** | After a closed change request, light and dark previews both reflect the same token/component reality as `DESIGN.md` for the scope of that CR. |
| **Variation compare** | Stakeholders can switch among declared accent (or other) variations in-browser without editing HTML by hand. |
| **Pairing visibility** | Forbidden combination examples from `DESIGN.md` appear on preview pages so black-on-near-black class mistakes are obvious before implementation. |
| **Dashboard usability** | A contributor can open one dashboard file and reach every generated preview page from it in one click path, without starting any server. |
| **Dashboard insight freshness** | After regenerating previews, dashboard counters/trend summaries (components/layouts/updates) match current local artifacts and changelog inputs from the same run. |
| **Changelog UX** | Opening a fresh `preview.html` shows the main catalog without expanded history noise; expanding the block or opening the standalone changelog reveals the same ordered entries. |
| **PM status parity** | For a component mapped to `PROJ-123`, the badge text on `preview.html` matches Jira’s **status** field at last successful snapshot (e.g. **Approved**). |
| **Screenshot strip accuracy** | After adding 12 files under `sample-images/s4-button/`, the Button block shows **3** thumbnails and text reflecting **12** total; deleting 10 files and regenerating updates the strip the same day without manual HTML edits. |
| **Cross-assistant clarity** | A developer using **GitHub Copilot**, **Claude Code**, **Gemini**-class tooling, **OpenAI Codex**, or **Mistral Codestral** (no Cursor) can follow README + `AGENTS.md` + **`docs/design-definition-form.md`** + template to complete [§7.0](#70-shared-intake-designdefinitionformmd) and the greenfield journey in [§7.1](#71-greenfield-spec-happy-path) using **generic** shell and npm steps documented in the Action area and README; any Cursor-only shortcut is duplicated or summarized in neutral prose ([FR-26](#8-functional-requirements), [NFR-12](#9-non-functional-requirements)). |
| **Usage guideline freshness** | When product patterns change, **`docs/design-guidelines.md`** is updated in the same cadence as visible UI work (or linked CR); spot checks show no stale references to removed `DESIGN.md` components or tokens ([FR-45](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)). |
| **Adherence signal** | After running the **codebase adherence audit** on a configured UI slice, the **aggregate rating** and top findings are reviewable in one session; re-running on the same commit with the same config yields **consistent deterministic results** for all checks marked deterministic in the report ([§5.11](#511-codebase-adherence-audit), [FR-46](#8-functional-requirements), [NFR-16](#9-non-functional-requirements)). |
| **Brownfield convergence** | A team with an **existing app** can follow [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap) using repo docs alone; **inventory + reconciliation** artifacts exist before **normalize** claims **complete** coverage; **`docs/design-guidelines.md`** exists only after **bootstrap + human strip of DRAFT** ([FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements), [NFR-17](#9-non-functional-requirements)). |
| **Guideline bootstrap hygiene** | Generated **`docs/design-guidelines.md`** contains the **DRAFT** banner until explicitly removed; spot checks show **no duplicated** full §2 token tables from `DESIGN.md` ([FR-48](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)). |
| **Primitive + token coherence** | A **spot review** of a **new** **Dropdown-class** UI (or other §4-complex widget) implemented with **shadcn/ui** (or comparable) shows **explicit `DESIGN.md` roles** applied in code or theme; **`§9`** contains a reproducible prompt pattern aligned with **[§7.11](#711-developer-new-component-token-native-third-party-primitive)** ([FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements), [NFR-18](#9-non-functional-requirements)). |
| **Design-system ↔ product release alignment** | For teams using **[§7.12](#712-release-and-consume-a-versioned-design-system)**, a **released product milestone** cites a **matching** pinned **design-system** **tag or SHA**; **no ambiguous** live-on-`main` consumption without an **explicit** exception note ([FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)). |

### 10.1 Release-gate metrics (measurable)

The following checks are recommended as **release gates** for **preview** changes and—**when the corresponding capability ships**—for **adherence audit**, **brownfield bootstrap**, and **design-system versioning** work.

| Gate | Pass criterion |
|------|----------------|
| **Dashboard link integrity** | 100% of dashboard links resolve to either an existing artifact or an explicit empty-state destination (no broken links). |
| **Preview generation reliability** | Required preview families for the selected mode (independent; optional Storybook bridge when enabled) generate without hard failure in CI/local scripted run. |
| **Schema freshness** | Generated `preview-manifest.json` / `preview-links.json` / `preview-stats.json` timestamps or version markers reflect the latest successful generation run. |
| **Override precedence parity** | Fixture checks confirm `global -> component -> preview/story` precedence resolves as documented in both independent and Storybook-bridge flows when Storybook mode is enabled. |
| **Static portability** | `preview-dashboard.html` and linked artifacts open under `file://` (or static host) without backend dependency. |
| **Adherence report contract** *(when [§5.11](#511-codebase-adherence-audit) / [FR-46](#8-functional-requirements) ships)* | Each run emits the documented **machine-readable** report; **deterministic** findings are reproducible on the same inputs per [NFR-16](#9-non-functional-requirements); **scope config** is committed or documented for CI. |
| **Brownfield artifact completeness** *(when [§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation) automation ships; [FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements))* | **Inventory** and **reconciliation** artifacts exist before claiming normalized coverage; **draft** `docs/design-guidelines.md` retains **DRAFT** banner until human removal ([NFR-17](#9-non-functional-requirements)). |
| **Consumer pin recorded** *(when teams adopt [§5.14](#514-design-system-repository-versioning-and-consumer-pinning); [FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements))* | **Consumer** repo change that bumps the design-system dependency includes a **recorded immutable ref** (resolved **SHA** or equivalent) per [NFR-19](#9-non-functional-requirements). |

### 10.2 Preview definition of done

A preview feature change is done when all applicable checks pass:

1. Config inputs parse successfully (`preview-config.json`, plus component/layout configs as relevant).
2. Default values apply for missing definitions; explicit values override defaults.
3. Required artifacts are generated (catalog/changelog/component/layout/dashboard/schema files as applicable).
4. Dashboard links and empty states are valid.
5. Metrics/stat summaries are updated from documented sources.
6. Optional Storybook bridge parity checks pass if Storybook mode is enabled.

### 10.3 MVP vs backlog (planning signal)

This subsection does **not** change **FR** priorities; it gives maintainers a **default sequencing** hint when capacity is limited.

| Track | **MVP / near-term** (documentation + shipped tooling in this repo today or next) | **Backlog** (documented in PRD; ships when resourced) |
|-------|-----------------------------------------------------------------------------------|--------------------------------------------------------|
| **Previews & Stitch spec** | `DESIGN.md` workflow, `generate-design-previews`, catalog/changelog/dashboard, component/layout configs ([FR-28](#8-functional-requirements)–[FR-37](#8-functional-requirements)). | Storybook bridge polish ([FR-38](#8-functional-requirements)–[FR-42](#8-functional-requirements)) if not blocking teams. |
| **Adherence** | Scope config + report format + **deterministic** rule set documented alongside [§5.11](#511-codebase-adherence-audit) ([FR-46](#8-functional-requirements), [NFR-16](#9-non-functional-requirements)). | LLM-assisted guideline interpretation; multi-framework parsers beyond what the team documents first. |
| **Brownfield** | **Documentation-first** path in template/README/`AGENTS.md` ([FR-47](#8-functional-requirements)); manual inventory/reconciliation checklists. | Automated **`brownfield-inventory.json`**, guideline generator, dedicated **`design-md-*`** skills ([FR-48](#8-functional-requirements)–[FR-50](#8-functional-requirements)). |
| **Primitives & §9** | **Compose-then-theme** prose and **§9** few-shot examples ([FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements)). | Optional **`design-md-compose-component`** skill ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)). |
| **Versioning** | **README** / template guidance for tags, pins, and **manifest** shape ([FR-54](#8-functional-requirements)–[FR-56](#8-functional-requirements)). | Hosted registry, `npx` distribution ([§5.3](#53-future-considerations-backlog-signals-not-committed)). |

---

## 11. Technical constraints

### 11.1 Committed constraints

- **Runtime:** Node.js **>= 24** for `scripts/generate-design-previews.mjs` and other repo scripts (`package.json` `engines`).
- **Module format:** ES modules (`"type": "module"` in `package.json`).
- **Primary artifact name:** `DESIGN.md` (exact casing) for compatibility with Stitch and awesome-design-md conventions.
- **Intake form:** `docs/design-definition-form.md`; teams duplicate into their workspace for **Step 1** ([FR-27](#8-functional-requirements)).
- **Design usage guidelines:** `docs/design-guidelines.md` for **designer-maintained** application and flow guidance; complements `DESIGN.md` ([FR-45](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)).
- **Component preview config:** `component-preview_config.json` defining component examples, variants, and state combinations for additional preview outputs.
- **Layout preview config:** `layout-preview_config.json` defining section-level and full-page compositions using design-system components/widgets.
- **Preview dashboard artifact:** one static HTML entry page per project (canonical default: `preview-dashboard.html`) linking all preview surfaces and optional generation-time metrics.
- **Schema artifacts:** generated JSON contracts for static intelligence (canonical defaults: `preview-manifest.json`, `preview-stats.json`, `preview-links.json`) colocated with preview outputs unless explicitly overridden by config.
- **Optional Storybook bridge:** `design-previews/storybook/` with mapping docs and starter `.storybook`/CSF example files for teams that use Storybook; this bridge is non-blocking for independent preview generation.

### 11.2 Future/conditional constraints

The following are important constraints but may be conditional on feature enablement or release phase:

- **Artifact folders:** `moodboards/`, `change-requests/`, and `variations/` (exact names MAY be adjusted in implementation if documented in skills and README).
- **Changelog artifacts:** alongside catalog previews, emit standalone `preview-changelog.html` (and dark counterpart when applicable); changelog input path and schema documented next to `scripts/generate-design-previews.mjs`.
- **PM integration config:** one documented YAML (or JSON) file for MCP server ids and field mappings; optional generated snapshot `preview-pm-status.json` (gitignored or committed per team policy—document tradeoffs).
- **Sample images tree:** default `sample-images/<scope-id>/*.{png,jpg,jpeg,webp,gif}` next to `DESIGN.md` or repo root; scope ids documented alongside preview generator and optional `design-md-sample-images` skill.
- **Skills catalog:** optional `docs/skills-catalog.md` as the long-term home for the [FR-5](#8-functional-requirements) index when the skill count outgrows README tables; README retains at least a **pointer** to the full list.
- **Codebase adherence audit:** documented **scope config** (include/exclude paths or globs), **rule pack** or parser version id, and default output paths for **machine-readable** and **human-readable** reports ([§5.11](#511-codebase-adherence-audit), [FR-46](#8-functional-requirements)).
- **Brownfield bootstrap:** default paths for **inventory** (`brownfield-inventory.json` or documented equivalent), **reconciliation** artifact, optional **brownfield config** merging audit scope with token-scan roots ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [FR-47](#8-functional-requirements)–[FR-50](#8-functional-requirements)).
- **Third-party primitives:** optional team-maintained **`component-primitive-map.md`** (or equivalent) naming **preferred** wrappers (example: Dropdown → **shadcn/ui** **DropdownMenu**); **never** substitutes for **`DESIGN.md`** tokens ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [FR-52](#8-functional-requirements)).
- **Design-system versioning:** optional **`design-system-manifest.json`** (or `package.json` **`DESIGN_SYSTEM_VERSION`**); **consumer** repo **pin** recorded as **submodule** path + commit, **lockfile** git URL + resolved SHA, or equivalent ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [FR-56](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)).

---

## 12. Dependencies and references

| Dependency | Role |
|------------|------|
| [Google Stitch — design-md](https://stitch.withgoogle.com/docs/design-md/overview/) | Format authority for sections 1–8. |
| [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Corpus patterns; section 9 and preview pairing inspiration. |
| Cursor | **Primary** host for first-party **project skills** under `.cursor/skills/`. |
| LLM-backed coding assistants (e.g. **GitHub Copilot**, **Claude Code**, **Google Gemini**–based tools, **OpenAI Codex**, **Mistral Codestral**) | **Consumers** of the same `DESIGN.md` / template / runbooks; no mandatory dependency for reading the spec or running Node previews ([FR-26](#8-functional-requirements)). |
| [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) | Optional bridge for skills or tooling to call **Jira** and other PM APIs through editor-configured servers, feeding preview status badges. |
| Atlassian Jira (or MCP Jira server) | Example PM backend; **status** field on issues drives badges described in [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews). |
| Git (local repo metadata) and GitHub (optional) | Optional source for commit traceability shown beside mapped elements/components in previews (SHA/link snapshots) per [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews). **Tags / releases** underpin **design-system repo versioning** and **consumer pinning** ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning)). |
| [GitHub repository templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) | **Use this template** on the prepared **design-system starter** repo so new projects inherit the documented layout without manual scaffolding ([§5.1](#51-in-scope), [FR-44](#8-functional-requirements)). |
| [shadcn/ui](https://ui.shadcn.com/) *(optional consumer dependency)* | **Example** copy-in primitive library (**not** mandated by design-o-mat); used in PRD as a **canonical illustration** for **compose-then-theme** with **`DESIGN.md`** ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [NFR-18](#9-non-functional-requirements)). |

---

## 13. Glossary

| Term | Definition |
|------|------------|
| **DESIGN.md** | The shipped design-system markdown consumed by agents and humans (Part IV body). |
| **Part IV** | In `docs/template-DESIGN.md`, the section that becomes the standalone `DESIGN.md`. |
| **Skill** | A folder under `.cursor/skills/` containing `SKILL.md` with front matter and instructions. |
| **Skill catalog** | The **authoritative list** of shipped skills and when to use them, maintained per [FR-5](#8-functional-requirements) and [§5.0](#50-skill-catalog-and-extensibility) (README and/or `docs/skills-catalog.md`). |
| **`design-md-` skill prefix** | Required naming prefix for first-party design-o-mat skills so agents and grep stay predictable as the set grows ([§5.0](#50-skill-catalog-and-extensibility)). |
| **§7 / §8** | Sections 7 and 8 of the spec; titles and split vary by real-world corpus (Do’s/Don’ts, Responsive, Dark Mode, Motion, Accessibility, etc.). |
| **Definition area** | The portion of `DESIGN.md` that declares the design system (Stitch-aligned sections 1–9 and supporting narrative) optimized for AI and human readers. |
| **Action area** | The portion of `DESIGN.md` that holds invocable procedures: shell commands, scripts, validation steps, and similar operations (**check**, **validate**, **create**, **update**, **delete**, etc.), clearly separated from the Definition area. |
| **Moodboard** | A versioned exploratory artifact (references, images, notes, HTML preview) stored under a dedicated `moodboards/<slug>/…` path. |
| **Change request (CR)** | A documented request to alter the design system; applied via skill workflow to `DESIGN.md` and regenerated previews. |
| **Variation** | A named alternative token set (e.g. accent palette **A** / **B** / **C**) kept under version control and selectable in preview HTML. |
| **Pairing rules** | Normative tables in `DESIGN.md` stating which color roles may be combined and which combinations are forbidden, with preview surfacing. |
| **Preview change history** | Ordered list of notable changes to tokens, previews, or CRs, rendered at the end of catalog previews inside a **collapsed-by-default** disclosure and again on a **standalone** changelog HTML page sharing the same visual design. |
| **Skill PM config** | Repo-level file declaring MCP server ids and PM **field mappings** (e.g. Jira **status**) for enriching previews; excludes secrets ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). |
| **Status badge (preview)** | Small label beside a component in catalog HTML showing the latest fetched **workflow status** (e.g. **Approved**) for the linked Jira issue. |
| **Commit badge/link (preview)** | Optional label or link beside a component/element showing a mapped commit reference (SHA/short SHA or URL), including GitHub commit links when configured. |
| **`sample-images/`** | Default folder tree holding designer **screenshot attachments** keyed by scope id; rescanned on each preview run ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). |
| **Thumbnail strip** | Up to **three** small previews under a section/component/element in catalog HTML, plus text giving the **total** count of images on disk for that scope. |
| **Preview dashboard** | A single static project page that links all preview artifacts and may include static generation-time summaries (counts/trends/last updated), without backend dependencies. |
| **Preview schema contract** | Framework-agnostic JSON artifacts (manifest/links/stats) generated alongside previews so static pages can provide “smart” UX without backend calls or framework lock-in. |
| **Mosaic tile** | A reusable, higher-complexity preview unit that composes multiple elements and components into one coherent block (typically more complex than a single component card), used to show realistic UI combinations in context. |
| **Storybook bridge (optional)** | Optional folder and mapping guidance for teams that want Storybook-native component previews; independent design-previews JSON workflow remains valid without Storybook. |
| **Multi-assistant usability** | Expectation that core repo artifacts support design-system authoring **without** locking the team to a single coding-assistant vendor; Cursor skills **enhance** Cursor, they do not replace portable template and `DESIGN.md` guidance ([§5.1](#51-in-scope), [FR-26](#8-functional-requirements)). |
| **`docs/design-definition-form.md`** | Shared **Step 1** markdown intake for **designers and developers** (colors, Title 1 / type scale, layout, components, §7/§8 intent, engineering constraints, sign-off) before full `docs/template-DESIGN.md` / `DESIGN.md` authoring ([FR-27](#8-functional-requirements), [§7.0](#70-shared-intake-designdefinitionformmd)). |
| **GitHub template repository (design-system starter)** | A **template-enabled** GitHub repo prepared from design-o-mat so **non-technical** and technical users can create a **new design-system repository** with **Use this template**; documented **first steps** and maintainer **sync** expectations per [§5.1](#51-in-scope) and [FR-44](#8-functional-requirements). |
| **`docs/design-guidelines.md`** | **Designer-owned** markdown for **usage** of the design system in product UI (patterns, flows, composition); **create and update** alongside `DESIGN.md`; does not replace **Definition** in `DESIGN.md` ([FR-45](#8-functional-requirements), [NFR-15](#9-non-functional-requirements)). |
| **Codebase adherence audit** | **Planned** workflow ([FR-46](#8-functional-requirements) **Should**) that **parses** configured source paths, **validates** against **`DESIGN.md`** and **`docs/design-guidelines.md`**, and emits an **adherence rating** plus structured findings; **when shipped**, behavior follows [§5.11](#511-codebase-adherence-audit) and [NFR-16](#9-non-functional-requirements). |
| **Brownfield (design-system context)** | A product or repo that **already contains** substantial UI implementation; the team **formalizes or replaces** styling incrementally using **`DESIGN.md`** plus **usage** docs rather than starting from empty screens ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)). |
| **Brownfield inventory artifact** | Machine-readable summary (default name **`brownfield-inventory.json`** unless documented otherwise) listing **candidate token sources**, **component roots**, and related paths produced by the brownfield inventory step ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [FR-47](#8-functional-requirements)). |
| **Reconciliation artifact** | Mapping from **legacy** token/component identifiers to **normalized** `DESIGN.md` roles, or explicit **unmapped** debt, used to avoid silent loss of aliases during normalization ([§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation), [FR-49](#8-functional-requirements)). |
| **Guidelines bootstrap (draft)** | Auto-generated **starter** `docs/design-guidelines.md` content that **MUST** carry a **DRAFT** banner until human review ([FR-48](#8-functional-requirements), [NFR-17](#9-non-functional-requirements)). |
| **Token-native implementation** | New UI code references **canonical token and component ids** from **`DESIGN.md`** rather than scattering **magic values** wherever the spec defines a role ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [FR-51](#8-functional-requirements)). |
| **Third-party primitive** | An imported or generated **behavior/structure** building block (**headless**, **Radix**, **shadcn/ui**, etc.) that teams **skin** using **project design tokens**; **appearance** conforms to **`DESIGN.md`**, not the upstream demo ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [NFR-18](#9-non-functional-requirements)). |
| **Compose-then-theme pattern** | Documented workflow: choose **`DESIGN.md` §4** semantics → optionally **compose** a **primitive** → **replace** primitive defaults with **token-bound** styling and §4 states → verify ([§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition), [§7.11](#711-developer-new-component-token-native-third-party-primitive), [FR-52](#8-functional-requirements)). |
| **Design-system repo** | Dedicated **Git repository** holding **`DESIGN.md`**, usage guidelines, previews, intake, and mirrored automation; typically **semver-tagged** for **releases** consumed by application repos ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning)). |
| **Consumer repo (application)** | **Product codebase** importing or embedding the **design-system** artifact via **pin** (**SHA**, submodule, npm git dep, vendor copy)—not inherently the authoring home of **`DESIGN.md`** when polyrepo topology is chosen ([§5.14](#514-design-system-repository-versioning-and-consumer-pinning), [§7.12](#712-release-and-consume-a-versioned-design-system)). |
| **Pin (design-system)** | Immutable **revision reference** tying a **consumer** build or release to exactly one **design-system** snapshot (**commit SHA**, resolved **tag** target, or lockfile-equivalent) ([FR-54](#8-functional-requirements), [NFR-19](#9-non-functional-requirements)). |

---

## 14. Document control

- **Owner:** Repository maintainers (CodeCubicle-Org).
- **Change process:** Update **Last modified** when materially editing requirements; bump **Document version** for major scope shifts (and for **consistency / traceability** edits that affect how readers interpret commitments).
- **Related docs:** [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`template-DESIGN.md`](template-DESIGN.md), [`design-definition-form.md`](design-definition-form.md), [`design-language.md`](design-language.md), [`design-guidelines.md`](design-guidelines.md).
- **Revision notes (abridged):** **1.27** — **§1** primitives sentence: **should** restyle/wrap (aligned with [FR-51](#8-functional-requirements)–[FR-53](#8-functional-requirements) **Should**); **§5.4** heading scoped to **§5.4.1–§5.4.4** with pointer to **§5.8–§5.14**. **1.26** — **Consistency pass:** aligned **§5.11** intro and glossary with **FR-46** (**Should**); **§2.2** goal **6** and **§5.4** intro span **§5.8–§5.14**; **Coding agent** persona and **§5.13** AI behavior aligned with **FR-53** (**Should**); **NFR-12** clarifies **`docs/design-guidelines.md`** optional for assistant-agnostic **minimum** path; **§10.1** extended gates + **§10.3** MVP vs backlog table. **1.25** — Added **[§5.14](#514-design-system-repository-versioning-and-consumer-pinning)** (dedicated **design-system Git repo**, **tags**/semver, **consumer pins**, optional manifest); **[§7.12](#712-release-and-consume-a-versioned-design-system)**; **§6.1** version cue; executive summary + pillar + planned-work **§5.14**; **§5.1**; **§2.2** goal **18**; **§2.3**, **problem**, personas; **FR-54**–**FR-56**, **NFR-19**; **§10** metric; **§11.2**, **§12**, glossary. **1.24** — Added **[§5.13](#513-token-native-component-implementation-and-third-party-primitive-composition)** (**token-native** implementation, **compose-then-theme**, optional primitive registry); **[§7.11](#711-developer-new-component-token-native-third-party-primitive)**; **§6.1** implementation hints; executive summary bullet + pillar; planned-work span **§5.13**; **§5.1**; primary **goal 17**; personas; **FR-51**–**FR-53**, **NFR-18**; success metric; **§11.2**, **§12**, glossary. **1.23** — Added **brownfield** use case **[§7.10](#710-brownfield-existing-codebase-design-system-bootstrap)** and feature set **[§5.12](#512-brownfield-design-system-bootstrap-and-guideline-generation)** (inventory, reconciliation, refinement loop, **draft `docs/design-guidelines.md` bootstrap**); primary **goal 16**; problem and personas; **§5.1** / planned-work paragraph / **§11.2**; **FR-47**–**FR-50**, **NFR-17**; success metrics; glossary; **§7.0** fork to brownfield. **1.22** — Added planned **codebase adherence audit** (**§5.11**): parse configured codebase scope, **validate** and **rate** adherence to **`DESIGN.md`** and **`docs/design-guidelines.md`**; executive summary, **§5.1**, **§2.2** goal **15**, personas, **§7.9**, **FR-46**, **NFR-16**, **§10**, **§11.2**, glossary. **1.21** — Added **`docs/design-guidelines.md`** for **designer-owned usage** guidance (create/update) alongside `DESIGN.md`; **§5.1**, **§2.2** goal **14**, problem, personas, **§7.1**/**§7.2**, **FR-45**, **NFR-15**, **§10**, **§11.1**, glossary, related docs, template row, executive summary. **1.20** — Added **GitHub template repository** intent for **non-technical** (and all) users to create a new design-system repo via **Use this template** (**§5.1**, **§4** persona, executive summary, **FR-44**, **§10** adoption, **§12**, glossary). **1.19** — Clarified that the design-system toolset is for **technical and non-technical** roles (**designers**, **PO**, **PM**, developers) in the executive summary and **§4** audience framing. **1.18** — Applied validation hardening pass: added Storybook bridge parity/optionality acceptance requirements (**FR-40**–**FR-42**), added measurable release-gate metrics and preview definition-of-done (**§10.1**, **§10.2**), and split technical constraints into committed vs future/conditional sections (**§11.1**, **§11.2**) with canonical naming/override guidance. **1.17** — Added optional **Storybook bridge** scope under `design-previews/storybook/` with explicit non-lock-in semantics, component-focused mapping parity, and new requirements (**§5.10**, **FR-38**, **FR-39**, **§11**, glossary, executive summary). **1.16** — Moved `template-DESIGN.md` into `docs/` (`docs/template-DESIGN.md`) and updated cross-references in README, AGENTS, PRD, summary, intake form, and skill docs/reference paths. **1.15** — Added **framework-agnostic smart static preview schema** contract: generation-time JSON artifacts (manifest/links/stats), static-runtime intelligence, framework-neutral consumption (no React requirement at view time), and cross-tool adapter guidance; updated **§5.9**, **§7.8**, **FR-35**–**FR-37**, **NFR-14**, **§11**, glossary, and executive summary. **1.14** — Resolved consistency gaps: aligned preview optionality with dashboard behavior (empty states allowed), made preview lifecycle workflows portable beyond Cursor-only skills, normalized PM integration wording (`FR-20`/`FR-21` to SHOULD), removed “planned” labels from committed component/layout/dashboard artifacts, and added dashboard contract details (recommended filename, minimum links, deterministic stats sources) across **§5.8**, **§7.7**, **FR-7**, **FR-20**–**FR-21**, **FR-32**–**FR-34**, **§11**. **1.13** — Added requirement that all preview page families are **skill-managed** (create/update), plus one static per-project **preview dashboard** linking all previews and optionally showing generation-time statistics/trends; explicitly **no backend required** (**§5.8**, **§7.7**, **FR-32**–**FR-34**, **NFR-13**). **1.12** — Added committed scope for **expanded preview surfaces**: component previews via **`component-preview_config.json`** and layout/page previews via **`layout-preview_config.json`**, plus skill expectations for create/update flows (**§5.8**, **§7.6**, **FR-28**–**FR-31**). **1.11** — **Node.js v24+** required for preview script and repo tooling (`engines`, runtime check in `generate-design-previews.mjs`, **FR-4**, **NFR-4**, template, README, `AGENTS.md`, generate-previews skill). **1.10** — **NFR-4** clarified: **Node.js only** for repo scripts/automation (no Python); `AGENTS.md` and README aligned. **1.6** — PM consistency pass: executive summary aligned with **§5.4–§5.7**; **§5.4** framed as planned target skills; goal **6** / **8** wording aligned with snapshot PM status and expanded CLI scope; **FR-23** / **FR-24** raised to **Must** to match **§5.7**; persona **Design ops / PM** clarified as snapshot. **1.7** — **§5.0** skill-catalog extensibility; goal **10**; **FR-5** expanded; **NFR-11**; glossary and metrics aligned for **many future skills**. **1.8** — **Multi-assistant / multi-LLM** product intent (Copilot, Claude Code, Cursor, Gemini, Codex, Codestral, etc.): executive summary, vision, goal **11**, persona, **§5.1** / **§5.2** / **§5.3**, **FR-26**, **NFR-12**, success metric, dependencies, glossary; **§5.0** note on portable skill prose. **1.9** — **`docs/design-definition-form.md`** shared **Step 1** designer–developer intake; **§7.0**, **§7.1** renumbered; goal **12**; **FR-27**; **§5.1** / problem / personas / executive summary / technical constraints / glossary / related docs.
