import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Tooltip from '../src/components/Tooltip.vue'

describe('Tooltip', () => {
  it('renders text when visible', () => {
    const wrapper = mount(Tooltip, {
      props: { visible: true, text: 'hello', x: 10, y: 100 },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('hello')
    wrapper.unmount()
  })

  it('positions above the anchor when there is enough room', () => {
    const wrapper = mount(Tooltip, {
      props: { visible: true, text: 'hi', x: 10, y: 200 },
      attachTo: document.body,
    })
    expect(document.querySelector('.oxui-tooltip').getAttribute('style')).toContain(
      'translate(-50%, -100%)',
    )
    wrapper.unmount()
  })

  it('flips below the anchor when there is not enough room above', () => {
    const wrapper = mount(Tooltip, {
      props: { visible: true, text: 'hi', x: 10, y: 5 },
      attachTo: document.body,
    })
    expect(document.querySelector('.oxui-tooltip').getAttribute('style')).toContain(
      'translate(-50%, 0)',
    )
    wrapper.unmount()
  })

  it("flips based on the tooltip's actual measured height, not a fixed guess", async () => {
    // y=40 clears a single-line (fallback ~28px) tooltip: 40 - 8 - 28 = 4 >= 0.
    const wrapper = mount(Tooltip, {
      props: { visible: true, text: 'short', x: 10, y: 40 },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.querySelector('.oxui-tooltip').getAttribute('style')).toContain(
      'translate(-50%, -100%)',
    )

    // Once the tooltip measures taller than that (e.g. wrapped text), the
    // same y=40 no longer has room above it: 40 - 8 - 60 < 0.
    Object.defineProperty(document.querySelector('.oxui-tooltip'), 'offsetHeight', {
      configurable: true,
      value: 60,
    })
    await wrapper.setProps({ text: 'a taller tooltip that wraps onto a second line' })
    await flushPromises()
    expect(document.querySelector('.oxui-tooltip').getAttribute('style')).toContain(
      'translate(-50%, 0)',
    )

    wrapper.unmount()
  })
})
