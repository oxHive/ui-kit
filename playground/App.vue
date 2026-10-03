<script setup>
import { ref, h, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { AppSidebar, AppNav, SegmentedControl } from '../src/index.js'
import pkg from '../package.json'
import Overview from './Overview.vue'
import { GROUPS, CATALOG } from './catalog.js'

// Hash routing (#/Button) so every page is linkable and the build works
// under any base path without server rewrites.
const route = ref('')
function readHash() {
  route.value = decodeURIComponent(location.hash.replace(/^#\/?/, ''))
}
onMounted(() => {
  readHash()
  window.addEventListener('hashchange', readHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', readHash))

const current = computed(() => CATALOG.find((c) => c.key === route.value))
const index = computed(() => CATALOG.indexOf(current.value))
const prev = computed(() => CATALOG[index.value - 1])
const next = computed(() => CATALOG[index.value + 1])

const mainEl = ref(null)
const navOpen = ref(false)
watch(route, () => {
  navOpen.value = false
  mainEl.value?.scrollTo(0, 0)
  document.title = current.value ? `${current.value.key} · @oxhive/ui` : '@oxhive/ui playground'
})

function go(key) {
  location.hash = key ? `/${key}` : ''
}

const OverviewIcon = {
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
      },
      [
        h('rect', { x: 2, y: 2, width: 5, height: 5, rx: 1 }),
        h('rect', { x: 9, y: 2, width: 5, height: 5, rx: 1 }),
        h('rect', { x: 2, y: 9, width: 5, height: 5, rx: 1 }),
        h('rect', { x: 9, y: 9, width: 5, height: 5, rx: 1 }),
      ],
    ),
}

const overviewNav = computed(() => [
  { label: 'Overview', icon: OverviewIcon, active: !current.value, onClick: () => go('') },
])
const groupNav = computed(() =>
  GROUPS.map((group) => ({
    group,
    items: CATALOG.filter((c) => c.group === group).map((c) => ({
      label: c.key,
      icon: c.icon,
      active: c.key === route.value,
      onClick: () => go(c.key),
    })),
  })),
)

const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  try {
    localStorage.setItem('oxui-pg-theme', value)
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
})
</script>

<template>
  <div class="pg-shell" :class="{ 'pg-shell--nav-open': navOpen }">
    <header class="pg-topbar">
      <button
        type="button"
        class="pg-topbar__toggle"
        :aria-expanded="navOpen"
        aria-controls="pg-sidebar"
        @click="navOpen = !navOpen"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
        </svg>
        <span>{{ current ? current.key : 'Overview' }}</span>
      </button>
      <span class="pg-topbar__brand">@oxhive/ui</span>
    </header>

    <div id="pg-sidebar" class="pg-sidebar">
      <AppSidebar product-name="@oxhive/ui" :version="pkg.version">
        <template #logo-icon>
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
            <polygon
              points="8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75"
              fill="none"
              stroke="var(--hm-accent)"
              stroke-width="1.3"
            />
            <circle cx="8" cy="8" r="2" fill="var(--hm-accent)" />
          </svg>
        </template>

        <div class="pg-nav">
          <AppNav :items="overviewNav" />
          <div v-for="g in groupNav" :key="g.group">
            <div class="pg-nav__group">{{ g.group }}</div>
            <AppNav :items="g.items" />
          </div>
        </div>

        <template #status>
          <div class="pg-sidebar__theme">
            <SegmentedControl
              v-model="theme"
              :options="[
                { label: 'Dark', value: 'dark' },
                { label: 'Light', value: 'light' },
              ]"
              aria-label="Theme"
            />
          </div>
        </template>
        <template #footer>
          <a class="pg-sidebar__link" href="https://github.com/oxHive/ui-kit"
            >github.com/oxHive/ui-kit</a
          >
        </template>
      </AppSidebar>
    </div>
    <div class="pg-scrim" aria-hidden="true" @click="navOpen = false" />

    <main ref="mainEl" class="pg-main">
      <div class="pg-content">
        <component :is="current.component" v-if="current" :key="current.key" />
        <Overview v-else />

        <nav v-if="current" class="pg-pager" aria-label="Pagination">
          <a v-if="prev" class="pg-pager__link" :href="`#/${prev.key}`">
            <span class="pg-pager__dir">Previous</span>{{ prev.key }}
          </a>
          <a v-else class="pg-pager__link" href="#">
            <span class="pg-pager__dir">Previous</span>Overview
          </a>
          <a v-if="next" class="pg-pager__link pg-pager__link--next" :href="`#/${next.key}`">
            <span class="pg-pager__dir">Next</span>{{ next.key }}
          </a>
        </nav>
      </div>
    </main>
  </div>
</template>
