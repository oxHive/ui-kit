import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import Modal from '../src/components/Modal.vue'

describe('Modal', () => {
  it('renders title, body, and confirmLabel, and emits confirm/cancel', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Delete memory?',
        body: 'Gone forever.',
        confirmLabel: 'Delete',
        dangerous: true,
      },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('Delete memory?')
    expect(wrapper.text()).toContain('Gone forever.')
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    wrapper.unmount()
  })

  it('closes on Escape when focus is inside the modal', async () => {
    const wrapper = mount(Modal, {
      props: { title: 'Delete?', confirmLabel: 'Delete' },
      attachTo: document.body,
    })
    await nextTick()
    await flushPromises()

    document.activeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    expect(wrapper.emitted('cancel')).toBeTruthy()
    wrapper.unmount()
  })

  it('traps Tab focus within the modal, wrapping at both ends', async () => {
    const wrapper = mount(Modal, {
      props: { title: 'Delete?', confirmLabel: 'Delete' },
      attachTo: document.body,
    })
    await nextTick()
    await flushPromises()

    const buttons = wrapper.findAll('button').map((b) => b.element)
    const [first] = buttons
    const last = buttons[buttons.length - 1]

    last.focus()
    last.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    )
    expect(document.activeElement).toBe(first)

    first.focus()
    first.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }),
    )
    expect(document.activeElement).toBe(last)

    wrapper.unmount()
  })

  it('scopes Escape handling to the modal that received the keydown', async () => {
    const modalA = mount(Modal, {
      props: { title: 'A', confirmLabel: 'ok' },
      attachTo: document.body,
    })
    const modalB = mount(Modal, {
      props: { title: 'B', confirmLabel: 'ok' },
      attachTo: document.body,
    })
    await nextTick()
    await flushPromises()

    // Pressing Escape while focus is inside modal B must not also cancel
    // modal A — regression test for the two instances previously sharing a
    // single `document`-level keydown listener.
    const buttonInB = modalB.findAll('button')[0].element
    buttonInB.focus()
    buttonInB.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(modalB.emitted('cancel')).toBeTruthy()
    expect(modalA.emitted('cancel')).toBeFalsy()

    modalA.unmount()
    modalB.unmount()
  })

  it('renders default and actions slots in place of body and the button row', () => {
    const wrapper = mount(Modal, {
      props: { title: 'Revoke device', body: 'unused' },
      slots: {
        default: '<strong>laptop</strong> will be revoked.',
        actions: '<button disabled>Revoking…</button>',
      },
    })
    expect(wrapper.find('strong').text()).toBe('laptop')
    expect(wrapper.text()).not.toContain('unused')
    expect(wrapper.findAll('button').map((b) => b.text())).toEqual(['Revoking…'])
  })

  it('puts fallthrough attrs on the dialog and gives each title a unique id', () => {
    // useId() is unique per app, so both modals must share one app.
    const wrapper = mount({
      components: { Modal },
      template: `<div><Modal title="A" style="width: 28rem" /><Modal title="B" /></div>`,
    })
    const [a, b] = wrapper.findAllComponents(Modal)
    const dialog = a.find('[role="dialog"]')
    expect(dialog.attributes('style')).toContain('width: 28rem')
    expect(a.find('.oxui-modal-overlay').attributes('style')).not.toContain('width')
    const idA = dialog.attributes('aria-labelledby')
    expect(a.find('h3').attributes('id')).toBe(idA)
    expect(b.find('[role="dialog"]').attributes('aria-labelledby')).not.toBe(idA)
  })

  it('skips disabled controls when trapping focus', async () => {
    const wrapper = mount(Modal, {
      props: { title: 'Confirm deletion' },
      slots: { actions: '<button id="cancel">Cancel</button><button disabled>Clear</button>' },
      attachTo: document.body,
    })
    await nextTick()
    await flushPromises()

    const cancel = wrapper.find('#cancel').element
    expect(document.activeElement).toBe(cancel)
    cancel.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    )
    expect(document.activeElement).toBe(cancel)

    wrapper.unmount()
  })
})
