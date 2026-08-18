import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/components/Button.vue'

describe('Button', () => {
  it('renders the default slot and applies the variant class', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' },
      slots: { default: 'Save' },
    })
    expect(wrapper.text()).toBe('Save')
    expect(wrapper.classes()).toContain('oxui-btn-primary')
  })

  it('passes through native attrs like disabled', () => {
    const wrapper = mount(Button, { attrs: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
