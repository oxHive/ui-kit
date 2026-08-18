<script setup>
import { ref, computed } from 'vue'
import { EmptyState } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const message = ref('No memories yet.')
const hint = ref('Ask Claude to remember something.')

const snippet = computed(() => `<EmptyState message="${message.value}" hint="${hint.value}">
  <template #icon>
    <svg>...</svg>
  </template>
</EmptyState>`)
</script>

<template>
  <PgSection title="EmptyState" description="message / hint props, icon via named slot (caller supplies the mark)">
    <template #controls>
      <label class="pg-control">
        message
        <input type="text" v-model="message" />
      </label>
      <label class="pg-control">
        hint
        <input type="text" v-model="hint" />
      </label>
    </template>
    <template #preview>
      <div class="pg-swatch" style="height:160px; width:100%">
        <EmptyState :message="message" :hint="hint">
          <template #icon>
            <svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true">
              <polygon points="8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75"
                fill="none" stroke="var(--hm-border-strong)" stroke-width="1" />
              <circle cx="8" cy="8" r="1.5" fill="var(--hm-border-strong)" />
            </svg>
          </template>
        </EmptyState>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
