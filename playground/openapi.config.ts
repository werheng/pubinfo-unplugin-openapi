import { defineConfig } from '@pubinfo/unplugin-openapi'

export default defineConfig({
  imports: 'import request from \'../../index\'',
  input: './scripts/openapi-example-files/swagger-example.json',
  output: './api/modules/swagger-example',
})
