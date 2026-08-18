<script setup>
import { ref } from 'vue'
import { Input } from '../../src/index.js'

const text = ref('Hello')
</script>

<template>
  <section class="pg-section">
    <h2>Input</h2>
    <p class="pg-desc">v-model text field</p>
    <div class="pg-preview">
      <Input v-model="text" style="width:240px" />
      <span style="font-size:12px; color:var(--hm-text-tertiary)">value: {{ text }}</span>
    </div>
  </section>
</template>
