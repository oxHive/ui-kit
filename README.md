# @oxhive/ui

[![npm](https://img.shields.io/npm/v/@oxhive/ui)](https://www.npmjs.com/package/@oxhive/ui)
[![CI](https://github.com/oxHive/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/oxHive/ui-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

The Vue 3 component kit shared by OxHive products: warm dark surfaces, three scope hues and a honey accent, all driven by `--oxui-*` CSS custom properties.

**Playground:** [uikit.oxhive.dev](https://uikit.oxhive.dev) shows every component live, with controls, usage snippets and API tables.

## Install

```sh
bun add @oxhive/ui
# or: npm install @oxhive/ui
```

Vue `^3.5` is a peer dependency.

## Setup

Import the tokens and the component styles once, in your app entry:

```js
import '@oxhive/ui/tokens.css'
import '@oxhive/ui/style.css'
```

The tokens use IBM Plex Sans and IBM Plex Mono, and `AppSidebar`'s wordmark uses Hanken Grotesk. Load them in your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
/>
```

Then use the components:

```vue
<script setup>
import { ref } from 'vue'
import { Button, Input, Modal } from '@oxhive/ui'

const title = ref('')
const confirming = ref(false)
</script>

<template>
  <Input v-model="title" placeholder="Memory title" />
  <Button variant="danger" @click="confirming = true">Delete</Button>
  <Modal
    v-if="confirming"
    title="Delete memory?"
    body="This will be permanently deleted."
    confirm-label="Delete"
    dangerous
    @confirm="confirming = false"
    @cancel="confirming = false"
  />
</template>
```

Components ship as plain CSS under an `oxui-` class prefix, so they work whether or not your app uses Tailwind.

## Theming

The theme is dark by default. Set `data-theme="light"` on `<html>` for light:

```js
document.documentElement.dataset.theme = 'light'
```

Style your own layout with the same tokens:

| Purpose                                      | Tokens                                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Surfaces, back to front                      | `--oxui-bg-base`, `--oxui-bg-surface`, `--oxui-bg-elevated`, `--oxui-bg-overlay`               |
| Borders                                      | `--oxui-border-subtle`, `--oxui-border-default`, `--oxui-border-strong`                        |
| Text                                         | `--oxui-text-primary`, `--oxui-text-secondary`, `--oxui-text-tertiary`, `--oxui-text-disabled` |
| Scope hues                                   | `--oxui-personal`, `--oxui-workspace`, `--oxui-org`                                            |
| Status                                       | `--oxui-success-text`, `--oxui-warning`, `--oxui-danger-text`, `--oxui-danger-bg`              |
| Accent (focus rings and active markers only) | `--oxui-accent`                                                                                |
| Type                                         | `--oxui-font-sans`, `--oxui-font-mono`, `--oxui-text-xs` to `--oxui-text-xl`                   |

The scope hues each mean one thing: personal is data on this device, workspace is shared with a workspace, and org is shared across the organisation. Secondary and tertiary text meet WCAG AA (4.5:1) on the base, surface and elevated backgrounds in both themes; `test/contrast.spec.js` keeps it that way.

[`src/tokens.css`](src/tokens.css) is the full list.

## Components

| Component          | What it is                                                        |
| ------------------ | ----------------------------------------------------------------- |
| `Button`           | Primary, default, danger and ghost variants in two sizes          |
| `CopyButton`       | Copies text and confirms in place; works over plain http too      |
| `Menu`             | A trigger button that opens a short list, with keyboard support   |
| `Input`            | `v-model` text field that exposes `focus()`, `blur()`, `select()` |
| `SegmentedControl` | Radio group for views and filters, with per-option tooltips       |
| `Badge`            | Small mono label tinted from any CSS color                        |
| `EmptyState`       | Message, hint and icon slot for empty lists                       |
| `SkeletonCard`     | Shimmering list-row placeholder                                   |
| `Modal`            | Confirmation dialog with a focus trap; Escape and overlay cancel  |
| `Toast`            | One-line status pill in a polite live region                      |
| `Tooltip`          | Viewport-positioned hint that flips below near the top edge       |
| `AppNav`           | Data-driven, router-agnostic sidebar navigation                   |
| `AppSidebar`       | The shared 200px product sidebar with the OxHive brand footer     |

Props, events and slots for each are in the [playground](https://uikit.oxhive.dev).

## Tailwind preset

If your app uses Tailwind, the preset maps the fonts and the brand colors:

```js
// tailwind.config.js
import oxui from '@oxhive/ui/tailwind-preset.js'

export default {
  presets: [oxui],
}
```

It adds `font-sans`, `font-mono` and the `oxui-personal`, `oxui-workspace`, `oxui-org`, `oxui-warning`, `oxui-danger` and `oxui-accent` colors (for example `bg-oxui-personal`).

## Development

```sh
bun install
bun run playground        # playground with hot reload
bun run test              # vitest
bun run lint              # eslint
bun run format:check      # prettier
bun run build             # library build to dist/
bun run build:playground  # playground build to playground/dist/
```

Pushing a stable semver tag (for example `v0.3.0`) publishes to npm. Changes are recorded in [CHANGELOG.md](CHANGELOG.md).

`.design-sync/` holds the inputs that sync this kit to Claude Design; see [`.design-sync/NOTES.md`](.design-sync/NOTES.md).

## License

[MIT](LICENSE)
