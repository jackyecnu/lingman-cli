import { openDocs } from '../donet/open'

export function langFastApi(program, config) {
  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config, program.args.slice(1))
    })
}
