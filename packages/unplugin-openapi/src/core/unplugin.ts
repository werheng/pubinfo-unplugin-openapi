import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from '../types'
import { createContext } from './ctx'
import { slash } from './utils'

export default createUnplugin<Options>((options) => {
  let config: any
  return {
    name: 'unplugin-openapi',
    enforce: 'post',
    async buildStart() {
      if (config.command === 'serve') {
        const { generateTS } = await createContext(options)
        await generateTS()
      }
    },
    vite: {
      configResolved(resolvedConfig) {
        config = resolvedConfig
      },
      async handleHotUpdate({ file }) {
        const { dirs, generateTS } = await createContext(options)
        if (dirs?.some(glob => minimatch(slash(file), slash(glob))))
          await generateTS()
      },
    },
  }
})
