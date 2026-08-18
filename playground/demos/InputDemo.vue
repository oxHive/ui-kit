<script setup>
import { ref, computed } from 'vue'
import { Input } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('Hello')

const snippet = computed(() => `<Input v-model="text" />\n\n// text.value === ${JSON.stringify(text.value)}`)
</script>

<template>
  <PgSection title="Input" description="v-model text field">
    <template #controls>
      <span style="font-size:12px; color:var(--hm-text-tertiary)">value: {{ text }}</span>
    </template>
    <template #preview>
      <Input v-model="text" style="width:240px" />
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
