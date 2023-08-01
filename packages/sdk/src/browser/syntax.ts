import { error, warn } from '../common'

const syntaxErrorHandler: OnErrorEventHandler = (msg) => {
  // TODO: Analysis error message
  error(msg.toString(), 'SyntaxError')
}

const promiseSyntaxErrorHandler = (e: PromiseRejectionEvent) => {
  // TODO: Report error message
  warn(e.reason, 'PromiseRejection')
}

export const initSyntaxErrorInterceptor = () => {
  window.onerror = syntaxErrorHandler
  window.addEventListener('unhandledrejection', promiseSyntaxErrorHandler)
}
