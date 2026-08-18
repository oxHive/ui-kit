import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../src/components/Badge.vue'

describe('Badge', () => {
  it('renders the label using the given color', () => {
    const wrapper = mount(Badge, { props: { label: 'personal', color: '#1D9E75' } })
    expect(wrapper.text()).toBe('personal')
    // jsdom's CSSStyleDeclaration normalizes hex colors to rgb() when it
    // serializes the `style` attribute, so '#1D9E75' round-trips as
    // 'rgb(29, 158, 117)' here even though the component's own template
    // literal uses the hex string verbatim (see src/components/Badge.vue).
    expect(wrapper.attributes('style')).toContain('rgb(29, 158, 117)')
  })
})
