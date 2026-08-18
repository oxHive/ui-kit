<script setup>
import { ref } from 'vue'
import { Badge } from '../../src/index.js'

const label = ref('personal')
const color = ref('#1d9e75')
</script>

<template>
  <section class="pg-section">
    <h2>Badge</h2>
    <p class="pg-desc">label + color (color drives a color-mix background tint)</p>
    <div class="pg-controls">
      <label class="pg-control">
        label
        <input type="text" v-model="label" />
      </label>
      <label class="pg-control">
        color
        <input type="color" v-model="color" style="height:28px; width:48px; padding:0; border:none; background:none" />
      </label>
    </div>
    <div class="pg-preview">
      <Badge :label="label" :color="color" />
      <Badge label="no color" />
    </div>
  </section>
</template>
