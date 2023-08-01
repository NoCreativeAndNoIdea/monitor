import { info, initMonitorCommon } from '../common'
import type { MonitorConfigs } from '../common'
import { initResourceErrorInterceptor } from './resource'
import { initSyntaxErrorInterceptor } from './syntax'

export const initBrowser = (configs: MonitorConfigs) => {
  initMonitorCommon(configs)
  initResourceErrorInterceptor()
  initSyntaxErrorInterceptor()
  // TODO:
  // 1. First screen load time
  // 2. Page crash collect
  info('Init browser monitor successful!', 'BrowserInit')
}
