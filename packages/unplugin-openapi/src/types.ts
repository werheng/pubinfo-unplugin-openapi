import type { Import } from 'unimport'
import type { FilterPattern } from '@rollup/pluginutils'

export interface ImportExtended extends Import {
  sideEffects?: SideEffectsInfo
  __source?: 'dir' | 'resolver'
}

export interface ResolverResult {
  as?: string
  name?: string
  from: string
}

export type Arrayable<T> = T | Array<T>
export type SideEffectsInfo = Arrayable<ResolverResult | string> | undefined

export interface CacheOptions {
  root?: string
  cacheDir: string
}

export interface Options {
  /**
   * import实例的路径
   *
   * @default import request from \'../index\'
   */
  imports?: string

  /**
   * Swagger2.0 / OpenAPI3.0 的地址
   */
  input?: string

  /**
   * 文件输出目录
   */
  output?: string

  /**
   * 是否监听文件变化
   *
   * @default true
   */
  watch?: boolean

  /**
   * 忽略缓存强制生成接口文件
   *
   * @default false
   */
  force?: boolean

  /**
   * 批量配置
   */
  batch?: Array<Pick<Options, 'imports' | 'input' | 'output'>>

  /**
   * 生成的.d.ts类型文件的路径。
   * 在本地有安装 `typescript` 时默认使用。
   * 设置 `false` 禁用。
   *
   * @default './openapi.d.ts'
   */
  dts?: string | boolean

  /**
   * Auto import inside Vue templates
   *
   * @see https://github.com/unjs/unimport/pull/15
   * @see https://github.com/unjs/unimport/pull/72
   * @default false
   */
  vueTemplate?: boolean

  /**
   * Set default export alias by file name
   *
   * @default false
   */
  defaultExportByFilename?: boolean

  /**
   * Rules to include transforming target.
   *
   * @default [/\.[jt]sx?$/, /\.vue\??/]
   */
  include?: FilterPattern

  /**
   * Rules to exclude transforming target.
   *
   * @default [/node_modules/, /\.git/]
   */
  exclude?: FilterPattern
}
