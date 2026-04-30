# Storybook integration (optional)

This folder is an **optional** bridge for teams that want to render component previews with Storybook.

- If your team wants to stay framework/tool independent, keep using:
  - `design-previews/preview-config.json`
  - `design-previews/component-preview_config.json`
  - `design-previews/layout-preview_config.json`
- Storybook is **not required** for design-o-mat previews.

## Mapping: design-o-mat -> Storybook (components)

| design-o-mat source | Storybook target | Purpose |
|---|---|---|
| `preview-config.json` `components.fallback.defaultStates` | `.storybook/preview.ts` global `parameters` / story defaults | Base states shown when component-specific config is missing |
| `preview-config.json` global defaults | `.storybook/preview.ts` global `args` / `argTypes` / `decorators` | Shared defaults across all stories |
| `component-preview_config.json` per component | `*.stories.ts` default export (`meta`) | Component-level preview policy |
| `component-preview_config.json` variants/states | `*.stories.ts` named stories (`StoryObj`) | Concrete preview permutations |
| Explicit component override values | Story-level `args` / `parameters` | Override defaults for a specific preview |

## Override model (equivalent to Storybook layering)

Use the same precedence strategy as Storybook:

1. Global defaults (`preview-config.json` -> `.storybook/preview.ts`)
2. Component defaults (`component-preview_config.json` -> story `meta`)
3. Story-specific overrides (`component-preview_config.json` entry -> story object)

`story` overrides `meta`, and `meta` overrides global defaults.

## Starter files

This folder provides starter templates:

- `.storybook.main.ts.example`
- `.storybook.preview.ts.example`
- `Button.stories.ts.example`

Copy them into your project and adapt framework package names (e.g. `@storybook/react-vite`, `@storybook/vue3-vite`, etc.).
