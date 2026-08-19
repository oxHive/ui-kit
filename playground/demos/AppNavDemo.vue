<script setup>
import { h, reactive, computed } from 'vue'
import { AppNav } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const DotIcon = {
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
      h('circle', { cx: 8, cy: 8, r: 5, fill: 'currentColor' }),
    ]),
}
const RingIcon = {
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
      h('circle', {
        cx: 8,
        cy: 8,
        r: 5,
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 1.5,
      }),
    ]),
}

const items = reactive([
  { label: 'Memories', icon: DotIcon, active: true, onClick: () => setActive(0) },
  { label: 'Graph', icon: RingIcon, active: false, onClick: () => setActive(1) },
  { label: 'Feedback', icon: DotIcon, active: false, badge: 3, onClick: () => setActive(2) },
])

function setActive(i) {
  items.forEach((item, idx) => {
    item.active = idx === i
  })
}

const snippet = computed(() => {
  const lines = items.map((item) => {
    const parts = [`label: '${item.label}'`, 'icon: DotIcon', `active: ${item.active}`]
    if (item.badge) parts.push(`badge: ${item.badge}`)
    return `  { ${parts.join(', ')} },`
  })
  return `const items = [\n${lines.join('\n')}\n]\n\n<AppNav :items="items" />`
})
</script>

<template>
  <PgSection
    title="AppNav"
    description="data-driven items: label / icon (component) / active / badge / onClick"
  >
    <template #controls>
      <span style="font-size: 12px; color: var(--hm-text-tertiary)"
        >click an item to toggle active state</span
      >
    </template>
    <template #preview>
      <div
        style="
          width: 200px;
          background: var(--hm-bg-surface);
          border: 0.5px solid var(--hm-border-subtle);
          border-radius: 6px;
          overflow: hidden;
        "
      >
        <AppNav :items="items" />
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
