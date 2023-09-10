import type { Command } from 'commander'
import { openDocs } from '../donet/open'
import { updateLingmanVersionForJava } from './lingman'
import { createController } from './co'

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
    .command('co')
    .description('创建Controller , 文件目录以.分割')
    .action(() => {
      createController(config, program.args.slice(1))
    })
}
