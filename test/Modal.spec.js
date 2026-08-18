import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../src/components/Modal.vue'

describe('Modal', () => {
  it('renders title, body, and confirmLabel, and emits confirm/cancel', async () => {
    const wrapper = mount(Modal, {
      props: { title: 'Delete memory?', body: 'Gone forever.', confirmLabel: 'Delete', dangerous: true },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('Delete memory?')
    expect(wrapper.text()).toContain('Gone forever.')
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    wrapper.unmount()
  })
})
