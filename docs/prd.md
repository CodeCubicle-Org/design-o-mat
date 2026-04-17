# Product Requirements Document — design-o-mat

| Field | Value |
|-------|-------|
| **Product** | design-o-mat |
| **Repository** | [CodeCubicle-Org/design-o-mat](https://github.com/CodeCubicle-Org/design-o-mat) |
| **Document version** | 1.7 |
| **Created** | 2026-04-17 |
| **Last modified** | 2026-04-17 |
| **Status** | Draft — living document |

---

## 1. Executive summary

**design-o-mat** is an authoring toolkit for producing a single-file UI specification in the [Google Stitch `DESIGN.md`](https://stitch.withgoogle.com/docs/design-md/overview/) style, extended with patterns from [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md). The product bundles a phased authoring template, optional HTML light/dark previews generated from documented tokens, and Cursor **project skills** so humans and agents can execute one workflow phase at a time with consistent quality.

This PRD defines what the project is for, who it serves, what is in scope, and how success is measured so contributors and consumers can align on expectations beyond the README alone.

The **Cursor skill set will grow** as features in this PRD land and new needs appear. **Naming, discovery, and documentation rules** for additional `design-md-*` (and related) skills are defined in [§5.0](#50-skill-catalog-and-extensibility) so the repo scales without ad hoc folders or undocumented agents.

For **this** repository’s `DESIGN.md`, the product treats the file as two main regions: a **Definition area** (what the system is—structured for AI and human readers) and an **Action area** (how to run checks, validation, generation, and maintenance via commands, code, and shell scripts). See [§6](#6-designmd-structure-definition-and-action-areas).

Planned work is organized under **§5** (**§5.0** governance, **§5.4–§5.7** features): **new Cursor skills** for moodboards, change requests, variations, and color pairing ([§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)); **preview change history** ([§5.5](#55-preview-change-history-embedded-and-standalone)); optional **PM status** via MCP ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)); and **designer screenshot** attachments ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). Additional skills will follow [§5.0](#50-skill-catalog-and-extensibility). The bullets below summarize the preview-facing pillars.

**Preview change history** — Design-system preview HTML MUST include a **collapsible** (initially **collapsed**) **history of changes** block appended to each page, and MUST emit a **separate** changelog HTML file that reuses the **same** layout and tokens. See [§5.5](#55-preview-change-history-embedded-and-standalone).

**PM tool status on previews** — A **skill integration config file** (repo-level, documented) MAY declare **MCP** access to project-management tools (e.g. **Jira**). At **preview build time**, the workflow retrieves fields such as **issue status** (a **snapshot** baked into static HTML—not live polling unless a future release adds it) and **renders that status next to the component** on the catalog preview (e.g. **Button** with **Approved**). See [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews).

**Designer screenshot attachments** — Designer-supplied **screenshots** attach to **sections**, **components**, and finer **elements** via files under a **`sample-images`** (or configured) tree. Catalog previews show **up to three tiny thumbnails** under each matched block plus the **total image count**; a **skill** rescans that folder on **every** preview run so the UI stays in sync with disk. See [§5.7](#57-designer-screenshot-attachments-and-sample-images).

---

## 2. Vision and goals

### 2.1 Vision

Make it practical for any team to maintain a **portable, agent-readable design spec** (`DESIGN.md`) that stays aligned with Stitch semantics, corpus reality (including known §7/§8 variants), and optional visual previews—without requiring a proprietary design tool.

### 2.2 Primary goals

1. **Reduce spec drift** — One canonical markdown file; clear separation between authoring notes (Parts I–III in the template) and the shipped Part IV body.
2. **Improve agent outcomes** — Skills with explicit triggers; section 9 (Agent Prompt Guide) for few-shot UI generation and iteration.
3. **Support evidence-based authoring** — Phases for scope lock, live capture, normalization, validation, preview generation, and ship.
4. **Stay format-compatible** — Document and tooling respect Stitch numbering and awesome-design-md extensions, including documented corpus exceptions for sections 7 and 8.
5. **Unify spec and operations in one file** — Keep declarative design content (Definition) and invocable runbooks (Action) in `DESIGN.md`, with boundaries clear enough that agents parse intent without executing prose by mistake.
6. **Treat skills as the product CLI** — Designers and developers invoke **skills and the preview pipeline**—existing `design-md-*` phases plus planned [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules)–[§5.7](#57-designer-screenshot-attachments-and-sample-images) work (moodboards, change requests, variations, pairing rules, **changelog**, optional **PM status**, **`sample-images`** thumbnails)—as scoped commands, with artifacts versioned and previewable in the browser.
7. **Changelog without clutter** — Preview surfaces carry an auditable **change history** that stays **collapsed by default** and is also available as a **dedicated HTML page** for sharing or printing.
8. **Design ↔ delivery alignment** — Optional **MCP-backed** links from `DESIGN.md` components to PM issues (Jira, etc.) surface **issue status as of preview generation** (**snapshot** in static HTML) next to the spec; **live** in-browser refresh remains out of scope until explicitly shipped ([§5.3](#53-future-considerations-backlog-signals-not-committed)).
9. **Evidence next to spec** — Designer **screenshots** attach to the right **section / component / element** and appear as a compact **thumbnail strip** on previews, refreshed from the **`sample-images`** folder whenever previews regenerate.
10. **Extensible skills surface** — New capabilities ship as **additional project skills** under documented conventions ([§5.0](#50-skill-catalog-and-extensibility)); the README (or **skills catalog** doc) and this PRD stay aligned so humans and agents always know what exists and when to use it.

### 2.3 Non-goals

- Replacing Figma, Penpot, or component libraries in code.
- Owning runtime theming or build pipelines for consuming applications (beyond documenting tokens and generating static HTML previews).
- Mandating a single interpretation of §7/§8 where the corpus intentionally varies (the product must document and allow variants).

---

## 3. Problem statement

Teams want LLM-assisted UI work to be **repeatable** and **on-brand**, but ad-hoc prompts and scattered style notes produce inconsistent components, wrong contrast, and missing states. A Stitch-aligned `DESIGN.md` addresses that, yet authors need **guidance**, **checklists**, and **optional automation** (previews) so the spec stays complete, validated, and shippable. design-o-mat packages that workflow into copyable artifacts and agent skills.

---

## 4. Target users and personas

| Persona | Needs |
|---------|--------|
| **Design system author** | Structured questionnaire, inventory (U1–U16), clear phases, validation checklist. |
| **Frontend engineer** | Token tables, component states, layout and elevation rules; optional HTML previews for quick visual QA. |
| **Coding agent (Cursor / other)** | `AGENTS.md` pointer to `DESIGN.md`; skills for scoped tasks (normalize tokens, validate, generate previews). |
| **Design / UI agent** | Single source of truth for look-and-feel; section 9 prompts for iteration. |
| **Maintainer of another repo** | Ability to copy `.cursor/skills/design-md-*`, `template-DESIGN.md`, and the preview script into another project; **predictable skill names** and a **single catalog** of skills (see [§5.0](#50-skill-catalog-and-extensibility)) reduce fork drift. |
| **Customer / stakeholder** | Change requests captured and traceable; visible outcomes in previews without editing `DESIGN.md` by hand. |
| **Visual designer** | Moodboards and multi-variation previews for exploration; pairing rules visible so unsafe combinations are avoided early; drop screenshots into **`sample-images`** and see them under the right component on the next preview run. |
| **Design ops / PM** | Jira (or similar) **status** on preview pages next to components (**snapshot** at preview generation); config-driven MCP without hard-coding vendor logic in `DESIGN.md` prose. |

---

## 5. Product scope

### 5.0 Skill catalog and extensibility

The product intentionally treats **Cursor project skills** as the primary **extensible control plane**: each new PRD feature (or sub-workflow) MAY ship as its own skill folder rather than overloading a single mega-skill. The repository MUST stay navigable as the count grows.

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
| **Authoring template** | `template-DESIGN.md`: Parts I–III workflow, Part IV body structure, phases 0–7, alignment notes with awesome-design-md corpus. |
| **Reference analysis** | Documentation such as `awesome-design-md-corpus-analysis.md` explaining real-world §7/§8 patterns. |
| **Preview generation** | `generate-design-previews.mjs` (Node 18+): parse hex tokens from `DESIGN.md`, emit `preview.html` / `preview-dark.html`, versioned `preview-vN` when files exist; embed and link **preview change history** per [§5.5](#55-preview-change-history-embedded-and-standalone); optional **PM status badges** per [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews); optional **designer screenshot thumbnail strips** per [§5.7](#57-designer-screenshot-attachments-and-sample-images). |
| **Cursor project skills** | Under `.cursor/skills/`: scope lock, capture tokens, normalize tokens, draft body, agent prompt guide, validate spec, generate previews, ship, stitch format reference; plus planned skills in [§5.4](#54-planned-cursor-skills-moodboards-change-requests-variations-combination-rules) and **sample-images** / screenshot attachment workflow in [§5.7](#57-designer-screenshot-attachments-and-sample-images). |
| **Agent onboarding** | `AGENTS.md` and README tables describing when to use which skill and typical greenfield vs small-edit flows. |
| **`DESIGN.md` layout** | Two-region model: **Definition area** (Stitch-aligned sections 1–9 and narrative spec) and **Action area** (commands, scripts, and procedural steps for check / validate / create / update / delete and similar operations). |
| **Licensing** | MIT per `LICENSE`. |

### 5.2 Out of scope (current product boundary)

- Hosted SaaS or account-based services.
- IDE plugins beyond Cursor skill markdown in this repository.
- Automatic scraping or CI that runs against arbitrary URLs without user invocation (skills may guide manual capture).

### 5.3 Future considerations (backlog signals, not committed)

- Additional preview surfaces (e.g. typography specimens beyond current script capabilities).
- CLI packaging (`npx design-o-mat`) if distribution friction becomes a recurring request.
- Optional JSON or CSS-variables export from `DESIGN.md` for codegen pipelines.
- Deeper integration (CI gates) that fail builds when preview HTML violates documented pairing rules from §2/§7.
- Live in-browser refresh of Jira status without regenerating HTML (polling or OAuth in static pages).
- Full-screen **lightbox** or zoom for attachment images beyond the three-thumbnail strip.
- **Auto-generated** skill index (e.g. script that lists `.cursor/skills/` + `description` excerpts) to reduce manual README drift.

### 5.4 Planned Cursor skills: moodboards, change requests, variations, combination rules

The following capabilities are **planned** to ship as **new Cursor project skills** (each as a folder under `.cursor/skills/` with `SKILL.md` and YAML `description`), consistent with [FR-3](#8-functional-requirements) and [§5.0](#50-skill-catalog-and-extensibility). Slug names are **suggested** until implementation; README and `AGENTS.md` MUST be updated when each skill ships ([FR-5](#8-functional-requirements)). This subsection is **target architecture**, not a commitment that all skills exist on a given calendar date. **Additional skills** beyond §5.4–§5.7 are expected over time; they follow the same §5.0 rules.

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
| **`DESIGN.md` content** | If this block is **missing**, the skill MUST **add** a normative subsection to the Definition (recommended placement: **§2 Color** companion table, or **§7** guardrails when §7 is Do’s/Don’ts; document choice in `template-DESIGN.md` when standardized). Structure MUST be machine-friendly (tables: allowed pairs, forbidden pairs, minimum contrast notes). |
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
| **Element ↔ issue mapping** | `DESIGN.md` (typically **§4 Component stylings**) MUST support an optional, machine-readable **link** from a named design element (e.g. **Button**, **Card**) to a **Jira issue key** or URL (table column, YAML front-matter block, or fenced metadata convention—standardized in `template-DESIGN.md` when shipped). Unmapped components simply omit a badge. |
| **Status retrieval** | For each mapped element, the workflow MUST retrieve the configured **status** field from the PM tool (e.g. **Approved**, **In progress**) at **preview build time**, producing a **snapshot** suitable for static HTML. |
| **Preview rendering** | Catalog previews (`preview.html` / `preview-dark.html` and versioned pairs) MUST render the status **adjacent to** the corresponding component section (e.g. subtitle, pill, or table column: `Button` — badge **Approved**), using the same typography and color tokens as the rest of the page so it does not read as an alien widget. |
| **Failure modes** | If MCP is unavailable, auth fails, or an issue key is invalid, the preview MUST **degrade gracefully** (e.g. badge `—`, `Unknown`, or last cached value with a subtle “stale” hint) and MUST NOT break generation of the rest of the catalog. |
| **Other PM tools** | The same pattern SHOULD generalize beyond Jira (e.g. **Linear**, **Azure DevOps**) via additional MCP servers and config entries, without changing the `DESIGN.md` mapping shape more than necessary. |

### 5.7 Designer screenshot attachments and sample images

Designers produce **reference screenshots** (Figma exports, product captures, annotations). These MUST be attachable to **Stitch sections** (e.g. §2 Color), **§4 components** (e.g. Button), and **sub-elements** where the spec names a distinct block (e.g. Button / **destructive** variant row). Previews MUST surface them without manual HTML editing.

| Topic | Requirement |
|-------|-------------|
| **Storage folder** | Image files live under a repo-root (or `--out`-adjacent) tree named **`sample-images/`** by default. Teams MAY configure **`sample-image/`** (singular) or another path in preview config / skill docs, but one canonical layout MUST be documented in README. Subfolders MUST map predictably to scope ids (e.g. `sample-images/s4-button/`, `sample-images/s2-palette/`, `sample-images/s4-button-destructive/`—exact naming convention fixed at implementation and mirrored in `template-DESIGN.md`). |
| **Formats** | At minimum **PNG** and **JPEG**; **WebP** and **GIF** SHOULD be accepted where the generator or browser support allows. |
| **`DESIGN.md` binding** | The Definition SHOULD declare, per section or component (or element), a **stable scope id** that matches the subfolder name or a table column (e.g. `Sample images scope: s4-button`) so agents and the preview script resolve attachments deterministically. |
| **Preview placement** | For each scope that has one or more image files, the catalog preview MUST render a **compact attachment strip immediately below** the corresponding section/component/element block (after the live demo or description for that block). |
| **Thumbnail strip UX** | The strip MUST show **at most three** images as **small thumbnails** (tiny preview: fixed max height/width, `object-fit` crop, clear alt text from filename or manifest). It MUST also show the **total count** of image files in that scope’s folder (e.g. “**3** of **12** images” or “**12** images” when *N* ≤ 3), so viewers know more assets exist than the three visible slots. |
| **Every run** | On **each** execution of preview generation (or the dedicated **`design-md-sample-images`** skill suggested name), the workflow MUST **re-read the filesystem** under `sample-images/` (or configured root) and rebuild attachment metadata so **add**, **remove**, and **rename** of files are reflected without stale caches. |
| **Skill responsibility** | A Cursor skill (standalone or folded into **generate-previews**) MUST document: how to name folders, how to add a scope id to `DESIGN.md`, and that running the skill / `npm run generate-previews` **syncs** thumbnails to current files. |
| **Performance** | The preview SHOULD NOT inline multi-megabyte originals at full resolution for all thumbs; prefer **thumbnail-sized** rendering in HTML/CSS or generated downsized assets per [NFR-10](#9-non-functional-requirements). |

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
| **PM linkage** | Optional per-component **issue keys** (Jira, etc.) live in the Definition when teams use [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews); they are not required for a valid Stitch-style doc. |
| **Screenshot scope ids** | Optional **stable ids** (for `sample-images/<id>/` folders) for sections, components, and named elements live in the Definition when teams use [§5.7](#57-designer-screenshot-attachments-and-sample-images). |

### 6.2 Action area

| Aspect | Requirement |
|--------|-------------|
| **Purpose** | Collect **commands, code, and shell scripts** (and step-by-step invocations) that **do** something against the repo or artifacts: e.g. **check**, **validate**, **create**, **update**, **delete**, and other maintenance or CI-friendly actions tied to the spec. |
| **Audience** | Humans, coding agents, and automation; each entry SHOULD state working directory, prerequisites (e.g. Node 18+), and whether the operation is read-only or mutates files. |
| **Content type** | Runnable shell lines, `npm` / `node` invocations, small scripts, validation checklists with explicit pass/fail criteria, and “how to regenerate previews” style runbooks. Destructive operations (**delete**, reset, clean) MUST be labeled as such and MUST NOT be implied by ambiguous prose. |
| **Boundaries** | The Action area MUST be visually and structurally distinct from the Definition area (e.g. a dedicated top-level section such as “Actions / Runbook”, or an appendix) so parsers and agents do not treat a command line as a design token or vice versa. |

### 6.3 How the two areas work together

- **Definition → Action:** Actions SHOULD reference which parts of the Definition they validate or regenerate (e.g. “after editing §2 hex table, run …”).
- **Action → Definition:** Actions that **create** or **update** files (previews, exports) SHOULD document outputs and versioning behavior so the Definition remains the semantic source of truth.
- **External compatibility:** Stitch-oriented **sections 1–9** live in the Definition area. The Action area is an **additive** layer for design-o-mat; external tools that only understand classic `DESIGN.md` MAY ignore the Action block if they do not need automation.

---

## 7. User journeys

### 7.1 Greenfield spec (happy path)

1. Run **scope lock** skill → fill Part I inventory and Part II questionnaire; choose §7/§8 structure per product needs.
2. If a live URL exists → **capture tokens** (evidence: screenshots, computed styles, CSS variables, fonts, breakpoints).
3. **Normalize tokens** → draft §2, §3, §5, §6 with consistent semantics.
4. **Draft body** → §1–§8 including Key Characteristics and component states.
5. **Agent prompt guide** → complete §9.
6. **Validate spec** → Phase 5 checklist.
7. **Generate previews** → `npm run generate-previews` (includes **embedded** collapsed history + **standalone** changelog pages per [§5.5](#55-preview-change-history-embedded-and-standalone)).
8. **Ship** → Part IV-only `DESIGN.md`, optional folder README, pointers in README / `AGENTS.md`.

Authors SHOULD place procedural steps from the template/skills that are “always run the same way” into the **Action area** of `DESIGN.md` as the repo’s canonical runbook, while keeping narrative spec in the **Definition area**.

### 7.2 Small edit

- Token-only change → normalize (and validate); regenerate previews if colors changed.
- §9-only change → agent prompt guide skill; validate if prompts reference obsolete tokens.

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

### 7.5 Designer screenshots (`sample-images`)

1. Pick a **scope id** for a section or component (e.g. `s4-button`) and add it to **`DESIGN.md`** per template guidance.
2. Create **`sample-images/s4-button/`** (or configured root + subfolder) and drop PNG/JPEG files.
3. Run **`design-md-sample-images`** and/or **`npm run generate-previews`** → confirm **three thumbnails** max appear **below** the Button block and copy shows **total** file count (e.g. 12 images).
4. Add or delete files in the folder → run again → counts and visible thumbs **update** without editing HTML.

---

## 8. Functional requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | The template MUST document Stitch sections 1–9, with section 9 as the additive Agent Prompt Guide layer. | Must |
| FR-2 | The template MUST document corpus exceptions for §7/§8 without forcing contradictory titles. | Must |
| FR-3 | Each project skill MUST include a YAML `description` stating when the agent should apply it. | Must |
| FR-4 | Preview script MUST run on Node 18+ and document CLI usage (`--help`, optional `--out`). | Must |
| FR-5 | The repo MUST maintain an **authoritative skill index**: either a dedicated **`docs/skills-catalog.md`** (grouped by theme as the list grows) **or** an equivalent **README** section—listing **every** shipped `design-md-*` (and documented exception) skill with **one-line purpose** and **phase / when-to-use** mapping. The index MUST be **updated in the same change** whenever a skill is **added**, **renamed**, **deprecated**, or materially re-scoped ([§5.0](#50-skill-catalog-and-extensibility)). **`AGENTS.md` SHOULD link** to that index (or embed a short cheat sheet that stays in sync). | Must |
| FR-6 | Ship guidance MUST clarify that shipped `DESIGN.md` is Part IV (or equivalent) without authoring-only noise. | Should |
| FR-7 | Previews SHOULD remain optional; repo remains useful without generated HTML checked in. | Should |
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
| FR-20 | `DESIGN.md` MUST support an optional, documented mapping from **design elements** (e.g. Button) to **external issue keys** so status lookup is deterministic ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-21 | When PM integration is enabled and mappings exist, **design-system** previews MUST show the retrieved **status** next to the corresponding component on **both** light and dark pages ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Should |
| FR-22 | If MCP or the PM API is unavailable, preview generation MUST still succeed and MUST show a **defined fallback** for badges ([§5.6](#56-skill-config-and-mcp-project-management-status-on-previews)). | Must |
| FR-23 | The product **MUST** support attaching designer **screenshots** to **sections**, **components**, and **elements** via files under **`sample-images/`** (or documented alternate, e.g. `sample-image/`) with a **stable scope id** per [§5.7](#57-designer-screenshot-attachments-and-sample-images). Teams MAY omit folders when they have no attachments. | Must |
| FR-24 | When attachments exist for a scope, catalog previews **MUST** render **below** that block: **≤ 3** tiny **thumbnail** previews plus the **total number** of image files in that folder ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). | Must |
| FR-25 | The **sample-images** skill or preview pipeline MUST **rescan** image folders on **every** preview generation run so attachment strips match current files on disk ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). | Must |

---

## 9. Non-functional requirements

| ID | Requirement | Notes |
|----|-------------|-------|
| NFR-1 | **Portability** — Skills and scripts usable when copied into another repo’s workspace. | README already describes copy path. |
| NFR-2 | **Clarity** — Prefer tables and explicit phase numbers over prose-only runbooks. | Align with `template-DESIGN.md`. |
| NFR-3 | **Maintainability** — Changes to Stitch or awesome-design-md format expectations SHOULD be reflected in `design-md-stitch-format` and template/corpus docs together. | Process expectation for maintainers. |
| NFR-4 | **No Python dependency** for preview generation. | Stated in template and `package.json`. |
| NFR-5 | **Discoverability** — Moodboards, change requests, and variations use **documented folder layouts** and naming so agents and humans can list history without tribal knowledge. | New skills MUST ship a short convention section in `SKILL.md` or repo `docs/`. |
| NFR-6 | **Preview portability** — Moodboard and design-system previews SHOULD be openable as **static files** (`file://` or any static server) unless a skill explicitly documents otherwise. | Keeps designer workflow lightweight. |
| NFR-7 | **Accessible disclosure** — Collapsible history MUST be operable with **keyboard** and MUST expose an appropriate **accessible name** (native `<details>`/`<summary>` preferred). | Avoids custom-only click targets. |
| NFR-8 | **Secrets hygiene** — PM API tokens, OAuth client secrets, and PATs MUST **not** be committed in the skill config, `DESIGN.md`, or generated HTML; use **Cursor MCP auth**, environment variables, or OS secret stores only. | Config references server **names**, not raw credentials. |
| NFR-9 | **Resilience** — PM integration SHOULD respect **rate limits** and SHOULD use **caching** or batch fetch where documented so repeated preview runs do not spam Jira. | Optional backoff / TTL in config. |
| NFR-10 | **Thumbnail weight** — Preview pages MUST NOT require downloading full-resolution originals for every attachment by default; use constrained dimensions, `srcset`, or pre-generated small assets. | Keeps `preview.html` usable on slow links. |
| NFR-11 | **Skill catalog scalability** — With **10+** skills, a new contributor MUST still find **what exists** and **when to use it** within **two minutes** via the index in [FR-5](#8-functional-requirements); avoid duplicate or overlapping `description` triggers without a disambiguation note in the catalog. | Prefer `docs/skills-catalog.md` once README tables become unwieldy. |

---

## 10. Success metrics

| Metric | How to observe |
|--------|----------------|
| **Completeness** | A new author can produce a validated Part IV `DESIGN.md` using only repo artifacts and skills, without external proprietary docs. |
| **Skill utility** | Each skill maps to a named phase or task in the **authoritative index** ([FR-5](#8-functional-requirements)) and template; **no orphan skills** (every `.cursor/skills/design-md-*` folder appears in the index). |
| **Preview fidelity** | Generated HTML reflects documented hex roles; known limitation (e.g. Inter fallback) is documented in template Phase 6. |
| **Adoption** | Third-party repos copy skills/template; issues/PRs reference phases and section numbers consistently. |
| **Spec vs runbook clarity** | New contributors can identify which part of `DESIGN.md` is “what to build” vs “what to run” within one minute of skimming headings. |
| **Moodboard reuse** | Any moodboard version from the last *N* iterations can be located from the repo tree and opened in a browser without undocumented manual steps. |
| **CR ↔ preview parity** | After a closed change request, light and dark previews both reflect the same token/component reality as `DESIGN.md` for the scope of that CR. |
| **Variation compare** | Stakeholders can switch among declared accent (or other) variations in-browser without editing HTML by hand. |
| **Pairing visibility** | Forbidden combination examples from `DESIGN.md` appear on preview pages so black-on-near-black class mistakes are obvious before implementation. |
| **Changelog UX** | Opening a fresh `preview.html` shows the main catalog without expanded history noise; expanding the block or opening the standalone changelog reveals the same ordered entries. |
| **PM status parity** | For a component mapped to `PROJ-123`, the badge text on `preview.html` matches Jira’s **status** field at last successful snapshot (e.g. **Approved**). |
| **Screenshot strip accuracy** | After adding 12 files under `sample-images/s4-button/`, the Button block shows **3** thumbnails and text reflecting **12** total; deleting 10 files and regenerating updates the strip the same day without manual HTML edits. |

---

## 11. Technical constraints

- **Runtime:** Node.js >= 18 for `generate-design-previews.mjs`.
- **Module format:** ES modules (`"type": "module"` in `package.json`).
- **Primary artifact name:** `DESIGN.md` (exact casing) for compatibility with Stitch and awesome-design-md conventions.
- **Artifact folders (planned):** `moodboards/`, `change-requests/`, and `variations/` (exact names MAY be adjusted in implementation if documented in skills and README).
- **Changelog artifacts (planned):** alongside catalog previews, emit standalone `preview-changelog.html` (and dark counterpart when applicable); changelog input path and schema documented next to `generate-design-previews.mjs`.
- **PM integration config (planned):** one documented YAML (or JSON) file for MCP server ids and field mappings; optional generated snapshot `preview-pm-status.json` (gitignored or committed per team policy—document tradeoffs).
- **Sample images tree (planned):** default `sample-images/<scope-id>/*.{png,jpg,jpeg,webp,gif}` next to `DESIGN.md` or repo root; scope ids documented alongside preview generator and optional `design-md-sample-images` skill.
- **Skills catalog (planned):** optional `docs/skills-catalog.md` as the long-term home for the [FR-5](#8-functional-requirements) index when the skill count outgrows README tables; README retains at least a **pointer** to the full list.

---

## 12. Dependencies and references

| Dependency | Role |
|------------|------|
| [Google Stitch — design-md](https://stitch.withgoogle.com/docs/design-md/overview/) | Format authority for sections 1–8. |
| [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Corpus patterns; section 9 and preview pairing inspiration. |
| Cursor | Host environment for project skills under `.cursor/skills/`. |
| [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) | Optional bridge for skills or tooling to call **Jira** and other PM APIs through editor-configured servers, feeding preview status badges. |
| Atlassian Jira (or MCP Jira server) | Example PM backend; **status** field on issues drives badges described in [§5.6](#56-skill-config-and-mcp-project-management-status-on-previews). |

---

## 13. Glossary

| Term | Definition |
|------|------------|
| **DESIGN.md** | The shipped design-system markdown consumed by agents and humans (Part IV body). |
| **Part IV** | In `template-DESIGN.md`, the section that becomes the standalone `DESIGN.md`. |
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
| **`sample-images/`** | Default folder tree holding designer **screenshot attachments** keyed by scope id; rescanned on each preview run ([§5.7](#57-designer-screenshot-attachments-and-sample-images)). |
| **Thumbnail strip** | Up to **three** small previews under a section/component/element in catalog HTML, plus text giving the **total** count of images on disk for that scope. |

---

## 14. Document control

- **Owner:** Repository maintainers (CodeCubicle-Org).
- **Change process:** Update **Last modified** when materially editing requirements; bump **Document version** for major scope shifts (and for **consistency / traceability** edits that affect how readers interpret commitments).
- **Related docs:** [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`template-DESIGN.md`](../template-DESIGN.md).
- **Revision notes (abridged):** **1.6** — PM consistency pass: executive summary aligned with **§5.4–§5.7**; **§5.4** framed as planned target skills; goal **6** / **8** wording aligned with snapshot PM status and expanded CLI scope; **FR-23** / **FR-24** raised to **Must** to match **§5.7**; persona **Design ops / PM** clarified as snapshot. **1.7** — **§5.0** skill-catalog extensibility; goal **10**; **FR-5** expanded; **NFR-11**; glossary and metrics aligned for **many future skills**.
