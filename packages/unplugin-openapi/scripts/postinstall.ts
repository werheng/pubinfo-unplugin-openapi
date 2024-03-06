import { dirname, resolve } from 'node:path'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import consola from 'consola'

async function run() {
  // fix @umijs/openapi require.cache
  const file = resolve(dirname(fileURLToPath(import.meta.url)), '../node_modules/@umijs/openapi/dist/index.js')

  let code = await fs.readFile(file, 'utf-8')
  consola.info(`Fix @umijs/openapi require.cache`)

  if (!code.includes('delete require.cache[schemaPath];const schema = require(schemaPath);')) {
    code = code.replace('const schema = require(schemaPath);', 'delete require.cache[schemaPath];const schema = require(schemaPath);')
    await fs.writeFile(file, code)
  }
}

run()
