import { defineConfig } from '@pubinfo/unplugin-openapi'

export default defineConfig({
  imports: {
    '../../index': 'request',
  },

  batch: [
    {
      input: './src/openapi-json/swagger-example.json',
      output: './src/api/modules/swagger-example',
    },
    {
      input: './src/openapi-json/swagger-simple.json',
      output: './src/api/modules/swagger-simple',
    },
    {
      input: './src/openapi-json/rbac.json',
      output: './src/api/modules/rbac',
    },
  ],
})
