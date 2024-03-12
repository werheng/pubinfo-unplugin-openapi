import { join, resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { createContext, getSchema } from '../src/core/ctx'
import createCache from '../src/core/cache'

const root = resolve(__dirname, '../')
const cacheDir = join(root, 'node_modules/.pubinfo-openapi')

describe('cache', async () => {
  const options = {
    templates: './templates',
    input: './tests/inputs/cache.json',
    output: './tests/outputs/cache',
  }
  const { generateTS } = await createContext(options, root)
  const { hasCache, genCacheKey, removeCache } = createCache({ cacheDir }, root)
  const openAPI = await getSchema(options.input, root)
  const cacheKey = genCacheKey(options.input, openAPI!)

  // clear cache
  if (existsSync(cacheDir))
    await rm(cacheDir, { recursive: true })

  it('should cache', async () => {
    await generateTS()
    expect(hasCache(cacheKey)).toBe(true)
  })

  it('should not cache', async () => {
    await removeCache(cacheKey)
    expect(hasCache(cacheKey)).toBe(false)
  })
})
