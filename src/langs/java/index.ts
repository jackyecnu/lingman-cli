import type { Command } from 'commander'
import { openDocs, openDocs1 } from '../donet/open'
import { updateLingmanVersionForJava } from './lingman'

export function langJava(program: Command, config) {
  program
    .command('lingman')
    .description('更新lingman-java版本')
    .action(() => {
      updateLingmanVersionForJava()
    })

  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config, program.args.slice(1))
    })

  program
    .command('api1')
    .description('打开正式Api文档')
    .action(() => {
      openDocs1(config)
    })
}
