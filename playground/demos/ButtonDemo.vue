<script setup>
import { ref } from 'vue'
import { Button } from '../../src/index.js'

const variant = ref('primary')
const size = ref('md')
const disabled = ref(false)
</script>

<template>
  <section class="pg-section">
    <h2>Button</h2>
    <p class="pg-desc">variant: primary | default | danger | ghost — size: sm | md</p>
    <div class="pg-controls">
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
    </div>
    <div class="pg-preview">
      <Button :variant="variant" :size="size" :disabled="disabled">Save</Button>
    </div>
  </section>
</template>
