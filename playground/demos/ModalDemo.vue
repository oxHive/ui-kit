<script setup>
import { ref } from 'vue'
import { Button, Modal } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const title = ref('Delete memory?')
const body = ref('This will be permanently deleted.')
const confirmLabel = ref('Delete')
const dangerous = ref(true)
const open = ref(false)
const lastAction = ref('')
</script>

<template>
  <PgSection title="Modal" description="title / body / confirmLabel / dangerous, emits confirm / cancel">
    <template #controls>
      <label class="pg-control">
        title
        <input type="text" v-model="title" />
      </label>
      <label class="pg-control">
        confirmLabel
        <input type="text" v-model="confirmLabel" />
      </label>
      <label class="pg-control pg-check">
        <input type="checkbox" v-model="dangerous" />
        dangerous
      </label>
    </template>
    <template #preview>
      <div class="pg-section__preview--column">
        <Button variant="default" @click="open = true">Open modal</Button>
        <span v-if="lastAction" style="font-size:12px; color:var(--hm-text-tertiary)">last emit: {{ lastAction }}</span>
      </div>
      <Modal
        v-if="open"
        :title="title"
        :body="body"
        :confirm-label="confirmLabel"
        :dangerous="dangerous"
        @confirm="lastAction = 'confirm'; open = false"
        @cancel="lastAction = 'cancel'; open = false"
      />
    </template>
  </PgSection>
</template>
