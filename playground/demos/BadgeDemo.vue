<script setup>
import { ref, computed } from 'vue'
import { Badge } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const label = ref('personal')
const color = ref('#1d9e75')

const snippet = computed(() => `<Badge label="${label.value}" color="${color.value}" />`)
</script>

<template>
  <PgSection title="Badge" description="label + color (color drives a color-mix background tint)">
    <template #controls>
      <label class="pg-control">
        label
        <input v-model="label" type="text" />
      </label>
      <label class="pg-control">
        color
        <input
          v-model="color"
          type="color"
          style="height: 28px; width: 48px; padding: 0; border: none; background: none"
        />
      </label>
    </template>
    <template #preview>
      <Badge :label="label" :color="color" />
      <Badge label="no color" />
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
