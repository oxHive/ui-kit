<script setup>
import { computed } from 'vue'
const props = defineProps({ label: String, color: { type: String, default: '' } })
const style = computed(() => props.color
  ? `background:color-mix(in srgb, ${props.color} 18%, transparent); color:${props.color}`
  : 'background:var(--hm-bg-elevated); color:var(--hm-text-tertiary)')
</script>

<template>
  <span class="inline-block rounded-sm px-2 py-0.5 text-[10px] font-mono" :style="style">{{ label }}</span>
</template>
