<script setup>
import { ref } from 'vue'

defineProps({ title: String, description: String })

const snippetEl = ref(null)
const copied = ref(false)
let copiedTimer

async function copySnippet() {
  const text = snippetEl.value?.textContent ?? ''
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = false }, 1500)
}
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
        <button type="button" class="pg-copy-btn" @click="copySnippet">
          {{ copied ? 'copied' : 'copy' }}
        </button>
      </div>
      <pre class="pg-snippet-code"><code ref="snippetEl"><slot name="snippet" /></code></pre>
    </div>
  </section>
</template>
