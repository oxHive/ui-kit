import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from '../src/components/Tooltip.vue'

describe('Tooltip', () => {
  it('renders text when visible', () => {
    const wrapper = mount(Tooltip, { props: { visible: true, text: 'hello', x: 10, y: 100 }, attachTo: document.body })
    expect(document.body.textContent).toContain('hello')
    wrapper.unmount()
  })
})
