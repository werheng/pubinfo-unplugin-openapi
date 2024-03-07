import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import fg from 'fast-glob'
import type { CacheOptions } from '../types'
import { getHash, writeFile } from './utils'

export default function createCache(options: CacheOptions, root: string) {
  const { cacheDir } = options

  function genCacheKey(id: string, content: string) {
    return `${getHash(id)}_${getHash(content)}`
  }

  function getIdFromKey(key: string) {
    return key.split('_')[0]
  }

  function hasCache(key: string) {
    return existsSync(join(cacheDir, `${key}.json`))
  }

  function setCache(key: string, content: string) {
    removeCache(key)
    writeFile(join(cacheDir, `${key}.json`), content)
  }

  async function removeCache(key: string) {
    const id = getIdFromKey(key)
    const result = await fg(
      join(cacheDir, `${id}_**.json`),
      {
        absolute: true,
        cwd: root,
        onlyFiles: true,
        followSymbolicLinks: true,
      },
    )

    if (result.length > 0)
      result.forEach(unlinkSync)
  }

  return {
    genCacheKey,
    hasCache,
    setCache,
    removeCache,
  }
}
