import { defineConfig } from '@pubinfo/unplugin-openapi'

export default defineConfig({
  imports: 'import request from \'../../index\'',
  input: './src/openapi-json/swagger-example.json',
  output: './src/api/modules/swagger-example',
})
