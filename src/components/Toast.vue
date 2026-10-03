<script setup>
// visible: controls the fade transition in/out.
// message: text shown inside the toast.
defineProps({ visible: Boolean, message: { type: String, default: '' } })
</script>

<template>
  <div role="status" aria-live="polite" class="oxui-toast-wrap">
    <Transition name="oxui-toast">
      <div
        v-if="visible"
        class="oxui-toast"
        style="
          background: var(--oxui-bg-overlay);
          border: 0.5px solid var(--oxui-border-default);
          color: var(--oxui-text-secondary);
        "
      >
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: bare utility classes referenced only inside
 * @oxhive/ui's dist bundle never get generated in a consuming app's build.
 */
.oxui-toast-wrap {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}
.oxui-toast {
  white-space: nowrap;
  border-radius: 6px;
  padding: 6px 14px;
  font-family: var(--oxui-font-mono);
  font-size: var(--oxui-text-base);
}
.oxui-toast-enter-active,
.oxui-toast-leave-active {
  transition: opacity 0.2s;
}
.oxui-toast-enter-from,
.oxui-toast-leave-to {
  opacity: 0;
}
</style>
