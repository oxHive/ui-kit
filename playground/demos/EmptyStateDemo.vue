<script setup>
import { ref } from 'vue'
import { EmptyState } from '../../src/index.js'

const message = ref('No memories yet.')
const hint = ref('Ask Claude to remember something.')
</script>

<template>
  <section class="pg-section">
    <h2>EmptyState</h2>
    <p class="pg-desc">message / hint props, icon via named slot (caller supplies the mark)</p>
    <div class="pg-controls">
      <label class="pg-control" style="flex:1; min-width:220px">
        message
        <input type="text" v-model="message" />
      </label>
      <label class="pg-control" style="flex:1; min-width:220px">
        hint
        <input type="text" v-model="hint" />
      </label>
    </div>
    <div class="pg-swatch" style="height:160px">
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
  </section>
</template>
