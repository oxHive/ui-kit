# design-sync notes

## How this repo syncs (read first)

- **@oxhive/ui is Vue 3; Claude Design renders React.** The sync does not bundle
  `dist/` directly. It bundles `.design-sync/adapter/index.js`, a React wrapper
  per component that mounts the REAL compiled Vue component from
  `../../dist/oxhive-ui.js`. Props flow into a `shallowReactive` bag; slots are
  bridged with portals into `display: contents` spans; v-model is
  `value`/`onChange(value)`. Prop contracts are hand-written in
  `.design-sync/adapter/index.d.ts` — **update it whenever a component's props,
  emits or slots change**, or the design agent codes against a stale API.
- Build the kit first (`bun run build`), then run the converter with
  `--entry ./.design-sync/adapter/index.js --node-modules .ds-sync/node_modules`.
  The adapter's own `package.json` is named `@oxhive/ui` so the converter treats
  it as the package; its `version` must be bumped by hand to match the kit.
- `.design-sync/node_modules` must be a symlink to `../.ds-sync/node_modules`
  (gitignored; recreate per clone: `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`).
  Without it the `.d.ts` pass can't find `@types/react` ([DTS_REACT]) and the
  emitted types lose `React.*` names.
- `.ds-sync/` needs `esbuild ts-morph @types/react react@18 react-dom@18` and
  `playwright` (installed with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`). No bundled
  chromium on this machine: run validate/capture with
  `DS_CHROMIUM_PATH=/bin/google-chrome`.
- `.design-sync/adapter/base.css` paints html/body from the tokens and adds the
  slice of Tailwind preflight the components assume (h1–h4/p margins, border-box).
  Fonts come from a Google Fonts `@import` in `adapter/fonts.css` ([FONT_REMOTE],
  expected).

## Preview authoring

- Card cells are white; the kit's tokens default to dark. Every story wraps its
  content in an inline `background: var(--oxui-bg-base)` div.
- `.prompt.md` examples show only the story body: keep every helper (icons,
  style objects) INSIDE the export, and keep the code plain JSX (no `as const`,
  no type annotations) — a module-level helper leaks into examples as an
  undefined name.
- Modal and Toast are `position: fixed`; their stories sit in a frame with
  `transform: translateZ(0)` so the frame is the containing block. Tooltip
  stories measure their anchor with `getBoundingClientRect()`.
- Menu can only be shown closed (no `open` prop; the list opens on click).
- Input has no disabled styling in the kit, so there is no Disabled story —
  a disabled Input looks enabled (kit gap, see below).

## Known render warns

- `[RENDER_THIN]` (height 0) can fire on adapter-wrapped components because the
  wrapper's host is `display: contents`; confirm the screenshot, it is benign.

## Kit gaps found during sync

- `Input` has no `:disabled` style.
- `Badge color="var(--oxui-warning)"` text is low-contrast on dark; there is no
  `--oxui-warning-text` token yet.

## Re-sync risks

- `adapter/index.d.ts` is hand-maintained: it silently goes stale when Vue
  props/emits/slots change. Diff it against each component's `defineProps` /
  `defineEmits` / slots on every re-sync.
- `adapter/package.json` `version` is hand-copied from the root package.json.
- The adapter depends on Vue internals only through public API (`createApp`,
  `h`, `shallowReactive`); a Vue major bump could still change slot/ref timing.
- Fonts load from Google Fonts at runtime (network-dependent).
- Toast/Modal/Tooltip cards rely on the frame/measurement tricks above; a
  harness change to card layout could misplace them.
