<script setup>
import { SkeletonCard } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const SNIPPET = `<template v-if="loading">
  <SkeletonCard v-for="n in 3" :key="n" />
</template>`
</script>

<template>
  <PgSection
    title="SkeletonCard"
    description="A list-row placeholder (title, body, meta bars) that shimmers while data loads. It takes no props, and the shimmer stops under prefers-reduced-motion."
  >
    <template #preview>
      <div
        style="
          width: min(100%, 320px);
          border: 0.5px solid var(--oxui-border-subtle);
          border-radius: 8px;
          overflow: hidden;
          background: var(--oxui-bg-surface);
        "
        aria-busy="true"
        aria-label="Loading"
      >
        <SkeletonCard v-for="n in 3" :key="n" />
      </div>
    </template>
    <template #snippet>{{ SNIPPET }}</template>
  </PgSection>
</template>
