# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- `Badge`'s `color` prop is now validated against safe CSS color syntax
  before being interpolated into the element's inline style, preventing an
  untrusted color value from injecting extra CSS declarations.
- Pinned `oven-sh/setup-bun` in the GitHub Actions deploy workflow to a
  commit SHA instead of a mutable version tag (the workflow holds
  `id-token: write`).

### Added

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
