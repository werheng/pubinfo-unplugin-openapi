import type { Arrayable } from '../types'

export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

export function arrayable<T>(arr: Arrayable<T>) {
  return Array.isArray(arr) ? arr : [arr]
}
