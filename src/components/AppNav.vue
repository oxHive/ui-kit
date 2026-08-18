<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // { label: string, to: string, icon: Component, active?: boolean,
    //   external?: boolean, badge?: string | number, onClick?: Function }
  },
})
</script>

<template>
  <ul class="oxui-nav-list">
    <li v-for="(item, i) in items" :key="item.label + i">
      <button
        @click="item.onClick?.()"
        class="oxui-nav-item"
        :class="{ 'oxui-nav-item--active': item.active }"
        :aria-current="item.active ? 'page' : undefined"
      >
        <span class="oxui-nav-item__left">
          <component :is="item.icon" class="oxui-nav-item__icon" width="16" height="16" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </span>
        <span v-if="item.badge" class="oxui-nav-item__badge">{{ item.badge }}</span>
      </button>
    </li>
  </ul>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: this component ships as a pre-built dist bundle
 * and consuming apps never scan node_modules/@oxhive/ui for Tailwind
 * content, so bare utility classes referenced only here would silently
 * generate no CSS in the consumer's build.
 */
.oxui-nav-list {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  margin: 0;
  list-style: none;
}
.oxui-nav-item {
  width: calc(100% - 16px);
  margin: 1px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: 13px;
  text-align: left;
  color: var(--hm-text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}
.oxui-nav-item__left { display: flex; align-items: center; gap: 10px; }
.oxui-nav-item__icon { flex-shrink: 0; color: var(--hm-text-tertiary); transition: color 0.1s; }
.oxui-nav-item:hover, .oxui-nav-item:focus-visible { background: var(--hm-bg-elevated); color: var(--hm-text-primary); outline: none; }
.oxui-nav-item:hover .oxui-nav-item__icon, .oxui-nav-item:focus-visible .oxui-nav-item__icon { color: var(--hm-text-primary); }
.oxui-nav-item:focus-visible { outline: 2px solid var(--hm-accent); outline-offset: -2px; }
.oxui-nav-item--active { background: var(--hm-bg-elevated); color: var(--hm-text-primary); font-weight: 500; }
.oxui-nav-item--active .oxui-nav-item__icon { color: var(--hm-text-primary); }
.oxui-nav-item__badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px;
  font-size: 10px; line-height: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background: var(--hm-warning-bg); color: var(--hm-warning);
}
</style>
