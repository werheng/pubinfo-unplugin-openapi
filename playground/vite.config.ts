import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import OpenAPI from '@pubinfo/unplugin-openapi/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    OpenAPI({
      input: [
        join(__dirname, './scripts/openapi-example-files/swagger-simple.json'),
        join(__dirname, './scripts/openapi-example-files/swagger-get-method-params-convert-obj.json'),
      ],
      output: [
        './api/swagger-simple',
        './api/swagger-get-method-params-convert-obj',
      ],
      watch: false,
      dts: './api/openapi.d.ts',
    }),
  ],
})
