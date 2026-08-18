<script setup>
import { ref } from 'vue'
import { Button, Toast } from '../../src/index.js'

const message = ref('Copied: /memory-edit mem_a1b2c3')
const visible = ref(false)
let timer = null

function show() {
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, 2200)
}
</script>

<template>
  <section class="pg-section">
    <h2>Toast</h2>
    <p class="pg-desc">visible / message props — timeout is the consumer's responsibility, mirrored here</p>
    <div class="pg-controls">
      <label class="pg-control" style="flex:1; min-width:220px">
        message
        <input type="text" v-model="message" style="width:100%" />
      </label>
    </div>
    <div class="pg-preview">
      <Button variant="default" @click="show">Show toast</Button>
    </div>
    <div class="pg-swatch" style="min-height:80px">
      <Toast :visible="visible" :message="message" />
    </div>
  </section>
</template>
