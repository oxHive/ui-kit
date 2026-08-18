<script setup>
import { SkeletonCard } from '../../src/index.js'
import PgSection from '../PgSection.vue'
</script>

<template>
  <PgSection title="SkeletonCard" description="no props — loading placeholder shape">
    <template #controls>
      <span style="font-size:12px; color:var(--hm-text-tertiary)">static, no controls</span>
    </template>
    <template #preview>
      <div style="width:280px; border:0.5px solid var(--hm-border-subtle); border-radius:6px; overflow:hidden; background:var(--hm-bg-surface)">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </template>
    <template #snippet>{{ '<SkeletonCard />' }}</template>
  </PgSection>
</template>
