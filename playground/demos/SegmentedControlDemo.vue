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
</script>

<template>
  <PgSection
    title="SegmentedControl"
    description="v-model; options: { label, value, description? }[]; disabled. Arrow keys move the selection."
  >
    <template #controls>
      <label class="pg-control pg-check">
        <input v-model="disabled" type="checkbox" />
        disabled
      </label>
    </template>
    <template #preview>
      <div class="pg-section__preview--column">
        <SegmentedControl
          v-model="value"
          :options="OPTIONS"
          :disabled="disabled"
          aria-label="Filter by layer"
        />
        <span style="font-size: 12px; color: var(--hm-text-tertiary)">value: {{ value }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
