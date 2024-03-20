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
    code = code.replace('var __dirname = (0, import_node_path.dirname)((0, import_node_url.fileURLToPath)(import_meta.url));', '')
    code += 'exports.default = module.exports;'
    await fs.writeFile(file, code)
  }
}
async function run() {
  await fixCjs()
}

run()
