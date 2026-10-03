# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `--hm-danger-text` token: the danger hue as readable text on
  `--hm-danger-bg` (`#f09595` dark, `#a32d2d` light).
- `--hm-success-text` token: teal that stays readable as text (`#1d9e75`
  dark, `#0f6e56` light).
- `--hm-scrim` token for the `Modal` backdrop (`#00000099` dark, a lighter
  warm `#211d1759` in light).
- `CopyButton` turns `--hm-success-text` while showing its copied state, on
  the `default` and `ghost` variants (slotted icons follow via
  `currentColor`).

### Changed

- `--hm-text-tertiary` now meets WCAG AA (4.5:1) on base, surface and
  elevated backgrounds in both themes: `#67625a` → `#8c867c` (dark),
  `#948c7a` → `#6f6858` (light). Light `--hm-text-secondary` darkens
  `#6e6759` → `#5c5649` so it stays a step above tertiary.
- `Badge`, `Toast`, `AppNav`'s count badge and `AppSidebar`'s version label
  use `var(--hm-font-mono)` (IBM Plex Mono) instead of a hardcoded system
  monospace stack.
- Components size text with the `--hm-text-*` scale tokens instead of
  hardcoded pixels; rendered sizes are unchanged.
- `Modal` backdrop uses `--hm-scrim`, so it is lighter in the light theme.

### Fixed

- `Button` `primary` hover no longer turns white in the light theme, which
  made the label disappear.
- `Button` `danger` text is legible in the dark theme (was about 2.6:1); the
  hover tint is lighter so it stays above 4.5:1 in both themes.
- `Menu` items show the accent focus ring on keyboard focus, like `AppNav`
  and `SegmentedControl`.

## [0.2.0] - 2026-10-02

First release published to npm.

### Changed

- `Modal` now applies fallthrough attributes (`class`, `style`, `aria-*`) to
  the dialog box instead of the overlay, so consumers can size or restyle it.
- `Modal`'s title id is generated per instance (`useId()`) instead of the
  fixed `confirm-modal-title`, so concurrent modals no longer share an id.
- `Modal`'s focus trap skips disabled controls and includes `select` /
  `textarea`, so Tab can't escape past a disabled last button.

### Fixed

- The published package now includes `src/tokens.css` and
  `src/tailwind-preset.js`; the `./tokens.css` and `./tailwind-preset.js`
  exports previously pointed at files missing from the tarball.

### Security

- `Badge`'s `color` prop is now validated against safe CSS color syntax
  before being interpolated into the element's inline style, preventing an
  untrusted color value from injecting extra CSS declarations.
- Pinned `oven-sh/setup-bun` in the GitHub Actions deploy workflow to a
  commit SHA instead of a mutable version tag (the workflow holds
  `id-token: write`).

### Added

- `Modal` default slot (replaces `body`) and `actions` slot (replaces the
  Cancel/Confirm row), so custom dialogs — type-to-confirm, busy/disabled
  buttons, rich content — reuse its overlay, focus trap, and Escape handling.
- `CopyButton`: copies `text` (a string, or a function read at click time)
  to the clipboard with an `execCommand` fallback for non-secure contexts,
  shows a transient "Copied" label, and emits `copied` / `error`. Default
  slot receives `{ copied }` for icon-only buttons. The playground's snippet
  copy button now uses it.
- `Menu`: a button that opens a list of string `items` above or below it
  (`placement`) and emits `select`. Follows the ARIA menu-button pattern:
  `aria-haspopup` / `aria-expanded`, arrow/Home/End navigation, Escape and
  outside-click close with focus returned to the trigger.
- `SegmentedControl`: a `v-model` radio group of options shaped
  `{ label, value, description? }`, with a single Tab stop and arrow-key
  selection; descriptions show as a `Tooltip` on hover or focus. `disabled`
  keeps the current value visible but blocks changes.
- `publish.yml` GitHub Actions workflow: on a stable `vX.Y.Z` tag, runs CI
  and then publishes to npm with provenance via the shared
  `oxHive/pipelines` `npm-publish.yml` workflow.
- `ci.yml` GitHub Actions workflow: lints, checks formatting, runs tests,
  and builds the library + playground on every pull request and push to
  `main`.
- ESLint (`eslint.config.js`) and Prettier (`.prettierrc.json`) configs,
  with `lint`, `lint:fix`, `format`, and `format:check` scripts.
- `engines` field in `package.json` pinning supported Node and Bun versions.
- Brief prop/slot documentation comments on each component.
- Test coverage for `Modal`'s focus trap and Escape handling, `Tooltip`'s
  flip-below behavior, and `AppNav`'s item click dispatch.

### Fixed

- `Modal`'s focus trap and Escape handling now bind to the modal's own root
  element instead of `document`, so two concurrently-mounted modals no
  longer interfere with each other's keyboard handling.
- `Tooltip`'s flip-above/below decision now uses the tooltip's actual
  measured height instead of a fixed pixel threshold, so multi-line text
  that wraps taller than one line still flips correctly near the top edge.

## [0.1.0] - 2026-08-18

Initial release of `@oxhive/ui`: `AppNav`, `AppSidebar`, `Badge`, `Button`,
`EmptyState`, `Input`, `Modal`, `SkeletonCard`, `Toast`, and `Tooltip`,
plus the shared design tokens (`tokens.css`) and Tailwind preset
(`tailwind-preset.js`).

<!--
No `v0.1.0` git tag exists yet. Once releases are tagged, link entries here,
e.g.:
[Unreleased]: https://github.com/oxHive/ui-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/oxHive/ui-kit/releases/tag/v0.1.0
-->
