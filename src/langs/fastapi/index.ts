import type { Command } from 'commander'
import { openDocs } from '../donet/open'
import { runCmd } from '../../common/runcmd'

export function langFastApi(program: Command, config) {
  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config, program.args.slice(1))
    })

  program
    .command('dev')
    .description('运行fastapi项目')
    .allowUnknownOption()
    .action(() => {
      runCmd(`uvicorn main:app --reload --port ${config?.port || 8000} ${program.args.slice(1).join(' ')}`)
    })
}
