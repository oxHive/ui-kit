import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from '../src/components/EmptyState.vue'

describe('EmptyState', () => {
  it('renders message, optional hint, and a caller-supplied icon slot', () => {
    const wrapper = mount(EmptyState, {
      props: { message: 'No memories yet.', hint: 'Ask Claude to remember something.' },
      slots: { icon: '<svg data-test-icon />' },
    })
    expect(wrapper.text()).toContain('No memories yet.')
    expect(wrapper.text()).toContain('Ask Claude to remember something.')
    expect(wrapper.find('[data-test-icon]').exists()).toBe(true)
  })
})
