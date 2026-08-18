<script setup>
import { ref } from 'vue'
import ButtonDemo from './demos/ButtonDemo.vue'
import InputDemo from './demos/InputDemo.vue'
import BadgeDemo from './demos/BadgeDemo.vue'
import ModalDemo from './demos/ModalDemo.vue'
import ToastDemo from './demos/ToastDemo.vue'
import SkeletonCardDemo from './demos/SkeletonCardDemo.vue'
import EmptyStateDemo from './demos/EmptyStateDemo.vue'
import TooltipDemo from './demos/TooltipDemo.vue'
import AppNavDemo from './demos/AppNavDemo.vue'
import AppSidebarDemo from './demos/AppSidebarDemo.vue'

const theme = ref('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>

<template>
  <div class="pg-shell">
    <header class="pg-header">
      <h1>@oxhive/ui playground</h1>
      <button @click="toggleTheme" class="pg-control">
        {{ theme === 'dark' ? '☀ light' : '● dark' }}
      </button>
    </header>
    <main class="pg-main">
      <ButtonDemo />
      <InputDemo />
      <BadgeDemo />
      <ModalDemo />
      <ToastDemo />
      <SkeletonCardDemo />
      <EmptyStateDemo />
      <TooltipDemo />
      <AppNavDemo />
      <AppSidebarDemo />
    </main>
  </div>
</template>
