<script setup>
// variant: primary | default | danger | ghost
// size: sm | md | lg
defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'md' },
})
</script>

<template>
  <button class="oxui-btn" :class="[`oxui-btn-${variant}`, size === 'sm' ? 'oxui-btn-sm' : '']">
    <slot />
  </button>
</template>

<style>
.oxui-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 5px;
  cursor: pointer;
  border: 0.5px solid transparent;
  font-family: var(--hm-font-sans);
  font-size: 12px;
  height: 32px;
  padding: 0 14px;
  transition: background 0.1s;
  white-space: nowrap;
}
.oxui-btn:focus-visible {
  outline: 2px solid var(--hm-accent);
  outline-offset: 2px;
}
.oxui-btn-sm {
  height: 28px;
  padding: 0 10px;
  font-size: 11px;
  font-family: var(--hm-font-mono);
}
.oxui-btn-primary {
  background: var(--hm-text-primary);
  border-color: var(--hm-text-primary);
  color: var(--hm-bg-base);
  font-weight: 500;
}
.oxui-btn-primary:hover {
  background: #ffffff;
}
.oxui-btn-default {
  background: transparent;
  border-color: var(--hm-border-subtle);
  color: var(--hm-text-secondary);
}
.oxui-btn-default:hover {
  background: var(--hm-bg-elevated);
}
.oxui-btn-danger {
  background: var(--hm-danger-bg);
  border-color: var(--hm-danger-border);
  color: var(--hm-danger);
}
.oxui-btn-danger:hover {
  background: color-mix(in srgb, var(--hm-danger-bg) 70%, var(--hm-danger));
}
.oxui-btn-ghost {
  background: transparent;
  border-color: transparent;
  color: var(--hm-text-secondary);
}
.oxui-btn-ghost:hover {
  background: var(--hm-bg-elevated);
}
.oxui-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
