<script setup>
import { computed } from 'vue'
const props = defineProps({ label: String, color: { type: String, default: '' } })
const style = computed(() => props.color
  ? `background:color-mix(in srgb, ${props.color} 18%, transparent); color:${props.color}`
  : 'background:var(--hm-bg-elevated); color:var(--hm-text-tertiary)')
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
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 10px;
  font-family: var(--hm-font-mono);
}
</style>
