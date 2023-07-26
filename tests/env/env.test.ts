import { describe, expect, it } from 'vitest'
import { isBrowser } from '@ideaair/monitor-env'

describe('env', () => {
  it('should not is a browser environment', () => {
    expect(isBrowser).toBe(false)
  })
})
