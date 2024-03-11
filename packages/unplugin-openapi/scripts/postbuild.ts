import { basename, dirname, resolve } from 'node:path'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import consola from 'consola'

async function fixCjs() {
  // fix cjs exports
  const files = await fg('*.cjs', {
    ignore: ['chunk-*'],
    absolute: true,
    cwd: resolve(dirname(fileURLToPath(import.meta.url)), '../dist'),
  })
  for (const file of files) {
    consola.info(`Fix ${basename(file)}`)
    let code = await fs.readFile(file, 'utf8')
    code = code.replace('exports.default =', 'module.exports =')
    code += 'exports.default = module.exports;'
    await fs.writeFile(file, code)
  }
}

async function fixUmiOpenapi() {
  // fix @umijs/openapi require.cache
  const file = resolve(dirname(fileURLToPath(import.meta.url)), '../node_modules/@umijs/openapi/dist/index.js')

  let code = await fs.readFile(file, 'utf-8')
  consola.info(`Fix @umijs/openapi require.cache`)

  if (!code.includes('delete require.cache[schemaPath];const schema = require(schemaPath);')) {
    code = code.replace('const schema = require(schemaPath);', 'delete require.cache[schemaPath];const schema = require(schemaPath);')
    await fs.writeFile(file, code)
  }
}

async function run() {
  await fixUmiOpenapi()
  await fixCjs()
}

run()
