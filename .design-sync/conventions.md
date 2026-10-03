## Using @oxhive/ui

**What these components are.** The real compiled @oxhive/ui (Vue 3) components, each wrapped for React. Use them like any React component: props in, `children` and named slot props for content, `onXxx` for events. They need no provider or wrapper.

**Setup.** Link `styles.css` once. It brings the `--hm-*` tokens, the IBM Plex fonts and the component CSS, and it paints `html`/`body` with `--hm-bg-base` and `--hm-text-primary`. The theme is **dark by default**; set `document.documentElement.dataset.theme = 'light'` (`<html data-theme="light">`) for light. The theme is page-wide only: there is no per-subtree theming.

**Styling idiom: CSS custom properties.** There are no utility classes. Components style themselves; for your own layout glue use inline styles (or your own CSS) that read the tokens. Never hard-code colors the tokens cover.

| Purpose                                      | Tokens                                                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Surfaces, back to front                      | `--hm-bg-base`, `--hm-bg-surface`, `--hm-bg-elevated`, `--hm-bg-overlay`                             |
| Hairline borders (use `0.5px solid`)         | `--hm-border-subtle`, `--hm-border-default`, `--hm-border-strong`                                    |
| Text                                         | `--hm-text-primary`, `--hm-text-secondary`, `--hm-text-tertiary`, `--hm-text-disabled`               |
| Scope hues (each means one thing)            | `--hm-personal` (this device), `--hm-workspace` (shared with a workspace), `--hm-org` (organisation) |
| Status                                       | `--hm-success-text`, `--hm-warning`, `--hm-danger-text`, `--hm-danger-bg`, `--hm-danger-border`      |
| Accent (focus rings and active markers only) | `--hm-accent`                                                                                        |
| Type                                         | `--hm-font-sans`, `--hm-font-mono`; sizes `--hm-text-xs` (10px) to `--hm-text-xl` (15px)             |

The UI is compact: body text is 12–13px, and mono is for IDs, versions, counts and commands. Radii are 4–8px.

**Component notes.**

- `Input` and `SegmentedControl` are controlled with `value` + `onChange(value)`; `onChange` receives the value, not an event.
- Named slots are props: `Menu` `trigger`, `EmptyState` `icon`, `Modal` `children` / `actions`, `AppSidebar` `logoIcon` / `status` / `footer` (the nav goes in `children`). `CopyButton` `children` may be a function of `{ copied }`.
- `Modal`, `Toast` and `Tooltip` are viewport overlays. Render `Modal` conditionally (it has no `open` prop) and handle `onCancel` to close it. `Tooltip` takes viewport coordinates: measure the anchor with `getBoundingClientRect()`.
- `Menu` items are plain strings; the list opens on click.
- `AppSidebar` is 200px wide and full-height: put it in a `display: flex` row with the page content.

**Where the truth lives.** `styles.css` and its `@import`s (`_ds_bundle.css` holds every token and component rule), plus each `components/general/<Name>/<Name>.prompt.md` and `<Name>.d.ts`.

```jsx
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7" />
  </svg>
)

<div style={{ display: 'flex', height: '100vh' }}>
  <AppSidebar productName="Hivemind" version="0.2.0">
    <AppNav items={[{ label: 'Memories', icon: ListIcon, active: true }]} />
  </AppSidebar>
  <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ fontSize: 'var(--hm-text-xl)', fontWeight: 600 }}>Memories</h1>
      <Button variant="primary">New memory</Button>
    </div>
    <div style={{ background: 'var(--hm-bg-surface)', border: '0.5px solid var(--hm-border-subtle)', borderRadius: 8, padding: 16 }}>
      <Badge label="personal" color="var(--hm-personal)" />
    </div>
  </main>
</div>
```
