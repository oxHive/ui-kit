import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import CopyButton from '../src/components/CopyButton.vue'

function stubClipboard(writeText) {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
}

afterEach(() => {
  delete navigator.clipboard
  delete document.execCommand
  vi.useRealTimers()
})

describe('CopyButton', () => {
  it('copies the text, emits copied, and shows the copied label briefly', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue()
    stubClipboard(writeText)
    const wrapper = mount(CopyButton, { props: { text: 'mynd status' } })
    expect(wrapper.attributes('type')).toBe('button')

    await wrapper.trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('mynd status')
    expect(wrapper.emitted('copied')).toEqual([['mynd status']])
    expect(wrapper.text()).toBe('Copied')
    expect(wrapper.classes()).toContain('oxui-copy--copied')

    vi.advanceTimersByTime(1500)
    await flushPromises()
    expect(wrapper.text()).toBe('Copy')
    expect(wrapper.classes()).not.toContain('oxui-copy--copied')
  })

  it('reads a function text at click time', async () => {
    const writeText = vi.fn().mockResolvedValue()
    stubClipboard(writeText)
    let value = 'first'
    const wrapper = mount(CopyButton, { props: { text: () => value } })
    value = 'second'
    await wrapper.trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('second')
  })

  it('falls back to execCommand when the Clipboard API is unavailable', async () => {
    document.execCommand = vi.fn().mockReturnValue(true)
    const wrapper = mount(CopyButton, { props: { text: 'mem_1' } })
    await wrapper.trigger('click')
    await flushPromises()
    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(wrapper.emitted('copied')).toEqual([['mem_1']])
  })

  it('emits error and keeps its label when both copy paths fail', async () => {
    document.execCommand = vi.fn().mockReturnValue(false)
    const wrapper = mount(CopyButton, { props: { text: 'x' } })
    await wrapper.trigger('click')
    await flushPromises()
    expect(wrapper.emitted('error')).toHaveLength(1)
    expect(wrapper.emitted('copied')).toBeUndefined()
    expect(wrapper.text()).toBe('Copy')
  })

  it('renders an icon-only slot with the copied state and passes attrs through', async () => {
    stubClipboard(vi.fn().mockResolvedValue())
    const wrapper = mount(CopyButton, {
      props: { text: 'mem_1', variant: 'ghost' },
      attrs: { title: 'Copy ID' },
      slots: { default: `<template #default="{ copied }">{{ copied ? '✓' : '⎘' }}</template>` },
    })
    expect(wrapper.attributes('title')).toBe('Copy ID')
    expect(wrapper.classes()).toContain('oxui-btn-ghost')
    expect(wrapper.text()).toBe('⎘')
    await wrapper.trigger('click')
    await flushPromises()
    expect(wrapper.text()).toBe('✓')
  })
})
