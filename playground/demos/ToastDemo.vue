<script setup>
import { ref } from 'vue'
import { Button, Toast } from '../../src/index.js'
import PgSection from '../PgSection.vue'

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
  <PgSection title="Toast" description="visible / message props — timeout is the consumer's responsibility, mirrored here">
    <template #controls>
      <label class="pg-control">
        message
        <input type="text" v-model="message" />
      </label>
      <Button variant="default" @click="show">Show toast</Button>
    </template>
    <template #preview>
      <div class="pg-swatch" style="min-height:80px; width:100%">
        <Toast :visible="visible" :message="message" />
      </div>
    </template>
  </PgSection>
</template>
