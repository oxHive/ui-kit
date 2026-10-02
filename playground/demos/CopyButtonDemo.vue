<script setup>
import { ref, computed } from 'vue'
import { CopyButton } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const text = ref('mynd status')
const variant = ref('default')
const lastEmit = ref('')

const snippet = computed(
  () => `<CopyButton text="${text.value}" variant="${variant.value}" @copied="showToast" />

<!-- icon-only -->
<CopyButton :text="id" variant="ghost" title="Copy ID" aria-label="Copy ID">
  <template #default="{ copied }">{{ copied ? '✓' : '⎘' }}</template>
</CopyButton>`,
)
</script>

<template>
  <PgSection
    title="CopyButton"
    description="text (string | () => string), label, copiedLabel, variant, size; emits copied / error; default slot { copied }"
  >
    <template #controls>
      <label class="pg-control">
        text
        <input v-model="text" type="text" />
      </label>
      <label class="pg-control">
        variant
        <select v-model="variant">
          <option>default</option>
          <option>ghost</option>
          <option>primary</option>
        </select>
      </label>
    </template>
    <template #preview>
      <div class="pg-section__preview--column">
        <CopyButton
          :text="text"
          :variant="variant"
          @copied="lastEmit = `copied: ${$event}`"
          @error="lastEmit = 'error'"
        />
        <CopyButton :text="text" variant="ghost" title="Copy ID" aria-label="Copy ID">
          <template #default="{ copied }">{{ copied ? '✓' : '⎘' }}</template>
        </CopyButton>
        <span v-if="lastEmit" style="font-size: 12px; color: var(--hm-text-tertiary)">{{
          lastEmit
        }}</span>
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
