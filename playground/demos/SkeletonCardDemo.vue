<script setup>
import { SkeletonCard } from '../../src/index.js'
</script>

<template>
  <section class="pg-section">
    <h2>SkeletonCard</h2>
    <p class="pg-desc">no props — loading placeholder shape</p>
    <div class="pg-preview pg-preview--column" style="width:280px; border:0.5px solid var(--hm-border-subtle); border-radius:6px; overflow:hidden">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </section>
</template>
