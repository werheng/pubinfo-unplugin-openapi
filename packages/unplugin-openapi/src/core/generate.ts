import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateService as gen } from '@umijs/openapi'
import type { Options } from '../types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function generateOpenAPI(options: Options) {
  const { imports, input, output } = options

  const outputStrs = (output as string).split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.length > 0 ? outputStrs.join('/') : ''

  gen({
    requestLibPath: imports,
    templatesFolder: join(__dirname, '../templates'),
    serversPath,
    projectName,
    schemaPath: input as string,
  })
}
