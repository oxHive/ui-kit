<script setup>
import { ref, computed } from 'vue'
import { Menu, SegmentedControl } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const ITEMS = ['incorrect', 'outdated', 'duplicate', 'other']
const placement = ref('bottom')
const variant = ref('ghost')
const lastSelect = ref('')
const PLACEMENTS = ['bottom', 'top'].map((v) => ({ label: v, value: v }))
const VARIANTS = ['ghost', 'default'].map((v) => ({ label: v, value: v }))

const snippet = computed(
  () => `<Menu
  :items="${JSON.stringify(ITEMS).replaceAll('"', "'")}"
  placement="${placement.value}"${variant.value !== 'ghost' ? `\n  variant="${variant.value}"` : ''}
  aria-label="Flag for review"
  @select="flag"
>
  <template #trigger>Flag</template>
</Menu>`,
)

const API = [
  { name: 'items', type: 'string[]', note: 'Menu entries; the chosen one is emitted as-is.' },
  {
    name: 'placement',
    type: "'bottom' | 'top'",
    default: "'bottom'",
    note: "Opens below or above the trigger, aligned to the trigger's right edge.",
  },
  { name: 'variant', type: 'Button variant', default: "'ghost'", note: 'Trigger button variant.' },
  { name: 'size', type: "'sm' | 'md'", default: "'sm'", note: 'Trigger button size.' },
  {
    name: '@select',
    type: '(item: string)',
    note: 'Fires on choice; focus returns to the trigger.',
  },
  {
    name: '#trigger',
    type: 'slot',
    note: "The trigger's content, e.g. an icon. title / aria-label fall through to it.",
  },
]
</script>

<template>
  <PgSection
    title="Menu"
    description="A button that opens a short list of choices. Arrows, Home and End move between items; Escape closes and refocuses the trigger; Tab or an outside click closes it."
    :api="API"
  >
    <template #controls>
      <div class="pg-control">
        <span class="pg-control__label">placement</span>
        <SegmentedControl v-model="placement" :options="PLACEMENTS" aria-label="placement" />
      </div>
      <div class="pg-control">
        <span class="pg-control__label">variant</span>
        <SegmentedControl v-model="variant" :options="VARIANTS" aria-label="variant" />
      </div>
    </template>
    <template #preview>
      <div class="pg-stack">
        <Menu
          :items="ITEMS"
          :placement="placement"
          :variant="variant"
          aria-label="Flag for review"
          @select="lastSelect = $event"
        >
          <template #trigger>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 14V2.5h8.5l-1.5 3 1.5 3H3" />
            </svg>
            Flag
          </template>
        </Menu>
        <span class="pg-note" aria-live="polite">{{
          lastSelect ? `@select: ${lastSelect}` : 'open it with the keyboard too'
        }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
