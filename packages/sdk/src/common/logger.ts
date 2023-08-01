import * as nodeLog from 'node:console'
import type { Data } from '@ideaair/monitor-shared'
import { isBool, isNull, isObject } from '@ideaair/monitor-shared'
import { isBrowser } from '@ideaair/monitor-env'
import type { MonitorConfigs } from './config'
import { getConfigs } from './config'

export enum LoggerLevel {
  Log = 'log',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

export interface LoggerOptions {
  enableReport?: boolean
}

const defaultLoggerOptions: Required<LoggerOptions> = {
  enableReport: false
}

let globalPrefix = 'MONITOR'
let options: MonitorConfigs['logger'] = false

export const setPrefix = (prefix: string) => {
  globalPrefix = prefix
}

export const initLogger = () => {
  const globalConfigs = getConfigs<MonitorConfigs['logger']>('logger')

  if (isNull(globalConfigs)) {
    options = false
  } else if (isBool(globalConfigs)) {
    options = globalConfigs
  } else if (isObject(globalConfigs)) {
    options = {
      ...defaultLoggerOptions,
      ...(globalConfigs as LoggerOptions)
    }
  }
}

const message = (msg: string, type: LoggerLevel = LoggerLevel.Log): void => {
  // Not enabled logger
  if (!options) {
    return
  }

  // TODO: Used configs
  // 1. report log message
  // 2. print log message to control
  ;(isBrowser ? console : nodeLog)[type](msg)
}

const formatMessage = (msg: string, prefix?: string): string => {
  return prefix ? `[${globalPrefix}::${prefix}]: ${msg}` : `[${globalPrefix}] ${msg}`
}

export const messageType =
  (type: LoggerLevel): ((msg: string, prefix?: string) => void) =>
  (msg: string, prefix?: string) => {
    return message(formatMessage(msg, prefix), type)
  }

export const formatMsgByObj = (val: Data<any>): string => {
  return `\n${JSON.stringify(val, null, 2)}`
}

export const log = messageType(LoggerLevel.Log)
export const info = messageType(LoggerLevel.Info)
export const warn = messageType(LoggerLevel.Warn)
export const error = messageType(LoggerLevel.Error)

export default {
  log,
  info,
  warn,
  error
}
