<script setup>
defineProps({ message: String, hint: { type: String, default: '' } })
</script>

<template>
  <div class="oxui-empty-state"
    style="color:var(--hm-text-tertiary)">
    <div class="oxui-empty-state__icon"><slot name="icon" /></div>
    <p style="font-size:13px; color:var(--hm-text-secondary)">{{ message }}</p>
    <p v-if="hint" style="font-size:12px">{{ hint }}</p>
  </div>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: bare utility classes referenced only inside
 * @oxhive/ui's dist bundle never get generated in a consuming app's build.
 */
.oxui-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  text-align: center;
  padding: 0 24px;
}
.oxui-empty-state__icon {
  margin-bottom: 4px;
}
</style>
