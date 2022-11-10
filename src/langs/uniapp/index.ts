import { unipub } from './unipub'

export function langUniapp(program, config) {
  program
    .command('pub')
    .description('发布uniapp的wgt和微信')
    .action(() => {
      unipub(config.pub, program.args.slice(1))
    })
}
