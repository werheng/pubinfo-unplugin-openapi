import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from '../types'
import { createContext } from './ctx'
import { slash } from './utils'

export default createUnplugin<Options>((options) => {
  const { dirs, generateTS } = createContext(options)

  return {
    name: 'unplugin-openapi',
    enforce: 'post',
    async buildStart() {
      await generateTS()
    },
    vite: {
      async handleHotUpdate({ file }) {
        if (dirs?.some(glob => minimatch(slash(file), slash(glob))))
          await generateTS()
      },
    },
  }
})
