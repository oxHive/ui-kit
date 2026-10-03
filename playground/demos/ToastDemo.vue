<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { Button, Input, Toast } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const message = ref('Copied: /memory-edit mem_a1b2c3')
const visible = ref(false)
let timer = null

function show() {
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 2200)
}
onBeforeUnmount(() => clearTimeout(timer))

const snippet = computed(
  () => `<Toast :visible="visible" message="${message.value}" />

// the timeout is yours
visible.value = true
setTimeout(() => (visible.value = false), 2200)`,
)

const API = [
  { name: 'visible', type: 'boolean', default: 'false', note: 'Fades the toast in and out.' },
  { name: 'message', type: 'string', default: "''", note: 'One short line, set in mono.' },
]
</script>

<template>
  <PgSection
    title="Toast"
    description="A one-line status pill fixed to the bottom centre of the viewport, inside a polite live region so screen readers announce it. The caller owns the timeout."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">message</span>
        <Input v-model="message" />
      </label>
    </template>
    <template #preview>
      <div class="pg-stack">
        <Button variant="primary" @click="show">Show toast</Button>
        <span class="pg-note">appears at the bottom of the window</span>
      </div>
      <Toast :visible="visible" :message="message" />
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
