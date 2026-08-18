import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import AppNav from '../src/components/AppNav.vue'

const DotIcon = { render: () => h('svg', { 'data-icon': 'dot' }) }

describe('AppNav', () => {
  it('renders each item label, marks the active one, shows badges, and fires onClick', async () => {
    const onClick = vi.fn()
    const wrapper = mount(AppNav, {
      props: {
        items: [
          { label: 'Memories', icon: DotIcon, active: true, onClick },
          { label: 'Feedback', icon: DotIcon, badge: 3 },
        ],
      },
    })
    expect(wrapper.text()).toContain('Memories')
    expect(wrapper.text()).toContain('Feedback')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.find('[aria-current="page"]').text()).toContain('Memories')
    await wrapper.findAll('button')[0].trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
})
