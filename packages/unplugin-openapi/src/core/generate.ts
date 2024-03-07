import { join } from 'node:path'
import { generateService as gen } from '@umijs/openapi'
import type { Options } from '../types'

export async function generateOpenAPI(options: Required<Options>, root: string) {
  const { imports, input, output } = options

  const outputStrs = output.split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.length > 0 ? outputStrs.join('/') : ''

  await gen({
    requestLibPath: imports,
    templatesFolder: join(root, options.templates),
    serversPath: join(root, serversPath),
    projectName,
    schemaPath: input?.startsWith('http') ? input : join(root, input),
  })
}
