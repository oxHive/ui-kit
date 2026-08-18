<script setup>
import { ref } from 'vue'

defineProps({ modelValue: { type: [String, Number], default: '' } })
defineEmits(['update:modelValue'])

// Exposed so consumers that hold a template ref to <Input> (e.g. to call
// .focus()/.select() after a v-if reveal, same as they would on a raw
// <input>) keep working — a plain <script setup> component with no
// defineExpose() exposes nothing to parent template refs by default.
const inputEl = ref(null)
defineExpose({
  focus: () => inputEl.value?.focus(),
  blur: () => inputEl.value?.blur(),
  select: () => inputEl.value?.select(),
})
</script>

<template>
  <input
    ref="inputEl"
    class="oxui-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style>
.oxui-input {
  height: 32px;
  padding: 0 10px;
  font-size: 13px;
  font-family: var(--hm-font-sans);
  background: var(--hm-bg-elevated);
  border: 0.5px solid var(--hm-border-subtle);
  border-radius: 6px;
  color: var(--hm-text-primary);
  outline: none;
  width: 100%;
}
.oxui-input:focus { border-color: var(--hm-accent); }
.oxui-input::placeholder { color: var(--hm-text-tertiary); }
</style>
