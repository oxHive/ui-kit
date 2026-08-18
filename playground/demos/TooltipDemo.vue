<script setup>
import { ref } from 'vue'
import { Tooltip } from '../../src/index.js'

const text = ref('Hover me for a tooltip')
const visible = ref(false)
const x = ref(0)
const y = ref(0)

function onEnter(e) {
  const rect = e.target.getBoundingClientRect()
  x.value = rect.left + rect.width / 2
  y.value = rect.top
  visible.value = true
}
function onLeave() {
  visible.value = false
}
</script>

<template>
  <section class="pg-section">
    <h2>Tooltip</h2>
    <p class="pg-desc">text / visible / x / y — flips below when near the top of the viewport</p>
    <div class="pg-controls">
      <label class="pg-control" style="flex:1; min-width:220px">
        text
        <input type="text" v-model="text" />
      </label>
    </div>
    <div class="pg-swatch">
      <span
        style="padding:6px 12px; border:0.5px solid var(--hm-border-default); border-radius:4px; font-size:12px; cursor:default"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >hover target</span>
      <Tooltip :visible="visible" :text="text" :x="x" :y="y" />
    </div>
  </section>
</template>
