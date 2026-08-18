<script setup>
import { ref, h, computed } from 'vue'
import { AppNav } from '../src/index.js'
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

// A plain dot, reused for every catalog entry — the point of this nav is
// which component is selected, not a bespoke icon per row.
const DotIcon = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
  h('circle', { cx: 8, cy: 8, r: 5, fill: 'currentColor' }),
]) }

const CATALOG = [
  { key: 'Button', component: ButtonDemo },
  { key: 'Input', component: InputDemo },
  { key: 'Badge', component: BadgeDemo },
  { key: 'Modal', component: ModalDemo },
  { key: 'Toast', component: ToastDemo },
  { key: 'SkeletonCard', component: SkeletonCardDemo },
  { key: 'EmptyState', component: EmptyStateDemo },
  { key: 'Tooltip', component: TooltipDemo },
  { key: 'AppNav', component: AppNavDemo },
  { key: 'AppSidebar', component: AppSidebarDemo },
]

const selected = ref(CATALOG[0].key)
const selectedComponent = computed(() => CATALOG.find((c) => c.key === selected.value)?.component)

const navItems = computed(() => CATALOG.map((c) => ({
  label: c.key,
  icon: DotIcon,
  active: c.key === selected.value,
  onClick: () => { selected.value = c.key },
})))

const theme = ref('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>

<template>
  <div class="pg-shell">
    <nav class="pg-sidebar">
      <div class="pg-sidebar__head">
        <div class="pg-sidebar__title">@oxhive/ui</div>
        <div class="pg-sidebar__subtitle">component catalog</div>
      </div>
      <div class="pg-sidebar__nav">
        <AppNav :items="navItems" />
      </div>
      <div class="pg-sidebar__foot">
        <button @click="toggleTheme" class="pg-theme-toggle">
          {{ theme === 'dark' ? '☀ light' : '● dark' }}
        </button>
      </div>
    </nav>
    <main class="pg-stage">
      <component :is="selectedComponent" />
    </main>
  </div>
</template>
