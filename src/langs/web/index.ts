import path from 'node:path'
import process from 'node:process'
import type { Command } from 'commander'
import chalk from 'chalk'
import { generateApi } from './generate'

export function langWeb(program: Command, config) {
  program
    .command('sync')
    .description('生成Api请求')
    .action(() => {
      if (!config.docsAddress)
        return console.log(chalk.bold.red('缺少docsAddress配置'))

      generateApi(config.docsAddress, path.resolve(process.cwd(), config.outDir || 'src/api/sync'))
    })
}
