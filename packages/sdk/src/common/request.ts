import { isFunction, isPromise } from '@ideaair/monitor-shared'
import axios from 'axios'
import { getConfigs } from './config'
import { error, formatMsgByObj, info } from './logger'
import type { CustomRequest, RequestData } from './constant'

export const request = (data: RequestData) => {
  const reportUrl = getConfigs('reportUrl')
  const requestConfig = getConfigs('requestConfig')
  const customRequest = getConfigs<CustomRequest>('customRequest')

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
