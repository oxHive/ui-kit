<script setup>
import { h, ref, computed } from 'vue'
import { AppSidebar, AppNav, Badge, Input } from '../../src/index.js'
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
const ProductIcon = {
  render: () =>
    h('svg', { width: 22, height: 22, viewBox: '0 0 16 16', 'aria-hidden': 'true' }, [
      h('polygon', {
        points: '8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75',
        fill: 'none',
        stroke: 'var(--oxui-accent)',
        'stroke-width': 1.2,
      }),
      h('circle', { cx: 8, cy: 8, r: 2, fill: 'var(--oxui-accent)' }),
    ]),
}

const productName = ref('Hivemind')
const version = ref('0.2.0')
const active = ref(0)
const ITEMS = [
  { label: 'Memories', icon: icon('M2.5 4.5h11M2.5 8h11M2.5 11.5h7') },
  { label: 'Feedback', icon: icon('M3 14V2.5h8.5l-1.5 3 1.5 3H3'), badge: 3 },
  {
    label: 'Settings',
    icon: icon('M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2'),
  },
]
const items = computed(() =>
  ITEMS.map((item, i) => ({
    ...item,
    active: i === active.value,
    onClick: () => (active.value = i),
  })),
)

const snippet = computed(
  () => `<AppSidebar product-name="${productName.value}"${version.value ? ` version="${version.value}"` : ''}>
  <template #logo-icon><ProductIcon /></template>

  <AppNav :items="items" />

  <template #status>
    <Badge label="synced" color="var(--oxui-personal)" />
  </template>
  <template #footer>1,234 memories</template>
</AppSidebar>`,
)

const API = [
  { name: 'productName', type: 'string', note: 'Required. Shown in the header.' },
  { name: 'version', type: 'string', default: "''", note: 'Shown as v{version} beside the name.' },
  { name: '#logo-icon', type: 'slot', note: 'Product mark left of the name.' },
  { name: '#default', type: 'slot', note: 'Nav content, usually AppNav.' },
  { name: '#status', type: 'slot', note: 'Above the footer box, e.g. a sync badge.' },
  {
    name: '#footer',
    type: 'slot',
    note: 'Bordered box above the fixed OxHive brand line; hidden when empty.',
  },
]
</script>

<template>
  <PgSection
    title="AppSidebar"
    description="The 200px frame every OxHive product shares: a product header, your nav, and the OxHive mark pinned to the bottom. This playground's own sidebar is one."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">productName</span>
        <Input v-model="productName" />
      </label>
      <label class="pg-control">
        <span class="pg-control__label">version</span>
        <Input v-model="version" />
      </label>
    </template>
    <template #preview>
      <div
        style="
          height: 420px;
          width: 100%;
          max-width: 520px;
          display: flex;
          border: 0.5px solid var(--oxui-border-subtle);
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <AppSidebar :product-name="productName" :version="version">
          <template #logo-icon><ProductIcon /></template>
          <AppNav :items="items" />
          <template #status>
            <div style="padding: 0 20px 12px">
              <Badge label="synced" color="var(--oxui-personal)" />
            </div>
          </template>
          <template #footer>
            <div style="font-size: 11px; color: var(--oxui-text-tertiary)">1,234 memories</div>
          </template>
        </AppSidebar>
        <div
          style="
            flex: 1;
            min-width: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: var(--oxui-bg-base);
          "
        >
          <div style="font-size: 14px; font-weight: 600">{{ ITEMS[active].label }}</div>
          <Input placeholder="Search" aria-label="Search" />
        </div>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
