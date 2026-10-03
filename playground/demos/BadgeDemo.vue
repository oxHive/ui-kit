<script setup>
import { ref, computed } from 'vue'
import { Badge, Input, SegmentedControl } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const PRESETS = ['personal', 'workspace', 'org', 'warning', 'danger', 'accent'].map((t) => ({
  label: t,
  value: `var(--hm-${t})`,
}))

const label = ref('personal')
const color = ref('var(--hm-personal)')
// <input type="color"> only speaks hex, so it drives `color` but never reads it back.
const custom = ref('#3d84d9')

const snippet = computed(() => `<Badge label="${label.value}" color="${color.value}" />`)

const API = [
  { name: 'label', type: 'string', default: "''", note: 'Badge text, set in the mono face.' },
  {
    name: 'color',
    type: 'CSS color',
    default: "''",
    note: 'Hex, rgb()/hsl(), var(--x) or a named color. Tints the background at 18% and colors the text. Anything else falls back to neutral.',
  },
]
</script>

<template>
  <PgSection
    title="Badge"
    description="A small mono label for scope, status or counts. Scope hues (personal, workspace, org) each mean one thing; keep them for that."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">label</span>
        <Input v-model="label" />
      </label>
      <div class="pg-control">
        <span class="pg-control__label">color: token</span>
        <SegmentedControl v-model="color" :options="PRESETS" aria-label="color token" />
      </div>
      <label class="pg-control">
        <span class="pg-control__label">color: custom</span>
        <span class="pg-color">
          <input v-model="custom" type="color" @input="color = custom" />
          <code class="pg-note">{{ custom }}</code>
        </span>
      </label>
    </template>
    <template #preview>
      <div class="pg-stack">
        <Badge :label="label" :color="color" />
        <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center">
          <Badge label="personal" color="var(--hm-personal)" />
          <Badge label="workspace" color="var(--hm-workspace)" />
          <Badge label="org" color="var(--hm-org)" />
          <Badge label="no color" />
        </div>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
