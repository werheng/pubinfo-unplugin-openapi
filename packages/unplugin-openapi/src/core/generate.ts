import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stat } from 'node:fs/promises'
import { generateService as gen } from '@umijs/openapi'
import { genImport } from 'knitwork'
import type { Options } from '../types'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function generateOpenAPI(
  options: Required<Pick<Options, 'imports' | 'input' | 'output'>>,
  root: string,
) {
  const { imports, input, output } = options

  const outputStrs = output.split('/')
  const projectName = outputStrs.pop()
  const serversPath = outputStrs.join('/')

  let templatesFolder = join(__dirname, '../templates')

  try {
    await stat(templatesFolder)
  }
  catch (error) {
    templatesFolder = join(__dirname, '../../templates')
  }

  await gen({
    requestLibPath: Object.keys(imports).map(key => genImport(key, imports[key])).join('\n'),
    templatesFolder,
    serversPath: join(root, serversPath),
    projectName,
    schemaPath: input?.startsWith('http') ? input : join(root, input),
  })
}
