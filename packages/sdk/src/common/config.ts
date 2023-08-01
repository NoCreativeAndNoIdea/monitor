import { type Arrayable, getObjectValueByKey, safeArray } from '@ideaair/monitor-shared'
import type { AxiosRequestConfig } from 'axios'
import type { LoggerOptions } from './logger'
import type { CustomRequest } from './constant'

export interface MonitorConfigs {
  /**
   * @description
   * appId is the data classification credential that displays the system
   */
  appId: string
  /**
   * @description Logger enable control or other logger configure
   */
  logger?: boolean | LoggerOptions
  /**
   * @description Report request API address
   */
  reportUrl?: string
  /**
   * @description Report request configs, used Axios lib.
   */
  requestConfig?: AxiosRequestConfig
  /**
   *  @description Re-request enable control and re-request number
   */
  reRequest?: boolean | number
  /**
   * @description Use custom request method
   */
  customRequest?: CustomRequest | null
}

const defaultConfigs: Required<MonitorConfigs> = {
  appId: 'Test',
  logger: false,
  reportUrl: 'https://www.example.com',
  requestConfig: {
    timeout: 3000
  },
  reRequest: 3,
  customRequest: null
}

let _configs: Required<MonitorConfigs> | null = null

export const loadConfigs = (configs: MonitorConfigs) => {
  _configs = {
    ...defaultConfigs,
    ...configs
  }
}

export const getConfigs = <R = any>(key: Arrayable<string>): R | null => {
  let tempConfigs: R | null = { ...(_configs || defaultConfigs) } as unknown as any
  const keys = safeArray<string>(key)
  for (let i = 0; i < keys.length; i++) {
    if (!tempConfigs) {
      return tempConfigs
    }
    tempConfigs = getObjectValueByKey<unknown, R>(tempConfigs, keys[i])
  }
  return tempConfigs as unknown as R | null
}
