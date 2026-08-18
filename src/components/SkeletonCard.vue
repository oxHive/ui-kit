<template>
  <div class="oxui-skeleton-card" style="border-bottom:0.5px solid var(--hm-border-subtle)">
    <div class="oxui-skeleton oxui-skeleton--title"></div>
    <div class="oxui-skeleton oxui-skeleton--body"></div>
    <div class="oxui-skeleton oxui-skeleton--meta"></div>
  </div>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: bare utility classes referenced only inside
 * @oxhive/ui's dist bundle never get generated in a consuming app's build.
 */
@keyframes oxui-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.oxui-skeleton-card {
  padding: 14px 16px;
}
.oxui-skeleton {
  background: linear-gradient(90deg, var(--hm-bg-elevated) 25%, var(--hm-bg-overlay) 50%, var(--hm-bg-elevated) 75%);
  background-size: 800px 100%;
  animation: oxui-shimmer 1.5s infinite;
  border-radius: 4px;
}
.oxui-skeleton--title { height: 12px; width: 75%; margin-bottom: 8px; }
.oxui-skeleton--body { height: 10px; width: 100%; margin-bottom: 8px; }
.oxui-skeleton--meta { height: 8px; width: 50%; }
@media (prefers-reduced-motion: reduce) {
  .oxui-skeleton { animation: none; }
}
</style>
