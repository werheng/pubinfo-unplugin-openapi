import { join } from 'node:path'
import { generateService as gen } from '@umijs/openapi'
import { genImport } from 'knitwork'
import type { Options } from '../types'

export async function generateOpenAPI(options: Required<Options>, root: string) {
  const { imports, input, output } = options

  const outputPaths = output.split('/')

  await gen({
    requestLibPath: Object.keys(imports).map(key => genImport(key, imports[key])).join('\n'),
    templatesFolder: join(root, options.templates),
    serversPath: join(root, outputPaths.join('/')),
    projectName: outputPaths.pop(),
    schemaPath: input?.startsWith('http') ? input : join(root, input),
  })
}
