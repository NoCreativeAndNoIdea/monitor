/**
 *  @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { isBrowser } from '@ideaair/monitor-env'

describe('env', () => {
  it('should be a browser environment', () => {
    expect(isBrowser).toBe(true)
  })
})
