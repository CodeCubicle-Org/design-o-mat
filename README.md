# design-o-mat

**design-o-mat** is an authoring toolkit for a [Google Stitch](https://stitch.withgoogle.com/docs/design-md/overview/)-style **`DESIGN.md`**: a single markdown spec for how your UI should look, plus optional HTML previews and Cursor **project skills** so you can run one phase of the workflow at a time.

## Contents

| Item | Purpose |
|------|---------|
| [`template-DESIGN.md`](template-DESIGN.md) | Full authoring guide (checklist, questionnaire, phases 0–7, Part IV body template) |
| [`awesome-design-md-corpus-analysis.md`](awesome-design-md-corpus-analysis.md) | How VoltAgent [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) `DESIGN.md` files are structured |
| [`generate-design-previews.mjs`](generate-design-previews.mjs) | Node script: builds `preview.html` + `preview-dark.html` from hex tokens in `DESIGN.md` (versioned `preview-vN` if files exist) |
| [`package.json`](package.json) | `npm run generate-previews` |
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
| `design-md-generate-previews` | Run **`node generate-design-previews.mjs`** (or `npm run generate-previews`) for light/dark HTML catalogs. **Phase 6.** Requires **Node 18+**. |
| `design-md-ship` | Strip authoring noise, optional folder `README`, previews, `AGENTS.md` / root README pointer, commit note. **Phase 7.** |
| `design-md-stitch-format` | Check structure vs Stitch + awesome-design-md (**§7/§8** exceptions). See also [`reference.md`](.cursor/skills/design-md-stitch-format/reference.md). |

### Typical flows

**Greenfield (in order)**  
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

- Skills **point at** [`template-DESIGN.md`](template-DESIGN.md) for step tables; open that file alongside the skill for full detail.  
- **`DESIGN.md`** is the source of truth for fonts and nuance; previews may use **Inter** as a fallback — see Phase 6 in the template.  
- To use skills in **other projects**, copy `.cursor/skills/design-md-*` (and optionally `template-DESIGN.md` + the preview script) into that repo’s `.cursor/skills/` and project root.

## Previews (Node)

```bash
npm run generate-previews
# or
node generate-design-previews.mjs ./DESIGN.md --out ./path/to/output
```

First run creates `preview.html` and `preview-dark.html`. If `preview.html` already exists, the next run creates `preview-v2.html` / `preview-dark-v2.html`, then `v3`, and so on.

## License

This project is licensed under the [MIT License](LICENSE).

Inspired by [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).
