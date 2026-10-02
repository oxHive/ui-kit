<script setup>
import { ref, computed } from 'vue'
import { Button, Input, Modal } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const title = ref('Delete memory?')
const body = ref('This will be permanently deleted.')
const confirmLabel = ref('Delete')
const dangerous = ref(true)
const open = ref(false)
const slotsOpen = ref(false)
const confirmText = ref('')
const lastAction = ref('')

function close(action) {
  lastAction.value = action
  open.value = false
  slotsOpen.value = false
  confirmText.value = ''
}

const snippet = computed(
  () => `<Modal
  title="${title.value}"
  body="${body.value}"
  confirm-label="${confirmLabel.value}"
  :dangerous="${dangerous.value}"
  @confirm="..."
  @cancel="..."
/>

<!-- custom body and buttons via slots -->
<Modal title="Confirm deletion" @cancel="...">
  <Input v-model="confirmText" placeholder="DELETE" />
  <template #actions>
    <Button @click="...">Cancel</Button>
    <Button variant="danger" :disabled="confirmText !== 'DELETE'">Clear all</Button>
  </template>
</Modal>`,
)
</script>

<template>
  <PgSection
    title="Modal"
    description="title / body / confirmLabel / dangerous, emits confirm / cancel; default + #actions slots"
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
        <Button variant="default" @click="slotsOpen = true">Open with slots</Button>
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
        @confirm="close('confirm')"
        @cancel="close('cancel')"
      />
      <Modal
        v-if="slotsOpen"
        title="Confirm deletion"
        style="border-color: var(--hm-danger-border)"
        @cancel="close('cancel')"
      >
        <p style="margin-bottom: 12px">Type DELETE to permanently delete everything.</p>
        <Input v-model="confirmText" placeholder="DELETE" />
        <template #actions>
          <Button variant="default" @click="close('cancel')">Cancel</Button>
          <Button
            variant="danger"
            :disabled="confirmText !== 'DELETE'"
            @click="close('confirm (slots)')"
          >
            Clear all
          </Button>
        </template>
      </Modal>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
