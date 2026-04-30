# design-o-mat

**design-o-mat** is a collaboration toolkit for defining both your **design system** and your **design language** in one living, project-owned source of truth (`DESIGN.md`, Stitch-style). It helps designers, UX experts, and developers continuously feed changes into the same workflow, regenerate local previews, and keep examples/templates aligned with real project decisions over the full product lifecycle.

In practice, the project provides:
- a shared authoring flow for documenting visual rules and interaction language,
- local static preview generation (design-system catalog, component/layout surfaces, dashboard),
- reusable templates/examples for how components and layouts should look,
- optional Jira/PM status snapshots embedded in previews to keep design intent and delivery state connected,
- optional git commit traceability (including GitHub commit links) for mapped components/elements in preview surfaces.

## Contents

| Item | Purpose |
|------|---------|
| [`design-definition-form.md`](docs/design-definition-form.md) | **Step 1** shared intake for designers + developers (colors, Title 1 type, layout, components, sign-off) before `template-DESIGN.md` |
| [`design-language.md`](docs/design-language.md) | Optional designer-voice companion to the intake form (north star, color story, type voice); fill after or alongside Step 1 |
| [`template-DESIGN.md`](docs/template-DESIGN.md) | Full authoring guide (checklist, questionnaire, phases 0–7, Part IV body template) |
| [`awesome-design-md-corpus-analysis.md`](awesome-design-md-corpus-analysis.md) | How VoltAgent [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) `DESIGN.md` files are structured |
| [`scripts/generate-design-previews.mjs`](scripts/generate-design-previews.mjs) | Node script: builds static preview artifacts (catalog light/dark, plus optional component/layout/dashboard surfaces as workflow expands) |
| [`design-previews/storybook/`](design-previews/storybook/) | Optional Storybook bridge (mapping guide + starter Storybook config/story templates for component previews) |
| [`package.json`](package.json) | `npm run generate-previews`; **all** repo scripts are **Node.js v24+** (no Python stack) |
| [`AGENTS.md`](AGENTS.md) | Pointers for coding vs design agents |
| [`.cursor/skills/`](.cursor/skills/) | Cursor **project skills** (`design-md-*`) |

## Using the Cursor skills

These skills live under **`.cursor/skills/`**. Cursor loads **project skills** when this folder is in your workspace. Each skill is a folder with a `SKILL.md` file. The YAML **`description`** tells the agent *when* to apply the skill; you can also ask explicitly (e.g. “use the validate DESIGN.md skill”).

### Skill cheat sheet

| Skill folder | Use it when you want to… |
|--------------|---------------------------|
| `design-md-scope-lock` | Start a spec: lock product name, URLs, light/dark, **§7/§8 structure** (Part II G), canonical source (web vs Figma). **Phase 0.** |
| `design-md-capture-tokens` | Pull **evidence** from a live UI: screenshots, computed styles, CSS variables, fonts, breakpoints. **Phase 1.** |
| `design-md-normalize-tokens` | Turn raw notes into draft **§2, §3, §5, §6** with consistent semantics. **Phase 2.** |
| `design-md-draft-body` | Write **§1–§8** (theme, components, chosen §7/§8 bodies, **Key Characteristics**). **Phase 3.** |
| `design-md-agent-prompt-guide` | Fill **§9** — Quick Color Reference, Example Component Prompts, Iteration Guide. **Phase 4.** |
| `design-md-validate-spec` | **QA** an existing `DESIGN.md` against the Phase 5 checklist. |
| `design-md-generate-previews` | Run **`node scripts/generate-design-previews.mjs`** (or `npm run generate-previews`) for light/dark HTML catalogs. **Phase 6.** Requires **Node.js v24+**. |
| `design-md-ship` | Strip authoring noise, optional folder `README`, previews, `AGENTS.md` / root README pointer, commit note. **Phase 7.** |
| `design-md-stitch-format` | Check structure vs Stitch + awesome-design-md (**§7/§8** exceptions). See also [`reference.md`](.cursor/skills/design-md-stitch-format/reference.md). |

### Typical flows

