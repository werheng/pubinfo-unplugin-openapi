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
    // {
    //   input: 'https://lssyjxfyy.yjj.lishui.gov.cn:50001/emergency-api/v3/api-docs?group=check',
    //   output: './src/api/modules/check',
    // },
    {
      input: 'https://lssyjxfyy.yjj.lishui.gov.cn:50001/emergency-api/v3/api-docs?group=ding-work',
      output: './src/api/modules/ding-work',
    },
    // {
    //   input: 'http://172.16.29.49:9099/pubinfo-sys/v3/api-docs/rbac',
    //   output: './src/api/modules/rbac',
    // },
    // {
    //   input: 'https://lssyjxfyy.yjj.lishui.gov.cn:50001/emergency-api/v3/api-docs?group=hesc-std-emergency',
    //   output: './src/api/modules/hesc-std-emergency',
    // },
    // {
    //   input: 'https://lssyjxfyy.yjj.lishui.gov.cn:50001/emergency-api/v3/api-docs?group=hesc-urp',
    //   output: './src/api/modules/hesc-urp',
    // },
    // {
    //   input: 'https://lssyjxfyy.yjj.lishui.gov.cn:50001/emergency-api/v3/api-docs?group=hesc-urp-tool',
    //   output: './src/api/modules/hesc-urp-tool',
    // },
  ],
})
