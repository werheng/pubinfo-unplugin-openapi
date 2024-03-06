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
      dirs: ['./src/api/modules/**/*.ts'],
    }),
    OpenAPI({
      imports: 'import request from \'../../index\'',
      batch: [
        {
          input: './src/openapi-json/swagger-example.json',
          output: './src/api/modules/swagger-example',
        },
      ],
    }),
  ],
})
