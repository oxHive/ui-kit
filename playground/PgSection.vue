<script setup>
import { ref } from 'vue'
import { CopyButton } from '../src/index.js'

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})

const snippetEl = ref(null)
</script>

<template>
  <section class="pg-section">
    <div class="pg-section__head">
      <h2>{{ title }}</h2>
      <p class="pg-desc">{{ description }}</p>
    </div>
    <div class="pg-section__body">
      <div class="pg-section__controls">
        <slot name="controls" />
      </div>
      <div class="pg-section__preview">
        <slot name="preview" />
      </div>
    </div>
    <div class="pg-section__snippet">
      <div class="pg-snippet-bar">
        <div class="pg-snippet-label">usage</div>
        <CopyButton variant="ghost" :text="() => snippetEl?.textContent ?? ''" />
      </div>
      <pre class="pg-snippet-code"><code ref="snippetEl"><slot name="snippet" /></code></pre>
    </div>
  </section>
</template>
