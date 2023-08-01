/**
 *  @vitest-environment jsdom
 */

import { safeArray } from '@ideaair/monitor-shared'
import { describe, expect, it } from 'vitest'
import { loadConfigs } from '../src'
import { initLogger, request } from '../src/common'
import type { ReportData, RequestData } from '../src/common'

loadConfigs({
  appId: 'Test',
  logger: true,
  customRequest: (data: RequestData) => {
    const transformedData = safeArray<ReportData>(data)
    return new Promise((resolve, _reject) => {
      if (transformedData[0].type === 'log') {
        resolve({
          message: 'success'
        })
      } else {
        resolve({
          message: 'error'
        })
      }
    })
  }
})

initLogger()

describe('Request', () => {
  it('should is success', async () => {
    const res = await request({
      type: 'log'
    })
    expect(res).toEqual({
      message: 'success'
    })
  })
  it('should is error', async () => {
    const res = await request({
      type: 'error'
    })
    expect(res).toEqual({ message: 'error' })
  })
})
