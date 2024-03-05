import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from '../types'
import { createContext } from './ctx'
import { slash } from './utils'

export default createUnplugin<Options>((options) => {
  const ctx = createContext(options)

  return {
    name: 'pubinfo-unplugin-openapi',
    enforce: 'post',
    // transformInclude(id) {
    //   return ctx.filter(id)
    // },
    // async transform(code, id) {
    //   return ctx.transform(code, id)
    // },
    async buildStart() {
      await ctx.generateTS()
      // await ctx.scanDirs()
    },
    vite: {
      async handleHotUpdate({ file }) {
        if (ctx.dirs?.some(glob => minimatch(slash(file), slash(glob))))
          await ctx.generateTS()
      },
    },
  }
})
