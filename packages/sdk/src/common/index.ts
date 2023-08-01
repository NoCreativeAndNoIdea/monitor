import { loadConfigs } from './config'
import type { MonitorConfigs } from './config'
import { initLogger } from './logger'

export * from './config'
export * from './logger'
export * from './request'
export * from './constant'
export * from './report'

export const initMonitorCommon = (configs: MonitorConfigs) => {
  loadConfigs(configs)
  initLogger()
}
