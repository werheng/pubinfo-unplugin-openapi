import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateService as gen } from '@umijs/openapi'
import { genImport } from 'knitwork'
import type { Options } from '../types'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function generateOpenAPI(options: Required<Options>, root: string) {
  const { imports, input, output } = options

  const outputStrs = output.split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.join('/')

  await gen({
    requestLibPath: Object.keys(imports).map(key => genImport(key, imports[key])).join('\n'),
    templatesFolder: join(__dirname, '../templates'),
    serversPath: join(root, serversPath),
    projectName,
    schemaPath: input?.startsWith('http') ? input : join(root, input),
  })
}
