import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebar from '../src/components/AppSidebar.vue'

describe('AppSidebar', () => {
  it('renders logo, default, status, and footer slots in order', () => {
    const wrapper = mount(AppSidebar, {
      slots: {
        logo: '<div data-test="logo" />',
        default: '<div data-test="nav" />',
        status: '<div data-test="status" />',
        footer: '<div data-test="footer" />',
      },
    })
    expect(wrapper.find('[data-test="logo"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="nav"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="status"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="footer"]').exists()).toBe(true)
  })
})
