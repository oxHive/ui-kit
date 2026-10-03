<script setup>
import { ref, computed } from 'vue'
import { Button, SegmentedControl } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const variant = ref('primary')
const size = ref('md')
const disabled = ref(false)
const VARIANTS = ['primary', 'default', 'danger', 'ghost'].map((v) => ({ label: v, value: v }))
const SIZES = ['sm', 'md'].map((v) => ({ label: v, value: v }))

const snippet = computed(() => {
  const attrs = [`variant="${variant.value}"`]
  if (size.value !== 'md') attrs.push(`size="${size.value}"`)
  if (disabled.value) attrs.push('disabled')
  return `<Button ${attrs.join(' ')}>Save</Button>`
})

const API = [
  {
    name: 'variant',
    type: "'primary' | 'default' | 'danger' | 'ghost'",
    default: "'default'",
    note: 'Visual weight. Use primary once per view, danger for destructive actions.',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    note: 'sm is 28px tall and switches to the mono face.',
  },
  { name: '#default', type: 'slot', note: 'Button content; text and/or an icon (gap is 6px).' },
  {
    name: '…attrs',
    type: 'native',
    note: 'type, disabled, aria-* and listeners fall through to <button>.',
  },
]
</script>

<template>
  <PgSection
    title="Button"
    description="The base action. Every other clickable in the kit (CopyButton, Menu's trigger, Modal's actions) is built on it."
    :api="API"
  >
    <template #controls>
      <div class="pg-control">
        <span class="pg-control__label">variant</span>
        <SegmentedControl v-model="variant" :options="VARIANTS" aria-label="variant" />
      </div>
      <div class="pg-control">
        <span class="pg-control__label">size</span>
        <SegmentedControl v-model="size" :options="SIZES" aria-label="size" />
      </div>
      <label class="pg-control pg-check">
        <input v-model="disabled" type="checkbox" />
        disabled
      </label>
    </template>
    <template #preview>
      <Button :variant="variant" :size="size" :disabled="disabled">Save</Button>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
