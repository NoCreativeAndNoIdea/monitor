import type { Arrayable, Data } from '@ideaair/monitor-shared'

export interface ReportData extends Data {
  reportId: string
  level: string
  type: string
  message: string
  data?: Record<string, any>
  env: string
}

export type RequestData = Arrayable<Partial<ReportData>>

export type CustomRequest = (data: RequestData) => Promise<any>
