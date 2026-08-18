import { describe, it, expect } from 'vitest'
import * as pkg from '../src/index.js'

describe('@oxhive/ui package', () => {
  it('loads without error', () => {
    expect(pkg).toBeTruthy()
  })
})
