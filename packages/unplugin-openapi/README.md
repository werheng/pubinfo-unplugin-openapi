# unplugin-openapi

[![npm version][npm-version-src]][npm-version-href]
[![Monorepo][monorepo-src]][monorepo-href]
![License][License-src]

> Generate request files according to the OpenAPI.

## Install

```bash
# npm
npm install @pubinfo/unplugin-openapi -D

# yarn
yarn add @pubinfo/unplugin-openapi -D

# pnpm
pnpm install @pubinfo/unplugin-openapi -D
```

## Usage

### CLI Usage

Need config file in your project root directory:

```js
// openapi.config.js / openapi.config.ts
export default {
  /* options */
}
```

and then run:

```bash
npx @pubinfo/unplugin-openapi openapi
```

### Plugin Usage

Powered by [unplugin](https://github.com/unjs/unplugin), `unplugin-openapi` provides a plugin interface for bundlers.

> If you are using config file, we will load config file firstly.

#### Vite/Rollup

```js
// vite.config.js / rollup.config.js
import OpenAPI from '@pubinfo/unplugin-openapi/vite'

export default {
  plugins: [
    OpenAPI({ /* options */ })
  ]
}
```

#### Webpack

```js
// webpack.config.js
import OpenAPI from '@pubinfo/unplugin-openapi/webpack'

module.exports = {
  plugins: [
    OpenAPI({ /* options */ })
  ]
}
```

## Configuration

```js
OpenAPI({
  // 是否启用，默认 true
  enabled: true,

  // 忽略缓存强制生成接口文件，默认 false
  force: false,

  // 文件默认导入
  imports: {
    '@/api': 'request', // import request from '@/api'
    'request': ['foo', 'bar'], // import { foo , bar } from 'request'
    'request': [{ name: 'foo', as: 'bar' }] // import { foo as bar } from 'request'
  },

  // Swagger2.0 / OpenAPI3.0 地址，直接指向JSON的地址
  input: 'http://your/api-doc',

  // 文件输出目录
  output: '/src/api',

  // 批量配置
  batch: [
    {
      imports: {},
      input: '',
      output: '',
    }
  ]
})
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@pubinfo/unplugin-openapi?style=flat-square
[npm-version-href]: https://npmjs.com/package/@pubinfo/unplugin-openapi
[monorepo-src]: https://img.shields.io/badge/Monorepo-with%20pnpm-F5871D.svg
[monorepo-href]: https://pnpm.io/workspaces
[License-src]: https://img.shields.io/badge/license-MIT-green
