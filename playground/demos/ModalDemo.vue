<script setup>
import { ref, computed } from 'vue'
import { Button, Modal } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const title = ref('Delete memory?')
const body = ref('This will be permanently deleted.')
const confirmLabel = ref('Delete')
const dangerous = ref(true)
const open = ref(false)
const lastAction = ref('')

function onConfirm() {
  lastAction.value = 'confirm'
  open.value = false
}
function onCancel() {
  lastAction.value = 'cancel'
  open.value = false
}

const snippet = computed(
  () => `<Modal
  title="${title.value}"
  body="${body.value}"
  confirm-label="${confirmLabel.value}"
  :dangerous="${dangerous.value}"
  @confirm="..."
  @cancel="..."
/>`,
)
</script>

<template>
  <PgSection
    title="Modal"
    description="title / body / confirmLabel / dangerous, emits confirm / cancel"
  >
    <template #controls>
      <label class="pg-control">
        title
        <input v-model="title" type="text" />
      </label>
      <label class="pg-control">
        confirmLabel
        <input v-model="confirmLabel" type="text" />
      </label>
      <label class="pg-control pg-check">
        <input v-model="dangerous" type="checkbox" />
        dangerous
      </label>
    </template>
    <template #preview>
      <div class="pg-section__preview--column">
        <Button variant="default" @click="open = true">Open modal</Button>
        <span v-if="lastAction" style="font-size: 12px; color: var(--hm-text-tertiary)"
          >last emit: {{ lastAction }}</span
        >
      </div>
      <Modal
        v-if="open"
        :title="title"
        :body="body"
        :confirm-label="confirmLabel"
        :dangerous="dangerous"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
