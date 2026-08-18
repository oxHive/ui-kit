<template>
  <div class="px-4 py-3.5" style="border-bottom:0.5px solid var(--hm-border-subtle)">
    <div class="oxui-skeleton h-3 w-3/4 mb-2 rounded"></div>
    <div class="oxui-skeleton h-2.5 w-full mb-2 rounded"></div>
    <div class="oxui-skeleton h-2 w-1/2 rounded"></div>
  </div>
</template>

<style>
@keyframes oxui-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.oxui-skeleton {
  background: linear-gradient(90deg, var(--hm-bg-elevated) 25%, var(--hm-bg-overlay) 50%, var(--hm-bg-elevated) 75%);
  background-size: 800px 100%;
  animation: oxui-shimmer 1.5s infinite;
  border-radius: 4px;
}
@media (prefers-reduced-motion: reduce) {
  .oxui-skeleton { animation: none; }
}
</style>
