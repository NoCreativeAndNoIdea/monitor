import { error, reportError } from '../common'

export type ResourceElement = HTMLScriptElement | HTMLLinkElement | HTMLImageElement

const isResourceElement = (val: unknown): val is ResourceElement =>
  val instanceof HTMLScriptElement ||
  val instanceof HTMLLinkElement ||
  val instanceof HTMLImageElement

const getTargetUrl = (target: ResourceElement) => {
  let url: string = ''
  if ('src' in target) {
    url = target.src
  }

  if ('href' in target) {
    url = target.href
  }
  return url
}

const resourceErrorInterceptor = (e: ErrorEvent) => {
  const target = e.target || e.srcElement
  const isElementTarget = isResourceElement(target)
  if (!isElementTarget) return false
  const url = getTargetUrl(target)

  const msg = `Load error address: ${url}`
  error(msg, 'ResourceError')
  reportError({
    type: 'ResourceError',
    message: msg,
    data: {
      url: url
    }
  })
}

export const initResourceErrorInterceptor = () => {
  window.addEventListener('error', resourceErrorInterceptor, true)
}
