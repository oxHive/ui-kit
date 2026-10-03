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
  font-family: var(--oxui-font-sans);
  font-size: var(--oxui-text-base);
  height: 32px;
  padding: 0 14px;
  transition: background 0.1s;
  white-space: nowrap;
}
.oxui-btn:focus-visible {
  outline: 2px solid var(--oxui-accent);
  outline-offset: 2px;
}
.oxui-btn-sm {
  height: 28px;
  padding: 0 10px;
  font-size: var(--oxui-text-sm);
  font-family: var(--oxui-font-mono);
}
.oxui-btn-primary {
  background: var(--oxui-text-primary);
  border-color: var(--oxui-text-primary);
  color: var(--oxui-bg-base);
  font-weight: 500;
}
.oxui-btn-primary:hover {
  background: #ffffff;
}
/* White on a near-black light-theme button would erase the label; lift it
   toward a warm gray instead. Same [data-theme] mechanism as tokens.css. */
:root[data-theme='light'] .oxui-btn-primary:hover {
  background: #3a342b;
}
.oxui-btn-default {
  background: transparent;
  border-color: var(--oxui-border-subtle);
  color: var(--oxui-text-secondary);
}
.oxui-btn-default:hover {
  background: var(--oxui-bg-elevated);
}
.oxui-btn-danger {
  background: var(--oxui-danger-bg);
  border-color: var(--oxui-danger-border);
  color: var(--oxui-danger-text);
}
.oxui-btn-danger:hover {
  background: color-mix(in srgb, var(--oxui-danger-bg) 85%, var(--oxui-danger));
}
.oxui-btn-ghost {
  background: transparent;
  border-color: transparent;
  color: var(--oxui-text-secondary);
}
.oxui-btn-ghost:hover {
  background: var(--oxui-bg-elevated);
}
.oxui-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
