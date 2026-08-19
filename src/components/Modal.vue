<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Button from './Button.vue'

// title/body: heading + message text.
// confirmLabel: label for the confirm button (e.g. "Delete").
// dangerous: styles the confirm button as the `danger` Button variant
//   instead of `primary`, for destructive actions.
// Emits `confirm` / `cancel`; the overlay click and Escape both emit `cancel`.
defineProps({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  confirmLabel: { type: String, default: '' },
  dangerous: Boolean,
})
const emit = defineEmits(['confirm', 'cancel'])

const modalRef = ref(null)

// Bound to the modal's own root element (not `document`) so the trap stays
// scoped to this instance: a keydown only reaches this handler if it bubbled
// up from inside *this* modal's subtree, so a second concurrently-mounted
// modal's focus trap and Escape handling can't fire for it.
function trapFocus(e) {
  const container = modalRef.value
  if (!container) return
  const focusable = container.querySelectorAll(
    'button, [href], input, [tabindex]:not([tabindex="-1"])',
  )
  if (e.key === 'Tab' && focusable.length > 0) {
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  if (e.key === 'Escape') emit('cancel')
}

onMounted(async () => {
  modalRef.value?.addEventListener('keydown', trapFocus)
  await nextTick()
  modalRef.value?.querySelector('button')?.focus()
})

onBeforeUnmount(() => {
  modalRef.value?.removeEventListener('keydown', trapFocus)
})
</script>

<template>
  <div
    class="oxui-modal-overlay"
    style="background: rgba(0, 0, 0, 0.6)"
    @click.self="$emit('cancel')"
  >
    <div
      ref="modalRef"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      class="oxui-modal"
      style="background: var(--hm-bg-overlay); border: 0.5px solid var(--hm-border-default)"
    >
      <h3 id="confirm-modal-title" class="oxui-modal__title" style="color: var(--hm-text-primary)">
        {{ title }}
      </h3>
      <p class="oxui-modal__body" style="color: var(--hm-text-secondary)">{{ body }}</p>
      <div class="oxui-modal__actions">
        <Button variant="default" @click="$emit('cancel')">Cancel</Button>
        <Button :variant="dangerous ? 'danger' : 'primary'" @click="$emit('confirm')">
          {{ confirmLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
/*
 * Plain CSS on purpose (not Tailwind utility classes) — see AppSidebar.vue
 * for the full rationale: bare utility classes referenced only inside
 * @oxhive/ui's dist bundle never get generated in a consuming app's build.
 */
.oxui-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.oxui-modal {
  border-radius: 8px;
  padding: 24px;
  width: 384px;
}
.oxui-modal__title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
}
.oxui-modal__body {
  font-size: 14px;
  margin-bottom: 20px;
}
.oxui-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
