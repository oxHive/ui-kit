// React adapter for @oxhive/ui, used only by /design-sync.
//
// claude.ai/design renders React, and @oxhive/ui is Vue 3. Rather than
// re-implement anything, each export below mounts the REAL compiled Vue
// component from ../../dist (built by `bun run build`) inside a React
// wrapper:
//
// - Props flow React -> a shallowReactive bag the Vue root renders from, so
//   re-renders patch the Vue tree instead of remounting it.
// - Slots are bridged with portals: each Vue slot renders an empty
//   `display: contents` span, and React portals its children into it, so
//   React context and event handlers keep working inside slot content.
// - Vue emits are plain `onXxx` props (Vue treats them as listeners), and
//   v-model becomes `value` + `onChange(value)`.
import * as React from 'react'
import { createPortal } from 'react-dom'
import { createApp, defineComponent, h, shallowReactive, shallowRef } from 'vue'
import * as Ox from '../../dist/oxhive-ui.js'
import '../../src/tokens.css'
import '../../dist/oxhive-ui.css'
import './fonts.css'
import './base.css'

// vue's esm-bundler build reads these compile-time flags lazily (at the first
// createApp), so defining them here silences its missing-flag warning.
globalThis.__VUE_OPTIONS_API__ = true
globalThis.__VUE_PROD_DEVTOOLS__ = false
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false

const SLOT_STYLE = 'display: contents'

// slots: { <vue slot name>: <react prop name> }. toVue maps the remaining
// React props to Vue props. iconItems: AppNav's per-item icon components.
function wrap(name, Comp, { slots = {}, toVue = (p) => p, iconItems = false } = {}) {
  const Wrapped = React.forwardRef(function Wrapped(props, ref) {
    const host = React.useRef(null)
    const inst = React.useRef(null)
    const [targets, setTargets] = React.useState({})
    const [scope, setScope] = React.useState({})

    // One stable ref callback per target; a fresh closure each render would
    // make Vue re-run it (null, then el) and loop through setTargets.
    const refFns = React.useRef({})
    const refFor = (key) =>
      (refFns.current[key] ??= (el) =>
        setTargets((t) => (t[key] === (el ?? undefined) ? t : { ...t, [key]: el ?? undefined })))

    const rest = { ...props }
    for (const reactName of Object.values(slots)) delete rest[reactName]
    if (rest.className !== undefined) {
      rest.class = rest.className
      delete rest.className
    }
    let vueProps = toVue(rest)

    // AppNav: swap each item's React icon for a stable Vue component that
    // renders a portal target, keyed by index.
    const iconComps = React.useRef([])
    if (iconItems && Array.isArray(vueProps.items)) {
      vueProps = {
        ...vueProps,
        items: vueProps.items.map((item, i) => {
          if (!item.icon) return item
          iconComps.current[i] ??= defineComponent({
            inheritAttrs: false,
            setup:
              (_, { attrs }) =>
              () =>
                h('span', { class: attrs.class, style: SLOT_STYLE, ref: refFor(`icon:${i}`) }),
          })
          return { ...item, icon: iconComps.current[i] }
        }),
      }
    }

    React.useLayoutEffect(() => {
      const state = shallowReactive({ props: vueProps, present: {} })
      const compRef = shallowRef(null)
      const app = createApp({
        render() {
          const vslots = {}
          for (const vName of Object.keys(slots)) {
            if (!state.present[vName]) continue
            vslots[vName] = (s) => {
              if (s && Object.keys(s).length)
                queueMicrotask(() =>
                  setScope((old) =>
                    shallowEqual(old[vName], s) ? old : { ...old, [vName]: { ...s } },
                  ),
                )
              return h('span', { style: SLOT_STYLE, ref: refFor(`slot:${vName}`) })
            }
          }
          return h(Comp, { ...state.props, ref: compRef }, vslots)
        },
      })
      app.mount(host.current)
      inst.current = { app, state, compRef }
      return () => {
        app.unmount()
        inst.current = null
      }
    }, [])

    React.useLayoutEffect(() => {
      const { state } = inst.current
      state.props = vueProps
      const present = {}
      for (const [vName, reactName] of Object.entries(slots))
        present[vName] = props[reactName] != null
      if (!shallowEqual(present, state.present)) state.present = present
    })

    React.useImperativeHandle(ref, () => inst.current?.compRef.value ?? null, [])

    const portals = []
    for (const [vName, reactName] of Object.entries(slots)) {
      const el = targets[`slot:${vName}`]
      let content = props[reactName]
      if (typeof content === 'function') content = content(scope[vName] ?? {})
      if (el && content != null) portals.push(createPortal(content, el, `slot:${vName}`))
    }
    if (iconItems && Array.isArray(props.items)) {
      props.items.forEach((item, i) => {
        const el = targets[`icon:${i}`]
        if (!el || !item.icon) return
        const icon = React.isValidElement(item.icon)
          ? item.icon
          : React.createElement(item.icon, { width: 16, height: 16, 'aria-hidden': true })
        portals.push(createPortal(icon, el, `icon:${i}`))
      })
    }

    return React.createElement(
      React.Fragment,
      null,
      React.createElement('div', { ref: host, style: { display: 'contents' } }),
      portals,
    )
  })
  Wrapped.displayName = name
  return Wrapped
}

function shallowEqual(a = {}, b = {}) {
  const ka = Object.keys(a)
  return ka.length === Object.keys(b).length && ka.every((k) => a[k] === b[k])
}

// v-model components: React `value` / `onChange(value)` -> modelValue.
const vModel = ({ value, onChange, ...rest }) => ({
  ...rest,
  ...(value !== undefined && { modelValue: value }),
  ...(onChange && { 'onUpdate:modelValue': onChange }),
})

export const AppNav = wrap('AppNav', Ox.AppNav, { iconItems: true })
export const AppSidebar = wrap('AppSidebar', Ox.AppSidebar, {
  slots: { default: 'children', 'logo-icon': 'logoIcon', status: 'status', footer: 'footer' },
})
export const Badge = wrap('Badge', Ox.Badge)
export const Button = wrap('Button', Ox.Button, { slots: { default: 'children' } })
export const CopyButton = wrap('CopyButton', Ox.CopyButton, { slots: { default: 'children' } })
export const EmptyState = wrap('EmptyState', Ox.EmptyState, { slots: { icon: 'icon' } })
export const Input = wrap('Input', Ox.Input, { toVue: vModel })
export const Menu = wrap('Menu', Ox.Menu, { slots: { trigger: 'trigger' } })
export const Modal = wrap('Modal', Ox.Modal, { slots: { default: 'children', actions: 'actions' } })
export const SegmentedControl = wrap('SegmentedControl', Ox.SegmentedControl, { toVue: vModel })
export const SkeletonCard = wrap('SkeletonCard', Ox.SkeletonCard)
export const Toast = wrap('Toast', Ox.Toast)
export const Tooltip = wrap('Tooltip', Ox.Tooltip)
