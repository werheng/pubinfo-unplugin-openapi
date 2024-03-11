import { join } from 'node:path'
import { generateService as gen } from '@umijs/openapi'
import { genImport } from 'knitwork'
import type { Options } from '../types'

export async function generateOpenAPI(options: Required<Options>, root: string) {
  const { imports, input, output } = options

  const outputStrs = output.split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.join('/')

  await gen({
    requestLibPath: Object.keys(imports).map(key => genImport(key, imports[key])).join('\n'),
    templatesFolder: join(root, options.templates),
    serversPath: join(root, serversPath),
    projectName,
    schemaPath: input?.startsWith('http') ? input : join(root, input),
  })
}
