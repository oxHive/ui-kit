import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebar from '../src/components/AppSidebar.vue'

describe('AppSidebar', () => {
  it('renders productName, version, logo-icon, default, status, and footer slots', () => {
    const wrapper = mount(AppSidebar, {
      props: { productName: 'HiveMind', version: '0.14.3' },
      slots: {
        'logo-icon': '<svg data-test="icon" />',
        default: '<div data-test="nav" />',
        status: '<div data-test="status" />',
        footer: '<div data-test="footer" />',
      },
    })
    expect(wrapper.text()).toContain('HiveMind')
    expect(wrapper.text()).toContain('v0.14.3')
    expect(wrapper.find('[data-test="icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="nav"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="status"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="footer"]').exists()).toBe(true)
  })

  it('always renders the OxHive brand mark and wordmark', () => {
    const wrapper = mount(AppSidebar, { props: { productName: 'HiveMind' } })
    expect(wrapper.text()).toContain('OxHive')
    expect(wrapper.find('img.oxui-sidebar__brand-mark').exists()).toBe(true)
  })

  it('omits the version pill when version is not provided', () => {
    const wrapper = mount(AppSidebar, { props: { productName: 'HiveMind' } })
    expect(wrapper.find('.oxui-sidebar__version').exists()).toBe(false)
  })
})
