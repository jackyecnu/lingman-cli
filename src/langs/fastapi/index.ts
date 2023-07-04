import { runCmd } from '../../common/runcmd'
import { openDocs } from '../donet/open'

export function langFastApi(program, config) {
  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config, program.args.slice(1))
    })

  program
    .command('dev')
    .description('运行fastapi项目')
    .action(() => {
      runCmd(`uvicorn main:app --reload --port ${config?.port || 8000}`)
    })
}
