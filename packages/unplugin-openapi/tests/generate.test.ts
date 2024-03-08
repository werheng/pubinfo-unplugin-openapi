import { join, resolve } from 'node:path'
import { readFile, readdir } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'
import type { Options } from '../src/types'

const root = resolve(__dirname, '../')
async function generateFile(options: Options) {
  const ctx = createContext(options, root)
  await ctx.generateTS()

  const dirs = await readdir(join(root, options.output!))
  return await Promise.all(dirs.map(async (file) => {
    return await readFile(join(root, options.output!, file), { encoding: 'utf-8' })
  }))
}

describe('generate', async () => {
  it('should generate by openapi.json', async () => {
    const results = await generateFile({
      templates: './templates',
      input: './tests/inputs/openapi-example.json',
      output: './tests/outputs/openapi-example',
      force: true,
    })

    results.forEach((result) => {
      expect(result).toMatchSnapshot()
    })
  })

  it('should generate by swagger.json', async () => {
    const results = await generateFile({
      templates: './templates',
      input: './tests/inputs/swagger-example.json',
      output: './tests/outputs/swagger-example',
      force: true,
    })

    results.forEach((result) => {
      expect(result).toMatchSnapshot()
    })
  })
})
