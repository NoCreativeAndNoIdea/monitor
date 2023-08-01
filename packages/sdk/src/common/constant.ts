import type { Arrayable, Data } from '@ideaair/monitor-shared'

export type ReportType = 'log' | 'error' | string

export interface ReportData extends Data {
  type: ReportType
  data?: Arrayable<Data>
}

export type RequestData = Arrayable<ReportData>

export type CustomRequest = (data: RequestData) => Promise<any>
