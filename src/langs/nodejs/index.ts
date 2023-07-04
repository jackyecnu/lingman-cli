import type { Command } from 'commander'
import { openDocs } from '../donet/open'
import { clear } from './clear'

export function langNodejs(program: Command, config) {
  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config, program.args.slice(1))
    })

  program
    .command('clear')
    .description('清除package依赖和产物')
    .action(() => {
      clear()
    })
}
