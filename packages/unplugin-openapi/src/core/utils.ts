import { createHash } from 'node:crypto'
import type { Buffer } from 'node:buffer'
import { dirname } from 'node:path'
import { promises as fs } from 'node:fs'
import type { Arrayable } from '../types'

export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

export function arraify<T>(target: Arrayable<T>) {
  return Array.isArray(target) ? target : [target]
}

export function getHash(text: Buffer | string, length = 8): string {
  const h = createHash('sha256').update(text).digest('hex').substring(0, length)
  if (length <= 64)
    return h
  return h.padEnd(length, '_')
}

export async function writeFile(filePath: string, content = '') {
  await fs.mkdir(dirname(filePath), { recursive: true })
  return await fs.writeFile(filePath, content, 'utf-8')
}
