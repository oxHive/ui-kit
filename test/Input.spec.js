import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../src/components/Input.vue'

describe('Input', () => {
  it('supports v-model', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['hello'])
  })
})
