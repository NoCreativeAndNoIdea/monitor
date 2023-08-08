export const isBrowser = typeof window !== 'undefined'

export const getNavigator = () => {
  // Is browser navigator
  if (isBrowser) {
    return window.navigator
  }

  return null
}

export const getUserAgent = () => {
  return getNavigator()?.userAgent || ''
}
