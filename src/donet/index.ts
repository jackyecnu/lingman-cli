import { runShell } from '../utils/runShell'
import { build } from './build'
import { createController } from './co'
import { initHelper } from './init-helper'
import { openDocs, openDocs1, openLog } from './open'
import { sync } from './sync'

export function langDotnet(program, config) {
  program
    .command('co')
    .description('创建Controller , 文件目录以.分割')
    .action(() => {
      createController(config, program.args.slice(1))
    })

  program
    .command('sync')
    .description('同步远程数据库表结构到本地')
    .action(() => {
      sync(config, program.args.slice(1))
    })

  program
    .command('build')
    .description('执行build指令')
    .action(() => {
      build(config)
    })

  program
    .command('log')
    .description('打开接口日志')
    .action(() => {
      openLog(config)
    })

  program
    .command('docs')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config)
    })

  program
    .command('docs1')
    .description('打开在线Api文档')
    .action(() => {
      openDocs1(config)
    })

  program
    .command('initHelper')
    .description('初始化配置')
    .action(() => {
      initHelper(config.initHelper)
    })

  program
    .command('eftool')
    .description('ef tool 版本更新')
    .action(() => {
      runShell('dotnet tool update --global dotnet-ef')
    })
}

