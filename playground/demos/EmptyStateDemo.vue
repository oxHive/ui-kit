<script setup>
import { ref, computed } from 'vue'
import { EmptyState, Input } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const message = ref('No memories yet.')
const hint = ref('Ask Claude to remember something.')

const snippet = computed(
  () => `<EmptyState message="${message.value}" hint="${hint.value}">
  <template #icon>
    <svg>...</svg>
  </template>
</EmptyState>`,
)

const API = [
  { name: 'message', type: 'string', default: "''", note: 'Primary line.' },
  {
    name: 'hint',
    type: 'string',
    default: "''",
    note: 'Optional second line, usually the next action.',
  },
  { name: '#icon', type: 'slot', note: 'Mark above the text; the caller supplies it.' },
]
</script>

<template>
  <PgSection
    title="EmptyState"
    description="What a list shows when there is nothing in it. It fills its container's height and centers itself."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">message</span>
        <Input v-model="message" />
      </label>
      <label class="pg-control">
        <span class="pg-control__label">hint</span>
        <Input v-model="hint" />
      </label>
    </template>
    <template #preview>
      <div
        style="
          width: min(100%, 360px);
          height: 200px;
          border: 0.5px solid var(--oxui-border-subtle);
          border-radius: 8px;
          background: var(--oxui-bg-surface);
        "
      >
        <EmptyState :message="message" :hint="hint">
          <template #icon>
            <svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true">
              <polygon
                points="8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75"
                fill="none"
                stroke="var(--oxui-border-strong)"
                stroke-width="1"
              />
              <circle cx="8" cy="8" r="1.5" fill="var(--oxui-border-strong)" />
            </svg>
          </template>
        </EmptyState>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
