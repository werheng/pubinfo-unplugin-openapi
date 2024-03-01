import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import OpenAPI from '@pubinfo/unplugin-openapi/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    OpenAPI({
      imports: 'import request from \'../../index\'',
      watch: false,
      dts: './api/openapi.d.ts',
      batch: [
        {
          input: './scripts/openapi-example-files/swagger-simple.json',
          output: './api/modules/swagger-simple',
        },
        {
          input: './scripts/openapi-example-files/swagger-get-method-params-convert-obj.json',
          output: './api/modules/swagger-get-method-params-convert-obj',
        },
      ],
    }),
  ],
})
