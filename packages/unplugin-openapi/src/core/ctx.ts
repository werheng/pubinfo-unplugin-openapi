import { cwd } from 'node:process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import http from 'node:http'
import https from 'node:https'
import { log } from 'node:console'
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
    watch: true,
    force: false,
    enabled: true,
    batch: [],
    ...rawOptions,
  }

  const batch = options.batch.length > 0 ? options.batch : [options]
  const dirs = batch.map(opt => (opt.input || options.input || '').replace(/^\.\/|\.\.\//g, '**/'))

  const { hasCache, setCache, genCacheKey } = createCache({
    root,
    cacheDir: join(root, 'node_modules/.pubinfo-openapi'),
  })

  async function generateTS() {
    await Promise.all(batch.map(async (opt) => {
      const mergeOptions = { ...options, ...opt }
      const outputPath = join(root, mergeOptions.output)

      if (!mergeOptions.input || !mergeOptions.enabled)
        return

      const openAPI = await getSchema(mergeOptions.input)
      if (!openAPI) {
        log('openapi config is empty')
        return
      }

      const cacheKey = genCacheKey(mergeOptions.input, openAPI)

      if (hasCache(cacheKey) && existsSync(outputPath) && !mergeOptions.force)
        return

      await generateOpenAPI(mergeOptions, root)
      setCache(cacheKey, openAPI)
    }))
  }

  return {
    root,
    dirs,
    generateTS,
  }
}

async function getSchema(schemaPath: string) {
  if (schemaPath.startsWith('http')) {
    const protocol = schemaPath.startsWith('https:') ? https : http
    try {
      const agent = new protocol.Agent({ rejectUnauthorized: false })
      const data = await fetch(schemaPath, { agent }).then(res => res.text())
      return data
    }
    catch (error) {
      log('fetch openapi error:', error)
    }
    return null
  }

  const schema = readFileSync(schemaPath, { encoding: 'utf-8' })
  return schema
}
