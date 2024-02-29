import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateOpenAPI } from '@pubinfo/unplugin-openapi'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

generateOpenAPI({
  imports: 'import request from \'../../index\'',
  input: join(__dirname, './openapi-example-files/swagger-simple.json'),
  output: './src/api/services/swagger-simple',
})

generateOpenAPI({
  imports: 'import request from \'../../index\'',
  input: join(__dirname, './openapi-example-files/swagger-get-method-params-convert-obj.json'),
  output: './src/api/services/swagger-get-method-params-convert-obj',
})
