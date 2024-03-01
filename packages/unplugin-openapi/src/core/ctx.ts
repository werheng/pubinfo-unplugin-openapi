import process from 'node:process'
import { pick } from 'lodash-es'
import type { Options } from '../types'
import { generateOpenAPI } from './generate'
import { slash } from './utils'

export function createContext(rawOptions: Options, root = process.cwd()) {
  root = slash(root)

  const options = {
    imports: 'import request from \'../index\'',
    output: './src/api/service',
    watch: true,
    batch: [],
    ...rawOptions,
  }

  const batch = options.batch.length > 0 ? options.batch : [pick(options, ['imports', 'input', 'output'])]

  function generateTS() {
    batch.forEach((opt) => {
      if (!opt.input)
        return

      generateOpenAPI({
        ...options,
        ...opt,
      }, root)
    })
  }

  return {
    root,
    generateTS,
  }
}
