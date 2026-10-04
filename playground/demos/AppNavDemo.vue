<script setup>
import { h, ref, computed } from 'vue'
import { AppNav } from '../../src/index.js'
import PgSection from '../PgSection.vue'

function icon(d) {
  return {
    render: () =>
      h(
        'svg',
        {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.3,
          'stroke-linecap': 'round',
        },
        [h('path', { d })],
      ),
  }
}
const ITEMS = [
  { label: 'Memories', icon: icon('M2.5 4.5h11M2.5 8h11M2.5 11.5h7') },
  {
    label: 'Graph',
    icon: icon(
      'M4 5.5a1.5 1.5 0 1 0 0-.01M12 5.5a1.5 1.5 0 1 0 0-.01M8 12a1.5 1.5 0 1 0 0-.01M5.5 5h5M5 6.5l2 4M11 6.5l-2 4',
    ),
  },
  { label: 'Feedback', icon: icon('M3 14V2.5h8.5l-1.5 3 1.5 3H3'), badge: 3 },
]

const active = ref(0)
const items = computed(() =>
  ITEMS.map((item, i) => ({
    ...item,
    active: i === active.value,
    onClick: () => (active.value = i),
  })),
)

const snippet = computed(() => {
  const lines = items.value.map((item) => {
    const parts = [`label: '${item.label}'`, 'icon: ListIcon']
    if (item.active) parts.push('active: true')
    if (item.badge) parts.push(`badge: ${item.badge}`)
    parts.push('onClick: () => go(...)')
    return `  { ${parts.join(', ')} },`
  })
  return `const items = [\n${lines.join('\n')}\n]\n\n<AppNav :items="items" />`
})

const API = [
  { name: 'items', type: 'NavItem[]', note: 'Rendered top to bottom as buttons.' },
  { name: 'item.label', type: 'string', note: 'Row text.' },
  {
    name: 'item.icon',
    type: 'Component',
    note: 'Rendered at 16×16; color follows the row state via currentColor.',
  },
  {
    name: 'item.active',
    type: 'boolean',
    note: 'Highlights the row and sets aria-current="page".',
  },
  { name: 'item.badge', type: 'string | number', note: 'Pill on the right, e.g. an unread count.' },
  {
    name: 'item.onClick',
    type: '() => void',
    note: 'Called on click. AppNav has no router dependency.',
  },
]
</script>

<template>
  <PgSection
    title="AppNav"
    description="The sidebar's navigation list. It is data-driven and router-agnostic: you pass the items, it renders them, and you handle onClick. Click a row to move the active state."
    :api="API"
  >
    <template #preview>
      <div
        style="
          width: 220px;
          background: var(--oxui-bg-surface);
          border: 0.5px solid var(--oxui-border-subtle);
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <AppNav :items="items" />
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
