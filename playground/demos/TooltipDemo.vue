<script setup>
import { ref, computed } from 'vue'
import { Tooltip } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('Hover me for a tooltip')
const visible = ref(false)
const x = ref(0)
const y = ref(0)

const snippet = computed(() => `<Tooltip :visible="visible" text="${text.value}" :x="x" :y="y" />`)

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
  <PgSection title="Tooltip" description="text / visible / x / y — flips below when near the top of the viewport">
    <template #controls>
      <label class="pg-control">
        text
        <input type="text" v-model="text" />
      </label>
    </template>
    <template #preview>
      <div class="pg-swatch" style="width:100%">
        <span
          style="padding:6px 12px; border:0.5px solid var(--hm-border-default); border-radius:4px; font-size:12px; cursor:default"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >hover target</span>
        <Tooltip :visible="visible" :text="text" :x="x" :y="y" />
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