**Greenfield (in order)**  
0. Fill [`design-definition-form.md`](docs/design-definition-form.md) (design + engineering); duplicate into your project if needed.  
1. `design-md-scope-lock`  
2. `design-md-capture-tokens` (if you have a live URL)  
3. `design-md-normalize-tokens`  
4. `design-md-draft-body`  
5. `design-md-agent-prompt-guide`  
6. `design-md-validate-spec`  
7. `design-md-generate-previews`  
8. `design-md-ship`  

**Small edits**  
- Only tokens → **normalize** (and maybe **validate**).  
- Only §9 prompts → **agent-prompt-guide**.  
- Regenerate HTML after color changes → **generate-previews**.

### Tips

- Skills **point at** [`template-DESIGN.md`](docs/template-DESIGN.md) for step tables; open that file alongside the skill for full detail.  
- **`DESIGN.md`** is the source of truth for fonts and nuance; previews may use **Inter** as a fallback — see Phase 6 in the template.  
- To use skills in **other projects**, copy `.cursor/skills/design-md-*` (and optionally `docs/template-DESIGN.md` + `scripts/generate-design-previews.mjs`) into that repo’s `.cursor/skills/` and project root.

## Preview architecture (smart + static)

The current direction is to keep previews **smart** while remaining **static** and **framework-agnostic**, so teams can run a fast local design roundtrip without backend dependencies:

- Build-time workflows (skills and/or neutral Node scripts) compute intelligence such as counts, links, coverage, and trend summaries.
- Runtime pages are static `HTML/CSS/JS` and read generated local JSON artifacts.
- No backend/database/live API is required to open previews.
- React (or any other framework) may be used in generation tooling, but generated preview artifacts must be consumable without that runtime.
- This keeps design docs, preview artifacts, and implementation guidance easy to refresh whenever designers, UX, or engineering update the system.

### Expected preview inputs and generated artifacts

| Artifact | Role |
|---------|------|
| `component-preview_config.json` | Declarative component examples/variants/states for component preview pages |
| `layout-preview_config.json` | Declarative section/full-page layout compositions |
| `mosaic-tile-preview_config.json` | Declarative composite mosaic tiles that combine multiple elements/components into richer preview blocks |
| `preview-dashboard.html` | Single static entry page linking all preview families (with empty states when some outputs are not yet generated) |
| `preview-manifest.json` (recommended) | Machine-readable list of generated preview pages and metadata |
| `preview-links.json` (recommended) | Normalized navigation/link data used by dashboard and preview pages |
| `preview-stats.json` (recommended) | Precomputed counters/trend summaries for static display |

By default, these are managed in `design-previews/`:

- `design-previews/preview-config.json` (global defaults + override rules)
- `design-previews/component-preview_config.json` (component-specific overrides)
- `design-previews/layout-preview_config.json` (layout/page-specific overrides)
- `design-previews/mosaic-tile-preview_config.json` (mosaic tile-specific overrides)

Optional Storybook bridge for component previews:

- `design-previews/storybook/` (mapping guide + starter Storybook files)
- This is for teams that want/need Storybook in their projects.
- Teams staying independent can ignore this folder and use the JSON configs directly.
- Override behavior remains aligned: global defaults -> component defaults -> preview/story override.

### Preview families

- Design-system catalog previews (`preview.html`, `preview-dark.html`, and versioned variants)
- Standalone changelog preview page(s)
- Component preview pages (from `component-preview_config.json`)
- Layout/page preview pages (from `layout-preview_config.json`)
- Mosaic tile preview pages (from `mosaic-tile-preview_config.json`)
- One project dashboard (`preview-dashboard.html`) linking all of the above

### Portability rule

Cursor skills are the primary ergonomic interface in this repo, but equivalent neutral script workflows should exist so teams using other assistants/tooling can regenerate the same static artifacts.

## Previews (Node)

```bash
npm run generate-previews
# or
node scripts/generate-design-previews.mjs ./DESIGN.md --out ./path/to/output
```

First run creates `preview.html` and `preview-dark.html`. If `preview.html` already exists, the next run creates `preview-v2.html` / `preview-dark-v2.html`, then `v3`, and so on.

## License

This project is licensed under the [MIT License](LICENSE).

Inspired by [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).
