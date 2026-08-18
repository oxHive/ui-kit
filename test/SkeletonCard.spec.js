import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkeletonCard from '../src/components/SkeletonCard.vue'

describe('SkeletonCard', () => {
  it('renders three shimmer bars', () => {
    const wrapper = mount(SkeletonCard)
    expect(wrapper.findAll('.oxui-skeleton').length).toBe(3)
  })
})
