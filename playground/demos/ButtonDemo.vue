<script setup>
import { ref } from 'vue'
import { Button } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const variant = ref('primary')
const size = ref('md')
const disabled = ref(false)
</script>

<template>
  <PgSection title="Button" description="variant: primary | default | danger | ghost — size: sm | md">
    <template #controls>
      <label class="pg-control">
        variant
        <select v-model="variant">
          <option>primary</option>
          <option>default</option>
          <option>danger</option>
          <option>ghost</option>
        </select>
      </label>
      <label class="pg-control">
        size
        <select v-model="size">
          <option>sm</option>
          <option>md</option>
        </select>
      </label>
      <label class="pg-control pg-check">
        <input type="checkbox" v-model="disabled" />
        disabled
      </label>
    </template>
    <template #preview>
      <Button :variant="variant" :size="size" :disabled="disabled">Save</Button>
    </template>
  </PgSection>
</template>
