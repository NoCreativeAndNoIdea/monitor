import { error, reportError, reportWarn, warn } from '../common'

const syntaxErrorHandler: OnErrorEventHandler = (msg, ...rest) => {
  const [source, lineno, colno] = rest

  error(msg.toString(), 'SyntaxError')
  reportError({
    type: 'SyntaxError',
    message: msg.toString(),
    data: {
      source,
      lineno,
      colno
    }
  })
}

const promiseSyntaxErrorHandler = (e: PromiseRejectionEvent) => {
  warn(e.reason, 'PromiseRejection')
  reportWarn({
    type: 'PromiseRejection',
    message: e.reason
  })
}

export const initSyntaxErrorInterceptor = () => {
  window.onerror = syntaxErrorHandler
  window.addEventListener('unhandledrejection', promiseSyntaxErrorHandler)
}
