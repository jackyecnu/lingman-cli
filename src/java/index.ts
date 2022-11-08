import { openDocs, openDocs1 } from '../donet/open'

export function langJava(program, config) {
  program
    .command('api')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config)
    })

  program
    .command('api1')
    .description('打开正式Api文档')
    .action(() => {
      openDocs1(config)
    })
}
