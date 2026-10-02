import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Menu from '../src/components/Menu.vue'

const ITEMS = ['incorrect', 'outdated', 'duplicate']

function key(el, k) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }))
}

async function openMenu(props = {}) {
  const wrapper = mount(Menu, {
    props: { items: ITEMS, ...props },
    attrs: { title: 'Flag for review' },
    slots: { trigger: '⚑' },
    attachTo: document.body,
  })
  await wrapper.find('[aria-haspopup="menu"]').trigger('click')
  await flushPromises()
  return wrapper
}

describe('Menu', () => {
  it('opens on trigger click, focuses the first item, and reflects aria-expanded', async () => {
    const wrapper = await openMenu()
    const trigger = wrapper.find('[aria-haspopup="menu"]')
    expect(trigger.attributes('title')).toBe('Flag for review')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    const items = wrapper.findAll('[role="menuitem"]')
    expect(items.map((i) => i.text())).toEqual(ITEMS)
    expect(document.activeElement).toBe(items[0].element)
    wrapper.unmount()
  })

  it('emits select, closes, and returns focus to the trigger', async () => {
    const wrapper = await openMenu()
    await wrapper.findAll('[role="menuitem"]')[1].trigger('click')
    expect(wrapper.emitted('select')).toEqual([['outdated']])
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    expect(document.activeElement).toBe(wrapper.find('[aria-haspopup="menu"]').element)
    wrapper.unmount()
  })

  it('moves focus with arrow keys, wrapping, and Home/End', async () => {
    const wrapper = await openMenu()
    const items = wrapper.findAll('[role="menuitem"]').map((i) => i.element)
    key(items[0], 'ArrowUp')
    expect(document.activeElement).toBe(items[2])
    key(items[2], 'ArrowDown')
    expect(document.activeElement).toBe(items[0])
    key(items[0], 'End')
    expect(document.activeElement).toBe(items[2])
    key(items[2], 'Home')
    expect(document.activeElement).toBe(items[0])
    wrapper.unmount()
  })

  it('closes on Escape with focus back on the trigger', async () => {
    const wrapper = await openMenu()
    key(document.activeElement, 'Escape')
    await flushPromises()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    expect(document.activeElement).toBe(wrapper.find('[aria-haspopup="menu"]').element)
    wrapper.unmount()
  })

  it('closes on a pointerdown outside but not inside', async () => {
    const wrapper = await openMenu()
    wrapper
      .find('[role="menuitem"]')
      .element.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('applies the placement class', async () => {
    const wrapper = await openMenu({ placement: 'top' })
    expect(wrapper.find('[role="menu"]').classes()).toContain('oxui-menu__list--top')
    wrapper.unmount()
  })
})
