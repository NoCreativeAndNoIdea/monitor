import type { Arrayable, Data } from '@ideaair/monitor-shared'
import { safeArray } from '@ideaair/monitor-shared'
import { getConfigs } from './config'
import type { ReportData } from './constant'
import request from './request'
import { error, warn } from './logger'

let reportQueue: ReportData[] = []

export const report = (data: Arrayable<ReportData>) => {
  reportQueue = reportQueue.concat(safeArray(data))
}

export const reportInfo = (data: Arrayable<Data>) => {
  report({
    type: 'log',
    data: safeArray(data)
  })
}

export const reportError = (data: Arrayable<Data>) => {
  report({
    type: 'error',
    data: safeArray(data)
  })
}

export const clearReportQueue = () => {
  reportQueue = []
}

const reRequest = getConfigs('reRequest')
let reRequestCount: number = 1
const resetRequestCount = () => {
  reRequestCount = 1
}
const plusRequestCount = () => {
  reRequestCount += 1
}

const reportService = (data: ReportData[]) =>
  new Promise((resolve, reject) => {
    request(data)
      .then((res) => {
        resetRequestCount()
        resolve(res)
      })
      .catch((err: Error) => {
        if (!reRequest || reRequestCount > reRequest) {
          resetRequestCount()
          error(`${err}`, 'ReportRequest')
          reject(err)
        } else {
          warn(`report re-request number: ${reRequestCount}`, 'ReportRequest')
          plusRequestCount()
          resolve(reportService(data))
        }
      })
      .finally(() => {
        clearReportQueue()
      })
  })

export const reportRequest = () => {
  return reportService([...reportQueue])
}
