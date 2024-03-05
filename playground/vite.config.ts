import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import AutoImport from 'unplugin-auto-import/vite'
import OpenAPI from '@pubinfo/unplugin-openapi/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      dirs: ['./api/modules/**/*.ts'],
    }),
    OpenAPI({
      imports: 'import request from \'../../index\'',
      watch: false,
      manual: false,
      batch: [
        // {
        //   input: './scripts/openapi-example-files/swagger-simple.json',
        //   output: './api/modules/swagger-simple',
        // },
        // {
        //   input: './scripts/openapi-example-files/swagger-get-method-params-convert-obj.json',
        //   output: './api/modules/swagger-get-method-params-convert-obj',
        // },
        {
          input: './scripts/openapi-example-files/swagger-example.json',
          output: './api/modules/swagger-example',
        },
        // {
        //   input: 'http://36.26.82.76:10005/v2/api-docs',
        //   output: './api/modules/swagger-online',
        // },
      ],
    }),
  ],
})
