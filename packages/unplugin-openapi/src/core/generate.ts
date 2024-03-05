import { join } from 'node:path'
import { cwd } from 'node:process'
import { generateService as gen } from '@umijs/openapi'
import type { Options } from '../types'

export async function generateOpenAPI(options: Options, root = cwd()) {
  const { imports, input, output } = options

  const outputStrs = (output as string).split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.length > 0 ? outputStrs.join('/') : ''

  await gen({
    requestLibPath: imports,
    templatesFolder: join(root, 'node_modules/@pubinfo/unplugin-openapi/templates'),
    serversPath,
    projectName,
    schemaPath: input?.startsWith('http') ? input : join(root, input as string),
  })
}