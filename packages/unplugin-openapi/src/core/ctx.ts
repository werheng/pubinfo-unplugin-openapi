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
    cli: rawOptions.cli || false,
  }

  const batch = options.batch.length > 0 ? options.batch : [options]
  const dirs = batch.map(opt => (opt.input || options.input || '').replace(/^\.\/|\.\.\//g, '**/'))

  const cache = createCache({
    cacheDir: join(root, 'node_modules/.pubinfo-openapi'),
  }, root)

  async function generateTS() {
    if (batch.length === 0)
      return

    const tasks = batch.map(async (o) => {
      const opt = { ...options, ...o }
      const outputPath = join(root, opt.output)

      if (opt?.cli) {
        await generateOpenAPI(opt as Required<Options>, root)
        return
      }

      if (!opt.enabled)
        return

      if (!opt.input)
        return

      if (opt.force) {
        await generateOpenAPI(opt as Required<Options>, root)
        return
      }

      const openAPI = await getSchema(opt.input, root)
      if (!openAPI) {
        consola.warn('Resolve OpenAPI failed, value is empty')
        return
      }

      const cacheKey = cache.genKey(opt.input, openAPI)
      if (cache.has(cacheKey) && existsSync(outputPath))
        return

      await generateOpenAPI(opt as Required<Options>, root)
      await cache.set(cacheKey, openAPI)
    })

    try {
      await Promise.all(tasks)
    }
    catch (error) {
      consola.error('An error occurred while processing tasks:', error)
    }
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
