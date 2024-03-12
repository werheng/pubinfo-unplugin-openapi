import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from '../types'
import { createContext } from './ctx'
import { slash } from './utils'

export default createUnplugin<Options>((options) => {
  return {
    name: 'unplugin-openapi',
    enforce: 'post',
    async buildStart() {
      const { generateTS } = await createContext(options)
      await generateTS()
    },
    vite: {
      async handleHotUpdate({ file }) {
        const { dirs, generateTS } = await createContext(options)
        if (dirs?.some(glob => minimatch(slash(file), slash(glob))))
          await generateTS()
      },
    },
  }
})
