<script setup>
import { ref, computed } from 'vue'
import { Menu } from '../../src/index.js'
import PgSection from '../PgSection.vue'

const ITEMS = ['incorrect', 'outdated', 'duplicate', 'other']
const placement = ref('bottom')
const lastSelect = ref('')

const snippet = computed(
  () => `<Menu
  :items="${JSON.stringify(ITEMS).replaceAll('"', "'")}"
  placement="${placement.value}"
  title="Flag for review"
  aria-label="Flag for review"
  @select="flag"
>
  <template #trigger>⚑</template>
</Menu>`,
)
</script>

<template>
  <PgSection
    title="Menu"
    description="items: string[]; placement: bottom | top; variant / size for the trigger; emits select; #trigger slot"
  >
    <template #controls>
      <label class="pg-control">
        placement
        <select v-model="placement">
          <option>bottom</option>
          <option>top</option>
        </select>
      </label>
    </template>
    <template #preview>
      <div class="pg-section__preview--column">
        <Menu
          :items="ITEMS"
          :placement="placement"
          title="Flag for review"
          aria-label="Flag for review"
          @select="lastSelect = $event"
        >
          <template #trigger>⚑ Flag</template>
        </Menu>
        <span v-if="lastSelect" style="font-size: 12px; color: var(--hm-text-tertiary)"
          >last select: {{ lastSelect }}</span
        >
      </div>
    </template>
    <template #snippet>{{ snippet }}</template>
  </PgSection>
</template>
