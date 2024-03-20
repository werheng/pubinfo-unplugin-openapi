import { cwd } from 'node:process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import http from 'node:http'
import https from 'node:https'
import consola from 'consola'
import fetch from 'node-fetch'
import { loadConfig } from 'c12'
import type { Options } from '../types'
import { generateOpenAPI } from './generate'
import { slash } from './utils'
import createCache from './cache'

export async function createContext(rawOptions: Options, root = cwd()) {
  root = slash(root)

  const { config } = await loadConfig<Options>({ name: 'openapi' })

  const options = {
    imports: { '@/api': 'request' },
    output: './src/api/service',
    force: false,
    enabled: true,
    batch: [],
    ...((config && Object.keys(config).length > 0) ? config : rawOptions),
    cli: rawOptions.cli,
  }

  const batch = options.batch.length > 0 ? options.batch : [options]
  const dirs = batch.map(opt => (opt.input || options.input || '').replace(/^\.\/|\.\.\//g, '**/'))

  const cache = createCache({
    cacheDir: join(root, 'node_modules/.pubinfo-openapi'),
  }, root)

  async function generateTS() {
    await Promise.all(batch.map(async (opt) => {
      const mergeOptions = { ...options, ...opt }
      const outputPath = join(root, mergeOptions.output)

      if (mergeOptions?.cli) {
        await generateOpenAPI(mergeOptions as Required<Options>, root)
        return
      }

      if (!mergeOptions.enabled)
        return

      if (!mergeOptions.input)
        return

      if (mergeOptions.force) {
        await generateOpenAPI(mergeOptions as Required<Options>, root)
        return
      }

      const openAPI = await getSchema(mergeOptions.input, root)
      if (!openAPI) {
        consola.warn('Resolve OpenAPI failed, value is empty')
        return
      }

      const cacheKey = cache.genKey(mergeOptions.input, openAPI)
      if (cache.has(cacheKey) && existsSync(outputPath))
        return

      await generateOpenAPI(mergeOptions as Required<Options>, root)
      await cache.set(cacheKey, openAPI)
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
      consola.error('Fetch openapi error:', error)
    }
    return null
  }

  const schema = readFileSync(join(root, schemaPath), { encoding: 'utf-8' })
  return schema
}
