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
  font-size: var(--oxui-text-md);
  font-family: var(--oxui-font-sans);
  background: var(--oxui-bg-elevated);
  border: 0.5px solid var(--oxui-border-subtle);
  border-radius: 6px;
  color: var(--oxui-text-primary);
  outline: none;
  width: 100%;
}
.oxui-input:focus {
  border-color: var(--oxui-accent);
}
.oxui-input::placeholder {
  color: var(--oxui-text-tertiary);
}
</style>
