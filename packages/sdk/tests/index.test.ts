import { describe, expect, it } from 'vitest'
import { demo } from '../src'

describe('demo', () => {
  it('should is same number', () => {
    expect(demo(2)).toBe(4)
  })
})
