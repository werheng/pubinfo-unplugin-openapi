#!/usr/bin/env node
import { loadConfig } from 'c12'
import consola from 'consola'
import { Command } from 'commander'
import pkg from '../package.json'
import type { Options } from './types'
import { createContext } from './core/ctx'

async function main() {
  const { config } = await loadConfig<Options>({ name: 'openapi' })

  const program = new Command()

  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)

  program.parse()

  const ctx = await createContext({
    ...config,
    force: true,
    enabled: true,
  })

  if (!ctx.dirs.some(Boolean)) {
    consola.error('Missing input in batch')
    return
  }

  await ctx.generateTS()
}

main()
