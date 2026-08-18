<template>
  <nav class="oxui-sidebar">
    <div class="oxui-sidebar__logo">
      <slot name="logo" />
    </div>

    <slot />

    <div class="oxui-sidebar__bottom">
      <slot name="status" />
      <div class="oxui-sidebar__footer-box">
        <slot name="footer" />
      </div>
    </div>
  </nav>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes): this component ships
 * to consumers as a pre-built dist bundle, and a consuming app's Tailwind
 * content-scanner has no reason to look inside node_modules/@oxhive/ui, so
 * utility classes referenced only here (e.g. mt-auto) would silently never
 * be generated in the consumer's build. Every other @oxhive/ui component
 * already follows this convention (its own oxui-* prefixed classes in an
 * unscoped <style> block) — AppSidebar was the one holdout, discovered via
 * visual verification in the dashboard integration (Task 13).
 */
.oxui-sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 200px;
  background: var(--hm-bg-surface);
  border-right: 0.5px solid var(--hm-border-subtle);
}
.oxui-sidebar__logo {
  padding: 24px 20px 28px;
  border-bottom: 0.5px solid var(--hm-border-subtle);
}
.oxui-sidebar__bottom {
  margin-top: auto;
}
.oxui-sidebar__footer-box {
  padding: 16px 20px 20px;
  border-top: 0.5px solid var(--hm-border-subtle);
}
</style>
