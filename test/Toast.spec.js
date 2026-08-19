import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from '../src/components/Toast.vue'

describe('Toast', () => {
  it('shows the message when visible', () => {
    const wrapper = mount(Toast, {
      props: { visible: true, message: 'Copied: /memory-edit mem_1' },
    })
    expect(wrapper.text()).toContain('Copied: /memory-edit mem_1')
  })

  it('renders nothing visible when not visible', () => {
    const wrapper = mount(Toast, { props: { visible: false, message: 'x' } })
    expect(wrapper.find('[role="status"] > div').exists()).toBe(false)
  })
})
