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
  v-if="open"
  title="${title.value}"
  body="${body.value}"
  confirm-label="${confirmLabel.value}"${dangerous.value ? '\n  dangerous' : ''}
  @confirm="..."
  @cancel="open = false"
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

const API = [
  { name: 'title', type: 'string', default: "''", note: 'Heading; also labels the dialog.' },
  {
    name: 'body',
    type: 'string',
    default: "''",
    note: 'Message text; replaced by the default slot.',
  },
  { name: 'confirmLabel', type: 'string', default: "''", note: 'Confirm button text.' },
  {
    name: 'dangerous',
    type: 'boolean',
    default: 'false',
    note: 'Danger confirm button instead of primary.',
  },
  { name: '@confirm', type: '()', note: 'Confirm clicked.' },
  {
    name: '@cancel',
    type: '()',
    note: 'Cancel, overlay click or Escape. Ignore it to block dismissal mid-operation.',
  },
  { name: '#default', type: 'slot', note: 'Replaces the body paragraph.' },
  { name: '#actions', type: 'slot', note: 'Replaces the Cancel / Confirm row.' },
  {
    name: '…attrs',
    type: 'native',
    note: 'class, style and aria-* land on the dialog box, not the overlay.',
  },
]
</script>

<template>
  <PgSection
    title="Modal"
    description="A confirmation dialog. Focus moves to the first button and is trapped inside; Escape and the overlay both cancel. Mount it with v-if; it has no open prop."
    :api="API"
  >
    <template #controls>
      <label class="pg-control">
        <span class="pg-control__label">title</span>
        <Input v-model="title" />
      </label>
      <label class="pg-control">
        <span class="pg-control__label">body</span>
        <Input v-model="body" />
      </label>
      <label class="pg-control">
        <span class="pg-control__label">confirmLabel</span>
        <Input v-model="confirmLabel" />
      </label>
      <label class="pg-control pg-check">
        <input v-model="dangerous" type="checkbox" />
        dangerous
      </label>
    </template>
    <template #preview>
      <div class="pg-stack">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center">
          <Button :variant="dangerous ? 'danger' : 'primary'" @click="open = true"
            >Open modal</Button
          >
          <Button @click="slotsOpen = true">Open with slots</Button>
        </div>
        <span class="pg-note" aria-live="polite">{{
          lastAction ? `last emit: @${lastAction}` : 'nothing emitted yet'
        }}</span>
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
        <p style="margin: 0 0 12px">Type DELETE to permanently delete everything.</p>
        <Input v-model="confirmText" placeholder="DELETE" aria-label="Type DELETE to confirm" />
        <template #actions>
          <Button @click="close('cancel')">Cancel</Button>
          <Button variant="danger" :disabled="confirmText !== 'DELETE'" @click="close('confirm')">
            Clear all
          </Button>
        </template>
      </Modal>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
