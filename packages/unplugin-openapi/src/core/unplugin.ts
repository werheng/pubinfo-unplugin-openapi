import { createUnplugin } from 'unplugin'
import type { Options } from '../types'
import { createContext } from './ctx'

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
    buildStart() {
      ctx.generateTS()
      // await ctx.scanDirs()
    },
  }
})
