import { getUserAgent } from '@ideaair/monitor-env'
import type { Arrayable } from '@ideaair/monitor-shared'
import { safeArray } from '@ideaair/monitor-shared'
import { nanoid } from 'nanoid'
import { getConfigs } from './config'
import type { ReportData } from './constant'
import request from './request'
import { error, info, warn } from './logger'

const formatReportData = (data: Partial<ReportData>): ReportData => {
  return {
    ...{
      reportId: nanoid(),
      level: 'info',
      type: 'Default',
      message: '',
      env: getUserAgent()
    },
    ...data
  }
}

const reRequest = getConfigs('reRequest')
const reRequestCount: number = 1

const reportService = (data: ReportData[]) =>
  new Promise((resolve) => {
    request(data)
      .then((res) => {
        resolve(res)
      })
      .catch((err: Error) => {
        if (!reRequest || reRequestCount > reRequest) {
          error(`${err}`, 'ReportRequest')
        } else {
          warn(`report re-request number: ${reRequestCount}`, 'ReportRequest')
          resolve(reportService(data))
        }
      })
  })

export const report = (data: Arrayable<ReportData>) => {
  const safeData = safeArray<Partial<ReportData>>(data)

  reportService(safeData.map(formatReportData)).finally(() => {
    info('Report data successful', 'ReportService')
  })
}

export const reportCommon =
  (level: 'info' | 'error' | 'warn') => (data: Arrayable<Omit<ReportData, 'env'>>) => {
    const _data = safeArray<Omit<ReportData, 'env'>>(data).map(
      (item) =>
        ({
          ...item,
          level: level
        }) as ReportData
    )
    report(_data)
  }

export const reportInfo = reportCommon('info')
export const reportWarn = reportCommon('warn')
export const reportError = reportCommon('error')
