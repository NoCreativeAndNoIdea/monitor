import type { Data } from '.'

export const safeArray = <T = unknown>(value: unknown): Array<T> => {
  if (!value && value !== 0) {
    return [] as T[]
  }
  return Array.isArray(value) ? (value as T[]) : ([value] as T[])
}

const check =
  <T>(type: string) =>
  <R extends T>(val: unknown): val is R =>
    Object.prototype.toString.call(val) === `[object ${type}]`

export const isObject = check<Data>('Object')
export const isNull = check('Null')
export const isBool = check('Boolean')
export const isFunction = check<(...args: any) => any>('Function')
export const isPromise = (val: unknown): val is Promise<any> => {
  return typeof val === 'object' && typeof (val as Promise<any>)?.then === 'function'
}

export const isPromiseFn = (val: unknown): val is (...args: any) => Promise<any> => {
  if (isFunction(val)) {
    try {
      const res = val()
      return isPromise(res)
    } catch (_e) {
      return false
    }
  }
  return false
}

export const hasOwn = <T extends Data>(obj: T, key: string): boolean => Object.hasOwn(obj, key)

export const getObjectValueByKey = <T = unknown, R = unknown>(obj: T, key: string): R | null => {
  if (isObject(obj)) {
    if (hasOwn(obj, key)) {
      return obj[key] as R
    }
  }

  if (obj) {
    return obj as R
  }

  return null
}
