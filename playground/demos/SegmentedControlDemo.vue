<script setup>
import { ref, computed } from 'vue'
import { SegmentedControl } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Personal', value: 'personal', description: 'Only memories on this device' },
  { label: 'Workspace', value: 'workspace', description: 'Memories shared with this workspace' },
]
const value = ref('all')
const disabled = ref(false)

const snippet = computed(
  () => `<SegmentedControl
  v-model="layer"
  :options="[
    { label: 'All', value: 'all' },
    { label: 'Personal', value: 'personal', description: 'Only memories on this device' },
    { label: 'Workspace', value: 'workspace', description: 'Memories shared with this workspace' },
  ]"${disabled.value ? '\n  disabled' : ''}
  aria-label="Filter by layer"
/>`,
)

const API = [
  {
    name: 'v-model',
    type: 'string | number | boolean',
    default: 'null',
    note: "The selected option's value.",
  },
  {
    name: 'options',
    type: '{ label, value, description? }[]',
    note: 'A description shows as a Tooltip on hover or focus and is exposed to screen readers.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    note: 'Shows the current value but blocks changes, e.g. for locked settings.',
  },
  { name: 'aria-label', type: 'string', note: 'Lands on the radiogroup root. Always set one.' },
]
</script>

<template>
  <PgSection
    title="SegmentedControl"
    description="A compact radio group for switching views or filters. It takes one Tab stop; the arrow keys move and select, wrapping at the ends."
    :api="API"
  >
    <template #controls>
      <label class="pg-control pg-check">
        <input v-model="disabled" type="checkbox" />
        disabled
      </label>
    </template>
    <template #preview>
      <div class="pg-stack">
        <SegmentedControl
          v-model="value"
          :options="OPTIONS"
          :disabled="disabled"
          aria-label="Filter by layer"
        />
        <span class="pg-note">value: {{ value }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
