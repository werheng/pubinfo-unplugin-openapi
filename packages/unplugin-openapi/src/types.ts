export type Arrayable<T> = T | Array<T>

export interface CacheOptions {
  root?: string
  cacheDir: string
}

export interface Options {
  /**
   * 是否启用
   *
   * @default true
   */
  enabled?: boolean

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
}
