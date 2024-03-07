import { join, resolve } from 'node:path'
import { readFile, readdir } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

const root = resolve(__dirname, '../')

describe('generate', () => {
  it('generate swagger-example', async () => {
    const options = {
      templates: './templates',
      input: './tests/inputs/swagger-example.json',
      output: './tests/outputs/swagger-example',
    }

    const ctx = createContext(options, root)
    await ctx.generateTS()

    const dirs = await readdir(join(root, options.output))
    const results = await Promise.all(dirs.map(async (file) => {
      return await readFile(join(root, options.output, file), { encoding: 'utf-8' })
    }))

    results.forEach((result) => {
      expect(result).toMatchSnapshot()
    })
  })
})
