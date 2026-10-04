<script setup>
import { ref, h } from 'vue'
import {
  AppNav,
  Badge,
  Button,
  CopyButton,
  EmptyState,
  Input,
  Menu,
  Modal,
  SegmentedControl,
  SkeletonCard,
  Toast,
  Tooltip,
} from '../src/index.js'
import { GROUPS, CATALOG } from './catalog.js'

const INSTALL = 'bun add @oxhive/ui'
const SETUP = `import '@oxhive/ui/tokens.css'
import '@oxhive/ui/style.css'
import { Button } from '@oxhive/ui'`

const segment = ref('personal')
const text = ref('')
const modalOpen = ref(false)
const toastVisible = ref(false)
let toastTimer
function showToast() {
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastVisible.value = false), 2000)
}
const tip = ref({ visible: false, x: 0, y: 0 })
function showTip(e) {
  const r = e.currentTarget.getBoundingClientRect()
  tip.value = { visible: true, x: r.left + r.width / 2, y: r.top }
}

const Dot = {
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 16 16' }, [
      h('circle', { cx: 8, cy: 8, r: 4, fill: 'currentColor' }),
    ]),
}
const navItems = [
  { label: 'Memories', icon: Dot, active: true },
  { label: 'Feedback', icon: Dot, badge: 3 },
]
</script>

<template>
  <header class="pg-hero">
    <div class="pg-eyebrow">OxHive design system</div>
    <h1 class="pg-hero__title">Thirteen components, one warm hive.</h1>
    <p class="pg-hero__lede">
      Vue 3 components in plain, <code>oxui-</code>-prefixed CSS, themed entirely through
      <code>--oxui-*</code> tokens. Switch the theme in the sidebar; everything here follows.
    </p>
    <div class="pg-hero__install">
      <div class="pg-codeline">
        <code>{{ INSTALL }}</code>
        <CopyButton :text="INSTALL" variant="ghost" aria-label="Copy install command" />
      </div>
      <pre class="pg-codeblock"><code>{{ SETUP }}</code></pre>
    </div>
  </header>

  <section v-for="group in GROUPS" :key="group" class="pg-group">
    <h2 class="pg-group__title">{{ group }}</h2>
    <div class="pg-cards">
      <article v-for="c in CATALOG.filter((x) => x.group === group)" :key="c.key" class="pg-card">
        <div class="pg-card__preview">
          <template v-if="c.key === 'Button'">
            <Button variant="primary">Save</Button>
            <Button>Cancel</Button>
          </template>
          <CopyButton v-else-if="c.key === 'CopyButton'" text="mynd status" />
          <Menu
            v-else-if="c.key === 'Menu'"
            :items="['incorrect', 'outdated', 'other']"
            aria-label="Flag for review"
          >
            <template #trigger>Flag</template>
          </Menu>
          <Input
            v-else-if="c.key === 'Input'"
            v-model="text"
            placeholder="Search memories"
            aria-label="Search memories"
            style="max-width: 200px"
          />
          <SegmentedControl
            v-else-if="c.key === 'SegmentedControl'"
            v-model="segment"
            :options="[
              { label: 'All', value: 'all' },
              { label: 'Personal', value: 'personal' },
            ]"
            aria-label="Layer"
          />
          <template v-else-if="c.key === 'Badge'">
            <Badge label="personal" color="var(--oxui-personal)" />
            <Badge label="workspace" color="var(--oxui-workspace)" />
            <Badge label="org" color="var(--oxui-org)" />
          </template>
          <EmptyState
            v-else-if="c.key === 'EmptyState'"
            message="No memories yet."
            hint="Ask Claude to remember something."
          />
          <div v-else-if="c.key === 'SkeletonCard'" class="pg-card__frame" style="width: 200px">
            <SkeletonCard />
          </div>
          <template v-else-if="c.key === 'Modal'">
            <Button variant="danger" @click="modalOpen = true">Delete memory</Button>
          </template>
          <Button v-else-if="c.key === 'Toast'" @click="showToast">Show toast</Button>
          <span
            v-else-if="c.key === 'Tooltip'"
            class="pg-hover-target"
            tabindex="0"
            @mouseenter="showTip"
            @focus="showTip"
            @mouseleave="tip.visible = false"
            @blur="tip.visible = false"
            >Hover me</span
          >
          <div v-else-if="c.key === 'AppNav'" class="pg-card__frame" style="width: 180px">
            <AppNav :items="navItems" />
          </div>
          <div v-else-if="c.key === 'AppSidebar'" class="pg-card__mini-sidebar" aria-hidden="true">
            <div class="pg-card__mini-head">Hivemind <span>v0.2.0</span></div>
            <div class="pg-card__mini-row pg-card__mini-row--active" />
            <div class="pg-card__mini-row" />
            <div class="pg-card__mini-row" />
            <div class="pg-card__mini-foot">OxHive</div>
          </div>
        </div>
        <a class="pg-card__foot" :href="`#/${c.key}`">
          <span class="pg-card__name">{{ c.key }}</span>
          <span class="pg-card__summary">{{ c.summary }}</span>
        </a>
      </article>
    </div>
  </section>

  <Modal
    v-if="modalOpen"
    title="Delete memory?"
    body="This will be permanently deleted."
    confirm-label="Delete"
    dangerous
    @confirm="modalOpen = false"
    @cancel="modalOpen = false"
  />
  <Toast :visible="toastVisible" message="Copied: /memory-edit mem_a1b2c3" />
  <Tooltip :visible="tip.visible" text="Shared with 4 people in Design" :x="tip.x" :y="tip.y" />
</template>
