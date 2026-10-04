<script setup>
import { ref, computed } from 'vue'
import { Button, Input } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('Quarterly planning notes')
const placeholder = ref('Search memories')
const inputRef = ref(null)

const snippet = computed(
  () => `<Input v-model="text" placeholder="${placeholder.value}" />

// text.value === ${JSON.stringify(text.value)}
// inputRef.value.select()  focus() / blur() / select() are exposed`,
)

const API = [
  {
    name: 'v-model',
    type: 'string | number',
    default: "''",
    note: 'Bound value (modelValue / update:modelValue).',
  },
  {
    name: '…attrs',
    type: 'native',
    note: 'placeholder, type, aria-label, disabled etc. land on the <input>.',
  },
  {
    name: 'focus() blur() select()',
    type: 'exposed',
    note: 'Call through a template ref, as on a raw input.',
  },
]
</script>

<template>
  <PgSection
    title="Input"
    description="A single-line text field on the elevated surface, with an accent border on focus. It fills its container's width."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">placeholder</span>
        <Input v-model="placeholder" />
      </label>
      <div class="pg-control">
        <span class="pg-control__label">exposed methods</span>
        <div style="display: flex; gap: 6px">
          <Button size="sm" @click="inputRef.focus()">focus()</Button>
          <Button size="sm" @click="inputRef.select()">select()</Button>
        </div>
      </div>
    </template>
    <template #preview>
      <div class="pg-stack" style="width: min(100%, 280px); align-items: stretch">
        <Input ref="inputRef" v-model="text" :placeholder="placeholder" aria-label="Demo input" />
        <span class="pg-note">value: {{ JSON.stringify(text) }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
