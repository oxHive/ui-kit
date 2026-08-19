<script setup>
import { computed } from 'vue'

// label: text shown inside the badge.
// color: any CSS color (hex, rgb()/hsl(), a var(--x) reference, or a named
//   color) — tints the badge background via color-mix() and sets the text
//   color to match. Omit for the neutral default styling.
const props = defineProps({
  label: { type: String, default: '' },
  color: { type: String, default: '' },
})

// `color` is interpolated straight into a style string (Vue applies string
// `:style` bindings via el.style.cssText), so it must be restricted to safe
// CSS color syntax before use — otherwise an untrusted value could smuggle
// extra declarations (e.g. `background:url(...)`) into the element's style.
const SAFE_COLOR =
  /^(#[0-9a-fA-F]{3,8}|rgba?\([\d\s.%,]+\)|hsla?\([\d\s.%,]+\)|var\(--[\w-]+\)|[a-zA-Z]+)$/
const safeColor = computed(() => (props.color && SAFE_COLOR.test(props.color) ? props.color : ''))

const style = computed(() =>
  safeColor.value
    ? `background:color-mix(in srgb, ${safeColor.value} 18%, transparent); color:${safeColor.value}`
    : 'background:var(--hm-bg-elevated); color:var(--hm-text-tertiary)',
)
</script>

<template>
  <span class="oxui-badge" :style="style">{{ label }}</span>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: bare utility classes referenced only inside
 * @oxhive/ui's dist bundle never get generated in a consuming app's build.
 */
.oxui-badge {
  display: inline-block;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 10px;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}
</style>
