<script setup>
import { ref } from 'vue'
import Tooltip from './Tooltip.vue'

// v-model: the selected option's value.
// options: [{ label, value, description? }]; a description shows as a
//   Tooltip on hover/focus and is exposed to screen readers.
// disabled: shows the current value but blocks changes (e.g. locked settings).
// Native attrs (aria-label) land on the radiogroup root.
// Keyboard: one Tab stop; arrow keys move and select, wrapping (radio pattern).
const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: null },
  options: { type: Array, required: true },
  disabled: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const rootEl = ref(null)
const tip = ref({ visible: false, text: '', x: 0, y: 0 })

function showTip(e, option) {
  if (!option.description) return
  const rect = e.currentTarget.getBoundingClientRect()
  tip.value = {
    visible: true,
    text: option.description,
    x: rect.left + rect.width / 2,
    y: rect.top,
  }
}

function hideTip() {
  tip.value.visible = false
}

// The checked option is the Tab stop; with nothing checked, the first is.
function tabIndexFor(option, i) {
  const checked = props.options.some((o) => o.value === props.modelValue)
  return (checked ? option.value === props.modelValue : i === 0) ? 0 : -1
}

function onKeydown(e, i) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
  if (!step) return
  e.preventDefault()
  const next = (i + step + props.options.length) % props.options.length
  emit('update:modelValue', props.options[next].value)
  rootEl.value?.querySelectorAll('[role="radio"]')[next]?.focus()
}
</script>

<template>
  <div ref="rootEl" role="radiogroup" class="oxui-segmented" :aria-disabled="disabled || undefined">
    <button
      v-for="(option, i) in options"
      :key="option.value"
      type="button"
      role="radio"
      class="oxui-segmented__item"
      :class="{ 'oxui-segmented__item--active': option.value === modelValue }"
      :aria-checked="option.value === modelValue"
      :aria-description="option.description || undefined"
      :tabindex="tabIndexFor(option, i)"
      :disabled="disabled"
      @click="emit('update:modelValue', option.value)"
      @keydown="onKeydown($event, i)"
      @mouseenter="showTip($event, option)"
      @mouseleave="hideTip"
      @focus="showTip($event, option)"
      @blur="hideTip"
    >
      {{ option.label }}
    </button>
    <Tooltip :visible="tip.visible" :text="tip.text" :x="tip.x" :y="tip.y" />
  </div>
</template>

<style>
/* Plain CSS on purpose — see AppSidebar.vue. */
.oxui-segmented {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: 7px;
  background: var(--hm-bg-elevated);
  border: 0.5px solid var(--hm-border-subtle);
}
.oxui-segmented__item {
  border: none;
  background: transparent;
  padding: 5px 11px;
  border-radius: 5px;
  font-family: var(--hm-font-sans);
  font-size: var(--hm-text-sm);
  color: var(--hm-text-tertiary);
  cursor: pointer;
  transition:
    background 0.1s,
    color 0.1s;
}
.oxui-segmented__item:hover:not(:disabled) {
  color: var(--hm-text-secondary);
}
.oxui-segmented__item:focus-visible {
  outline: 2px solid var(--hm-accent);
  outline-offset: -2px;
}
.oxui-segmented__item--active {
  background: var(--hm-bg-overlay);
  color: var(--hm-text-primary);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.oxui-segmented__item:disabled {
  cursor: not-allowed;
}
.oxui-segmented__item:disabled:not(.oxui-segmented__item--active) {
  opacity: 0.5;
}
</style>
