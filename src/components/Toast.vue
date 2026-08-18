<script setup>
defineProps({ visible: Boolean, message: { type: String, default: '' } })
</script>

<template>
  <div role="status" aria-live="polite" class="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
    <Transition name="oxui-toast">
      <div v-if="visible"
        class="whitespace-nowrap rounded-md px-3.5 py-1.5 font-mono text-xs"
        style="background:var(--hm-bg-overlay); border:0.5px solid var(--hm-border-default); color:var(--hm-text-secondary)">
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<style>
.oxui-toast-enter-active, .oxui-toast-leave-active { transition: opacity 0.2s; }
.oxui-toast-enter-from, .oxui-toast-leave-to { opacity: 0; }
</style>
