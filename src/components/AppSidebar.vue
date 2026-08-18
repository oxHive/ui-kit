<script setup>
import brandMark from '../assets/oxhive-mark.png'

defineProps({
  productName: { type: String, required: true },
  version: { type: String, default: '' },
})
</script>

<template>
  <nav class="oxui-sidebar">
    <div class="oxui-sidebar__header">
      <div class="oxui-sidebar__header-icon-name">
        <slot name="logo-icon" />
        <div class="oxui-sidebar__product-name">{{ productName }}</div>
      </div>
      <span v-if="version" class="oxui-sidebar__version">v{{ version }}</span>
    </div>

    <slot />

    <div class="oxui-sidebar__bottom">
      <slot name="status" />
      <div class="oxui-sidebar__status-box">
        <slot name="footer" />
      </div>
      <div class="oxui-sidebar__brand">
        <img class="oxui-sidebar__brand-mark" :src="brandMark" alt="" aria-hidden="true" width="18" height="18" />
        <span class="oxui-sidebar__brand-word">OxHive</span>
      </div>
    </div>
  </nav>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes): this component ships
 * to consumers as a pre-built dist bundle, and a consuming app's Tailwind
 * content-scanner has no reason to look inside node_modules/@oxhive/ui, so
 * utility classes referenced only here would silently never be generated
 * in the consumer's build. Every other @oxhive/ui component follows this
 * convention (its own oxui-* prefixed classes in an unscoped <style> block).
 *
 * The OxHive brand mark + wordmark are hardcoded here (not slotted): every
 * OxHive product's sidebar shares the same company identity in its footer,
 * so this is OxHive's own brand asset, not per-product content — unlike the
 * header, whose icon/name/version genuinely vary per consuming product.
 *
 * The brand wordmark uses 'Hanken Grotesk' at weight 800 — it degrades to
 * var(--hm-font-sans) if the consuming app hasn't loaded that font (see
 * hivemind/dashboard/index.html for the Google Fonts link this component
 * currently relies on a consumer providing).
 *
 * Light/dark handling for the brand mark image is pure CSS (a `[data-theme]`
 * attribute selector on <html>, the same mechanism tokens.css itself uses)
 * rather than reading a theme store — @oxhive/ui has zero Pinia/store
 * dependency by design.
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
.oxui-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 24px 20px 28px;
  border-bottom: 0.5px solid var(--hm-border-subtle);
}
.oxui-sidebar__header-icon-name {
  display: flex;
  align-items: center;
  gap: 4px;
}
.oxui-sidebar__product-name {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--hm-text-primary);
  line-height: 1;
}
.oxui-sidebar__version {
  align-self: flex-end;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 10px;
  color: var(--hm-text-tertiary);
  line-height: 1;
}
.oxui-sidebar__bottom {
  margin-top: auto;
}
.oxui-sidebar__status-box {
  padding: 16px 20px 20px;
  border-top: 0.5px solid var(--hm-border-subtle);
}
.oxui-sidebar__status-box:empty {
  display: none;
}
.oxui-sidebar__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 14px 20px 16px;
}
.oxui-sidebar__brand-mark {
  display: block;
  filter: brightness(0) invert(1);
}
:root[data-theme="light"] .oxui-sidebar__brand-mark {
  filter: none;
}
.oxui-sidebar__brand-word {
  font-family: 'Hanken Grotesk', var(--hm-font-sans);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--hm-text-primary);
}
</style>
