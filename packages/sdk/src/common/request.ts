import { isBrowser } from '@ideaair/monitor-env'
import { isFunction, isPromise } from '@ideaair/monitor-shared'
import axios from 'axios'
import { getConfigs } from './config'
import { error, formatMsgByObj, info } from './logger'
import type { CustomRequest, RequestData } from './constant'

export const request = (data: RequestData) => {
  const [reportUrl, requestConfig, customRequest] = [
    getConfigs('reportUrl'),
    getConfigs('requestConfig'),
    getConfigs<CustomRequest>('customRequest')
  ]

  return new Promise((resolve, reject) => {
    info(formatMsgByObj(data), 'RequestData')
    const rejectCallback = (err: Error) => {
      error(`error`, 'RequestError')
      reject(err)
    }

    if (isFunction(customRequest)) {
      const res = customRequest(data)
      if (isPromise(res)) {
        res.then(resolve).catch(rejectCallback)
      }
    } else if (isBrowser) {
      navigator.sendBeacon(
        reportUrl,
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      )
    } else {
      axios
        .post(reportUrl, {
          ...requestConfig,
          data
        })
        .then(resolve)
        .catch(rejectCallback)
    }
  })
}

export type Request = typeof request

export default request
