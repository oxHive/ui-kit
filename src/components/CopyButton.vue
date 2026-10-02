<script setup>
import { ref, onBeforeUnmount } from 'vue'
import Button from './Button.vue'

// text: the string to copy, or a function returning it (read at click time,
//   e.g. to copy rendered DOM text).
// label / copiedLabel: button text before and for 1.5s after a copy.
// variant / size: passed to Button.
// Emits `copied` (with the text) or `error`. Default slot receives
// `{ copied }` for icon-only buttons; native attrs (title, aria-label)
// fall through to the <button>.
const props = defineProps({
  text: { type: [String, Function], required: true },
  label: { type: String, default: 'Copy' },
  copiedLabel: { type: String, default: 'Copied' },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'sm' },
})
const emit = defineEmits(['copied', 'error'])

const copied = ref(false)
let timer

// navigator.clipboard only exists in secure contexts (https, localhost), so
// fall back to execCommand for dashboards served over plain http on a LAN.
async function writeClipboard(value) {
  try {
    await navigator.clipboard.writeText(value)
    return
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    textarea.remove()
    if (!ok) throw new Error('Clipboard unavailable')
  }
}

async function copy() {
  const value = typeof props.text === 'function' ? props.text() : props.text
  try {
    await writeClipboard(value)
  } catch (err) {
    emit('error', err)
    return
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, 1500)
  emit('copied', value)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <Button type="button" :variant="variant" :size="size" @click="copy">
    <slot :copied="copied">{{ copied ? copiedLabel : label }}</slot>
  </Button>
</template>
