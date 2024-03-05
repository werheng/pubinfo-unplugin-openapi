#!/usr/bin/env node
import { loadConfig } from 'c12'
import { consola } from 'consola'
import { Command } from 'commander'
import pkg from '../package.json'

async function main() {
  const { config } = await loadConfig({ name: 'vite' })

  const program = new Command()

  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)

  program.parse()
  console.log(config)
}

main()
