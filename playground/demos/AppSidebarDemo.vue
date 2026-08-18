<script setup>
import { h, reactive } from 'vue'
import { AppSidebar, AppNav, Badge } from '../../src/index.js'

const DotIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'currentColor' }),
]) }
const RingIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }),
]) }

const items = reactive([
  { label: 'Memories', icon: DotIcon, active: true },
  { label: 'Graph', icon: RingIcon, active: false },
  { label: 'Settings', icon: DotIcon, active: false },
])
</script>

<template>
  <section class="pg-section">
    <h2>AppSidebar</h2>
    <p class="pg-desc">slot-driven shell (logo / default / status / footer), composed here with AppNav + Badge</p>
    <div style="height:360px; display:flex; border:0.5px solid var(--hm-border-subtle); border-radius:6px; overflow:hidden">
      <AppSidebar>
        <template #logo>
          <div style="font-size:15px; font-weight:600">Playground</div>
        </template>

        <AppNav :items="items" />

        <template #status>
          <div style="padding:0 20px; font-size:11px; color:var(--hm-text-tertiary)">
            <Badge label="synced" color="#1d9e75" />
          </div>
        </template>

        <template #footer>
          <div style="font-size:11px; color:var(--hm-text-tertiary)">@oxhive/ui demo</div>
        </template>
      </AppSidebar>
      <div style="flex:1; padding:16px; font-size:12px; color:var(--hm-text-tertiary)">main content area</div>
    </div>
  </section>
</template>
