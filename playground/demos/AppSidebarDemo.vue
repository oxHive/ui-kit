<script setup>
import { h, reactive } from 'vue'
import { AppSidebar, AppNav, Badge } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const DotIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'currentColor' }),
]) }
const RingIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }),
]) }
const ProductIcon = { render: () => h('svg', { width: 22, height: 22, viewBox: '0 0 16 16' }, [
  h('polygon', { points: '8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75', fill: 'none', stroke: 'var(--hm-accent)', 'stroke-width': 1.2 }),
  h('circle', { cx: 8, cy: 8, r: 2, fill: 'var(--hm-accent)' }),
]) }

const items = reactive([
  { label: 'Memories', icon: DotIcon, active: true },
  { label: 'Graph', icon: RingIcon, active: false },
  { label: 'Settings', icon: DotIcon, active: false },
])
</script>

<template>
  <PgSection
    title="AppSidebar"
    description="standardized header (logo-icon slot + productName/version props) and a fixed OxHive brand footer, composed here with AppNav + Badge in the default/status/footer slots"
  >
    <template #controls>
      <span style="font-size:12px; color:var(--hm-text-tertiary)">static demo, no controls</span>
    </template>
    <template #preview>
      <div style="height:400px; width:100%; display:flex; border:0.5px solid var(--hm-border-subtle); border-radius:6px; overflow:hidden">
        <AppSidebar product-name="Playground" version="0.1.0">
          <template #logo-icon>
            <ProductIcon />
          </template>

          <AppNav :items="items" />

          <template #status>
            <div style="padding:0 20px; font-size:11px; color:var(--hm-text-tertiary)">
              <Badge label="synced" color="#1d9e75" />
            </div>
          </template>

          <template #footer>
            <div style="font-size:11px; color:var(--hm-text-tertiary)">1,234 items</div>
          </template>
        </AppSidebar>
        <div style="flex:1; padding:16px; font-size:12px; color:var(--hm-text-tertiary); background:var(--hm-bg-base)">main content area</div>
      </div>
    </template>
  </PgSection>
</template>
