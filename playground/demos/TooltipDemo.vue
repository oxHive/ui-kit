<script setup>
import { ref, computed } from 'vue'
import { Input, Tooltip } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('Shared with 4 people in the Design workspace')
const visible = ref(false)
const x = ref(0)
const y = ref(0)

function show(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  x.value = rect.left + rect.width / 2
  y.value = rect.top
  visible.value = true
}

const snippet = computed(
  () => `<span @mouseenter="show" @focus="show" @mouseleave="hide" @blur="hide">target</span>
<Tooltip :visible="visible" text="${text.value}" :x="x" :y="y" />

function show(e) {
  const r = e.currentTarget.getBoundingClientRect()
  x.value = r.left + r.width / 2
  y.value = r.top
  visible.value = true
}`,
)

const API = [
  {
    name: 'visible',
    type: 'boolean',
    default: 'false',
    note: 'Show or hide. Hidden too when text is empty.',
  },
  { name: 'text', type: 'string', default: "''", note: 'Wraps at 320px.' },
  {
    name: 'x',
    type: 'number',
    default: '0',
    note: 'Viewport x of the anchor; the tooltip centres on it.',
  },
  {
    name: 'y',
    type: 'number',
    default: '0',
    note: 'Viewport y of the anchor top. Flips below when there is no room above.',
  },
]
</script>

<template>
  <PgSection
    title="Tooltip"
    description="A positioned hint, teleported to body. The caller decides when to show it and where; pair hover with focus so keyboard users get it too."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">text</span>
        <Input v-model="text" />
      </label>
    </template>
    <template #preview>
      <span
        class="pg-hover-target"
        tabindex="0"
        @mouseenter="show"
        @focus="show"
        @mouseleave="visible = false"
        @blur="visible = false"
        >Hover or focus me</span
      >
      <Tooltip :visible="visible" :text="text" :x="x" :y="y" />
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
