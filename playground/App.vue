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

// Each catalog entry gets its own small line icon hinting at the shape
// of the component it represents, so the sidebar reads at a glance
// instead of repeating the same dot next to every row.
function navIcon(children) {
  return {
    render: () => h('svg', {
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': 1.3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }, children),
  }
}

const ButtonIcon = navIcon([h('rect', { x: 2, y: 5.5, width: 12, height: 5, rx: 2.5 })])
const InputIcon = navIcon([
  h('rect', { x: 2, y: 5.5, width: 12, height: 5, rx: 1 }),
  h('line', { x1: 5, y1: 6.5, x2: 5, y2: 9.5 }),
])
const BadgeIcon = navIcon([h('rect', { x: 4, y: 6, width: 8, height: 4, rx: 2 })])
const ModalIcon = navIcon([
  h('rect', { x: 2, y: 2.5, width: 12, height: 11, rx: 1.5 }),
  h('line', { x1: 2, y1: 6, x2: 14, y2: 6 }),
])
const ToastIcon = navIcon([
  h('rect', { x: 2, y: 9.5, width: 12, height: 4, rx: 2 }),
  h('circle', { cx: 4.7, cy: 11.5, r: 0.9, fill: 'currentColor', stroke: 'none' }),
])
const SkeletonCardIcon = navIcon([
  h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1.5 }),
  h('line', { x1: 4.5, y1: 5.5, x2: 11.5, y2: 5.5 }),
  h('line', { x1: 4.5, y1: 8.5, x2: 9, y2: 8.5 }),
])
const EmptyStateIcon = navIcon([h('rect', { x: 3, y: 6, width: 10, height: 7, rx: 1, 'stroke-dasharray': '2 2' })])
const TooltipIcon = navIcon([
  h('rect', { x: 2, y: 3, width: 12, height: 7, rx: 1.5 }),
  h('path', { d: 'M5 10 L5 13 L8 10 Z', fill: 'currentColor', stroke: 'none' }),
])
const AppNavIcon = navIcon([
  h('line', { x1: 3, y1: 4, x2: 13, y2: 4 }),
  h('line', { x1: 3, y1: 8, x2: 13, y2: 8 }),
  h('line', { x1: 3, y1: 12, x2: 13, y2: 12 }),
])
const AppSidebarIcon = navIcon([
  h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1.5 }),
  h('line', { x1: 6, y1: 2, x2: 6, y2: 14 }),
])

const CATALOG = [
  { key: 'Button', component: ButtonDemo, icon: ButtonIcon },
  { key: 'Input', component: InputDemo, icon: InputIcon },
  { key: 'Badge', component: BadgeDemo, icon: BadgeIcon },
  { key: 'Modal', component: ModalDemo, icon: ModalIcon },
  { key: 'Toast', component: ToastDemo, icon: ToastIcon },
  { key: 'SkeletonCard', component: SkeletonCardDemo, icon: SkeletonCardIcon },
  { key: 'EmptyState', component: EmptyStateDemo, icon: EmptyStateIcon },
  { key: 'Tooltip', component: TooltipDemo, icon: TooltipIcon },
  { key: 'AppNav', component: AppNavDemo, icon: AppNavIcon },
  { key: 'AppSidebar', component: AppSidebarDemo, icon: AppSidebarIcon },
]

const selected = ref(CATALOG[0].key)
const selectedComponent = computed(() => CATALOG.find((c) => c.key === selected.value)?.component)

const navItems = computed(() => CATALOG.map((c) => ({
  label: c.key,
  icon: c.icon,
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
