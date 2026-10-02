import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SegmentedControl from '../src/components/SegmentedControl.vue'

const OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Personal', value: 'personal' },
  { label: 'Workspace', value: 'workspace', description: 'Shared with this workspace' },
]

describe('SegmentedControl', () => {
  it('renders a labelled radiogroup with the selected option checked', () => {
    const wrapper = mount(SegmentedControl, {
      props: { options: OPTIONS, modelValue: 'personal' },
      attrs: { 'aria-label': 'Filter by layer' },
    })
    const group = wrapper.find('[role="radiogroup"]')
    expect(group.attributes('aria-label')).toBe('Filter by layer')
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios.map((r) => r.attributes('aria-checked'))).toEqual(['false', 'true', 'false'])
    expect(radios.map((r) => r.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
    expect(radios[1].classes()).toContain('oxui-segmented__item--active')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(SegmentedControl, { props: { options: OPTIONS, modelValue: 'all' } })
    await wrapper.findAll('[role="radio"]')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['workspace']])
  })

  it('makes the first option the Tab stop when nothing is selected', () => {
    const wrapper = mount(SegmentedControl, { props: { options: OPTIONS } })
    expect(wrapper.findAll('[role="radio"]').map((r) => r.attributes('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
    ])
  })

  it('arrow keys select and focus the next/previous option, wrapping', async () => {
    const wrapper = mount(SegmentedControl, {
      props: { options: OPTIONS, modelValue: 'workspace' },
      attachTo: document.body,
    })
    const radios = wrapper.findAll('[role="radio"]')
    await radios[2].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['all'])
    expect(document.activeElement).toBe(radios[0].element)
    await radios[0].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['workspace'])
    expect(document.activeElement).toBe(radios[2].element)
    wrapper.unmount()
  })

  it('disables every option when disabled', () => {
    const wrapper = mount(SegmentedControl, {
      props: { options: OPTIONS, modelValue: 'all', disabled: true },
    })
    expect(
      wrapper.findAll('[role="radio"]').every((r) => r.attributes('disabled') !== undefined),
    ).toBe(true)
    expect(wrapper.find('[role="radiogroup"]').attributes('aria-disabled')).toBe('true')
  })

  it('shows an option description as a tooltip on hover and exposes it to AT', async () => {
    const wrapper = mount(SegmentedControl, {
      props: { options: OPTIONS, modelValue: 'all' },
      attachTo: document.body,
    })
    const workspace = wrapper.findAll('[role="radio"]')[2]
    expect(workspace.attributes('aria-description')).toBe('Shared with this workspace')
    await workspace.trigger('mouseenter')
    expect(document.body.querySelector('.oxui-tooltip')?.textContent.trim()).toBe(
      'Shared with this workspace',
    )
    await workspace.trigger('mouseleave')
    expect(document.body.querySelector('.oxui-tooltip')).toBeNull()
    wrapper.unmount()
  })
})
