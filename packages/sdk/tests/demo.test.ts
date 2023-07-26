/**
 *  @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'

describe('env', () => {
  it('should window not undefined', () => {
    expect(typeof window).not.toBe('undefined')
  })
})
