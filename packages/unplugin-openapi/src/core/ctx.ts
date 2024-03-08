import { cwd } from 'node:process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import http from 'node:http'
import https from 'node:https'
import consola from 'consola'
import fetch from 'node-fetch'
import type { Options } from '../types'
import { generateOpenAPI } from './generate'
import { slash } from './utils'
import createCache from './cache'

export function createContext(rawOptions: Options, root = cwd()) {
  root = slash(root)

  const options = {
    imports: 'import request from \'../index\'',
    output: './src/api/service',
    force: false,
    enabled: true,
    templates: 'node_modules/@pubinfo/unplugin-openapi/templates',
    batch: [],
    ...rawOptions,
  }

  const batch = options.batch.length > 0 ? options.batch : [options]
  const dirs = batch.map(opt => (opt.input || options.input || '').replace(/^\.\/|\.\.\//g, '**/'))

  const { hasCache, setCache, genCacheKey } = createCache({
    cacheDir: join(root, 'node_modules/.pubinfo-openapi'),
  }, root)

  async function generateTS() {
    await Promise.all(batch.map(async (opt) => {
      const mergeOptions = { ...options, ...opt }
      const outputPath = join(root, mergeOptions.output)

      if (!mergeOptions.input || !mergeOptions.enabled)
        return

      const openAPI = await getSchema(mergeOptions.input, root)
      if (!openAPI) {
        consola.warn('openapi config is empty')
        return
      }

      const cacheKey = genCacheKey(mergeOptions.input, openAPI)

      if (hasCache(cacheKey) && existsSync(outputPath) && !mergeOptions.force)
        return

      await generateOpenAPI(mergeOptions as Required<Options>, root)
      await setCache(cacheKey, openAPI)
    }))
  }

  return {
    root,
    dirs,
    generateTS,
  }
}

export async function getSchema(schemaPath: string, root: string) {
  if (schemaPath.startsWith('http')) {
    const protocol = schemaPath.startsWith('https:') ? https : http
    try {
      const agent = new protocol.Agent({ rejectUnauthorized: false })
      const data = await fetch(schemaPath, { agent }).then(res => res.text())
      return data
    }
    catch (error) {
      consola.error('fetch openapi error:', error)
    }
    return null
  }

  const schema = readFileSync(join(root, schemaPath), { encoding: 'utf-8' })
  return schema
}
