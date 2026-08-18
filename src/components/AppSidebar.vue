<template>
  <nav class="flex flex-col shrink-0 h-full"
    style="width:200px; background:var(--hm-bg-surface); border-right:0.5px solid var(--hm-border-subtle)">

    <div class="px-5 pt-6 pb-7" style="border-bottom:0.5px solid var(--hm-border-subtle)">
      <slot name="logo" />
    </div>

    <slot />

    <div class="mt-auto">
      <slot name="status" />
      <div class="px-5 pb-5 pt-4" style="border-top:0.5px solid var(--hm-border-subtle)">
        <slot name="footer" />
      </div>
    </div>
  </nav>
</template>
