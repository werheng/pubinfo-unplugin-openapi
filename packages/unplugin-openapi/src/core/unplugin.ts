import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from '../types'
import { createContext } from './ctx'
import { slash } from './utils'

export default createUnplugin<Options>((options) => {
  let ctx = createContext(options)

  return {
    name: 'pubinfo-unplugin-openapi',
    enforce: 'post',
    transformInclude(id) {
      return ctx.filter(id)
    },
    async transform(code, id) {
      return ctx.transform(code, id)
    },
    async buildStart() {
      ctx.generateTS()
      await ctx.scanDirs()
    },
    async buildEnd() {
      await ctx.writeConfigFiles()
    },
    vite: {
      async handleHotUpdate({ file }) {
        if (ctx.dirs?.some(glob => minimatch(slash(file), slash(glob))))
          await ctx.scanDirs()
      },
      async configResolved(config) {
        if (ctx.root !== config.root) {
          ctx = createContext(options, config.root)
          await ctx.scanDirs()
        }
      },
    },
  }
})
