export type Arrayable<T> = T | Array<T>

export interface CacheOptions {
  cacheDir: string
}

type ESMImport = string | string[] | Array<{ name: string, as?: string }>

export interface Options {
  /**
   * 是否启用
   *
   * @default true
   */
  enabled?: boolean

  /**
   * 文件 import 内容
   *
   * @default { '../index': 'request' } // import request from '../index'
   *
   * @example { 'request': ['foo', 'bar'] } // import { foo , bar } from 'request'
   * @example { 'request': [{ name: 'foo', as: 'bar' }] } // import { foo as bar } from 'request'
   */
  imports?: Record<string, ESMImport>

  /**
   * Swagger2.0 / OpenAPI3.0 的地址
   */
  input?: string

  /**
   * 文件输出目录
   */
  output?: string

  /**
   * 忽略缓存强制生成接口文件
   *
   * @default false
   */
  force?: boolean

  /**
   * 模板文件类型或路径
   */
  templates?: string

  /**
   * 批量配置
   */
  batch?: Array<Pick<Options, 'imports' | 'input' | 'output'>>
}
