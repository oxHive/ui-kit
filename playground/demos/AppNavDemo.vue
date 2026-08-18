<script setup>
import { h, reactive } from 'vue'
import { AppNav } from '../../src/index.js'

const DotIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'currentColor' }),
]) }
const RingIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }),
]) }

const items = reactive([
  { label: 'Memories', icon: DotIcon, active: true, onClick: () => setActive(0) },
  { label: 'Graph', icon: RingIcon, active: false, onClick: () => setActive(1) },
  { label: 'Feedback', icon: DotIcon, active: false, badge: 3, onClick: () => setActive(2) },
])

function setActive(i) {
  items.forEach((item, idx) => { item.active = idx === i })
}
</script>

<template>
  <section class="pg-section">
    <h2>AppNav</h2>
    <p class="pg-desc">data-driven items: label / icon (component) / active / badge / onClick — click an item to toggle active state</p>
    <div class="pg-swatch" style="justify-content:flex-start; width:200px; padding:0">
      <div style="width:100%; background:var(--hm-bg-surface)">
        <AppNav :items="items" />
      </div>
    </div>
  </section>
</template>
