import { h } from 'vue'
import ButtonDemo from './demos/ButtonDemo.vue'
import CopyButtonDemo from './demos/CopyButtonDemo.vue'
import MenuDemo from './demos/MenuDemo.vue'
import InputDemo from './demos/InputDemo.vue'
import SegmentedControlDemo from './demos/SegmentedControlDemo.vue'
import BadgeDemo from './demos/BadgeDemo.vue'
import EmptyStateDemo from './demos/EmptyStateDemo.vue'
import SkeletonCardDemo from './demos/SkeletonCardDemo.vue'
import ModalDemo from './demos/ModalDemo.vue'
import ToastDemo from './demos/ToastDemo.vue'
import TooltipDemo from './demos/TooltipDemo.vue'
import AppNavDemo from './demos/AppNavDemo.vue'
import AppSidebarDemo from './demos/AppSidebarDemo.vue'

// Each entry gets a small line icon hinting at the component's shape, so
// the sidebar reads at a glance instead of repeating one dot per row.
function icon(children) {
  return {
    render: () =>
      h(
        'svg',
        {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.3,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        children,
      ),
  }
}

export const GROUPS = ['Actions', 'Inputs', 'Display', 'Overlays', 'Layout']

export const CATALOG = [
  {
    key: 'Button',
    group: 'Actions',
    component: ButtonDemo,
    summary: 'Four variants, two sizes, accent focus ring.',
    icon: icon([h('rect', { x: 2, y: 5.5, width: 12, height: 5, rx: 2.5 })]),
  },
  {
    key: 'CopyButton',
    group: 'Actions',
    component: CopyButtonDemo,
    summary: 'Copies text, confirms for 1.5s, works over plain http.',
    icon: icon([
      h('rect', { x: 5, y: 5, width: 8.5, height: 8.5, rx: 1.5 }),
      h('path', {
        d: 'M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5',
      }),
    ]),
  },
  {
    key: 'Menu',
    group: 'Actions',
    component: MenuDemo,
    summary: 'Button-triggered list with full keyboard support.',
    icon: icon([
      h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1.5 }),
      h('line', { x1: 5, y1: 5.5, x2: 11, y2: 5.5 }),
      h('line', { x1: 5, y1: 8, x2: 11, y2: 8 }),
      h('line', { x1: 5, y1: 10.5, x2: 11, y2: 10.5 }),
    ]),
  },
  {
    key: 'Input',
    group: 'Inputs',
    component: InputDemo,
    summary: 'v-model text field that forwards focus() and select().',
    icon: icon([
      h('rect', { x: 2, y: 5.5, width: 12, height: 5, rx: 1 }),
      h('line', { x1: 5, y1: 6.5, x2: 5, y2: 9.5 }),
    ]),
  },
  {
    key: 'SegmentedControl',
    group: 'Inputs',
    component: SegmentedControlDemo,
    summary: 'Radio group with arrow keys and per-option tooltips.',
    icon: icon([
      h('rect', { x: 1.5, y: 5, width: 13, height: 6, rx: 2 }),
      h('rect', { x: 2.5, y: 6, width: 5, height: 4, rx: 1, fill: 'currentColor', stroke: 'none' }),
    ]),
  },
  {
    key: 'Badge',
    group: 'Display',
    component: BadgeDemo,
    summary: 'Mono label tinted from any CSS color.',
    icon: icon([h('rect', { x: 4, y: 6, width: 8, height: 4, rx: 2 })]),
  },
  {
    key: 'EmptyState',
    group: 'Display',
    component: EmptyStateDemo,
    summary: 'Centered message, hint and an icon slot.',
    icon: icon([h('rect', { x: 3, y: 6, width: 10, height: 7, rx: 1, 'stroke-dasharray': '2 2' })]),
  },
  {
    key: 'SkeletonCard',
    group: 'Display',
    component: SkeletonCardDemo,
    summary: 'Shimmering list-row placeholder.',
    icon: icon([
      h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1.5 }),
      h('line', { x1: 4.5, y1: 5.5, x2: 11.5, y2: 5.5 }),
      h('line', { x1: 4.5, y1: 8.5, x2: 9, y2: 8.5 }),
    ]),
  },
  {
    key: 'Modal',
    group: 'Overlays',
    component: ModalDemo,
    summary: 'Confirm dialog with focus trap and Escape to cancel.',
    icon: icon([
      h('rect', { x: 2, y: 2.5, width: 12, height: 11, rx: 1.5 }),
      h('line', { x1: 2, y1: 6, x2: 14, y2: 6 }),
    ]),
  },
  {
    key: 'Toast',
    group: 'Overlays',
    component: ToastDemo,
    summary: 'Polite live-region status pill.',
    icon: icon([
      h('rect', { x: 2, y: 9.5, width: 12, height: 4, rx: 2 }),
      h('circle', { cx: 4.7, cy: 11.5, r: 0.9, fill: 'currentColor', stroke: 'none' }),
    ]),
  },
  {
    key: 'Tooltip',
    group: 'Overlays',
    component: TooltipDemo,
    summary: 'Viewport-anchored hint that flips near the top edge.',
    icon: icon([
      h('rect', { x: 2, y: 3, width: 12, height: 7, rx: 1.5 }),
      h('path', { d: 'M5 10 L5 13 L8 10 Z', fill: 'currentColor', stroke: 'none' }),
    ]),
  },
  {
    key: 'AppNav',
    group: 'Layout',
    component: AppNavDemo,
    summary: 'Data-driven nav list with icons and badges.',
    icon: icon([
      h('line', { x1: 3, y1: 4, x2: 13, y2: 4 }),
      h('line', { x1: 3, y1: 8, x2: 13, y2: 8 }),
      h('line', { x1: 3, y1: 12, x2: 13, y2: 12 }),
    ]),
  },
  {
    key: 'AppSidebar',
    group: 'Layout',
    component: AppSidebarDemo,
    summary: 'Product header, nav slot and the OxHive footer.',
    icon: icon([
      h('rect', { x: 2, y: 2, width: 12, height: 12, rx: 1.5 }),
      h('line', { x1: 6, y1: 2, x2: 6, y2: 14 }),
    ]),
  },
]
