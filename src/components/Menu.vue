<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import Button from './Button.vue'

// items: the menu entries (strings); `select` emits the chosen one.
// placement: 'bottom' (default) opens below the trigger, 'top' above it.
//   The menu always aligns to the trigger's right edge.
// variant / size: passed to the trigger Button.
// Slot `trigger`: the trigger's content (e.g. an icon). Native attrs
// (title, aria-label) fall through to the trigger <button>.
// Keyboard: arrows/Home/End move between items, Escape closes and returns
// focus to the trigger, Tab closes; a click outside closes it too.
defineOptions({ inheritAttrs: false })
const props = defineProps({
  items: { type: Array, required: true },
  placement: { type: String, default: 'bottom' },
  variant: { type: String, default: 'ghost' },
  size: { type: String, default: 'sm' },
})
const emit = defineEmits(['select'])

const open = ref(false)
const rootEl = ref(null)
const listEl = ref(null)

function itemEls() {
  return [...(listEl.value?.querySelectorAll('[role="menuitem"]') ?? [])]
}

function triggerEl() {
  return rootEl.value?.querySelector('[aria-haspopup="menu"]')
}

function onOutside(e) {
  if (!rootEl.value?.contains(e.target)) close()
}

async function show() {
  open.value = true
  document.addEventListener('pointerdown', onOutside)
  await nextTick()
  itemEls()[0]?.focus()
}

function close(refocus = false) {
  open.value = false
  document.removeEventListener('pointerdown', onOutside)
  if (refocus) triggerEl()?.focus()
}

function toggle() {
  open.value ? close() : show()
}

function select(item) {
  emit('select', item)
  close(true)
}

function onKeydown(e) {
  const items = itemEls()
  const i = items.indexOf(document.activeElement)
  const focus = (n) => items[(n + items.length) % items.length]?.focus()
  if (e.key === 'ArrowDown') focus(i + 1)
  else if (e.key === 'ArrowUp') focus(i - 1)
  else if (e.key === 'Home') focus(0)
  else if (e.key === 'End') focus(items.length - 1)
  else if (e.key === 'Escape') close(true)
  else if (e.key === 'Tab') return close()
  else return
  e.preventDefault()
}

onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside))
</script>

<template>
  <div ref="rootEl" class="oxui-menu">
    <Button
      type="button"
      :variant="variant"
      :size="size"
      aria-haspopup="menu"
      :aria-expanded="open"
      v-bind="$attrs"
      @click="toggle"
    >
      <slot name="trigger" />
    </Button>
    <div
      v-if="open"
      ref="listEl"
      role="menu"
      class="oxui-menu__list"
      :class="`oxui-menu__list--${props.placement}`"
      @keydown="onKeydown"
    >
      <button
        v-for="item in items"
        :key="item"
        type="button"
        role="menuitem"
        tabindex="-1"
        class="oxui-menu__item"
        @click="select(item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<style>
/* Plain CSS on purpose — see AppSidebar.vue. */
.oxui-menu {
  position: relative;
  display: inline-block;
}
.oxui-menu__list {
  position: absolute;
  right: 0;
  z-index: 10;
  min-width: 110px;
  padding: 4px 0;
  border-radius: 6px;
  background: var(--hm-bg-overlay);
  border: 0.5px solid var(--hm-border-default);
}
.oxui-menu__list--bottom {
  top: calc(100% + 4px);
}
.oxui-menu__list--top {
  bottom: calc(100% + 4px);
}
.oxui-menu__item {
  display: block;
  width: 100%;
  padding: 6px 12px;
  text-align: left;
  font-family: var(--hm-font-sans);
  font-size: var(--hm-text-base);
  color: var(--hm-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
}
.oxui-menu__item:hover,
.oxui-menu__item:focus-visible {
  background: var(--hm-bg-elevated);
  color: var(--hm-text-primary);
}
.oxui-menu__item:focus-visible {
  outline: 2px solid var(--hm-accent);
  outline-offset: -2px;
}
</style>
