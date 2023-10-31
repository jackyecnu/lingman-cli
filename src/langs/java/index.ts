import type { Command } from 'commander'
import { openDocs } from '../donet/open'
import { updateLingmanVersionForJava } from './lingman'
import { createController } from './co'
import { replacePackageName } from './replace/package_name'
import { syncDB } from './sync/db'

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

  program
    .command('pn')
    .description('修改包名')
    .action(() => {
      replacePackageName({ packageName: program.args.at(1) })
    })

  program
    .command('sync')
    .description('同步数据库')
    .option('-n, --new', '强制更新db-generator.jar')
    .action((ops) => {
      syncDB(config, ops.new)
    })
}
