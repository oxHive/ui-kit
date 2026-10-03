<script setup>
import { ref, computed } from 'vue'
import { CopyButton, Input, SegmentedControl } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('mynd status')
const variant = ref('default')
const lastEmit = ref('')
const VARIANTS = ['default', 'ghost', 'primary'].map((v) => ({ label: v, value: v }))

const snippet = computed(
  () => `<CopyButton text="${text.value}" variant="${variant.value}" @copied="showToast" />

<!-- icon-only -->
<CopyButton :text="id" variant="ghost" aria-label="Copy ID">
  <template #default="{ copied }">{{ copied ? '✓' : '⎘' }}</template>
</CopyButton>`,
)

const API = [
  {
    name: 'text',
    type: 'string | () => string',
    note: 'What to copy. A function is read at click time, e.g. to copy rendered DOM text.',
  },
  { name: 'label', type: 'string', default: "'Copy'", note: 'Resting label.' },
  {
    name: 'copiedLabel',
    type: 'string',
    default: "'Copied'",
    note: 'Shown for 1.5s after a successful copy.',
  },
  { name: 'variant', type: 'Button variant', default: "'default'", note: 'Passed to Button.' },
  { name: 'size', type: "'sm' | 'md'", default: "'sm'", note: 'Passed to Button.' },
  { name: '@copied', type: '(text: string)', note: 'Fires after the clipboard write succeeds.' },
  {
    name: '@error',
    type: '(err: Error)',
    note: 'Fires when both the Clipboard API and the execCommand fallback fail.',
  },
  { name: '#default', type: '{ copied: boolean }', note: 'Replace the label, e.g. with an icon.' },
]
</script>

<template>
  <PgSection
    title="CopyButton"
    description="Copies a string and confirms in place. Falls back to execCommand outside secure contexts, so it still works on dashboards served over plain http."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">text</span>
        <Input v-model="text" />
      </label>
      <div class="pg-control">
        <span class="pg-control__label">variant</span>
        <SegmentedControl v-model="variant" :options="VARIANTS" aria-label="variant" />
      </div>
    </template>
    <template #preview>
      <div class="pg-stack">
        <div style="display: flex; gap: 12px; align-items: center">
          <CopyButton
            :text="text"
            :variant="variant"
            @copied="lastEmit = `@copied: ${$event}`"
            @error="lastEmit = '@error'"
          />
          <CopyButton :text="text" variant="ghost" title="Copy" aria-label="Copy">
            <template #default="{ copied }">
              <svg
                v-if="!copied"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
                <path
                  d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
                />
              </svg>
              <svg
                v-else
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8.5 6.5 12 13 4.5" />
              </svg>
            </template>
          </CopyButton>
        </div>
        <span class="pg-note" aria-live="polite">{{ lastEmit || 'click to copy' }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
