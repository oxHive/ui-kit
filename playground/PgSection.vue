<script setup>
import { ref, computed } from 'vue'
import { CopyButton } from '../src/index.js'

// api rows: { name, type, default?, note }. Prefix events with `@` and
// slots with `#` so one table covers props, events and slots.
const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  api: { type: Array, default: () => [] },
})

const importLine = computed(() => `import { ${props.title} } from '@oxhive/ui'`)
const snippetEl = ref(null)
</script>

<template>
  <article class="pg-page">
    <header class="pg-page__head">
      <h1 class="pg-page__title">{{ title }}</h1>
      <p class="pg-page__desc">{{ description }}</p>
      <div class="pg-codeline">
        <code>{{ importLine }}</code>
        <CopyButton :text="importLine" variant="ghost" aria-label="Copy import" />
      </div>
    </header>

    <div class="pg-demo" :class="{ 'pg-demo--no-controls': !$slots.controls }">
      <div class="pg-demo__preview">
        <slot name="preview" />
      </div>
      <aside v-if="$slots.controls" class="pg-demo__controls" aria-label="Controls">
        <div class="pg-label">Controls</div>
        <slot name="controls" />
      </aside>
      <div class="pg-demo__code">
        <div class="pg-demo__code-bar">
          <span class="pg-label">Usage</span>
          <CopyButton
            variant="ghost"
            :text="() => snippetEl?.textContent ?? ''"
            aria-label="Copy usage"
          />
        </div>
        <pre class="pg-demo__code-body"><code ref="snippetEl"><slot name="snippet" /></code></pre>
      </div>
    </div>

    <section v-if="api.length" class="pg-api">
      <h2 class="pg-api__title">API</h2>
      <div class="pg-api__scroll">
        <table class="pg-api__table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in api" :key="row.name">
              <td>
                <code class="pg-api__name">{{ row.name }}</code>
              </td>
              <td>
                <code>{{ row.type }}</code>
              </td>
              <td>
                <code v-if="row.default">{{ row.default }}</code
                ><span v-else class="pg-api__none">–</span>
              </td>
              <td>{{ row.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>
